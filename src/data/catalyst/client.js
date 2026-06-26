// Browser-only twin of sites/app/lib/catalyst/client.ts.
// CatalystError / buildQuery / getJSON are ported byte-for-byte (minus TS types);
// only `catalystBase` differs: no node/process.env — base comes from
// import.meta.env.VITE_CATALYST_URL, then window.__CATALYST_BASE__, then the
// public origin (CORS already enabled for play.dcl.one). No node/server imports.

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
