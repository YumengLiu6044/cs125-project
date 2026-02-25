import PageWithIcons from "@/components/PageWithIcons";
import Text from "@/components/Text";
import { Colors, DIET_OPTIONS, Layout, Typography } from "@/constants";
import { Flame, Search, Settings2, Users, X } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Image } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import FilterSection from "@/components/FilterSection";
import { UserApi } from "@/api/userApi";
import Spinner from "@/components/Spinner";
import { RecipeApi } from "@/api/recipeApi";

const exampleResponse = [
	{
		_id: "6992984d2b122b92a231ff4a",
		recipe_name: "Veggie Nuggets",
		source: "thehealthyhomecook.com",
		url: "http://www.thehealthyhomecook.com/veggie-nuggets-7/",
		servings: 4,
		calories: 909.38,
		total_weight_g: 1057.4,
		image_url:
			"https://datahive-prod-dataset-products.s3.eu-central-1.amazonaws.com/dataset/346/098257ee3030e2272f3db782e5224eabd382c381d7f7a79c30fe76689370f07d/21065321.jpg",
		diet_labels: ["High-Fiber", "Low-Fat"],
		health_labels: [
			"Vegan",
			"Vegetarian",
			"Dairy-Free",
			"Egg-Free",
			"Peanut-Free",
			"Tree-Nut-Free",
			"Soy-Free",
			"Fish-Free",
			"Shellfish-Free",
		],
		cautions: [],
		cuisine_type: ["american"],
		meal_type: ["lunch/dinner"],
		dish_type: ["main course"],
		ingredients: [
			{
				food: "broccoli",
				text: "1 cup broccoli",
				weight: 91,
				measure: "cup",
				quantity: 1,
			},
			{
				food: "red onion",
				text: "1/2 cup red onion",
				weight: 80,
				measure: "cup",
				quantity: 0.5,
			},
			{
				food: "zucchini",
				text: "1 zucchini",
				weight: 196,
				measure: "<unit>",
				quantity: 1,
			},
			{
				food: "carrot",
				text: "1 large carrot",
				weight: 72,
				measure: "<unit>",
				quantity: 1,
			},
			{
				food: "red potatoes",
				text: "3 small red potatoes",
				weight: 510,
				measure: "<unit>",
				quantity: 3,
			},
			{
				food: "breadcrumbs",
				text: "1 cup breadcrumbs",
				weight: 108,
				measure: "cup",
				quantity: 1,
			},
			{
				food: "salt",
				text: "dash of salt",
				weight: 0.4,
				measure: "dash",
				quantity: 1,
			},
		],
		daily_values: {
			K: {
				unit: "%",
				label: "Potassium",
				quantity: 78.26663829787236,
			},
			P: {
				unit: "%",
				label: "Phosphorus",
				quantity: 96.03428571428572,
			},
			CA: {
				unit: "%",
				label: "Calcium",
				quantity: 36.5026,
			},
			FE: {
				unit: "%",
				label: "Iron",
				quantity: 59.52344444444444,
			},
			MG: {
				unit: "%",
				label: "Magnesium",
				quantity: 54.68428571428572,
			},
			NA: {
				unit: "%",
				label: "Sodium",
				quantity: 47.33958333333334,
			},
			ZN: {
				unit: "%",
				label: "Zinc",
				quantity: 41.44090909090909,
			},
			FAT: {
				unit: "%",
				label: "Fat",
				quantity: 11.77646153846154,
			},
			NIA: {
				unit: "%",
				label: "Niacin (B3)",
				quantity: 95.57131249999999,
			},
			RIBF: {
				unit: "%",
				label: "Riboflavin (B2)",
				quantity: 72.87769230769231,
			},
			THIA: {
				unit: "%",
				label: "Thiamin (B1)",
				quantity: 141.2158333333333,
			},
			VITC: {
				unit: "%",
				label: "Vitamin C",
				quantity: 189.2044444444444,
			},
			VITD: {
				unit: "%",
				label: "Vitamin D",
				quantity: 0,
			},
			CHOLE: {
				unit: "%",
				label: "Cholesterol",
				quantity: 0,
			},
			FASAT: {
				unit: "%",
				label: "Saturated",
				quantity: 8.997600000000002,
			},
			FIBTG: {
				unit: "%",
				label: "Fiber",
				quantity: 84.928,
			},
			VITK1: {
				unit: "%",
				label: "Vitamin K",
				quantity: 110.825,
			},
			CHOCDF: {
				unit: "%",
				label: "Carbs",
				quantity: 61.78586666666666,
			},
			FOLDFE: {
				unit: "%",
				label: "Folate equivalent (total)",
				quantity: 100.5425,
			},
			PROCNT: {
				unit: "%",
				label: "Protein",
				quantity: 61.1968,
			},
			TOCPHA: {
				unit: "%",
				label: "Vitamin E",
				quantity: 10.49066666666667,
			},
			VITB12: {
				unit: "%",
				label: "Vitamin B12",
				quantity: 15.75,
			},
			VITB6A: {
				unit: "%",
				label: "Vitamin B6",
				quantity: 128.5976923076923,
			},
			VITA_RAE: {
				unit: "%",
				label: "Vitamin A",
				quantity: 72.11222222222223,
			},
			ENERC_KCAL: {
				unit: "%",
				label: "Energy",
				quantity: 45.46900000000001,
			},
		},
	},
	{
		_id: "699298572b122b92a23205ed",
		recipe_name: "Chicken Nuggets recipes",
		source: "theedgyveg.com",
		url: "http://theedgyveg.com/2014/03/08/vegan-mcdonalds-series-mcnuggets/",
		servings: 4,
		calories: 1295.27815262516,
		total_weight_g: 1196.011600597636,
		image_url:
			"https://datahive-prod-dataset-products.s3.eu-central-1.amazonaws.com/dataset/346/14a9c86f666b307957c02450a75a6e0520920f10cbe342fd804695e612b2173b/21122859.jpeg",
		diet_labels: ["Low-Fat", "Low-Sodium"],
		health_labels: [
			"Vegan",
			"Vegetarian",
			"Dairy-Free",
			"Peanut-Free",
			"Tree-Nut-Free",
			"Soy-Free",
			"Fish-Free",
			"Shellfish-Free",
		],
		cautions: ["FODMAP"],
		cuisine_type: ["american"],
		meal_type: ["lunch/dinner"],
		dish_type: ["main course"],
		ingredients: [
			{
				food: "vital wheat gluten",
				text: "1 cup vital wheat gluten",
				weight: 120,
				measure: "cup",
				quantity: 1,
			},
			{
				food: "nutritional yeast",
				text: "2 tbsp nutritional yeast",
				weight: 32,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "onion powder",
				text: "1 tsp onion powder",
				weight: 2.4,
				measure: "teaspoon",
				quantity: 1,
			},
			{
				food: "salt",
				text: "½ tsp salt",
				weight: 3,
				measure: "teaspoon",
				quantity: 0.5,
			},
			{
				food: "poultry seasoning",
				text: "½ tsp poultry seasoning",
				weight: 0.75,
				measure: "teaspoon",
				quantity: 0.5,
			},
			{
				food: "vegetable broth",
				text: "¾ cup vegetable broth",
				weight: 170.25,
				measure: "cup",
				quantity: 0.75,
			},
			{
				food: "tahini",
				text: "2 tbsp tahini",
				weight: 30,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "vegetable broth",
				text: "2-3 cups of vegetable broth",
				weight: 567.5,
				measure: "cup",
				quantity: 2.5,
			},
			{
				food: "onion",
				text: "1 onion chopped",
				weight: 125,
				measure: "<unit>",
				quantity: 1,
			},
			{
				food: "egg replacer",
				text: "3 eggs worth of egg replacer",
				weight: 12,
				measure: "<unit>",
				quantity: 3,
			},
			{
				food: "all-purpose flour",
				text: "⅔ cup all-purpose flour",
				weight: 83.33333333333333,
				measure: "cup",
				quantity: 0.6666666666666666,
			},
			{
				food: "tempura mix",
				text: "⅓ cup tempura mix",
				weight: 40,
				measure: "cup",
				quantity: 0.3333333333333333,
			},
			{
				food: "salt",
				text: "2 teaspoons salt",
				weight: 12,
				measure: "teaspoon",
				quantity: 2,
			},
			{
				food: "onion powder",
				text: "1 teaspoon onion powder",
				weight: 2.4,
				measure: "teaspoon",
				quantity: 1,
			},
			{
				food: "pepper",
				text: "¼ teaspoon pepper",
				weight: 0.725,
				measure: "teaspoon",
				quantity: 0.25,
			},
			{
				food: "garlic powder",
				text: "1 teaspoon garlic powder",
				weight: 3.1,
				measure: "teaspoon",
				quantity: 1,
			},
		],
		daily_values: {
			K: {
				unit: "%",
				label: "Potassium",
				quantity: 0,
			},
			P: {
				unit: "%",
				label: "Phosphorus",
				quantity: 0,
			},
			CA: {
				unit: "%",
				label: "Calcium",
				quantity: 0,
			},
			FE: {
				unit: "%",
				label: "Iron",
				quantity: 0,
			},
			MG: {
				unit: "%",
				label: "Magnesium",
				quantity: 0,
			},
			NA: {
				unit: "%",
				label: "Sodium",
				quantity: 0,
			},
			ZN: {
				unit: "%",
				label: "Zinc",
				quantity: 0,
			},
			FAT: {
				unit: "%",
				label: "Fat",
				quantity: 31.8341924211064,
			},
			NIA: {
				unit: "%",
				label: "Niacin (B3)",
				quantity: 0,
			},
			RIBF: {
				unit: "%",
				label: "Riboflavin (B2)",
				quantity: 0,
			},
			THIA: {
				unit: "%",
				label: "Thiamin (B1)",
				quantity: 0,
			},
			VITC: {
				unit: "%",
				label: "Vitamin C",
				quantity: 0,
			},
			VITD: {
				unit: "%",
				label: "Vitamin D",
				quantity: 0,
			},
			CHOLE: {
				unit: "%",
				label: "Cholesterol",
				quantity: 0,
			},
			FASAT: {
				unit: "%",
				label: "Saturated",
				quantity: 0,
			},
			FIBTG: {
				unit: "%",
				label: "Fiber",
				quantity: 0,
			},
			VITK1: {
				unit: "%",
				label: "Vitamin K",
				quantity: 0,
			},
			CHOCDF: {
				unit: "%",
				label: "Carbs",
				quantity: 53.84901928832805,
			},
			FOLDFE: {
				unit: "%",
				label: "Folate equivalent (total)",
				quantity: 0,
			},
			PROCNT: {
				unit: "%",
				label: "Protein",
				quantity: 248.0332835124283,
			},
			TOCPHA: {
				unit: "%",
				label: "Vitamin E",
				quantity: 0,
			},
			VITB12: {
				unit: "%",
				label: "Vitamin B12",
				quantity: 0,
			},
			VITB6A: {
				unit: "%",
				label: "Vitamin B6",
				quantity: 0,
			},
			VITA_RAE: {
				unit: "%",
				label: "Vitamin A",
				quantity: 0,
			},
			ENERC_KCAL: {
				unit: "%",
				label: "Energy",
				quantity: 64.76390763125801,
			},
		},
	},
	{
		_id: "699298892b122b92a2322269",
		recipe_name: "Sunny Mushroom Burgers Or Nuggets",
		source: "kblog.lunchboxbunch.com",
		url: "http://kblog.lunchboxbunch.com/2012/04/sunny-mushroom-veggie-burgers.html",
		servings: 8,
		calories: 2637.162583332144,
		total_weight_g: 1453.124510707942,
		image_url:
			"https://datahive-prod-dataset-products.s3.eu-central-1.amazonaws.com/dataset/346/443bc85141b78a194377b9195c0227deee6c2a23f704ab74039d6e163a52faf6/21135425.jpg",
		diet_labels: ["High-Fiber", "Low-Fat"],
		health_labels: [
			"Vegan",
			"Vegetarian",
			"Dairy-Free",
			"Egg-Free",
			"Peanut-Free",
			"Fish-Free",
			"Shellfish-Free",
		],
		cautions: ["Sulfites", "FODMAP"],
		cuisine_type: ["american"],
		meal_type: ["lunch/dinner"],
		dish_type: ["main course"],
		ingredients: [
			{
				food: "garlic powder",
				text: "1/4 tsp garlic powder",
				weight: 0.775,
				measure: "teaspoon",
				quantity: 0.25,
			},
			{
				food: "dried parsley",
				text: "2 Tbsp dried parsley flakes",
				weight: 3.2,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "sea salt",
				text: "1/4 tsp sea salt (to taste)",
				weight: 1.213541666728219,
				measure: "teaspoon",
				quantity: 0.25,
			},
			{
				food: "pepper",
				text: "a few dashes pepper (to taste)",
				weight: 0.1,
				measure: "dash",
				quantity: 1,
			},
			{
				food: "salt",
				text: "2 Tbsp salt-free spice blend - any variety you'd like",
				weight: 36,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "nutritional yeast",
				text: "1/2 cup nutritional yeast + (add more if you’d like more cheezy flavor)",
				weight: 128,
				measure: "cup",
				quantity: 0.5,
			},
			{
				food: "mushroom powder",
				text: "1 Tbsp mushroom powder (optional, I used Dole brand since it adds lots of vitamin D)",
				weight: 9.374999999841497,
				measure: "tablespoon",
				quantity: 1,
			},
			{
				food: "apple cider vinegar",
				text: "1 Tbsp apple cider vinegar",
				weight: 14.9,
				measure: "tablespoon",
				quantity: 1,
			},
			{
				food: "agave syrup",
				text: "1 Tbsp maple or agave syrup",
				weight: 13.74999999976753,
				measure: "tablespoon",
				quantity: 1,
			},
			{
				food: "soy sauce",
				text: "2 Tbsp tamari or soy sauce",
				weight: 32,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "oil",
				text: "2 Tbsp oil (olive, safflower, walnut..)",
				weight: 28,
				measure: "tablespoon",
				quantity: 2,
			},
			{
				food: "water",
				text: "3/4 cup water (or veggie broth for added flavor – if using broth remove the added salt)",
				weight: 177.441177375,
				measure: "cup",
				quantity: 0.75,
			},
			{
				food: "TVP",
				text: "1 1/2 cups TVP or TSP (textured veggie protein)",
				weight: 336,
				measure: "cup",
				quantity: 1.5,
			},
			{
				food: "cannellini beans",
				text: "1 can cannellini beans, drained",
				weight: 491.2500000000001,
				measure: "can",
				quantity: 1,
			},
			{
				food: "mushrooms",
				text: "1 1/2 cups mushrooms, chopped (any variety!)",
				weight: 105,
				measure: "cup",
				quantity: 1.5,
			},
			{
				food: "onion",
				text: "1/3 cup diced onion, sweet or white",
				weight: 53.33333333333333,
				measure: "cup",
				quantity: 0.3333333333333333,
			},
			{
				food: "whole wheat flour",
				text: "1/2 cup whole wheat flour",
				weight: 60,
				measure: "cup",
				quantity: 0.5,
			},
			{
				food: "safflower",
				text: "Saute in 1-2 Tbsp safflower oil (or bake at 375 degrees for about twenty minutes)",
				weight: 0,
				measure: "inch",
				quantity: 1,
			},
		],
		daily_values: {
			K: {
				unit: "%",
				label: "Potassium",
				quantity: 0,
			},
			P: {
				unit: "%",
				label: "Phosphorus",
				quantity: 463.6020952380283,
			},
			CA: {
				unit: "%",
				label: "Calcium",
				quantity: 156.8939401987897,
			},
			FE: {
				unit: "%",
				label: "Iron",
				quantity: 347.9905416666504,
			},
			MG: {
				unit: "%",
				label: "Magnesium",
				quantity: 380.9048797873504,
			},
			NA: {
				unit: "%",
				label: "Sodium",
				quantity: 146.9480721011793,
			},
			ZN: {
				unit: "%",
				label: "Zinc",
				quantity: 0,
			},
			FAT: {
				unit: "%",
				label: "Fat",
				quantity: 54.9174205128165,
			},
			NIA: {
				unit: "%",
				label: "Niacin (B3)",
				quantity: 0,
			},
			RIBF: {
				unit: "%",
				label: "Riboflavin (B2)",
				quantity: 0,
			},
			THIA: {
				unit: "%",
				label: "Thiamin (B1)",
				quantity: 0,
			},
			VITC: {
				unit: "%",
				label: "Vitamin C",
				quantity: 14.25176851846845,
			},
			VITD: {
				unit: "%",
				label: "Vitamin D",
				quantity: 0,
			},
			CHOLE: {
				unit: "%",
				label: "Cholesterol",
				quantity: 0,
			},
			FASAT: {
				unit: "%",
				label: "Saturated",
				quantity: 14.24579249999822,
			},
			FIBTG: {
				unit: "%",
				label: "Fiber",
				quantity: 493.5509666665919,
			},
			VITK1: {
				unit: "%",
				label: "Vitamin K",
				quantity: 0,
			},
			CHOCDF: {
				unit: "%",
				label: "Carbs",
				quantity: 104.8019594443454,
			},
			FOLDFE: {
				unit: "%",
				label: "Folate equivalent (total)",
				quantity: 0,
			},
			PROCNT: {
				unit: "%",
				label: "Protein",
				quantity: 567.8429333333027,
			},
			TOCPHA: {
				unit: "%",
				label: "Vitamin E",
				quantity: 0,
			},
			VITB12: {
				unit: "%",
				label: "Vitamin B12",
				quantity: 0,
			},
			VITB6A: {
				unit: "%",
				label: "Vitamin B6",
				quantity: 0,
			},
			VITA_RAE: {
				unit: "%",
				label: "Vitamin A",
				quantity: 0.4701111111090448,
			},
			ENERC_KCAL: {
				unit: "%",
				label: "Energy",
				quantity: 131.8581291666072,
			},
		},
	},
	{
		_id: "699298fb2b122b92a2326de6",
		recipe_name: "Budget Gigantes Plaki (Big Beans)",
		source: "greatbritishchefs.com",
		url: "http://www.greatbritishchefs.com/community/budget-gigantes-plaki-big-beans-recipe",
		servings: 2,
		calories: 384.8725833333901,
		total_weight_g: 695.3583333335912,
		image_url:
			"https://datahive-prod-dataset-products.s3.eu-central-1.amazonaws.com/dataset/346/c18961b9521dcd532dc893f6ddba0f88c2c637123b290ba790c3194d1d540541/21118969.jpg",
		diet_labels: ["Balanced", "High-Fiber", "Low-Sodium"],
		health_labels: [
			"Vegan",
			"Vegetarian",
			"Dairy-Free",
			"Gluten-Free",
			"Egg-Free",
			"Peanut-Free",
			"Tree-Nut-Free",
			"Soy-Free",
			"Fish-Free",
			"Shellfish-Free",
		],
		cautions: ["Sulfites"],
		cuisine_type: ["american"],
		meal_type: ["lunch/dinner"],
		dish_type: ["main course"],
		ingredients: [
			{
				food: "butter beans",
				text: "100 g dried butter beans - soak overnight or for at least 8 hours.",
				weight: 100,
				measure: "gram",
				quantity: 100,
			},
			{
				food: "oil",
				text: "1 tbsp oil",
				weight: 14,
				measure: "tablespoon",
				quantity: 1,
			},
			{
				food: "onion",
				text: "1 onion",
				weight: 125,
				measure: "<unit>",
				quantity: 1,
			},
			{
				food: "garlic",
				text: "1 clove of garlic",
				weight: 3,
				measure: "clove",
				quantity: 1,
			},
			{
				food: "red chilli",
				text: "1 red chilli",
				weight: 45,
				measure: "<unit>",
				quantity: 1,
			},
			{
				food: "cinnamon",
				text: "¼ tsp cinnamon",
				weight: 0.65,
				measure: "teaspoon",
				quantity: 0.25,
			},
			{
				food: "lemon juice",
				text: "1 tsp lemon juice",
				weight: 5.083333333591166,
				measure: "teaspoon",
				quantity: 1,
			},
			{
				food: "tomatoes",
				text: "400 g chopped tomatoes",
				weight: 400,
				measure: "gram",
				quantity: 400,
			},
			{
				food: "kale",
				text: "Handful of kale",
				weight: 2.625,
				measure: "handful",
				quantity: 1,
			},
		],
		daily_values: {
			K: {
				unit: "%",
				label: "Potassium",
				quantity: 37.69366666667231,
			},
			P: {
				unit: "%",
				label: "Phosphorus",
				quantity: 42.06520238095534,
			},
			CA: {
				unit: "%",
				label: "Calcium",
				quantity: 12.79525000000155,
			},
			FE: {
				unit: "%",
				label: "Iron",
				quantity: 28.31748148148263,
			},
			MG: {
				unit: "%",
				label: "Magnesium",
				quantity: 30.27648809524178,
			},
			NA: {
				unit: "%",
				label: "Sodium",
				quantity: 1.627795138888996,
			},
			ZN: {
				unit: "%",
				label: "Zinc",
				quantity: 16.80885606060724,
			},
			FAT: {
				unit: "%",
				label: "Fat",
				quantity: 24.70365000000096,
			},
			NIA: {
				unit: "%",
				label: "Niacin (B3)",
				quantity: 28.8390364583348,
			},
			RIBF: {
				unit: "%",
				label: "Riboflavin (B2)",
				quantity: 20.37598076923374,
			},
			THIA: {
				unit: "%",
				label: "Thiamin (B1)",
				quantity: 38.76910416667182,
			},
			VITC: {
				unit: "%",
				label: "Vitamin C",
				quantity: 175.144111111222,
			},
			VITD: {
				unit: "%",
				label: "Vitamin D",
				quantity: 0,
			},
			CHOLE: {
				unit: "%",
				label: "Cholesterol",
				quantity: 0,
			},
			FASAT: {
				unit: "%",
				label: "Saturated",
				quantity: 7.117091666667183,
			},
			FIBTG: {
				unit: "%",
				label: "Fiber",
				quantity: 52.12410000000309,
			},
			VITK1: {
				unit: "%",
				label: "Vitamin K",
				quantity: 53.72775,
			},
			CHOCDF: {
				unit: "%",
				label: "Carbs",
				quantity: 17.7943916666726,
			},
			FOLDFE: {
				unit: "%",
				label: "Folate equivalent (total)",
				quantity: 32.71829166667956,
			},
			PROCNT: {
				unit: "%",
				label: "Protein",
				quantity: 25.77535333333514,
			},
			TOCPHA: {
				unit: "%",
				label: "Vitamin E",
				quantity: 35.38620000000257,
			},
			VITB12: {
				unit: "%",
				label: "Vitamin B12",
				quantity: 0,
			},
			VITB6A: {
				unit: "%",
				label: "Vitamin B6",
				quantity: 72.77877564103476,
			},
			VITA_RAE: {
				unit: "%",
				label: "Vitamin A",
				quantity: 22.89152777777777,
			},
			ENERC_KCAL: {
				unit: "%",
				label: "Energy",
				quantity: 19.2436291666695,
			},
		},
	},
];

export default function Recipes() {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const toggleSheet = () => {
		if (isSheetOpen) {
			bottomSheetRef.current?.close();
		} else {
			bottomSheetRef.current?.expand();
		}
	};

	const [selectedFilters, setSelectedFilters] = useState<
		Record<string, Set<string>>
	>(
		Object.fromEntries(
			Object.keys(DIET_OPTIONS).map((option) => [option, new Set()]),
		),
	);

	const [isLoadingFilter, setIsLoadingFilter] = useState(false);

	const [searchString, setSearchString] = useState("");
	const [debouncedString, setDebouncedString] = useState("");
	const [searchResult, setSearchResult] = useState<typeof exampleResponse>();

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedString(searchString), 200);
		return () => clearTimeout(handler);
	}, [searchString]);

	useEffect(() => {
		if (debouncedString.length === 0) return;

		RecipeApi.searchRecipes({
			query: debouncedString,
			autocomplete: false,
		}).then((response) => setSearchResult(response.data));
	}, [debouncedString]);

	// Load search preferences
	useEffect(() => {
		UserApi.getSearchPreferences().then((response) => {
			const filters = response.data;
			for (const key in filters) {
				if (!(key in DIET_OPTIONS)) {
					delete filters[key];
				}
			}
			setSelectedFilters((prev) => {
				return {
					...prev,
					...Object.fromEntries(
						Object.entries(filters).map(([filterKey, options]) => [
							filterKey,
							new Set(options),
						]),
					),
				};
			});
		});
	}, []);

	const handleOptionPress = useCallback(
		(filterKey: string, option: string) => {
			setSelectedFilters((prev) => {
				const current = { ...prev };
				if (current[filterKey].has(option)) {
					current[filterKey].delete(option);
				} else {
					current[filterKey].add(option);
				}
				return current;
			});
		},
		[],
	);

	const handleApplyFilter = useCallback(async () => {
		setIsLoadingFilter(true);

		try {
			await UserApi.setSearchPreferences(
				Object.fromEntries(
					Object.entries(selectedFilters).map(
						([filterKey, options]) => [
							filterKey,
							Array.from(options),
						],
					),
				),
			);

			if (debouncedString.length > 0) {
				const response = await RecipeApi.searchRecipes({
					query: debouncedString,
					autocomplete: false,
				});
				setSearchResult(response.data);
			}
		} finally {
			setIsLoadingFilter(false);
			bottomSheetRef.current?.close();
		}
	}, [selectedFilters, debouncedString]);

	return (
		<View style={{ flex: 1 }}>
			<PageWithIcons style={{ flex: 1, gap: Layout.gap.md }}>
				<Text style={styles.headerStyle}>Recipes</Text>
				<View
					style={[
						{
							gap: Layout.gap.md,
						},
						styles.centerRow,
					]}
				>
					<View style={{ flexGrow: 1, position: "relative" }}>
						<TextInput
							style={styles.inputStyles}
							value={searchString}
							onChangeText={setSearchString}
						></TextInput>
						<Search
							color={Colors.gray[400]}
							style={{
								position: "absolute",
								top: 16,
								left: 10,
							}}
						></Search>
					</View>

					<Pressable onPress={toggleSheet}>
						<Settings2></Settings2>
					</Pressable>
				</View>
				{debouncedString.length > 0 ? (
					<FlatList
						data={searchResult}
						contentContainerStyle={{ gap: Layout.gap.sm }}
						ListHeaderComponent={
							<Text weight="light">
								<Text weight="bold">
									{searchResult?.length ?? 0}
								</Text>{" "}
								recipes found
							</Text>
						}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item._id}
						renderItem={(item) => (
							<View
								style={[
									{
										flexDirection: "row",
										borderRadius: Layout.radius.md,
										borderWidth: Layout.border.sm,
										borderColor: Colors.gray[300],
										backgroundColor: Colors.white,
										padding: Layout.padding.sm,
									},
								]}
							>
								<Image
									source={{
										uri: item.item.image_url,
									}}
									style={{
										width: 80,
										height: 80,
										borderRadius: Layout.radius.md,
										marginRight: Layout.margin.sm,
									}}
								/>
								<View
									style={{
										flex: 1,
										gap: Layout.gap.xs,
										justifyContent: "space-evenly",
									}}
								>
									<Text
										weight="semibold"
										numberOfLines={1}
										style={{ flexShrink: 1 }}
									>
										{item.item.recipe_name}
									</Text>
									<View
										style={[
											styles.centerRow,
											{ gap: Layout.gap.sm },
										]}
									>
										<Flame
											size={15}
											color={Colors.orange[500]}
										></Flame>
										<Text
											color={Colors.gray[500]}
											size={Typography.fontSize.sm}
										>
											<Text
												weight="medium"
												color={Colors.black}
												size={Typography.fontSize.sm}
											>
												{item.item.calories.toFixed(0)}
											</Text>{" "}
											cal
										</Text>
										<Text color={Colors.gray[300]}>|</Text>
										<Users
											size={15}
											color={Colors.orange[500]}
										></Users>
										<Text
											color={Colors.gray[500]}
											size={Typography.fontSize.sm}
										>
											<Text
												weight="medium"
												color={Colors.black}
												size={Typography.fontSize.sm}
											>
												{item.item.servings}
											</Text>{" "}
											servings
										</Text>
									</View>

									<View
										style={[
											styles.centerRow,
											{
												gap: Layout.gap.xs,
												flexWrap: "wrap",
											},
										]}
									>
										{item.item.health_labels
											.slice(0, 2)
											.map((label) => (
												<Text
													key={label}
													size={
														Typography.fontSize.xs
													}
													weight="light"
													style={{
														backgroundColor:
															Colors.gray[100],
														paddingHorizontal:
															Layout.padding.sm,
														paddingVertical: 2,
														borderRadius:
															Layout.radius.md,
													}}
												>
													{label}
												</Text>
											))}
										{item.item.health_labels.length > 2 && (
											<Text
												size={Typography.fontSize.xs}
												weight="light"
												color={Colors.gray[500]}
												style={{
													borderColor:
														Colors.gray[100],
													borderWidth:
														Layout.border.sm,
													paddingHorizontal:
														Layout.padding.sm,
													paddingVertical: 2,
													borderRadius:
														Layout.radius.md,
												}}
											>
												+
												{item.item.health_labels
													.length - 2}
											</Text>
										)}
									</View>
								</View>
							</View>
						)}
					></FlatList>
				) : (
					<View style={{ gap: Layout.gap.md }}>
						<Text style={styles.header2Style}>Categories</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								gap: Layout.gap.md,
							}}
						>
							{DIET_OPTIONS.meal_type.map((item) => (
								<Text
									key={item}
									style={{
										backgroundColor: Colors.gray[100],
										padding: Layout.padding.sm,
										paddingHorizontal: Layout.padding.md,
										borderRadius: Layout.radius.lg,
										color: Colors.gray[600],
									}}
								>
									{item}
								</Text>
							))}
						</ScrollView>
					</View>
				)}
			</PageWithIcons>

			{/* Filter sheet */}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				enablePanDownToClose
				onChange={(e) => setIsSheetOpen(e !== -1)}
				handleIndicatorStyle={{
					backgroundColor: Colors.gray[400],
				}}
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,

					elevation: 5,
				}}
			>
				<BottomSheetScrollView>
					<View style={[styles.centerRow, styles.sheetPadding]}>
						<Text style={[styles.header2Style, { flex: 1 }]}>
							Filters
						</Text>
						<Pressable
							onPress={() => bottomSheetRef.current?.close()}
						>
							<X color={Colors.gray[500]}></X>
						</Pressable>
					</View>

					<View>
						{Object.keys(DIET_OPTIONS).map((item, keyIdx) => (
							<FilterSection
								key={item}
								filterKey={item}
								selectedOptions={selectedFilters[item]}
								onOptionPress={(option) => {
									handleOptionPress(item, option);
								}}
								style={[
									styles.sheetPadding,
									{
										borderTopWidth:
											keyIdx >= 0 ? Layout.border.sm : 0,
										borderColor: Colors.gray[200],
									},
								]}
							></FilterSection>
						))}
					</View>

					<View style={styles.sheetPadding}>
						<Button
							onPress={handleApplyFilter}
							disabled={isLoadingFilter}
							icon={isLoadingFilter && <Spinner></Spinner>}
						>
							Apply
						</Button>
					</View>
				</BottomSheetScrollView>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	centerRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	inputStyles: {
		flexGrow: 1,
		fontSize: Typography.fontSize.md,
		backgroundColor: Colors.white,
		paddingRight: Layout.padding.md,
		paddingVertical: Layout.padding.md,
		paddingLeft: 36,
		borderRadius: Layout.radius.md,
		borderWidth: Layout.border.md,
		borderColor: Colors.gray[200],
	},
	headerStyle: {
		fontFamily: Typography.fontFamily.bold,
		fontSize: Typography.fontSize["3xl"],
	},
	header2Style: {
		fontFamily: Typography.fontFamily.bold,
		fontSize: Typography.fontSize["2xl"],
	},
	header3Style: {
		fontFamily: Typography.fontFamily.semibold,
		fontSize: Typography.fontSize["lg"],
	},
	optionsView: {
		flexDirection: "row",
		gap: Layout.gap.sm,
		flexWrap: "wrap",
		width: "100%",
		marginTop: Layout.margin.sm,
	},
	sheetPadding: {
		padding: Layout.padding.md,
	},
});
