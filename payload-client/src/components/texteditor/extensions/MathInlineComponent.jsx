import { NodeViewWrapper } from "@tiptap/react";
import MathJaxRender from "../../math/MathJaxRender";
import { formatLatex } from "../../../util/formatters/formatLatex";

const MathInlineComponent = ({ node }) => {
  const formula = node.attrs.formula;

  return (
    <NodeViewWrapper as="span" className="math-inline">
      <MathJaxRender Tag="span" content={formatLatex(formula, true)} />
    </NodeViewWrapper>
  );
};

export default MathInlineComponent;
