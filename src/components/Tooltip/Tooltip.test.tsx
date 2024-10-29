import React, { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Tooltip from './';
import Button from '../Button';

describe('<Tooltip />', () => {
  const content = (
    <span>
      Я Tooltip и у меня много много текста. Я Tooltip и у меня много много
      текста. Я Tooltip и у меня много много текста.
    </span>
  );

  it('renders', () => {
    render(
      <Tooltip content={content}>
        <Button variant="primary">Кнопка</Button>
      </Tooltip>
    );

    // Проверка, что кнопка рендерится
    const button = screen.getByRole('button', { name: /кнопка/i });
    expect(button).toBeInTheDocument();
  });

  it('body is visible (trigger = click)', async () => {
    render(
      <Tooltip content={content} trigger="click">
        <Button variant="primary">Кнопка</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /кнопка/i });

    // Кликаем по кнопке
    await userEvent.click(button);

    // Проверяем, что тултип стал видимым
    const tooltip = screen.getByText(/я tooltip и у меня много много текста/i);
    expect(tooltip).toBeVisible();
  });

  it('body is visible (trigger = hover)', async () => {
    render(
      <Tooltip content={content} trigger="hover">
        <Button variant="primary">Кнопка</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /кнопка/i });

    // Наводим курсор мыши на кнопку
    await userEvent.hover(button);

    // Проверяем, что тултип стал видимым
    const tooltip = screen.getByText(/я tooltip и у меня много много текста/i);
    expect(tooltip).toBeVisible();
  });

  it('should has correct child', async () => {
    render(
      <Tooltip content={<span>Я Tooltip</span>} trigger="hover">
        <Button variant="primary">Кнопка</Button>
      </Tooltip>
    );

    const button = screen.getByRole('button', { name: /кнопка/i });

    // Наводим курсор мыши на кнопку
    await userEvent.hover(button);

    // Проверяем текст внутри тултипа
    const tooltipText = screen.getByText(/я tooltip/i);
    expect(tooltipText).toBeVisible();
    expect(tooltipText).toHaveTextContent('Я Tooltip');
  });
});
