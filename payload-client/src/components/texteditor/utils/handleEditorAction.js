const handleEditorAction = (editor, action, attrs) => {
  if (!editor) return;
  const chain = editor.chain().focus();

  switch (action) {
    case "undo":
      chain.undo();
      break;
    case "redo":
      chain.redo();
      break;
    case "bold":
      chain.toggleBold();
      break;
    case "italic":
      chain.toggleItalic();
      break;
    case "underline":
      chain.toggleUnderline();
      break;
    case "heading":
      chain.toggleHeading({ level: attrs?.level || 1 });
      break;
    case "align":
      chain.setTextAlign(attrs?.align || "left");
      break;
    case "image":
      chain.setImage({ src: attrs?.src || "" });
      break;
    default:
      break;
  }
  chain.run();
};

export default handleEditorAction;
