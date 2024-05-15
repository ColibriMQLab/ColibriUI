import { Children, useMemo } from "react";
import { BaseTypography } from "./styles";
import { VARIANT, type TypographyProps } from "./index.props";
import type { FC, PropsWithChildren } from "react";

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  tag: Element = "span",
  children,
  variant = VARIANT.PRIMARY,
  size,
  fontWeight,
  className,
  nowrap = false,
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
      nowrap={nowrap}
      className={className}
    />
  );
};

export default Typography;
