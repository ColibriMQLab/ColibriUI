/**
 * A test id a consumer gives a component; the component puts it on its own
 * root element. Fields put it on the native control. Components set no test
 * id of their own. A component without a root of its own takes
 * `PopupTestIdProps` instead.
 */
export type TestIdProps = {
  "data-testid"?: string;
};

/**
 * A test id of a popup (`Dropdown`, `Tooltip`): it names the floating panel,
 * which is in the DOM only while open. The trigger is the consumer's own
 * element and keeps its own `data-testid`; the component never writes one on
 * it.
 */
export type PopupTestIdProps = {
  "data-testid"?: string;
};
