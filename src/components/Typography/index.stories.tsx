import Typography from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const typographySizes = [
  "xs",
  "s",
  "m",
  "l",
  "text-xs",
  "text-sm",
  "text-md",
  "text-lg",
  "heading-sm",
  "heading-md",
  "heading-lg",
  "heading-xl",
  "display-sm",
  "display-md",
  "display-lg",
  "display-xl",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const;

const typographyTags = [
  "span",
  "label",
  "legend",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "s",
] as const;

const typographyVariants = [
  "primary",
  "secondary",
  "tertiary",
  "disabled",
  "inverse",
  "alert",
  "success",
  "warning",
  "info",
] as const;

const typographyWeights = [
  "normal",
  "regular",
  "medium",
  "semibold",
  "bold",
] as const;

const productSizes = [
  "text-xs",
  "text-sm",
  "text-md",
  "text-lg",
  "heading-sm",
  "heading-md",
  "heading-lg",
  "heading-xl",
] as const;

const displaySizes = [
  "display-sm",
  "display-md",
  "display-lg",
  "display-xl",
] as const;

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: typographyVariants,
    },
    tag: {
      control: { type: "select" },
      options: typographyTags,
    },
    size: {
      control: { type: "select" },
      options: typographySizes,
    },
    fontWeight: {
      control: { type: "select" },
      options: typographyWeights,
    },
    className: { table: { disable: true } },
    style: { control: "object" },
  },
  args: {
    tag: "span",
    size: "m",
    fontWeight: "normal",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const Default: Story = {
  args: {
    children: TEXT,
  },
};

export const Secondary: Story = {
  args: {
    children: TEXT,
    variant: "secondary",
  },
};

export const Alert: Story = {
  args: {
    children: TEXT,
    variant: "alert",
  },
};

export const Success: Story = {
  args: {
    children: TEXT,
    variant: "success",
  },
};

export const CustomTag: Story = {
  args: {
    children: TEXT,
    tag: "h1",
  },
};

export const AllVariants: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "var(--space-8)",
        maxWidth: 960,
      }}
    >
      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <Typography size="heading-md">Product scale</Typography>

        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          {productSizes.map((size) => (
            <div
              key={size}
              style={{
                alignItems: "baseline",
                display: "grid",
                gap: "var(--space-4)",
                gridTemplateColumns: "7.5rem minmax(0, 1fr)",
              }}
            >
              <Typography size="text-sm" variant="secondary">
                {size}
              </Typography>
              <Typography size={size}>The quick brown fox jumps</Typography>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <Typography size="heading-md">Marketing display</Typography>

        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          {displaySizes.map((size) => (
            <div key={size} style={{ display: "grid", gap: "var(--space-1)" }}>
              <Typography size="text-sm" variant="secondary">
                {size}
              </Typography>
              <Typography size={size}>Buenos Aires</Typography>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <Typography size="heading-md">Weights</Typography>

        <div style={{ display: "grid", gap: "var(--space-3)" }}>
          {typographyWeights.map((fontWeight) => (
            <div
              key={fontWeight}
              style={{
                alignItems: "baseline",
                display: "grid",
                gap: "var(--space-4)",
                gridTemplateColumns: "7.5rem minmax(0, 1fr)",
              }}
            >
              <Typography size="text-sm" variant="secondary">
                {fontWeight}
              </Typography>
              <Typography fontWeight={fontWeight} size="text-md">
                The quick brown fox jumps
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "var(--space-4)" }}>
        <Typography size="heading-md">Semantic variants</Typography>

        <div
          style={{
            display: "grid",
            gap: "var(--space-3)",
            gridTemplateColumns: "repeat(auto-fit, minmax(11.25rem, 1fr))",
          }}
        >
          {typographyVariants.map((variant) => (
            <div
              key={variant}
              style={{
                background:
                  variant === "inverse" ? "var(--color-bg-inverse)" : "none",
                border:
                  "var(--border-width-hairline) solid var(--color-border-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "var(--space-4)",
              }}
            >
              <Typography fontWeight="medium" size="text-md" variant={variant}>
                {variant}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};
