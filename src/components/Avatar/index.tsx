import React, { memo } from "react";
import clsx from "clsx";
import { AvatarSize } from "./constants";
import userCircleUrl from "./assets/user-circle.svg";
import orgCircleUrl from "./assets/org-circle.svg";
import styles from "./Avatar.module.scss";
import { AccountType } from "./index.props";
import type { AvatarProps } from "./index.props";
import type { FC } from "react";

const getStubImage = (type: AccountType) =>
  type === AccountType.Organization ? orgCircleUrl : userCircleUrl;

const SIZE_CLASSES = {
  [AvatarSize.S]: styles["size-s"],
  [AvatarSize.M]: styles["size-m"],
  [AvatarSize.L]: styles["size-l"],
  [AvatarSize.XL]: styles["size-xl"],
  [AvatarSize.XXL]: styles["size-xxl"],
  [AvatarSize.XXXL]: styles["size-xxxl"],
};

const TEXT_CLASSES = {
  [AvatarSize.S]: styles["text-s"],
  [AvatarSize.M]: styles["text-m"],
  [AvatarSize.L]: styles["text-l"],
  [AvatarSize.XL]: styles["text-xl"],
  [AvatarSize.XXL]: styles["text-xxl"],
  [AvatarSize.XXXL]: styles["text-xxxl"],
};

const Avatar: FC<AvatarProps> = memo((props) => {
  const {
    src,
    size = AvatarSize.M,
    className,
    bordered,
    alt = "Profile avatar",
    accountType = AccountType.Organization,
    onClick,
    initials,
    loading,
    ariaLabel,
    ref,
    ...rest
  } = props;

  const stubSrc = getStubImage(accountType);

  // Приоритет: переданное изображение (src) > инициалы > дефолтное изображение
  const hasInitials = initials && initials.trim().length > 0;
  const hasCustomImage = Boolean(src);

  // Показываем изображение если есть src ИЛИ (нет инициалов И есть дефолтное изображение)
  const shouldShowImage = hasCustomImage || (!hasInitials && stubSrc);
  const finalSrc = src || stubSrc;

  return shouldShowImage ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={clsx(styles["avatar-wrapper"], {
        [styles["avatar-loader"]]: Boolean(loading),
      })}
      onClick={onClick}
      role="button"
      aria-label={ariaLabel || "Avatar"}
    >
      <img
        ref={ref}
        data-testid="avatar"
        alt={alt}
        src={finalSrc as string}
        className={clsx(
          styles.avatar,
          { [styles["avatar-bordered"]]: Boolean(bordered) },
          SIZE_CLASSES[size],
          className,
        )}
        {...rest}
      />
    </div>
  ) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <span
      ref={ref}
      data-testid="avatar"
      role="button"
      aria-label={ariaLabel || "Avatar"}
      onClick={onClick}
      className={clsx(
        styles["avatar-initials"],
        {
          [styles["avatar-bordered"]]: Boolean(bordered),
          [styles["avatar-loader"]]: Boolean(loading),
        },
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      <span className={clsx(styles["initials-text"], TEXT_CLASSES[size])}>
        {initials?.trim().slice(0, 2) || ""}
      </span>
    </span>
  );
});

export default Avatar;
