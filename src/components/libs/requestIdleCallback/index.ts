type Options = {
  timeout: number;
};

export function requestIdleCallback(callback: () => void, options?: Options) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (
      window as Window & {
        requestIdleCallback: (cb: () => void, opts?: Options) => void;
      }
    ).requestIdleCallback(callback, options);
  }

  setTimeout(callback, 10);
}
