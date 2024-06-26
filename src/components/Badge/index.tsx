import { BadgeControl as Control } from "./Control";
import { Root } from "./styles";
import type { FC } from "react";
import type { BadgeProps } from "./index.props";

const Badge: FC<BadgeProps> = ({
  className,
  content,
  children,
  invisible: invisibleProp,
  max = 99,
  showZero = false,
  color,
  direction = "right",
  background,
  ...props
}) => {
  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((content === 0 && !showZero) || content == null)
  ) {
    invisible = true;
  }

  let displayValue;

  if (content) {
    displayValue = content > max ? `${max}+` : content;
  }

  return (
    <Control {...props}>
      {children}
      <Root
        style={{
          color,
          backgroundColor: background,
        }}
        direction={direction}
        invisible={invisible}
        className={className}
        data-cy="badge"
      >
        {displayValue}
      </Root>
    </Control>
  );
};

export default Badge;
