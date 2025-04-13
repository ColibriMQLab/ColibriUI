import type { SelectedItem } from "../index.props";

export const toKey = ({ group, option }: SelectedItem): string =>
  `group-${group}-option-${option}`;

export const fromKey = (key: string): SelectedItem => {
  const [group, option] = key.replace(/^group-/, "").split("-option-");
  return { group, option };
};
