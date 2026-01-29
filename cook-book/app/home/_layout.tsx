import { Colors } from "@/constants";
import { Tabs } from "expo-router";
import { ChefHat, Heart, Settings, ShoppingBasket } from "lucide-react-native";

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
						<ChefHat color={color} size={size} />
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
				name="favorites"
				options={{
					title: "Favorites",
					tabBarIcon: ({ color, size }) => (
						<Heart color={color} size={size} />
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
