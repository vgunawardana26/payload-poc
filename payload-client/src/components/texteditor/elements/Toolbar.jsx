import React, { useEffect, useState, useRef } from "react";
import { cx } from "@edux-design/utils";
import {
  Addimage,
  Headingtext1,
  Headingtext2,
  Headingtext3,
  Italicstext,
  Boldtext,
  Underlinetext,
  Redo,
  Undo,
  TextAlignCenter,
  TextAlignStart,
  TextAlignJustify,
  TextAlignEnd,
} from "@edux-design/icons";
import triggerImageUpload from "../utils/triggerImageUpload";
import handleImageUpload from "../utils/handleImageUpload";

export const Toolbar = ({ variant = "light", editor, handleEditorAction }) => {
  // Force re-render on editor state changes so isActive() updates
  const [, setTick] = useState(0);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!editor) return;
    const rerender = () => setTick((t) => t + 1);
    editor.on("transaction", rerender);
    editor.on("selectionUpdate", rerender);
    editor.on("update", rerender);
    editor.on("focus", rerender);
    editor.on("blur", rerender);
    return () => {
      editor.off("transaction", rerender);
      editor.off("selectionUpdate", rerender);
      editor.off("update", rerender);
      editor.off("focus", rerender);
      editor.off("blur", rerender);
    };
  }, [editor]);

  const defaults = cx(
    "flex items-center gap-16",
    "border-b border-border-base",
    "rounded-t-md px-16 py-2",
    "font-sans text-fg-base",
    "h-[40px] select-none"
  );
  const variants = {
    light: "",
    dark: cx("bg-bg-invert text-fg-invert border-border-invert"),
  };
  const STYLES = cx(defaults, variants[variant]);

  const buttonBase = cx(
    "flex items-center justify-center p-2 rounded-sm transition-all duration-150",
    "hover:bg-bg-minimal focus:shadow-focus focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
  );
  const activeClass = "bg-bg-primary-subtle text-fg-primary-base";
  const divider = "w-px h-4 bg-border-minimal";

  if (!editor) return <div className={STYLES}>Loading editor…</div>;

  return (
    <div className={STYLES}>
      {/* Undo / Redo */}
      <button
        className={buttonBase}
        onClick={() => handleEditorAction("undo")}
        disabled={!editor.can().undo?.()}
      >
        <Undo />
      </button>
      <button
        className={buttonBase}
        onClick={() => handleEditorAction("redo")}
        disabled={!editor.can().redo?.()}
      >
        <Redo />
      </button>

      <div className={divider} />

      {/* Text Formatting */}
      <button
        className={cx(buttonBase, editor.isActive("bold") && activeClass)}
        aria-pressed={editor.isActive("bold")}
        onClick={() => handleEditorAction("bold")}
      >
        <Boldtext />
      </button>
      <button
        className={cx(buttonBase, editor.isActive("italic") && activeClass)}
        aria-pressed={editor.isActive("italic")}
        onClick={() => handleEditorAction("italic")}
      >
        <Italicstext />
      </button>
      <button
        className={cx(buttonBase, editor.isActive("underline") && activeClass)}
        aria-pressed={editor.isActive("underline")}
        onClick={() => handleEditorAction("underline")}
      >
        <Underlinetext />
      </button>

      <div className={divider} />

      {/* Headings */}
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          className={cx(
            buttonBase,
            editor.isActive("heading", { level }) && activeClass
          )}
          aria-pressed={editor.isActive("heading", { level })}
          onClick={() => handleEditorAction("heading", { level })}
        >
          {level === 1 && <Headingtext1 />}
          {level === 2 && <Headingtext2 />}
          {level === 3 && <Headingtext3 />}
        </button>
      ))}

      <div className={divider} />

      {/* Alignment */}
      {[
        { align: "left", icon: <TextAlignStart /> },
        { align: "center", icon: <TextAlignCenter /> },
        { align: "right", icon: <TextAlignEnd /> },
        { align: "justify", icon: <TextAlignJustify /> },
      ].map(({ align, icon }) => (
        <button
          key={align}
          className={cx(
            buttonBase,
            editor.isActive({ textAlign: align }) && activeClass
          )}
          aria-pressed={editor.isActive({ textAlign: align })}
          onClick={() => handleEditorAction("align", { align })}
        >
          {icon}
        </button>
      ))}

      <div className={divider} />

      {/* Image */}
      <button
        className={buttonBase}
        onClick={() => triggerImageUpload(fileInputRef)}
      >
        <Addimage />
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => handleImageUpload(e, editor)}
        style={{ display: "none" }}
      />
    </div>
  );
};
