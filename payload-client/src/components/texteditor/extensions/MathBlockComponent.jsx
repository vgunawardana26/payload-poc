// MathBlockComponent.tsx
import { NodeViewWrapper } from "@tiptap/react";
import MathJaxRender from "../../math/MathJaxRender";
import { formatLatex } from "../../../util/formatters/formatLatex";

const MathBlockComponent = (props) => {
  const formula = props.node.attrs.formula;

  return (
    <NodeViewWrapper className="math-block">
      <div className="p-2 bg-gray-100 rounded">
        <MathJaxRender content={formatLatex(formula)} />
      </div>
    </NodeViewWrapper>
  );
};

export default MathBlockComponent;
