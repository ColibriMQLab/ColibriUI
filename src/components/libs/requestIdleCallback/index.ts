type Options = {
  timeout: number;
};
// eslint-disable-next-line @typescript-eslint/ban-types
export function requestIdleCallback(callback: Function, options?: Options) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.requestIdleCallback(callback, options);
  }

  setTimeout(callback, 10);
}
