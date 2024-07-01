export const BaseInput = styled.div`
  margin: 7px 0;
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  ::placeholder {
    ${({ theme }) => css(theme.input.placeholder)};
  }
`;

export const BasePlaceholder = styled.span`
  user-select: none;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 100%;
  display: block;

  ${({ theme }) => css(theme.input.placeholder)};
`;
