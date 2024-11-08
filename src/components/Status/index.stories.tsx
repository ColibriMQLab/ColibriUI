import React from "react";
import Status from ".";
import type { Meta } from "@storybook/react";
import { STATUS_TYPE } from "./index.props";

const list = [
  {
    text: 'Status',
  },
  {
    type: STATUS_TYPE.SUCCESS,
    text: 'Success',
  },
];

const meta: Meta<typeof Status> = {
  title: "UI/Status",
  parameters: {
    layout: 'centered'
  },
  component: Status,
} satisfies Meta<typeof Status>;

export default meta;

export const Default = (args) => {
  return <div style={{display: 'flex', gap: '16px'}}>
    {list.map(({text, type}) => (<Status type={type} {...args}>{text}</Status>))}
    </div>;
};