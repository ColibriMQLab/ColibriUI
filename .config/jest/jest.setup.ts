import "@testing-library/jest-dom";

global.requestAnimationFrame = (callback: FrameRequestCallback): number =>
  setTimeout(callback, 0);
