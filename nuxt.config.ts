import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  css: ["@/assets/css/main.css"],
  build: {
    transpile: ["three"],
  },
  vite: {
    plugins: [tailwindcss()],
    devBundler: "vite-node",
    optimizeDeps: {
      include: ["three", "gsap"],
    },
    server: {
      hmr: {
        protocol: "ws",
      },
    },
  },
  experimental: {
    externalVue: false,
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Syne:wght@400;700;800&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
})
