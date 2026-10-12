import React from "react";
import { Accordion } from ".";
import { Meta } from "@storybook/react-webpack5";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  parameters: {},
  argTypes: {
    title: {
      control: "text",
    },
    boldTitle: {
      control: { type: "boolean" },
      options: [true, false],
    },
    tabIndex: {
      control: "number",
    },
    defaultOpen: {
      control: { type: "boolean" },
    },
    className: {
      table: { disable: true },
    },
  },
  args: {
    title: "Accordion title",
    boldTitle: false,
    defaultOpen: false,
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

const wrapperStyles = {
  backgroundColor: "var(--color-bg-surface-subtle)",
  height: "25rem",
  width: "37.5rem",
};

export const Default = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion {...args}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </Accordion>
    </div>
  );
};

export const BoldTitle = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion {...args} boldTitle>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </Accordion>
    </div>
  );
};

export const DefaultOpen = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion {...args} defaultOpen>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>
      </Accordion>
    </div>
  );
};

const LazyContent = (): React.ReactElement => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoaded
        ? "Content loaded after opening. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        : "Loading..."}
    </div>
  );
};

export const DefaultOpenWithLazyContent = (args): React.ReactElement => {
  return (
    <div style={wrapperStyles}>
      <Accordion {...args} defaultOpen>
        <LazyContent />
      </Accordion>
    </div>
  );
};
