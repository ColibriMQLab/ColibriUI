import React, { Profiler, StrictMode, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Datepicker } from "..";

const getDayButton = (isoDate: string) => {
  const [year, month, date] = isoDate.split("-").map(Number);
  const day = document.querySelector<HTMLButtonElement>(
    `[data-day="${year}-${month - 1}-${date}"]`,
  );
  if (!day) throw new Error(`Day ${isoDate} is not rendered`);
  return day;
};

describe("<Datepicker />", () => {
  it("does not loop renders in single mode without selectedRange", () => {
    const onRender = jest.fn();

    render(
      <StrictMode>
        <Profiler id="datepicker" onRender={onRender}>
          <Datepicker
            selectionMode="single"
            selectedDate="2026-10-14"
            onChangeDate={jest.fn()}
          />
        </Profiler>
      </StrictMode>,
    );

    expect(screen.getByDisplayValue("14.10.2026")).toBeInTheDocument();
    expect(onRender.mock.calls.length).toBeLessThanOrEqual(2);
  });

  it("keeps the picked range when the parent re-renders with a literal selectedRange", async () => {
    const onRender = jest.fn();
    const Parent = () => {
      const [count, setCount] = useState(0);

      return (
        <>
          <button type="button" onClick={() => setCount(count + 1)}>
            rerender {count}
          </button>
          <Profiler id="datepicker" onRender={onRender}>
            <Datepicker
              selectionMode="range"
              selectedRange={["2026-10-01", "2026-10-05"]}
              defaultVisibleMonth={new Date(2026, 9, 1)}
            />
          </Profiler>
        </>
      );
    };

    render(
      <StrictMode>
        <Parent />
      </StrictMode>,
    );

    expect(screen.getByDisplayValue("01.10.2026")).toBeInTheDocument();
    expect(screen.getByDisplayValue("05.10.2026")).toBeInTheDocument();

    await userEvent.click(screen.getByDisplayValue("01.10.2026"));
    await userEvent.click(getDayButton("2026-10-10"));
    await userEvent.click(getDayButton("2026-10-12"));

    expect(screen.getByDisplayValue("10.10.2026")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12.10.2026")).toBeInTheDocument();

    const rendersBeforeParentUpdate = onRender.mock.calls.length;
    await userEvent.click(screen.getByRole("button", { name: /rerender/i }));

    expect(screen.getByDisplayValue("10.10.2026")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12.10.2026")).toBeInTheDocument();
    expect(onRender.mock.calls.length - rendersBeforeParentUpdate).toBe(1);
  });

  it("calls onChangeDate with an ISO date", async () => {
    const onChangeDate = jest.fn();

    render(
      <Datepicker
        selectionMode="single"
        selectedDate="2026-10-14"
        onChangeDate={onChangeDate}
      />,
    );

    await userEvent.click(screen.getByDisplayValue("14.10.2026"));
    await userEvent.click(getDayButton("2026-10-20"));

    expect(onChangeDate).toHaveBeenCalledWith("2026-10-20");
    expect(screen.getByDisplayValue("20.10.2026")).toBeInTheDocument();
  });
});
