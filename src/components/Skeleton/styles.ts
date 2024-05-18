import styled from "@emotion/styled";

export const StyledRect = styled.div`
  background-color: ${({ theme }) => theme.palette.BG_2};
  animation: skeleton-loading 1.5s ease-in-out infinite;

  @keyframes skeleton-loading {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const StyledText = styled.div`
  height: 12px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.BG_2};

  animation: skeleton-loading 1.5s ease-in-out infinite;

  @keyframes skeleton-loading {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0.4;
    }

    100% {
      opacity: 1;
    }
  }
`;
