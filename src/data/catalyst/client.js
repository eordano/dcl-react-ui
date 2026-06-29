export class CatalystError extends Error {
  constructor(message, url, status = 0) {
    super(message);
    this.name = "CatalystError";
    this.status = status;
    this.url = url;
  }
}

const DEFAULT_BASE = "https://catalyst.dcl.one";

export function catalystBase(override) {
  const fromEnv =
    typeof import.meta !== "undefined" ? import.meta.env?.VITE_CATALYST_URL : undefined;
  const fromWindow =
    typeof window !== "undefined" ? window.__CATALYST_BASE__ : undefined;
  const base = override ?? fromEnv ?? fromWindow ?? DEFAULT_BASE;
  return base.replace(/\/$/, "");
}

export function buildQuery(query) {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function getJSON(path, opts = {}) {
  const base = catalystBase(opts.base);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${cleanPath}${buildQuery(opts.query)}`;
  const doFetch = opts.fetchImpl ?? fetch;

  let res;
  try {
    res = await doFetch(url, {
      signal: opts.signal,
      headers: { accept: "application/json", ...(opts.headers ?? {}) },
    });
  } catch (err) {
    throw new CatalystError(
      `Catalyst request failed: ${err?.message ?? "network error"}`,
      url,
    );
  }

  if (!res.ok) {
    throw new CatalystError(
      `Catalyst returned ${res.status} ${res.statusText}`,
      url,
      res.status,
    );
  }

  try {
    return await res.json();
  } catch (err) {
    throw new CatalystError(
      `Catalyst returned invalid JSON: ${err?.message ?? "parse error"}`,
      url,
      res.status,
    );
  }
}

export async function sendJSON(path, opts = {}) {
  const base = catalystBase(opts.base);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${cleanPath}${buildQuery(opts.query)}`;
  const doFetch = opts.fetchImpl ?? fetch;
  const method = (opts.method ?? "POST").toUpperCase();
  const hasBody = opts.body !== undefined && opts.body !== null;

  let res;
  try {
    res = await doFetch(url, {
      method,
      signal: opts.signal,
      headers: {
        accept: "application/json",
        ...(hasBody ? { "content-type": "application/json" } : {}),
        ...(opts.headers ?? {}),
      },
      body: hasBody ? JSON.stringify(opts.body) : undefined,
    });
  } catch (err) {
    throw new CatalystError(
      `Catalyst request failed: ${err?.message ?? "network error"}`,
      url,
    );
  }

  if (!res.ok) {
    let serverMsg = "";
    try {
      const txt = await res.text();
      if (txt) {
        try {
          serverMsg = JSON.parse(txt)?.message ?? "";
        } catch {
          serverMsg = txt;
        }
      }
    } catch {
    }
    throw new CatalystError(
      serverMsg || `Catalyst returned ${res.status} ${res.statusText}`,
      url,
      res.status,
    );
  }

  if (res.status === 204) return null;
  let text;
  try {
    text = await res.text();
  } catch {
    return null;
  }
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function signedFetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const bridge = typeof window !== "undefined" ? window.dclBridge : undefined;
    if (
      !bridge ||
      typeof bridge.send !== "function" ||
      typeof bridge.onState !== "function"
    ) {
      reject(
        new CatalystError("Signed fetch unavailable: engine bridge not ready", url),
      );
      return;
    }

    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sf-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const method = (opts.method ?? "POST").toUpperCase();
    const hasBody = opts.body !== undefined && opts.body !== null;
    const body = hasBody
      ? typeof opts.body === "string"
        ? opts.body
        : JSON.stringify(opts.body)
      : undefined;

    let unsubscribe = () => {};
    let timer = null;
    const settle = (fn, arg) => {
      try {
        unsubscribe();
      } catch {
      }
      if (timer) clearTimeout(timer);
      fn(arg);
    };

    unsubscribe = bridge.onState((push) => {
      if (push && push.kind === "signedFetchResult" && push.id === id) {
        settle(resolve, { status: push.status ?? 0, body: push.body ?? "" });
      }
    });

    const timeoutMs = opts.timeoutMs ?? 30000;
    timer = setTimeout(() => {
      settle(reject, new CatalystError("Signed fetch timed out", url));
    }, timeoutMs);

    bridge.send("SignedFetch", { id, url, method, body });
  });
}

export async function sendSignedJSON(path, opts = {}) {
  const base = catalystBase(opts.base);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${base}${cleanPath}${buildQuery(opts.query)}`;

  const { status, body } = await signedFetch(url, {
    method: opts.method ?? "POST",
    body: opts.body,
    timeoutMs: opts.timeoutMs,
  });

  if (status < 200 || status >= 300) {
    let serverMsg = "";
    if (body) {
      try {
        serverMsg = JSON.parse(body)?.message ?? "";
      } catch {
        serverMsg = body;
      }
    }
    throw new CatalystError(serverMsg || `Catalyst returned ${status}`, url, status);
  }

  if (status === 204 || !body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}
