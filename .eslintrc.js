module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "no-undef": "error",
    "no-unused-vars": "warn",
    "no-useless-escape": "off",
    "import/newline-after-import": "off",
    "import/no-absolute-path": "off",
    "import/no-amd": "off",
    "import/no-deprecated": "off",
    "import/no-duplicates": "off",
    "import/no-mutable-exports": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-default": "off",
    "import/no-unresolved": "off",
    "for-direction": "error",
    "no-prototype-builtins": "error",
    "no-template-curly-in-string": "error",
    "no-unsafe-negation": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "import/first": "off",
    complexity: "error",
    "consistent-return": "off",
    eqeqeq: ["error", "smart"],
    "import/extensions": "off",
    "react-hooks/exhaustive-deps": "off",
    "no-debugger": "off",
    "no-empty": "warn",
    "react/react-in-jsx-scope": "off"
  }
};
