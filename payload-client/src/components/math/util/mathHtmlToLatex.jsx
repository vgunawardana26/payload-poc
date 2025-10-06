export function mathHtmlToLatex(html) {
  return html
    .replace(
      /<math-inline formula="([^"]+)"><\/math-inline>/g,
      (_match, formula) => {
        return `$${formula}$`;
      }
    )
    .replace(
      /<math-block formula="([^"]+)"><\/math-block>/g,
      (_match, formula) => {
        return `$$${formula}$$`;
      }
    );
}
