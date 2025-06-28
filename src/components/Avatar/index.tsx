import React, { memo } from "react";
import classNames from "classnames/bind";
import { AvatarSize } from "./constants";
import userCircleUrl from "./assets/user-circle.svg";
import orgCircleUrl from "./assets/org-circle.svg";
import styles from "./Avatar.module.scss";
import { AccountType } from "./index.props";
import type { AvatarProps } from "./index.props";
import type { FC } from "react";

const clx = classNames.bind(styles);

const getStubImage = (type: AccountType) =>
  type === AccountType.Organization ? orgCircleUrl : userCircleUrl;

const SIZE_CLASSES = {
  [AvatarSize.S]: styles.sizeS,
  [AvatarSize.M]: styles.sizeM,
  [AvatarSize.L]: styles.sizeL,
  [AvatarSize.XL]: styles.sizeXL,
  [AvatarSize.XXL]: styles.sizeXXL,
  [AvatarSize.XXXL]: styles.sizeXXXL,
};

const TEXT_CLASSES = {
  [AvatarSize.S]: styles.textS,
  [AvatarSize.M]: styles.textM,
  [AvatarSize.L]: styles.textL,
  [AvatarSize.XL]: styles.textXL,
  [AvatarSize.XXL]: styles.textXXL,
  [AvatarSize.XXXL]: styles.textXXXL,
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
  const finalSrc = src || stubSrc;

  // Изображение показываем, если есть src ИЛИ есть дефолтное изображение
  const shouldShowImage = !!finalSrc && !initials;

  return shouldShowImage ? (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={clx(styles.avatarWrapper, { avatarLoader: !!loading })}
      onClick={onClick}
      role="button"
      aria-label={ariaLabel || "Avatar"}
    >
      <img
        ref={ref}
        data-testid="avatar"
        alt={alt}
        src={finalSrc as string}
        className={clx(
          styles.avatar,
          { avatarBordered: !!bordered },
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
      className={clx(
        styles.avatarInitials,
        { avatarBordered: !!bordered, loading: !!loading },
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      <span className={clx(styles.initialsText, TEXT_CLASSES[size])}>
        {initials?.trim().slice(0, 2) || ""}
      </span>
    </span>
  );
});

export default Avatar;
