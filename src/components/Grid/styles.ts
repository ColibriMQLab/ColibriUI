import styled from "@emotion/styled";

export const GridWrapper = styled.div`
  width: 100%;
`;

export const GridItems = styled.div<{
  gridRowGap?: number;
  gridColumnGap?: number;
  gridItemMinWidth?: number;
}>`
  display: grid;

  row-gap: ${({ gridRowGap }) => gridRowGap}px;
  column-gap: ${({ gridColumnGap }) => gridColumnGap}px;

  grid-template-columns: repeat(auto-fit, minmax(${({ gridItemMinWidth }) => gridItemMinWidth}px, 1fr));
  grid-auto-flow: row dense;
`;
