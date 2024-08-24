import React, { useMemo, useCallback } from "react";
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
  onContinue: () => void;
  onCancel: () => void;
};

export const ContinueButton: React.FC<Props> = ({
  selectedDate,
  selectedPeriod,
  isChanged,
  onContinue,
  onCancel,
}) => {
  const selectedDates = useMemo(() => {
    if (selectedDate && selectedPeriod) {
      return getPeriodDates(selectedDate, selectedPeriod);
    }
    return null;
  }, [selectedDate, selectedPeriod]);

  const handleClick = useCallback(() => {
    requestIdleCallback(() => (isChanged ? onContinue() : onCancel()), {
      timeout: 200,
    });
  }, [isChanged, onContinue, onCancel]);

  return (
    <div className={clx(styles.root)} data-component="Calendar__ContinueButton">
      <Button size="l" onClick={handleClick}>
        {isChanged && selectedDates ? (
          <>Select {selectedDates}</>
        ) : (
          <>Cancel</>
        )}
      </Button>
    </div>
  );
};
