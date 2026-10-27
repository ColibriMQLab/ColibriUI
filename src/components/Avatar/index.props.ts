import type { AvatarSize } from "./constants";
import type { TestIdProps } from "../helpers/testId";

export enum AccountType {
  Person = "person",
  Organization = "org",
}

export type AvatarProps = TestIdProps & {
  accountType?: AccountType;
  alt?: string;
  size?: AvatarSize;
  src?: string;
  bordered?: boolean;
  className?: string;
  onClick?: () => void;
  initials?: string;
  ref?: React.Ref<HTMLImageElement>;
  loading?: boolean;
  ariaLabel?: string;
};
