import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import MathInlineComponent from "./MathInlineComponent"; // your custom renderer

export const MathInline = Node.create({
  name: "mathInline",

  inline: true,
  group: "inline",
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
        tag: "math-inline",
        getAttrs: (dom) => ({
          formula: dom.getAttribute("formula") || "",
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["math-inline", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathInlineComponent);
  },
});
