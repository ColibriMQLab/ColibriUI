export const on = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null | undefined,
  type: K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => {
  element?.addEventListener(type, listener, options);

  return () => {
    element?.removeEventListener(type, listener, options);
  };
};
