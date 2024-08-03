module.exports = {
  extends: ["expo", "airbnb", "airbnb-typescript", 'prettier'],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["app-example/", "scripts", ".eslintrc.js", 'node_modules', 'dist'],
  "rules": {
    "no-console": 1,       // Means warning
    "prettier/prettier": 2, // Means error
    "react/require-default-props": 0 // Because defaultProps will be deprecated
  }
};
