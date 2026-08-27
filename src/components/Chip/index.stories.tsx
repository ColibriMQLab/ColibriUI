import React, { useCallback, useState } from "react";
import { Chip } from ".";
import { fn } from "storybook/test";
import generateUniqID from "../helpers/generateUniqID";
import type { Meta } from "@storybook/react-webpack5";
import { CrossFill } from "../Icons/CrossFill";
import type { ChipProps } from "./index.props";

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
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "outline",
        "pseudo",
        "alert",
        "success",
        "clear",
      ],
    },
    isActive: {
      control: "boolean",
    },
    testID: {
      control: "text",
    },
    iconEnd: {
      table: { disable: true },
    },
    onClick: {
      action: "click",
    },
    onClickIcon: {
      action: "clickIcon",
    },
  },
  args: {
    size: "m",
    variant: "primary",
    isActive: false,
    onClick: fn(),
    onClickIcon: fn(),
  },
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

const variants = [
  "primary",
  "secondary",
  "outline",
  "pseudo",
  "alert",
  "success",
  "clear",
] as const;

const sizes = ["s", "m", "l"] as const;

const menuItems = [
  {
    href: "#",
    text: "Best sellers",
    isActive: false,
  },
  {
    href: "#",
    text: "Fiction",
    isActive: false,
  },
  {
    href: "#",
    text: "Education",
    isActive: false,
  },
];

export const Default = (args: ChipProps) => {
  const [items, setItems] = useState(menuItems);

  const handleClick = useCallback((index: number) => {
    setItems((prevState) =>
      prevState.map((item, itemIndex) =>
        itemIndex === index ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  }, []);

  return (
    <div>
      {items.map((item, index) => (
        <React.Fragment key={generateUniqID(index)}>
          <Chip
            {...args}
            isActive={item.isActive}
            onClick={() => handleClick(index)}
          >
            {item.text}
          </Chip>{" "}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Sizes = (args: ChipProps) => {
  const [activeSizes, setActiveSizes] = useState<Record<string, boolean>>({});

  const handleClick = useCallback((size: (typeof sizes)[number]) => {
    setActiveSizes((prevState) => ({
      ...prevState,
      [size]: !prevState[size],
    }));
  }, []);

  return (
    <>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <Chip
            {...args}
            isActive={Boolean(activeSizes[size])}
            size={size}
            onClick={() => handleClick(size)}
          >
            Chip {size}
          </Chip>{" "}
        </React.Fragment>
      ))}
    </>
  );
};

export const Variants = (args: ChipProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
      {variants.map((variant) => (
        <Chip key={variant} {...args} variant={variant} isActive>
          {variant}
        </Chip>
      ))}
    </div>
  );
};

export const Deletable = (args: ChipProps) => {
  return (
    <>
      <Chip {...args} size="s" iconEnd={<CrossFill />}>
        Chip 1
      </Chip>{" "}
      <Chip {...args} size="s" iconEnd={<CrossFill />}>
        Chip 2
      </Chip>{" "}
      <Chip {...args} size="s" iconEnd={<CrossFill />}>
        Long long chip 3
      </Chip>
    </>
  );
};

export const DeletableVariants = (args: ChipProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
      {variants.map((variant) => (
        <Chip
          key={variant}
          {...args}
          size="s"
          variant={variant}
          iconEnd={<CrossFill />}
        >
          {variant}
        </Chip>
      ))}
    </div>
  );
};
