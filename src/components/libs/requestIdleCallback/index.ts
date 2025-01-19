type Options = {
  timeout: number;
};

export function requestIdleCallback(callback: Function, options?: Options) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    // @ts-expect-error
    window.requestIdleCallback(callback, options);
  }

  setTimeout(callback, 10);
}
