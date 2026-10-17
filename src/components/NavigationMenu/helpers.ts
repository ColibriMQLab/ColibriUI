import { useEffect, useLayoutEffect } from "react";
import type { Ref } from "react";
import type { NavigationMenuItem } from "./index.props";

export const getItemKey = (item: NavigationMenuItem, index: number) =>
  item.id ?? item.href ?? `${item.label}-${index}`;

/** Items are often recreated on every render: compare them by content. */
export const isSameItem = (a: NavigationMenuItem, b: NavigationMenuItem) =>
  getItemKey(a, 0) === getItemKey(b, 0);

/** `useLayoutEffect` without the server rendering warning. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const assignRef = <T>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
};
