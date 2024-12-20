import React, { useCallback, useState } from 'react'
import Chip from ".";
import { fn } from '@storybook/test';
import generateUniqID from '../helpers/generateUniqID';
import type { Meta, StoryObj } from "@storybook/react";
import CrossFill from '../Icons/CrossFill';

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

export const Sizes = (args: Story) => {
  return(
  <>
    <Chip size="s" {...args}>
      Chip s
    </Chip>{' '}
    <Chip size="m" {...args}>
      Chip m
    </Chip>{' '}
    <Chip size="l" {...args}>
      Chip l
    </Chip>
  </>
)};

export const Deletable = (args: Story) => {
  const handleDelete = () => {
    alert('Click');
  };

  return(
    <>
      <Chip size="s" iconOnRight={<CrossFill/>} onIconOnRightClick={handleDelete} {...args}>
        Chip 1
      </Chip>{' '}
      <Chip size="s" iconOnRight={<CrossFill/>} onIconOnRightClick={handleDelete} {...args}>
        Chip 2
      </Chip>{' '}
      <Chip size="s" iconOnRight={<CrossFill/>} onIconOnRightClick={handleDelete} {...args}>
        Long long chip 3
      </Chip>
    </>
)};