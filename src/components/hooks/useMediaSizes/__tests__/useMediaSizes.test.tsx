import React from "react";
import { act, render, screen } from "@testing-library/react";
import { useMediaSizes } from "..";

type Listener = () => void;

const createMatchMedia = (initialMatches: boolean) => {
  const listeners = new Set<Listener>();
  const queryList = {
    matches: initialMatches,
    addEventListener: jest.fn((_: string, listener: Listener) => {
      listeners.add(listener);
    }),
    removeEventListener: jest.fn((_: string, listener: Listener) => {
      listeners.delete(listener);
    }),
  };
  const matchMedia = jest.fn(() => queryList);

  const setMatches = (matches: boolean) => {
    queryList.matches = matches;
    listeners.forEach((listener) => listener());
  };

  return { matchMedia, queryList, setMatches };
};

const Probe = ({ query }: { query: Parameters<typeof useMediaSizes>[0] }) => (
  <span data-testid="value">{String(useMediaSizes(query))}</span>
);

describe("useMediaSizes", () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  const stub = (initialMatches: boolean) => {
    const mock = createMatchMedia(initialMatches);
    window.matchMedia = mock.matchMedia as unknown as typeof window.matchMedia;
    return mock;
  };

  it("returns the current match", () => {
    const { matchMedia } = stub(true);

    render(<Probe query={(bp) => bp.up("lg")} />);

    expect(screen.getByTestId("value")).toHaveTextContent("true");
    expect(matchMedia).toHaveBeenCalledWith("(width >= 64rem)");
  });

  it("strips a leading @media from a string query", () => {
    const { matchMedia } = stub(false);

    render(<Probe query="@media (width < 48rem)" />);

    expect(matchMedia).toHaveBeenCalledWith("(width < 48rem)");
  });

  it("updates when the media query list fires change", () => {
    const { setMatches } = stub(false);

    render(<Probe query={(bp) => bp.up("md")} />);
    expect(screen.getByTestId("value")).toHaveTextContent("false");

    act(() => setMatches(true));
    expect(screen.getByTestId("value")).toHaveTextContent("true");
  });

  it("subscribes once across re-renders and unsubscribes on unmount", () => {
    const { queryList } = stub(false);

    const { rerender, unmount } = render(
      <Probe query={(bp) => bp.up("md")} />,
    );
    rerender(<Probe query={(bp) => bp.up("md")} />);
    rerender(<Probe query={(bp) => bp.up("md")} />);

    expect(queryList.addEventListener).toHaveBeenCalledTimes(1);
    expect(queryList.removeEventListener).not.toHaveBeenCalled();

    unmount();
    expect(queryList.removeEventListener).toHaveBeenCalledTimes(1);
  });
});
