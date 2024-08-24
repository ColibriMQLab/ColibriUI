import * as React from "react";
import classNames from "classnames/bind";
import Button from "../../../Button";
import { requestIdleCallback } from "../../../libs/requestIdleCallback";

import { getPeriodDates } from "../../../helpers/date";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

type Props = {
  isChanged: boolean;
  selectedDate?: string;
  selectedPeriod?: number;
};

type Methods = {
  onContinue(): void;
  onCancel(): void;
};

export const ContinueButton: React.FC<Props & Methods> = ({
  selectedDate,
  selectedPeriod,
  isChanged,
  onContinue,
  onCancel,
}) => {
  const selectedDates = getPeriodDates(selectedDate, selectedPeriod);

  return (
    <div className={clx(styles.root)} data-component="Calendar__ContinueButton">
      <Button
        size="l"
        onClick={() =>
          requestIdleCallback(() => (isChanged ? onContinue() : onCancel()), {
            timeout: 200,
          })
        }
      >
        {isChanged && !!selectedDate && !!selectedPeriod ? (
          <>Select {selectedDates}</>
        ) : (
          <>Cancel</>
        )}
      </Button>
    </div>
  );
};
