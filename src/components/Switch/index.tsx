import { forwardRef } from "react";
import type { SwitchProps } from "./index.props";
import {
  BaseContainer,
  BaseInput,
  BaseSwitch,
  BaseSwitchContainer,
} from "./styles";

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
