import debounce from "lodash/debounce";
import * as React from "react";
import classNames from "classnames/bind";
import styles from "./index.module.scss";

const clx = classNames.bind(styles);

export type Props = {
  // Css selector for slidter items
  itemsCssSelector?: string;
  // Count of items to scroll on control button click
  itemsCountToSlide?: number;
  // Function to render left control button
  renderLeftButton(): React.ReactNode;
  // Function to render right control button
  renderRightButton(): React.ReactNode;
  // onScroll callback
  onScroll?: (scrollValue: number) => void;
  // initial scrollLeft
  initialScrollLeft?: number;
};

type State = {
  scrollLeft: number;
  scrollMaxLeft: number;
  scrollViewport: number;
  isScrollable: boolean;
  wasLoaded: boolean;
};

export class HorizontalSliderWithControls extends React.PureComponent<
  Props,
  State
> {
  $slider = React.createRef<HTMLDivElement>();
  $content = React.createRef<HTMLDivElement>();

  mutationObserver: MutationObserver;
  debouncedCheckIfScrollable: MutationCallback;

  constructor(props: Props) {
    super(props);
    this.state = {
      scrollLeft: 0,
      scrollMaxLeft: 100,
      scrollViewport: 100,
      isScrollable: false,
      wasLoaded: false,
    };

    this.debouncedCheckIfScrollable = debounce(this.checkIfScrollable, 300);
  }

  render() {
    const { isScrollable, scrollLeft, scrollMaxLeft, wasLoaded } = this.state;
    const { renderLeftButton, renderRightButton, children } = this.props;

    return (
      <div
        className={clx(styles.wrapper)}
        data-component="HorizontalSliderWithControls"
      >
        <div className={clx(styles.slider)} ref={this.$slider}>
          <div
            className={clx(styles["content-wrapper"])}
            style={{
              transform: `translateX(${isScrollable ? -1 * scrollLeft : 0 || 0}px`,
            }}
            ref={this.$content}
          >
            {children}
          </div>
        </div>
        {!wasLoaded && <div className={clx(styles.shadow)} />}
        {isScrollable && (
          <>
            {scrollLeft > 5 && (
              <span onClick={this.scrollLeft}>{renderLeftButton()}</span>
            )}
            {scrollMaxLeft - scrollLeft > 5 && (
              <span onClick={this.scrollRight}>{renderRightButton()}</span>
            )}
          </>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.checkIfScrollable();
    this.toggleGlobalEventListeners(true);
    this.didLoad();
    this.setInitialScrollLeft();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.initialScrollLeft !== this.props.initialScrollLeft) {
      this.setInitialScrollLeft();
    }
  }

  setInitialScrollLeft() {
    const { initialScrollLeft } = this.props;

    if (this.state.isScrollable && initialScrollLeft !== undefined) {
      this.setState({
        scrollLeft: initialScrollLeft,
      });
    }
  }

  componentWillUnmount() {
    this.toggleGlobalEventListeners(false);
  }

  toggleGlobalEventListeners(flag: boolean) {
    const $content = this.$content.current;

    window[`${flag ? "add" : "remove"}EventListener`](
      "resize",
      this.debouncedCheckIfScrollable,
    );

    if ($content) {
      if (flag && typeof MutationObserver !== "undefined") {
        this.mutationObserver = new MutationObserver(
          this.debouncedCheckIfScrollable,
        );
        this.mutationObserver.observe($content, {
          subtree: true,
          childList: true,
          attributes: true,
        });
      }

      if (!flag && this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
    }
  }

  didLoad = () => {
    this.setState({
      wasLoaded: true,
    });
  };

  checkIfScrollable = () => {
    const $slider = this.$slider.current;
    const $content = this.$content.current;

    if ($slider && $content) {
      const scrollViewport = $slider.offsetWidth;
      const scrollMaxLeft = $content.offsetWidth - scrollViewport;

      this.setState({
        scrollMaxLeft,
        scrollViewport,
        isScrollable: scrollMaxLeft > 0,
      });
    }
  };

  scrollLeft = () => {
    const $slider = this.$slider.current;
    const { scrollLeft, scrollViewport } = this.state;
    const { onScroll } = this.props;
    let nextScrollLeftValue;

    if (!$slider || scrollLeft <= 0) {
      return;
    }

    const [target] = this.getItemsRects()
      .filter((rect) => rect.left < scrollLeft)
      .slice(-1 * this.getitemsCountToSlide());

    if (target) {
      nextScrollLeftValue = target.left;
    } else {
      const nextScrollLeft = scrollLeft - scrollViewport * 0.3;

      nextScrollLeftValue = nextScrollLeft >= 0 ? nextScrollLeft : 0;
    }

    this.setState({
      scrollLeft: nextScrollLeftValue,
    });

    if (onScroll) {
      onScroll(nextScrollLeftValue);
    }
  };

  scrollRight = () => {
    const $slider = this.$slider.current;
    const { scrollLeft, scrollMaxLeft, scrollViewport } = this.state;
    const { onScroll } = this.props;
    let nextScrollLeftValue;

    if (!$slider || scrollLeft >= scrollMaxLeft) {
      return;
    }

    const items = this.getItemsRects()
      .filter((rect) => rect.left + rect.width > scrollLeft + scrollViewport)
      .slice(0, this.getitemsCountToSlide());
    const last = items[items.length - 1];

    if (last) {
      nextScrollLeftValue = last.left + last.width - scrollViewport;
    } else {
      const nextScrollLeft = scrollLeft + scrollViewport * 0.3;

      nextScrollLeftValue =
        nextScrollLeft <= scrollMaxLeft ? nextScrollLeft : scrollMaxLeft;
    }

    this.setState({
      scrollLeft: nextScrollLeftValue,
    });

    if (onScroll) {
      onScroll(nextScrollLeftValue);
    }
  };

  getItemsRects() {
    return this.getItems().map(($el) => {
      return {
        left: $el.offsetLeft,
        width: $el.offsetWidth,
      };
    });
  }

  getItems() {
    const { itemsCssSelector } = this.props;
    const $slider = this.$slider.current;

    if (!itemsCssSelector || !$slider) {
      return [] as HTMLElement[];
    }

    const items = $slider.querySelectorAll<HTMLElement>(itemsCssSelector);

    return items ? [...items] : ([] as HTMLElement[]);
  }

  getitemsCountToSlide() {
    return this.props.itemsCountToSlide || 2;
  }
}
