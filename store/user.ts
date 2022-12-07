import { defineStore } from "pinia";

export const useUserDataStore = defineStore({
	id: "user-data-store",
	state: () => ({
		profile: null,
	}),
	actions: {},
	getters: {},
});
