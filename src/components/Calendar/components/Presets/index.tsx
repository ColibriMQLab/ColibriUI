import * as React from "react";
import Button from "../../../Button";
import styles from "./index.module.scss";

export enum PRESETS {
  TODAY = "today",
  TOMORROW = "tomorrow",
  WEEKENDS = "weekends",
  CURWEEK = "currWeek",
  NEXTWEEK = "nextWeek",
}

export type Preset = {
  name: string;
  date: string;
  period: number;
};

type Props = {
  presets: Preset[];
  onPresetSelect(preset: Preset): void;
};

export const Presets: React.FunctionComponent<Props> = ({
  presets,
  onPresetSelect,
}) => (
  <div data-testid="presets">
    <div className={styles["native-scroll-inner"]}>
      <div className={styles.inner}>
        {presets.map((preset, ...rest) => (
          <div className={styles.item} key={`preset=${rest[0]}`}>
            <Button
              variant="outline"
              onClick={() => onPresetSelect(preset)}
              size="m"
            >
              {preset.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
