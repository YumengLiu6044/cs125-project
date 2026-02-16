import { API_BASE } from "@/constants";
import axiosClient from "./axiosClient";

export const UserApi = {
	// === GET USER PROFILE ===
	getUser: () =>
		axiosClient.get(API_BASE.user + "/"),

	// === GET USER SEARCH PREFERENCES ===
	getSearchPreferences: () =>
		axiosClient.get(API_BASE.user + "/search-preferences"),

	// === UPDATE / SET SEARCH PREFERENCES ===
	setSearchPreferences: (params: Record<string, any>) =>
		axiosClient.post(API_BASE.user + "/search-preferences", params),
};
