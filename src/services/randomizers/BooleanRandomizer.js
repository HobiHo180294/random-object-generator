class BooleanRandomizer {
  generateBoolean() {
    return Math.random() < 0.5;
  }
}

module.exports = BooleanRandomizer;
