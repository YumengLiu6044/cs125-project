import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { STORAGE_KEYS } from "@/constants";

type AuthStore = {
	token: string | null;
	login: (_: string | null) => void;
	logout: () => void;

	username: string | null;
	setUsername: (_: string) => void;

	email: string | null;
	setEmail: (_: string) => void;
};

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			username: null,
			email: null,

			setUsername: (newUsername: string) =>
				set({ username: newUsername }),

			login: (newToken: string | null) => {
				set({ token: newToken });
			},

			logout: () => {
				set({
					token: null,
					username: null,
					email: null,
				});
			},

			setEmail: (email: string | null) => set({ email }),
		}),
		{
			name: STORAGE_KEYS.authStore,

			storage: createJSONStorage(() => AsyncStorage),

			partialize: (state) => ({
				token: state.token,
				username: state.username,
				email: state.email,
			}),
		},
	),
);

export default useAuthStore;
