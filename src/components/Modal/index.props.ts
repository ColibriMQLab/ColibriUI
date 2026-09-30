import type { HTMLAttributes } from "react";

export type ModalProps = {
  className?: string;
  onClose?: () => void;
  /**
   * Legacy shorthand. Used only when children do not contain
   * `Modal.Header`, `Modal.Body` or `Modal.Footer`.
   */
  title?: string;
  /**
   * Renders the modal inside the parent modal window: the overlay covers
   * only the parent, not the whole viewport. Works when the modal is
   * rendered inside another `Modal`.
   */
  withinParent?: boolean;
};

export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Places the header above the body instead of before it.
   * The header becomes transparent and the body takes the whole modal.
   */
  overlay?: boolean;
  closeAriaLabel?: string;
}

export type ModalTitleProps = HTMLAttributes<HTMLDivElement>;

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Removes the body padding so content goes edge to edge. */
  bleed?: boolean;
}

export type ModalFooterProps = HTMLAttributes<HTMLDivElement>;
