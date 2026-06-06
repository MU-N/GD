import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo is MU-N/GD -> GitHub Pages serves it at https://mu-n.github.io/GD/
// so static assets must resolve under the /GD/ base. For local dev Vite
// ignores `base` for the dev server root, so this is safe in both modes.
export default defineConfig({
  base: "/GD/",
  plugins: [react()],
});
