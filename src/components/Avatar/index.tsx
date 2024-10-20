import React, { FC, memo } from 'react';

import { AvatarSizes } from './constants';

import styles from './Avatar.module.scss';
import classNames from 'classnames/bind';
import { AccountType, AvatarProps } from './index.props';
import Image from '../Image';

const clx = classNames.bind(styles);

const MaleCircle = require('./assets/male-circle.svg');
const OrgCircle = require('./assets/org-circle.svg');

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
  const StubImage = isOrg ? OrgCircle : MaleCircle;

  return (
    <Image
      alt={title}
      src={avatarURL || StubImage}
      width={size}
      height={size}
      className={clx(styles.avatar, { 
        'avatar_bordered': !!bordered
        }, [className])}
    />
  );
});

export default Avatar;
