import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

global.requestAnimationFrame = (callback: FrameRequestCallback): number =>
  setTimeout(callback, 0);
