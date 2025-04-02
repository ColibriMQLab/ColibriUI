import type { AvatarSize } from "./constants";

export enum AccountType {
  Person = "person",
  Organization = "org",
}

export type AvatarProps = {
  accountType?: AccountType;
  alt?: string;
  size?: AvatarSize;
  src?: string;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
  initials?: string;
  ref?: React.Ref<HTMLImageElement>;
  loader?: boolean;
  ariaLabel?: string;
};
