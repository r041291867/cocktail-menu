import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tsconfigPaths()],
  },
});
