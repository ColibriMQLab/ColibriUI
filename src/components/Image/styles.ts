import styled from "@emotion/styled";

export const BasePicture = styled.picture`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;

    visibility: visible;

    font: 0/0 a;

    border: 0;

    object-fit: cover;
    text-indent: -100rem;

    :-moz-broken {
      opacity: 0;
    }
  }
`;
