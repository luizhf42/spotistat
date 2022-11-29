// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss"],
	buildModules: ["@pinia/nuxt"],
	runtimeConfig: {
		public: {
			clientId: "",
			clientSecret: "",
		},
	},
	tailwindcss: {
		cssPath: "~/assets/tailwind.css",
	},
});
