import React, { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Select from '..';

describe('<Select />', () => {
  const options = Array(5)
    .fill(null)
    .map((_, i) => ({
      label: `options ${i}`,
      value: i,
    }));

  it('renders', () => {
    const onChange = jest.fn();
    render(
      <Select value={2} label="hint" options={options} onChange={onChange} />
    );

    const selectLabel = screen.getByText(/hint/i);
    expect(selectLabel).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = jest.fn();
    render(<Select value={2} options={options} onChange={onChange} />);

    const selectButton = screen.getByRole('button');
    await userEvent.click(selectButton);

    const firstOption = screen.getByText(/options 0/i);
    await userEvent.click(firstOption);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 0 }));
  });
});
