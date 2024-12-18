import type { AvatarSizes } from "./constants";

export enum AccountType {
  Person = "person",
  Organization = "org",
}

export type AvatarProps = {
  accountType?: AccountType;
  title?: string;
  size?: AvatarSizes | number;
  avatarURL?: string;
  bordered?: boolean;
  className?: string;
};
