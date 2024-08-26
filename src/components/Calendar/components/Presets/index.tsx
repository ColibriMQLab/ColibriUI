import * as React from "react";
import classNames from "classnames/bind";
import Button from "../../../Button";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

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
  <div data-component="Calendar_Presets">
    <div className={clx(styles["native-scroll-inner"])}>
      <div className={clx(styles.inner)}>
        {presets.map((preset, ...rest) => {
          return (
            <div className={clx(styles.item)} key={`preset=${rest[0]}`}>
              <Button
                variant="outline"
                onClick={() => onPresetSelect(preset)}
                size="m"
              >
                {preset.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
