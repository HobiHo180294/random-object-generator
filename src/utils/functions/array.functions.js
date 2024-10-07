function getArrayLength(minItems, maxItems) {
  return Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
}

module.exports = {
  getArrayLength,
};
