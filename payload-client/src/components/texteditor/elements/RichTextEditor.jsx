import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { MathBlock } from "./extensions/MathBlock";
import { MathInline } from "./extensions/MathInline";
import MathEditor from "./MathEditor";
import MathJaxWrapper from "../math/MathJaxWrapper";
import GraphingCalculator from "../desmos/GraphingCalculator";
import useEventListener from "../../hooks/useEventListener";
import { Button, IconButton } from "@edux-design/buttons";
import { Bold, Italic } from "lucide-react";
import { useEditorShortcuts } from "../../hooks/useMathEditorShortCuts";
import "./styles.css";

const RichTextEditor = forwardRef(function RichTextEditor(props, ref) {
  const { value, onChange, fieldKey } = props;

  const fileInputRef = useRef();
  const mathEditorRef = useRef();
  const graphRef = useRef();
  const proseMirrorRef = useRef();

  const [showMathKeys, setShowMathKeys] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [mathContent, setMathContent] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Image, MathBlock, MathInline],
    content: value || ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  // Expose `focusAtEnd` to parent via ref
  useImperativeHandle(ref, () => ({
    focusAtEnd: () => {
      editor?.chain().focus("end").run();
    },
  }));

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false); // don't trigger onUpdate
    }
  }, [value, editor]);

  const handleEditorAction = (action) => {
    if (!editor) return;
    editor.chain().focus()[action]().run();
  };

  const triggerImageUpload = () => fileInputRef.current?.click();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        editor?.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };

  const toggleMathEditor = () => {
    setShowGraph(false);
    setShowMathKeys((prev) => !prev);
  };

  const toggleGraph = () => {
    setShowMathKeys(false);
    setShowGraph((prev) => !prev);
  };

  useEffect(() => {
    if (showMathKeys) {
      mathEditorRef.current?.focus();
    }
  }, [showMathKeys]);

  function handleAddBlockMath() {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "mathBlock",
          attrs: { formula: mathContent },
        },
        {
          type: "paragraph",
        },
      ])
      .run();

    mathEditorRef.current?.clear();
    setMathContent("");
    setShowMathKeys(false);
  }

  function handleInlineAdd() {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: "mathInline",
        attrs: { formula: mathContent },
      })
      .run();

    mathEditorRef.current?.clear();
    setMathContent("");
    setShowMathKeys(false);
  }

  const handleInsertGraphSvg = () => {
    editor.chain().focus().setImage({ src: screenshotUrl }).run();
  };

  // Enter submits block math when math editor is open
  useEventListener("keydown", (event) => {
    if (event.key === "Enter" && showMathKeys) {
      handleAddBlockMath();
    }
  });

  // Custom keyboard shortcuts
  useEditorShortcuts({
    isActive: true,
    handlers: {
      e: toggleMathEditor,
      i: handleInlineAdd,
      b: handleAddBlockMath,
    },
  });

  return (
    <div className="flex flex-row h-full w-full relative">
      {/* Main Editor */}
      <div
        className={`transition-all duration-500 ${
          showGraph || showMathKeys ? "w-[60%]" : "w-full"
        } editor-container h-full`}
      >
        <div className="flex flex-row items-center w-full bg-[#e3e3e3] p-2 gap-2">
          <Button onClick={() => console.log(value)}>Log HTML</Button>
          <IconButton
            size="small"
            onClick={() => handleEditorAction("toggleBold")}
          >
            Bold
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEditorAction("toggleItalic")}
          >
            Italic
          </IconButton>
          <IconButton
            onClick={() =>
              handleEditorAction(() =>
                editor.chain().toggleHeading({ level: 1 }).run()
              )
            }
          >
            H1
          </IconButton>
          <IconButton
            onClick={() =>
              handleEditorAction(() =>
                editor.chain().toggleHeading({ level: 2 }).run()
              )
            }
          >
            H2
          </IconButton>
          <IconButton size="small" onClick={triggerImageUpload}>
            Insert Image
          </IconButton>
          <IconButton size="small" onClick={toggleMathEditor}>
            Equation
          </IconButton>
          <Button size="small" onClick={() => graphRef.current?.exportSvg()}>
            Insert Graph
          </Button>
          <IconButton size="small" onClick={toggleGraph}>
            {showGraph ? "Hide Graph" : "Show Graph"}
          </IconButton>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <MathJaxWrapper>
          <EditorContent
            ref={proseMirrorRef}
            editor={editor}
            className="editor-content"
            style={{
              height: "170px",
              overflow: "scroll",
              padding: "12px",
              lineHeight: "1.6",
            }}
          />
        </MathJaxWrapper>
      </div>

      {/* Graph Pane */}
      {/* <div
        className={`transition-all duration-500 overflow-hidden ${
          showGraph ? "w-[40%] opacity-100" : "w-0 opacity-0"
        }`}
      >
        <GraphingCalculator
          ref={graphRef}
          onExport={handleInsertGraphSvg}
          setScreenshotUrl={setScreenshotUrl}
          screenshotUrl={screenshotUrl}
        />
      </div> */}

      {/* Math Editor Pane */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          showMathKeys ? "w-[40%] opacity-100" : "w-0 opacity-0"
        }`}
      >
        {/* {showMathKeys && (
          <div className="p-4">
            <MathEditor
              ref={mathEditorRef}
              mathContent={mathContent}
              setMathContent={setMathContent}
              handleInlineAdd={handleInlineAdd}
              handleAddBlockMath={handleAddBlockMath}
            />
          </div>
        )} */}
      </div>
    </div>
  );
});

export default RichTextEditor;
