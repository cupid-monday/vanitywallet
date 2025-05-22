// num_format.js
function formatWithSeparator(n) {
  const str = n.toString();
  const parts = [];
  for (let i = str.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    parts.unshift(str.slice(start, i));
  }
  return parts.join("'");
}

module.exports = { formatWithSeparator };
