// vite.config.js
/*export default {
  root: '.',
  build: {
    outDir: 'dist'
  }
}*/

import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  publicDir: "../public", // Tells Vite to copy assets from public → dist

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/modules/search/livejobsearch.html"),
        courseEngine: resolve(__dirname, "src/modules/courseEngine/courseSuggest.html"),
        chatbot: resolve(__dirname, "src/modules/chatbot/chatbot.html"),
        skillTracker: resolve(__dirname, "src/modules/skillTracker/JobSkillPathGenerator.html"),
        //cart: resolve(__dirname, "src/cart/index.html"),
        //checkout: resolve(__dirname, "src/checkout/index.html"),
        //product: resolve(__dirname, "src/product_pages/index.html"),
        //product_listing: resolve(__dirname, "src/product_listing/index.html"),
        //Add success page
        //success: resolve(__dirname, "src/checkout/success.html"),
      },
    },
  },
});