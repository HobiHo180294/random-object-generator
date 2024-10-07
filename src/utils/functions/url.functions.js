function checkURLValidity(string) {
  try {
    new URL(string);
    return {
      result: true,
      message: 'The URL is valid.',
    };
  } catch (error) {
    return {
      result: false,
      message: error.message || 'The URL is invalid.',
    };
  }
}

module.exports = {
  checkURLValidity,
};
