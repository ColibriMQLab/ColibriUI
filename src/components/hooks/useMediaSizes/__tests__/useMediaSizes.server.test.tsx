/**
 * @jest-environment node
 */
import React from "react";
import { renderToString } from "react-dom/server";
import { useMediaSizes } from "..";

const Probe = () => <span>{String(useMediaSizes((bp) => bp.up("md")))}</span>;

describe("useMediaSizes on the server", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "window");
  });

  it("renders markup built with false, even when the query matches", () => {
    Object.assign(globalThis, {
      window: {
        matchMedia: () => ({
          matches: true,
          addEventListener: () => {},
          removeEventListener: () => {},
        }),
      },
    });

    expect(renderToString(<Probe />)).toBe("<span>false</span>");
  });
});
