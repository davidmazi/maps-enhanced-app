module.exports = {
  extends: ["expo", "airbnb", "airbnb-typescript", 'prettier'],
  plugins: ["prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["app-example/", "scripts", ".eslintrc.js", 'node_modules', 'dist'],
  "rules": {
    "no-console": 1,       // Means warning
    "prettier/prettier": 2 // Means error
  }
};
