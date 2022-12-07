import { defineStore } from "pinia";

export const useAuthDataStore = defineStore({
	id: "auth-data-store",
	state: () => ({
		accountURL: "https://accounts.spotify.com",
		clientId: useRuntimeConfig().public.clientId,
		clientSecret: useRuntimeConfig().public.clientSecret,
		redirectURI: "http://localhost:3000/home",
		scope:
			"user-read-private user-read-playback-state user-follow-read user-read-currently-playing user-read-playback-position user-top-read user-read-recently-played",
		accessToken: "",
		refreshToken: "",
	}),
	actions: {
	},
	getters: {},
});
