import React from 'react';
import Accordion from '.';
import { Meta } from '@storybook/react';

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  parameters: {
  },
  argTypes: {
    boldTitle: {
      control: { type: "boolean" },
      options: [true, false],
    },
  },
  args: {
    title: "Accordion title",
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

const wrapperStyles = {
  height: '400px',
  width: '600px',
  backgroundColor: '#DFE7FA',
};

export const Default = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion {...args}>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </Accordion>
    </div>
  );
};

export const BoldTitle = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion boldTitle {...args}>
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
      </Accordion>
    </div>
  );
};