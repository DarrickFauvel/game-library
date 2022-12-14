// htmlEntities for JavaScript
// from https://css-tricks.com/snippets/javascript/htmlentities-for-javascript/

const htmlEntities = (str) => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default htmlEntities
