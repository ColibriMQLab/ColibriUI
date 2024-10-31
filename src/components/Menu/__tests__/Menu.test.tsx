import React from 'react';
import { render, screen } from '@testing-library/react';
import MenuItem from '../components/MenuItem';
import Menu from '..';

describe('<Menu />', () => {
  it('renders', () => {
    render(
      <Menu>
        <MenuItem key="1">Test 1</MenuItem>
        <MenuItem key="2">Test 2</MenuItem>
        <MenuItem key="3">Test 3</MenuItem>
      </Menu>
    );

    const menuItems = screen.getAllByTestId('menuitem');
    expect(menuItems.length).toBe(3);
  });

  it('has the correct items value', () => {
    render(
      <Menu>
        <MenuItem key="1">Test 1</MenuItem>
        <MenuItem key="2">Test 2</MenuItem>
        <MenuItem key="3">Test 3</MenuItem>
      </Menu>
    );

    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Test 3')).toBeInTheDocument();
  });

  it('has the correct selected item background', () => {
    render(
      <Menu selected={["2"]}>
        <MenuItem key="1">Test 1</MenuItem>
        <MenuItem key="2">Test 2</MenuItem>
        <MenuItem key="3">Test 3</MenuItem>
      </Menu>
    );

    const selectedItem = screen.getByText('Test 2').closest('li');
    expect(selectedItem).toHaveStyle('background-color: var(--palette-primary-1, rgb(232, 240, 254))');
  });
});
