import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";

import { Editable } from "..";

const Controlled = ({ initial }: { initial: string }) => {
  const [value, setValue] = useState(initial);
  return (
    <Editable value={value} onChange={(_, next) => setValue(next)} />
  );
};

const getEditor = () => screen.getByRole("textbox");

const setCaret = (editor: HTMLElement, offset: number) => {
  const textNode = editor.firstChild as Text;
  window.getSelection()?.collapse(textNode, offset);
};

const typeCharacter = (editor: HTMLElement, character: string) => {
  const selection = window.getSelection() as Selection;
  const textNode = selection.focusNode as Text;
  const offset = selection.focusOffset;
  textNode.insertData(offset, character);
  selection.collapse(textNode, offset + 1);
  fireEvent.input(editor);
};

const caretOffset = () => window.getSelection()?.focusOffset;
const selectedText = () => window.getSelection()?.toString();

describe("Editable", () => {
  it("keeps the caret after the typed character", () => {
    render(<Controlled initial="5" />);
    const editor = getEditor();

    act(() => editor.focus());
    setCaret(editor, 1);
    typeCharacter(editor, "2");
    typeCharacter(editor, "3");

    expect(editor).toHaveTextContent("523");
    expect(caretOffset()).toBe(3);
  });

  it("selects the whole value on keyboard focus", () => {
    render(<Controlled initial="Document" />);

    act(() => getEditor().focus());

    expect(selectedText()).toBe("Document");
  });

  it("does not select the value on mouse focus", () => {
    render(<Controlled initial="Document" />);
    const editor = getEditor();

    fireEvent.mouseDown(editor);
    act(() => editor.focus());

    expect(selectedText()).toBe("");
  });

  it("selects the value on keyboard focus after an earlier mouse focus", () => {
    render(<Controlled initial="Document" />);
    const editor = getEditor();

    fireEvent.mouseDown(editor);
    act(() => editor.focus());
    act(() => editor.blur());
    act(() => editor.focus());

    expect(selectedText()).toBe("Document");
  });

  it("places the caret at the end when the edit button is clicked", () => {
    render(<Controlled initial="5" />);

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));

    expect(getEditor()).toHaveFocus();
    expect(selectedText()).toBe("");
    expect(window.getSelection()?.getRangeAt(0).endOffset).toBe(1);
  });

  it("applies an external value without moving focus", () => {
    const { rerender } = render(<Editable value="one" />);

    rerender(<Editable value="two" />);

    expect(getEditor()).toHaveTextContent("two");
    expect(getEditor()).not.toHaveFocus();
  });

  it("keeps an updated value when textComponent changes", () => {
    const { rerender } = render(<Editable value="one" name="field" />);

    rerender(<Editable value="two" name="field" />);
    rerender(<Editable value="two" name="field" textComponent="h2" />);

    expect(getEditor().tagName).toBe("H2");
    expect(getEditor()).toHaveTextContent("two");
  });

  it("keeps typed text without value when textComponent changes", () => {
    const { rerender } = render(<Editable name="field" />);
    const editor = getEditor();

    editor.textContent = "typed";
    fireEvent.input(editor);
    rerender(<Editable name="field" textComponent="h2" />);

    expect(getEditor().tagName).toBe("H2");
    expect(getEditor()).toHaveTextContent("typed");
  });

  it("does not lose earlier text when typing after textComponent changes", () => {
    const Switchable = ({ tag }: { tag: "span" | "h2" }) => {
      const [value, setValue] = useState("one");
      return (
        <Editable
          value={value}
          textComponent={tag}
          onChange={(_, next) => setValue(next)}
        />
      );
    };
    const { rerender } = render(<Switchable tag="span" />);

    act(() => getEditor().focus());
    setCaret(getEditor(), 3);
    typeCharacter(getEditor(), "Q");
    rerender(<Switchable tag="h2" />);

    act(() => getEditor().focus());
    setCaret(getEditor(), 4);
    typeCharacter(getEditor(), "y");

    expect(getEditor()).toHaveTextContent("oneQy");
    expect(caretOffset()).toBe(5);
  });

  it("moves the caret to the end when the parent rewrites the typed value", () => {
    const Uppercase = () => {
      const [value, setValue] = useState("doc");
      return (
        <Editable
          value={value}
          onChange={(_, next) => setValue(next.toUpperCase())}
        />
      );
    };
    render(<Uppercase />);
    const editor = getEditor();

    act(() => editor.focus());
    setCaret(editor, 3);
    typeCharacter(editor, "x");

    expect(editor).toHaveTextContent("DOCX");
    expect(window.getSelection()?.getRangeAt(0).endOffset).toBe(1);
    expect(selectedText()).toBe("");
  });
});
