import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:4173/",
    experimentalStudio: true,
    env: {
      EMAIL: "testadmin@example.com",
      PASSWORD: "adminpassword"
    }
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
