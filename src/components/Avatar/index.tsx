import React, { memo } from "react";

import classNames from "classnames/bind";
import { AvatarSizes } from "./constants";
import userCircleUrl from "./assets/user-circle.svg";
import orgCircleUrl from "./assets/org-circle.svg";
import styles from "./Avatar.module.scss";
import { AccountType } from "./index.props";
import type { AvatarProps } from "./index.props";
import type { FC } from "react";

const clx = classNames.bind(styles);

const getStubImage = (type: AccountType) => 
  type === AccountType.Organization ? orgCircleUrl : userCircleUrl;

const Avatar: FC<AvatarProps> = memo((props) => {
  const {
    avatarURL,
    style,
    size = AvatarSizes.M,
    className,
    bordered,
    alt = "profile image",
    accountType = AccountType.Organization,
  } = props;
  const stubImageURL = getStubImage(accountType);

  return (
    <img
      alt={alt}
      src={(avatarURL || stubImageURL) as string}
      width={size}
      height={size}
      style={style}
      className={clx(
        styles.avatar,
        {
          avatar_bordered: !!bordered,
        },
        [className],
      )}
      {...props}
    />
  );
});

export default Avatar;
