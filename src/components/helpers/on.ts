export const on = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null | undefined,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) => {
  element?.addEventListener(type, listener, options);

  return () => {
    element?.removeEventListener(type, listener, options);
  };
};
