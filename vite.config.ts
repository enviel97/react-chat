import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    eslint(),
    viteTsconfigPaths(),
    splitVendorChunkPlugin(),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analyze.html",
    }) as any,
  ],
  resolve: {
    alias: {
      "styled-components": path.resolve("node_modules", "styled-components"),
    },
  },
  build: {
    outDir: "build",
  },
  server: {
    open: true,
    port: 3000,
  },
});
