import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '..';
import Button from '../../Button';

describe('<Tooltip />', () => {
  const content = (
    <span>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </span>
  );

  it('renders', () => {
    render(
      <Tooltip content={content}>
        <Button variant="primary">Button</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /button/i });
    expect(button).toBeInTheDocument();
  });

  it('body is visible (trigger = hover)', async () => {
    render(
      <Tooltip content={content}>
        <Button variant="primary">Button</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /button/i });

    await userEvent.hover(button);

    const tooltip = screen.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit/i);
    expect(tooltip).toBeVisible();
  });

  it('should has correct child', async () => {
    render(
      <Tooltip content={<span>I am Tooltip</span>}>
        <Button variant="primary">Button</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /button/i });

    await userEvent.hover(button);

    const tooltipText = screen.getByText(/I am tooltip/i);
    expect(tooltipText).toBeVisible();
    expect(tooltipText).toHaveTextContent('I am Tooltip');
  });
});
