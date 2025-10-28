import React, { useMemo, useCallback } from "react";
import Button from "../../../Button";
import { requestIdleCallback } from "../../../libs/requestIdleCallback";
import { getPeriodDates } from "../../../helpers/date";
import styles from "./index.module.scss";

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
    <div className={styles.root} data-testid="continue-button">
      <Button size="l" onClick={handleClick}>
        {isChanged && selectedDates ? <>Select {selectedDates}</> : <>Cancel</>}
      </Button>
    </div>
  );
};
