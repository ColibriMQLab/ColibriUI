import React from "react";
import { SkeletonRect, SkeletonText } from ".";
import type { Meta } from "@storybook/react";

const meta: Meta<typeof SkeletonRect> = {
  title: "UI/Skeleton",
  parameters: {
    layout: "centered",
  },
  component: SkeletonRect,
} satisfies Meta<typeof SkeletonRect>;

export default meta;

export const Rect = () => {
  const style = `
        .my-rect-skeleton {
            --skeleton-color: rgba(0, 0, 0, .05);
            --skeleton-animation: skeleton-loading 1.5s ease-in-out infinite;
        }
    `;

  return (
    <>
      <style>{style}</style>
      <SkeletonRect width={128} height={32} borderRadius={6} />
    </>
  );
};

export const Text = () => {
  const style = `
        .my-text-skeleton {
            --skeleton-color: rgba(0, 0, 0, .05);
            --skeleton-animation: skeleton-loading 1.5s ease-in-out infinite;
        }
    `;

  return (
    <>
      <style>{style}</style>
      <SkeletonText width={128} size={16} />
    </>
  );
};
