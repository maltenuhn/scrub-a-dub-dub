import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/scrub-a-dub-dub/", // Replace <REPO> with your repository name
});
