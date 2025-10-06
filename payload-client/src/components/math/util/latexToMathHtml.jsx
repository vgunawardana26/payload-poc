export function latexToHtml(text) {
  return text
    .replace(/\$\$(.+?)\$\$/gs, (_match, formula) => {
      return `<math-block formula="${formula}"></math-block>`;
    })
    .replace(/\$(.+?)\$/g, (_match, formula) => {
      return `<math-inline formula="${formula}"></math-inline>`;
    });
}
