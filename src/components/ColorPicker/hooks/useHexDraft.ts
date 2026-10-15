import { useState } from "react";
import { normalizeHex } from "../utils/color";
import type { ChangeEvent, KeyboardEvent } from "react";

const FULL_HEX_RE = /^#?[0-9a-f]{6}$/i;

/**
 * HEX field logic for `Input`:
 * - while focused, the field keeps a draft, so it can be cleared and retyped;
 * - a full `#rrggbb` applies while typing;
 * - a short `#abc` applies on blur or Enter (focus stays), so typing
 *   `#abcdef` does not flash `#aabbcc`;
 * - invalid input reverts to the current value on blur.
 */
export const useHexDraft = (value: string, onChange: (hex: string) => void) => {
  // null: not editing, show `value`.
  const [draft, setDraft] = useState<string | null>(null);

  const commit = (text: string) => {
    const hex = normalizeHex(text);

    if (hex && hex !== value) onChange(hex);
  };

  return {
    invalid: draft !== null && normalizeHex(draft) === null,
    inputProps: {
      value: draft ?? value,
      onFocus: () => setDraft(value),
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;

        setDraft(text);
        if (FULL_HEX_RE.test(text.trim())) commit(text);
      },
      onBlur: () => {
        if (draft !== null) commit(draft);
        setDraft(null);
      },
      // Applies a short HEX and keeps focus in the field.
      onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter" || draft === null) return;

        const hex = normalizeHex(draft);

        if (hex) {
          commit(draft);
          setDraft(hex);
        }
      },
    },
  };
};
