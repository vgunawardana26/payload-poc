/**
 * Escapes LaTeX backslashes for use in JSX/HTML strings,
 * and wraps the expression with MathJax syntax for inline or block mode.
 *
 * Auto-detects block mode if:
 *  - input contains newlines
 *  - or input contains an equals sign (commonly used in equations)
 *
 * @param {string} input - Raw LaTeX input (e.g. f\left(x\right)=x^2+2x+1)
 * @returns {string} - Escaped and wrapped LaTeX string
 */
export const formatLatex = (input, forceInline) => {
  if (typeof input !== "string") return "";

  const trimmed = input.trim();

  const hasNewline = /\n/.test(trimmed);
  const hasEquals = /=/.test(trimmed);
  const hasEnvironment = /\\begin\{.*?\}/.test(trimmed);

  const isBlock = (hasNewline || hasEquals || hasEnvironment) && !forceInline;

  return isBlock ? `\\[ ${trimmed} \\]` : `\\( ${trimmed} \\)`;
};
