const LOWERCASE_LETTERS = {
  pattern: '[a-z]+',
  characters: 'abcdefghijklmnopqrstuvwxyz',
};

const DIGITS = {
  pattern: '[0-9]+',
  characters: '0123456789',
};

const ALPHANUMERIC = {
  pattern: '[0-9a-zA-Z]+',
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
};

module.exports = {
  LOWERCASE_LETTERS,
  DIGITS,
  ALPHANUMERIC,
};
