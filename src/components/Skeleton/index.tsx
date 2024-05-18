import { FC } from 'react';
import { RectProps, TextProps } from './index.props';
import { StyledRect, StyledText } from './styles';

export const SkeletonRect: FC<RectProps> = ({ className, width, height, borderRadius }) => {
    return (
        <StyledRect
            className={className}
            style={{ width, height, borderRadius }}
        />
    );
};

export const SkeletonText: FC<TextProps> = ({ className, width, size }) => {
    return (
        <StyledText
            className={className}
            style={{ width, height: size }}
        />
    );
};
