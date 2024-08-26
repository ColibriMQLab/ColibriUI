import React from "react";
import classNames from "classnames/bind";
import { HorizontalSliderWithControls } from "../HorizontalSliderWithControls";
import styles from "./index.module.scss";
import type { Props as BaseProps } from "../HorizontalSliderWithControls";
import type { FC } from "react";

const clx = classNames.bind(styles);

type Props = {
  itemsCssSelector?: BaseProps["itemsCssSelector"];
  itemsCountToSlide?: BaseProps["itemsCountToSlide"];
  isOverflow?: boolean;
};

export const HorizontalSliderWithArrows: FC<Props> = (props) => {
  const attrs = {
    ...props,
    renderLeftButton() {
      return (
        <b className={clx(styles.control, styles["control-left"])}>
          <i
            className={clx(
              styles["control-icon"],
              styles["control-icon-left"],
              {
                "control-icon-overflow": Boolean(props.isOverflow),
                "control-icon-left-overflow": Boolean(props.isOverflow),
              },
            )}
          />
        </b>
      );
    },
    renderRightButton() {
      return (
        <b className={clx(styles.control, styles["control-right"])}>
          <i
            className={clx(styles["control-icon"], {
              "control-icon-overflow": Boolean(props.isOverflow),
            })}
          />
        </b>
      );
    },
  };

  return (
    <span data-component="HorizontalSliderWithBlackArrows">
      <HorizontalSliderWithControls {...attrs} />
    </span>
  );
};
