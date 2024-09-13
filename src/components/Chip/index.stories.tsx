import React, { useCallback, useState } from 'react'
import Chip from ".";
import generateUniqID from '../helpers/generateUniqID';
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["s", "m", "l"],
    },
  },
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

const menuItems = [
  {
      href: '#',
      text: 'Best sellers',
      isActive: false,
  },
  {
      href: '#',
      text: 'Fiction',
      isActive: false,
  },
  {
      href: '#',
      text: 'Education',
      isActive: false,
  },
];

export const Default = (args: Story) => {
  const [items, setItems] = useState(menuItems);

  const handleClick = useCallback((index: number) => {
    setItems((prevState) => {
      prevState[index].isActive = !prevState[index].isActive
      return [
        ...prevState,
      ];
    });
  }, [items]);

  return(
  <div>
    {items.map((item, index) => (<>
    <Chip key={generateUniqID(index)} isActive={item.isActive} onClick={() => handleClick(index)} {...args}>
      {item.text}
    </Chip>{' '}</>))}
  </div>
)};