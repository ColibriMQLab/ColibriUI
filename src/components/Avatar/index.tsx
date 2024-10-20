import React, { FC, memo } from 'react';

import { AvatarSizes } from './constants';
import maleCircleUrl from './assets/male-circle.svg';
import orgCircleUrl from './assets/org-circle.svg';
import styles from './Avatar.module.scss';
import classNames from 'classnames/bind';
import { AccountType, AvatarProps } from './index.props';
import Image from '../Image';

const clx = classNames.bind(styles);

const Avatar: FC<AvatarProps> = memo(props => {
  const {
    avatarURL,
    size = AvatarSizes.M,
    className,
    bordered,
    title = '',
    accountType = AccountType.Organization,
  } = props;
  const isOrg = accountType === AccountType.Organization;
  const stubImageURL = isOrg ? orgCircleUrl : maleCircleUrl;

  return (
    <Image
      alt={title}
      src={(avatarURL || stubImageURL) as string}
      width={size}
      height={size}
      className={clx(styles.avatar, { 
        'avatar_bordered': !!bordered
        }, [className])}
    />
  );
});

export default Avatar;
