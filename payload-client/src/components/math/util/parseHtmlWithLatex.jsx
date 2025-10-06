import React from "react";
import parse from "html-react-parser";
import MathJaxRender from "../MathJaxRender";

// Matches $...$, \(...\), or \[...\]
const latexRegex = /(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\(.*?\\\))/gs;

export function parseHtmlWithLatex(htmlString) {
  return parse(htmlString, {
    replace: (domNode) => {
      if (domNode.type === "text" && typeof domNode.data === "string") {
        const parts = domNode.data.split(latexRegex);
        if (parts.length === 1) return; // no LaTeX match

        return (
          <>
            {parts.map((part, i) => {
              if (!part) return null;
              const latexRegex =
                /(\$\$.*?\$\$|\$.*?\$|\\\[.*?\\\]|\\\(.*?\\\))/gs;
              const isMath = latexRegex.test(part);
              return isMath ? (
                <MathJaxRender Tag="span" content={part} key={i} />
              ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
              );
            })}
          </>
        );
      }
      return undefined;
    },
  });
}
