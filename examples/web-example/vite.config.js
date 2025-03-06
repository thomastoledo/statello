import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      tinystate: path.resolve(__dirname, "../../dist/esm"),
    },
  },
});
