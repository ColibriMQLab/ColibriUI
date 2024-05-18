import styled from "@emotion/styled";

export const GridWrapper = styled.div`
  width: 100%;
`;

export const GridItems = styled.div`
  display: grid;

  row-gap: 24px;
  column-gap: 16px;

  grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
  grid-auto-flow: row dense;
`;
