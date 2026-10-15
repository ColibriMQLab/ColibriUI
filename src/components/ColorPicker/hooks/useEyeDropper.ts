import { useCallback, useSyncExternalStore } from "react";
import { toHex } from "../utils/color";

interface EyeDropperInstance {
  open(): Promise<{ sRGBHex: string }>;
}

type EyeDropperWindow = Window & {
  EyeDropper?: new () => EyeDropperInstance;
};

const subscribe = () => () => {};
const getSnapshot = () => "EyeDropper" in window;
// No API on the server, so hydration does not mismatch.
const getServerSnapshot = () => false;

/**
 * Native browser eye dropper (EyeDropper API). Chromium only: in Safari and
 * Firefox `isSupported` is `false`.
 */
export const useEyeDropper = () => {
  const isSupported = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  /** `#rrggbb`, or `null` when the user cancels with Escape. */
  const pick = useCallback(async (): Promise<string | null> => {
    const { EyeDropper } = window as EyeDropperWindow;
    if (!EyeDropper) return null;

    try {
      // eslint-disable-next-line compat/compat -- guarded by the feature check above
      const { sRGBHex } = await new EyeDropper().open();

      return toHex(sRGBHex);
    } catch {
      return null;
    }
  }, []);

  return { isSupported, pick };
};
