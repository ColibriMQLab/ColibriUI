import styled from "@emotion/styled";

export const Item = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${({ fullWidth }) => fullWidth && "1 / -1"};
`;
