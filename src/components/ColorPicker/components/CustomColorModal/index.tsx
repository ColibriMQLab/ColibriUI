import React, { useState } from "react";
import { Button } from "../../../Button";
import { Pipette } from "../../../Icons";
import { Input } from "../../../Input";
import { Modal } from "../../../Modal";
import { Typography } from "../../../Typography";
import { useEyeDropper } from "../../hooks/useEyeDropper";
import { useHexDraft } from "../../hooks/useHexDraft";
import { hex2hsv, hsv2hex, toHsvPreservingHue } from "../../utils/color";
import { ColorPreview } from "../ColorPreview";
import { HueSlider } from "../HueSlider";
import { SaturationPanel } from "../SaturationPanel";
import styles from "./CustomColorModal.module.scss";
import type { ColorPickerLabels } from "../../index.props";
import type { HSV } from "../../utils/color";

interface CustomColorModalProps {
  /** `#rrggbb` the picker starts from. */
  initialColor: string;
  labels: ColorPickerLabels;
  onSave: (hex: string) => void;
  onClose: () => void;
}

const BLACK: HSV = { h: 0, s: 0, v: 0 };

/**
 * "Choose custom color" dialog. The draft is kept in HSV: HEX loses hue and
 * saturation of grey and black, and the sliders would jump.
 */
export const CustomColorModal = ({
  initialColor,
  labels,
  onSave,
  onClose,
}: CustomColorModalProps) => {
  const [color, setColor] = useState<HSV>(() => hex2hsv(initialColor) ?? BLACK);
  const hex = hsv2hex(color);
  const { isSupported, pick } = useEyeDropper();

  const setHex = (next: string) =>
    setColor((prev) => toHsvPreservingHue(next, prev) ?? prev);

  const { invalid, inputProps } = useHexDraft(hex, setHex);

  const handlePick = async () => {
    const picked = await pick();

    if (picked) setHex(picked);
  };

  return (
    <Modal onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{labels.customTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Typography tag="p" variant="secondary" size="text-sm">
          {labels.customDescription}
        </Typography>
        <div className={styles.picker}>
          <div className={styles.side}>
            <ColorPreview color={color}>{labels.preview}</ColorPreview>
            {isSupported && (
              <Button
                variant="secondary"
                size="l"
                icon={<Pipette width={20} height={20} aria-hidden="true" />}
                aria-label={labels.eyeDropper}
                title={labels.eyeDropper}
                onClick={handlePick}
              />
            )}
          </div>
          <SaturationPanel
            value={color}
            onChange={setColor}
            aria-label={labels.saturation}
          />
          <div className={styles.full_row}>
            <HueSlider
              value={color}
              onChange={setColor}
              aria-label={labels.hue}
            />
          </div>
          <Input
            className={styles.full_row}
            label={labels.hex}
            hasError={invalid}
            maxLength={7}
            spellCheck={false}
            autoComplete="off"
            {...inputProps}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="clear" onClick={onClose}>
          {labels.cancel}
        </Button>
        <Button onClick={() => onSave(hex)}>{labels.save}</Button>
      </Modal.Footer>
    </Modal>
  );
};
