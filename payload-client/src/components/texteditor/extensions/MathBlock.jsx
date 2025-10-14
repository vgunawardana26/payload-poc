// MathBlock.tsx
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MathBlockComponent from "./MathBlockComponent"; // We'll create this next

export const MathBlock = Node.create({
  name: "mathBlock",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      formula: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "math-block",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-block", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathBlockComponent);
  },
});
