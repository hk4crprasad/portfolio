import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "next-env.d.ts",
      "docs/audit/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.tsx"],
    plugins: { "react-hooks": hooks, "jsx-a11y": jsxA11y },
    rules: {
      ...hooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
);
