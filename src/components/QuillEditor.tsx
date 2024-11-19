import { createEffect, onMount } from "solid-js";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export const QuillEditor = (props: {
  value: string;
  onChange: (value: string) => void;
}) => {
  let editorContainer: HTMLDivElement | undefined;
  let quill: Quill;

  onMount(() => {
    quill = new Quill(editorContainer!, {
      theme: "snow",
    });

    quill.root.innerHTML = props.value;

    quill.on("text-change", () => {
      if (props.onChange) {
        props.onChange(quill.root.innerHTML);
      }
    });

    quill.root.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    quill.root.addEventListener("drop", (e) => {
      e.preventDefault();
      const text = e.dataTransfer?.getData("text/plain");
      if (text) {
        const cursorPosition = quill.getSelection()?.index || 0;
        quill.insertText(cursorPosition, text);
        quill.setSelection(cursorPosition + text.length);
      }
    });
  });

  createEffect(() => {
    if (quill && props.value !== quill.root.innerHTML) {
      quill.root.innerHTML = props.value;
    }
  });

  return <div ref={editorContainer}></div>;
};
