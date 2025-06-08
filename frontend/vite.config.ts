import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { configDefaults } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
})


