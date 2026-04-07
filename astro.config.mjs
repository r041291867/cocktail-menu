import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tsconfigPaths()],
    esbuild: {
      // This project stores JSX in .js files (from Next.js),
      // so ensure Vite parses them as JSX without renaming everything.
      include: ["src/**/*.js", "src/**/*.jsx"],
      loader: "jsx",
      jsx: "automatic",
    },
  },
});

