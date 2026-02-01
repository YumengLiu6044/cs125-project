import { Colors } from "@/constants";
import { Tabs } from "expo-router";
import {
	Bookmark,
	ChefHat,
	Heart,
	Settings,
	ShoppingBasket,
	Utensils,
} from "lucide-react-native";

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				animation: "none",
				tabBarActiveTintColor: Colors.orange[500],
				tabBarInactiveTintColor: Colors.gray[400], // optional but nice
			}}
		>
			<Tabs.Screen
				name="recipes"
				options={{
					title: "Recipes",
					tabBarIcon: ({ color, size }) => (
						<Utensils color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="groceries"
				options={{
					title: "Groceries",
					tabBarIcon: ({ color, size }) => (
						<ShoppingBasket color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="saved"
				options={{
					title: "Saved",
					tabBarIcon: ({ color, size, focused }) => (
						<Bookmark
							color={color}
							size={size}
							fillOpacity={focused ? 1 : 0}
							fill={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Settings color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
