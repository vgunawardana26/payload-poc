import React from "react";
import { MathJaxContext } from "better-react-mathjax";
import { config } from "./config/mathjaxConfig";

const MathJaxWrapper = ({ children }) => {
  return (
    <MathJaxContext version={3} config={config}>
      {children}
    </MathJaxContext>
  );
};

export default MathJaxWrapper;
