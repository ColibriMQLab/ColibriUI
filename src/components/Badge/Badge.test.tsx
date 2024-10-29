import React from "react";
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Cart from "../Icons/Cart";
import Badge from ".";

describe("<Badge />", () => {
  it('should render correctly', () => {
      const { container } = render(
        <Badge content={3}>
        <Cart />
      </Badge>,
      );
      expect(container).toMatchSnapshot();
  });

  it('has the correct number', () => {
    // Рендерим компонент
    render(
      <Badge content={3}>
        <Cart />
      </Badge>
    );
  
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveTextContent('3');
  });
});
