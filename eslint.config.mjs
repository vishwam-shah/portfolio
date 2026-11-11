import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored third-party components, copied verbatim from the ReactBits
    // shadcn registry. They assign refs during render, which react-hooks/refs
    // flags. Linting them only produces noise we would have to re-fix on every
    // upstream re-pull, so they are excluded rather than patched.
    "components/reactbits/**",
  ]),
]);

export default eslintConfig;
