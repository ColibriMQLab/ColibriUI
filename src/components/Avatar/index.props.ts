import type { CSSProperties } from "react";
import type { AvatarSizes } from "./constants";

export enum AccountType {
  Person = "person",
  Organization = "org",
}

export type AvatarProps = {
  accountType?: AccountType;
  style?: CSSProperties;
  alt?: string;
  size?: AvatarSizes | number;
  avatarURL?: string;
  bordered?: boolean;
  className?: string;
};
