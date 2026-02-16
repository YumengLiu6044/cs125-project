import { API_BASE } from "@/constants";
import axiosClient from "./axiosClient";

export const RecipeApi = {
	// === SEARCH RECIPES ===
	searchRecipes: (param: {
		query?: string;
		autocomplete?: boolean;
		limit?: number;
	}) =>
		axiosClient.post(API_BASE.recipes + "/search", param),

	// === SET / REMOVE SAVED RECIPE ===
	setSavedRecipe: (param: {
		recipe_id: string;
		collection_id: string;
		amount: number;
	}) =>
		axiosClient.post(API_BASE.recipes + "/saved-recipes", param),

	// === GET SAVED RECIPES FOR A COLLECTION ===
	getSavedRecipes: (collectionId: string) =>
		axiosClient.get(API_BASE.recipes + `/saved-recipes/${collectionId}`),

	// === CREATE COLLECTION ===
	addCollection: (collectionName: string) =>
		axiosClient.post(API_BASE.recipes + "/collection", {
			collection_name: collectionName,
		}),

	// === GET USER’S COLLECTIONS ===
	getCollections: () =>
		axiosClient.get(API_BASE.recipes + "/collection"),

	// === DELETE COLLECTION ===
	deleteCollection: (collectionId: string) =>
		axiosClient.delete(API_BASE.recipes + `/collection/${collectionId}`),
};
