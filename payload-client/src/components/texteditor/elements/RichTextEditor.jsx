import React, { forwardRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Toolbar } from "./Toolbar";
import { cx } from "@edux-design/utils";
import handleEditorAction from "../utils/handleEditorAction";

const RichTextEditor = forwardRef(
  ({ value, onChange, variant = "light" }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Image,
        Underline,
        TextAlign.configure({ types: ["heading", "paragraph"] }),
      ],
      content: value || "",
      onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    });

    const STYLES = cx(
      "editor-container border border-border-minimal bg-bg-base rounded-md"
    );

    useEffect(() => {
      console.log(editor.getHTML());
    }, [editor]);

    return (
      <div ref={ref} className={STYLES}>
        <Toolbar
          variant={variant}
          editor={editor}
          handleEditorAction={(action, state) =>
            handleEditorAction(editor, state, state)
          }
        />
        <EditorContent
          editor={editor}
          className="p-16 min-h-[200px] font-sans text-base text-fg-base"
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
export default RichTextEditor;
