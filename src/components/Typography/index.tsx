import { Children, useMemo } from "react";
import { BaseTypography } from "./styles";
import { type TypographyProps } from "./index.props";
import type { FC, PropsWithChildren } from "react";

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag: Element = "span",
  children,
  variant,
  size,
  fontWeight,
  className,
}) => {
  const isNotComponent = typeof children === "string";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const child: any = useMemo(
    () =>
      Children.only(isNotComponent ? <Element>{children}</Element> : children),
    [children, Element, isNotComponent],
  );

  const Component = useMemo(
    () => BaseTypography.withComponent(child.type),
    [child.type],
  );

  return (
    <Component
      {...child.props}
      ref={child.ref}
      size={size}
      variant={variant}
      fontWeight={fontWeight}
      className={className}
    />
  );
};

export default Typography;
