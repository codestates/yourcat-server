module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'global-require': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0, // _id 쓰게함
    'consistent-return': 0, // if/else안쓰고 return res.json() 식으로 쓰게함.
    'no-else-return': 0,
    'no-return-assign': 0,
  },
};
