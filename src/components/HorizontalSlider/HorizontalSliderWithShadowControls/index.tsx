import * as React from "react";
import classNames from "classnames/bind";
import { HorizontalSliderWithControls } from "../HorizontalSliderWithControls";
import styles from "./index.module.scss";
import type { Props as BaseProps } from "../HorizontalSliderWithControls";

const clx = classNames.bind(styles);

type Props = {
  itemsCssSelector?: BaseProps["itemsCssSelector"];
  itemsCountToSlide?: BaseProps["itemsCountToSlide"];
  onScroll?: BaseProps["onScroll"];
  controlSize?: number;
};

export const HorizontalSliderWithShadowControls: React.FC<Props> = (props) => {
  const attrs = {
    ...props,
    renderLeftButton() {
      return (
        <b className={clx(styles.control, styles["control-left"])}>
          <i
            className={clx(styles["control-icon"], styles["control-icon-left"])}
          />
        </b>
      );
    },
    renderRightButton() {
      return (
        <b className={clx(styles.control, styles["control-right"])}>
          <i className={clx(styles["control-icon"])} />
        </b>
      );
    },
  };

  return (
    <div
      className={clx(styles.outer)}
      data-component="HorizontalSliderWithShadowControls"
    >
      <HorizontalSliderWithControls {...attrs} />
    </div>
  );
};
