const DEFAULT_MIN = 1;
const DEFAULT_MAX = 1000;

class NumericRandomizer {
  generateInteger(minimum = DEFAULT_MIN, maximum = DEFAULT_MAX) {
    const processedMin = Math.ceil(minimum);
    const processedMax = Math.floor(maximum);

    return (
      Math.floor(Math.random() * (processedMax - processedMin + 1)) +
      processedMin
    );
  }

  generateNumber(
    minimum = { value: DEFAULT_MIN, exclusive: false },
    maximum = { value: DEFAULT_MAX, exclusive: false }
  ) {
    const effectiveMin = minimum.exclusive
      ? minimum.value + Number.EPSILON
      : minimum.value;
    const effectiveMax = maximum.exclusive
      ? maximum.value - Number.EPSILON
      : maximum.value;
    return Math.random() * (effectiveMax - effectiveMin) + effectiveMin;
  }
}

module.exports = NumericRandomizer;
