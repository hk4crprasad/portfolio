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
    files: ["components/react-bits/*.jsx"],
    languageOptions: {
      globals: Object.fromEntries([
        "window", "document", "performance", "getComputedStyle", "requestAnimationFrame", "cancelAnimationFrame", "ResizeObserver", "IntersectionObserver",
      ].map((name) => [name, "readonly"])),
    },
    plugins: { "react-hooks": hooks, "jsx-a11y": jsxA11y },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.tsx"],
    plugins: { "react-hooks": hooks, "jsx-a11y": jsxA11y },
    rules: {
      ...hooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
    },
  },
);
