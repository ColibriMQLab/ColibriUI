import { forwardRef } from "react";
import {
  BaseContainer,
  BaseInput,
  BaseSwitch,
  BaseSwitchContainer,
} from "./styles";
import type { SwitchProps } from "./index.props";

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  return (
    <BaseContainer disabled={!!props.disabled}>
      <BaseInput ref={ref} type="checkbox" {...props} />
      <BaseSwitchContainer>
        <BaseSwitch />
      </BaseSwitchContainer>
    </BaseContainer>
  );
});

export default Switch;
