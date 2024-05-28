import styled from "@emotion/styled";
import Chevron from "../Icons/Chevron";
import InputRoot from "../base/InputRoot";
import FormField from "../base/FormField";

export const MenuWrapper = styled.div<{ listHeight?: number }>`
  max-height: 140px;
  ${({ listHeight }) => listHeight && `max-height: ${listHeight}px;`};
  overflow-y: auto;
`;

export const SelectIcon = styled(Chevron, {
  shouldForwardProp: (prop) => !["isOpen"].includes(prop),
})<{ isOpen: boolean }>`
  ${({ isOpen }) => isOpen && `transform: rotate(180deg)`};
`;

export const StyledBaseInputRoot = styled(InputRoot)`
  cursor: pointer;
`;

export const StyledFormField = styled(FormField)<{ fullWidth?: boolean }>`
  ${({ fullWidth }) => fullWidth && `width: 100%`};
`;
