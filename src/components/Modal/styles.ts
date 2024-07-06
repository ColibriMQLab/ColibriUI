import styled from "@emotion/styled";

export const Root = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.BG_2};
`;

export const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

export const ModalWrapper = styled.div`
  overflow: hidden;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.palette.WHITE};

  ${({ theme }) => theme.breakpoints.under("lg")} {
    height: 100%;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    max-height: calc(100vh - 100px);
    max-width: calc(100vw - 100px);
    min-width: 515px;

    border: solid 1px ${({ theme }) => theme.palette.BG_2};
    border-radius: 8px;
  }
`;
