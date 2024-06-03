import { Root } from "./styles";
import type { FC } from "react";

import type { ControlProps } from "./index.props";

export const BadgeControl: FC<ControlProps> = ({
  className,
  children,
  ...props
}) => (
  <Root className={className} {...props}>
    {children}
  </Root>
);
