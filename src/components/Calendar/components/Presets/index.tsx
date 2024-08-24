import * as React from "react";
import classNames from "classnames/bind";
import Button from "../../../Button";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

export type Preset = {
  alias: string;
  name: string;
  date: string;
  period: number;
};

type Props = {
  presets: Preset[];
  selectedDate?: string;
  selectedPeriod?: number;
  onPresetSelect(preset: Preset): void;
};

export const Presets: React.FunctionComponent<Props> = ({
  presets,
  selectedDate,
  selectedPeriod,
  onPresetSelect,
}) => (
  <div
    className={clx(styles["native-scroll"])}
    data-component="Calendar_Presets"
  >
    <div className={clx(styles["native-scroll-inner"])}>
      <div className={clx(styles.root)}>
        <div className={clx(styles.inner)}>
          {presets.map((preset, ...rest) => {
            return (
              <div className={clx(styles.item)} key={`preset=${rest[0]}`}>
                <Button
                  disabled={
                    preset.date !== selectedDate &&
                    preset.period !== selectedPeriod
                  }
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
  </div>
);
