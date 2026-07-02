import Image from ".";
import type { Meta, StoryObj } from "@storybook/react-webpack5";

const meta: Meta<typeof Image> = {
  title: "UI/Image",
  parameters: {},
  argTypes: {
    src: {
      control: "text",
    },
    fallbackSrc: {
      control: "text",
    },
    ariaLabel: {
      control: "text",
    },
    sources: {
      control: "object",
    },
    alt: {
      control: "text",
    },
    width: {
      control: "number",
    },
    height: {
      control: "number",
    },
    loading: {
      control: "select",
      options: ["eager", "lazy"],
    },
    srcSet: {
      control: "text",
    },
    sizes: {
      control: "text",
    },
    className: {
      table: { disable: true },
    },
    onClick: {
      action: "click",
    },
  },
  component: Image,
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof Image>;

const IMG =
  "https://images.unsplash.com/photo-1714329454117-b12e6729c1e1?q=80&w=1991&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1200&auto=format&fit=crop";

export const Default: Story = {
  args: {
    src: IMG,
    alt: "Mountain landscape",
    width: 400,
    height: 300,
    loading: "lazy",
    ariaLabel: "Landscape preview",
  },
};

export const WithFallback: Story = {
  args: {
    src: "https://example.invalid/missing-image.jpg",
    fallbackSrc: FALLBACK_IMG,
    alt: "Fallback landscape",
    width: 400,
    height: 300,
  },
};

export const WithSources: Story = {
  args: {
    src: IMG,
    alt: "Responsive landscape",
    width: 400,
    height: 300,
    sources: [
      {
        srcSet: `${IMG}&w=800 800w, ${IMG}&w=1200 1200w`,
        sizes: "(max-width: 600px) 100vw, 400px",
      },
    ],
  },
};
