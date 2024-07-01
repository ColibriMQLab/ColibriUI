export const BasePlaceholder = styled.span`
  user-select: none;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 100%;
  display: block;

  ${({ theme }) => css(theme.input.placeholder)};
`;
