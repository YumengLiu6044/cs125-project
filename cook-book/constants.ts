export const DIET_OPTIONS = {
	diet_labels: [
		"High-Protein",
		"High-Fiber",
		"Balanced",
		"Low-Carb",
		"Low-Sodium",
		"Low-Fat",
	],
	health_labels: [
		"Peanut-Free",
		"Soy-Free",
		"Egg-Free",
		"Shellfish-Free",
		"Gluten-Free",
		"Paleo",
		"Fish-Free",
		"Vegan",
		"Dairy-Free",
		"Vegetarian",
		"Tree-Nut-Free",
		"Low Sugar",
	],
	cautions: [
		"Sulfites",
		"FODMAP",
		"Eggs",
		"Gluten",
		"Shellfish",
		"Soy",
		"Milk",
		"Tree-Nuts",
		"Wheat",
	],
	cuisine_type: [
		"indian",
		"french",
		"chinese",
		"south east asian",
		"caribbean",
		"american",
		"world",
		"japanese",
		"middle eastern",
		"korean",
		"central europe",
		"nordic",
		"british",
		"asian",
		"south american",
		"greek",
		"mexican",
		"eastern europe",
		"italian",
		"mediterranean",
	],
	meal_type: ["teatime", "breakfast", "brunch", "lunch/dinner", "snack"],
	dish_type: [
		"drinks",
		"bread",
		"salad",
		"cereals",
		"egg",
		"desserts",
		"preps",
		"pancake",
		"preserve",
		"special occasions",
		"starter",
		"biscuits and cookies",
		"sandwiches",
		"main course",
		"condiments and sauces",
		"soup",
		"alcohol cocktail",
	],
} as const;

export const Colors = {
	globalBackground: "#FFFAF5",
	black: "#000",
	white: "#fff",
	orange: {
		100: "#FFE4C2",
		500: "#F58700",
		600: "#C26B00",
	},
	gray: {
		100: "#F3F4F6",
		200: "#E5E7EB",
		300: "#D2D5DB",
		400: "#9AA1AD",
		500: "#6B7281",
		600: "#4C5564",
	},
	red: {
		50: "#FCF3F2",
		100: "#FAE3E2",
		200: "#F7CCCB",
		300: "#F4A6A5",
		400: "#EE6E6C",
		500: "#E64341",
	},
	green: {
		500: "#33995B",
	},
} as const;

export const Layout = {
	padding: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	margin: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},
	radius: {
		sm: 8,
		md: 16,
		lg: 24,
	},
	gap: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
	},

	border: {
		none: 0,
		xs: 0.5,
		sm: 1,
		md: 1.5,
		lg: 2,
	},
} as const;

export const Typography = {
	fontFamily: {
		light: "DMSans_300Light",
		regular: "DMSans_400Regular",
		medium: "DMSans_500Medium",
		semibold: "DMSans_600SemiBold",
		bold: "DMSans_700Bold",
	},

	fontSize: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
		"3xl": 30,
		"4xl": 36,
		"5xl": 46,
	},

	lineHeight: {
		xs: 16,
		sm: 20,
		md: 24,
		lg: 28,
		xl: 32,
		"2xl": 36,
		"3xl": 42,
		"4xl": 48,
		"5xl": 56,
	},

	letterSpacing: {
		tight: -0.5,
		normal: 0,
		wide: 0.5,
	},
} as const;

export const STORAGE_KEYS = {
	authStore: "auth_store",
};
export const API_BASE = {
	auth: "/auth",
};

export const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;
