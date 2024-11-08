import React from "react";
import Status from ".";
import type { Meta } from "@storybook/react";
import { STATUS_TYPE } from "./index.props";
import generateUniqID from "../helpers/generateUniqID";

const list = [
  {
    text: 'Neutral',
  },
  {
    type: STATUS_TYPE.SUCCESS,
    text: 'Success',
  },
  {
    type: STATUS_TYPE.FAILURE,
    text: 'Failure',
  },
  {
    type: STATUS_TYPE.WARNING,
    text: 'Warning',
  },
  {
    type: STATUS_TYPE.INFO,
    text: 'Info',
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
    {list.map(({text, type}, index) => (<Status type={type} {...args} key={generateUniqID(index)}>{text}</Status>))}
    </div>;
};