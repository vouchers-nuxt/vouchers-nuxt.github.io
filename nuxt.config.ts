// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vite-pwa/nuxt", "@nuxt/devtools", "@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  routeRules: {
    // Generated at build time for SEO purpose
    "/": { redirect: "/signin" },
    // Cached for 1 hour
    "/api/*": { cache: { maxAge: 60 * 60 } },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL || "https://vedapack.ksgestao.com.br/api",
    },
  },
  app: {
    head: {
      script: [
        { src: "/assets/vendor/jquery/jquery.min.js", defer: true },
        { src: "/assets/vendor/blockui/block-ui.js", defer: true },
        { src: "/assets/js/bootstrap/bootstrap.bundle.min.js", defer: true },
        {
          src: "/assets/vendor/treegrid/js/jquery.treegrid.min.js",
          defer: true,
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Nunito:200,300,400,700,",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/spinkit/spinkit.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/treegrid/css/jquery.treegrid.css",
          defer: true,
        },
        {
          rel: "stylesheet",
          href: "/assets/css/bootstrap/bootstrap.min.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/vendor/fontawesome-free/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/css/bootstrap-icons/bootstrap-icons.min.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/css/sb-admin-2.min.css",
        },
        {
          rel: "stylesheet",
          href: "/assets/css/ladda/ladda.css",
          defer: true,
        },
      ],
    },
  },
});
