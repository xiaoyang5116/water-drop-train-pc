module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',

    // 自定义
    require.resolve("eslint-config-airbnb"),
    require.resolve("eslint-config-airbnb/hooks"),
    require.resolve("eslint-config-airbnb-typescript"),
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",

  // 自定义
  parserOptions: {
    project: require.resolve("./tsconfig.json"),
  },

  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // 自定义
    // 设置 必须要使用 function 定义函数
    "react/function-component-definition": 0,
    // 设置 必须要在文件头部导入 react
    "react/react-in-jsx-scope": 0,
    // 设置 每个文件必需要 default
    "import/prefer-default-export": 0,
    // 设置 hook 依赖
    "react-hooks/exhaustive-deps": 1,
  },
};
