import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const MinimapVisibilityContext = createContext(null);

const INERT = { minimapHidden: false, requestHide: () => () => {} };

export function MinimapVisibilityProvider({ children }) {
  const [hideCount, setHideCount] = useState(0);

  const requestHide = useCallback(() => {
    setHideCount((n) => n + 1);
    let released = false;
    return () => {
      if (released) return;
      released = true;
      setHideCount((n) => Math.max(0, n - 1));
    };
  }, []);

  const value = useMemo(
    () => ({ minimapHidden: hideCount > 0, requestHide }),
    [hideCount, requestHide],
  );

  return (
    <MinimapVisibilityContext.Provider value={value}>
      {children}
    </MinimapVisibilityContext.Provider>
  );
}

export function useMinimapVisibility() {
  return useContext(MinimapVisibilityContext) ?? INERT;
}

export function useHideMinimapWhileMounted(active = true) {
  const { requestHide } = useMinimapVisibility();
  useEffect(() => {
    if (!active) return undefined;
    return requestHide();
  }, [active, requestHide]);
}
