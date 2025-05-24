import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "..";

describe("<Counter />", () => {
  const baseProps = {
    value: 1,
    min: 0,
    max: 5,
    onChange: jest.fn(),
  };

  const setup = (props = {}) => {
    const allProps = { ...baseProps, ...props };
    const utils = render(<Counter {...allProps} />);
    return {
      ...utils,
      onChange: allProps.onChange,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with value", () => {
    setup();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onChange with incremented value", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByLabelText("increase"));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("calls onChange with decremented value", () => {
    const { onChange } = setup();
    fireEvent.click(screen.getByLabelText("decrease"));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("disables minus button at min", () => {
    setup({ value: 0 });
    expect(screen.getByLabelText("decrease")).toBeDisabled();
  });

  it("disables plus button at max", () => {
    setup({ value: 5 });
    expect(screen.getByLabelText("increase")).toBeDisabled();
  });

  it("does not call onChange if minus is disabled", () => {
    const { onChange } = setup({ value: 0 });
    fireEvent.click(screen.getByLabelText("decrease"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not call onChange if plus is disabled", () => {
    const { onChange } = setup({ value: 5 });
    fireEvent.click(screen.getByLabelText("increase"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("disables both buttons if disabled=true", () => {
    setup({ disabled: true });
    expect(screen.getByLabelText("increase")).toBeDisabled();
    expect(screen.getByLabelText("decrease")).toBeDisabled();
  });

  it("renders with fullWidth class if fullWidth=true", () => {
    const { container } = setup({ fullWidth: true });
    expect(container.firstChild).toHaveClass("root_fullWidth");
  });
});
