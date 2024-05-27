import styled from "@emotion/styled";

export const MenuList = styled.ul`
  margin: 0;
  text-align: left;
  padding: 0;
  user-select: none;
  color: ${({ theme }) => theme.palette.BLACK};
  background: ${({ theme }) => theme.palette.WHITE};
`;
