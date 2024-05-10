import React from "react";
import { css, Global } from "@emotion/react";

export default (
  <Global
    styles={css`
      html {
        margin: 0;
        padding: 0;
      }

      ul,
      ol {
        list-style: none;
      }

      input,
      label,
      textarea,
      select,
      button {
        background: none;
      }

      a {
        color: inherit;
      }

      * {
        box-sizing: border-box;
        border: none;
        outline: none;
        text-decoration: none;
        margin: 0;
        padding: 0;
      }

      input,
      textarea,
      select,
      button,
      body {
        margin: 0;
        padding: 0;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        color: inherit;
      }
    `}
  />
);
