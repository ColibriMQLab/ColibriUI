import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70px;
`;

export const Dot = styled.div<{
  first?: boolean;
  second?: boolean;
  third?: boolean;
  fourth?: boolean;
  color?: string;
}>`
  @keyframes pending {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-name: pending;
  background-color: #000;
  border-radius: 5px;
  height: 10px;
  transform: scale(0);
  width: 10px;

  ${({ color }) => css`
    ${color &&
    css`
      background-color: ${color};
    `}
  `}

  ${({ first }) => first && `animation-delay: 0s;`};

  ${({ second }) => second && `animation-delay: 0.2s;`};

  ${({ third }) => third && `animation-delay: 0.4s;`};

  ${({ fourth }) => fourth && `animation-delay: 0.6s;`};
`;
