import React, { useContext, useEffect, useRef } from "react";
import { MathJaxBaseContext } from "better-react-mathjax";

const MathJaxRender = ({ content, Tag = "div" }) => {
  const mjContext = useContext(MathJaxBaseContext);
  const containerRef = useRef(null);

  useEffect(() => {
    if (mjContext && containerRef.current) {
      mjContext.promise.then((mathJax) => {
        mathJax.startup.promise.then(() => {
          mathJax.typesetClear([containerRef.current]);
          mathJax.typesetPromise([containerRef.current]);
        });
      });
    }
  }, [mjContext, content]);

  return <Tag ref={containerRef}>{content}</Tag>;
};

export default MathJaxRender;
