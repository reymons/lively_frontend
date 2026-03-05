import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import a11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import jest from "eslint-plugin-jest";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
    globalIgnores(["./dist/*", "jest.config.js"]),
    eslint.configs.recommended,
    tseslint.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs["recommended-latest"],
    jest.configs["flat/recommended"],
    a11y.flatConfigs.recommended,
    {
        rules: {
            "react/react-in-jsx-scope": "off",
            "react-hooks/exhaustive-deps": "error",
            "react/prop-types": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
]);
