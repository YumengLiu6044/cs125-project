import PageWithIcons from "@/components/PageWithIcons";
import Text from "@/components/Text";
import { Colors, DIET_OPTIONS, Layout, Typography } from "@/constants";
import { Search, Settings2, X } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import FilterSection from "@/components/FilterSection";
import { UserApi } from "@/api/userApi";
import Spinner from "@/components/Spinner";

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

	const handleApplyFilter = useCallback(() => {
		setIsLoadingFilter(true);
		console.log(
			Object.fromEntries(
				Object.entries(selectedFilters).map(([filterKey, options]) => [
					filterKey,
					Array.from(options),
				]),
			),
		);
		UserApi.setSearchPreferences(
			Object.fromEntries(
				Object.entries(selectedFilters).map(([filterKey, options]) => [
					filterKey,
					Array.from(options),
				]),
			),
		).finally(() => setIsLoadingFilter(false));
	}, [selectedFilters]);

	return (
		<View style={{ flex: 1 }}>
			<PageWithIcons style={{ flex: 1, gap: Layout.gap.md }}>
				<Text style={styles.headerStyle}>Discover Recipes</Text>
				<View
					style={[
						{
							gap: Layout.gap.md,
						},
						styles.centerRow,
					]}
				>
					<View style={{ flexGrow: 1, position: "relative" }}>
						<TextInput style={styles.inputStyles}></TextInput>
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
