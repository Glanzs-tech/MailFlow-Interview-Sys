import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "warn",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
    },
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },
];
