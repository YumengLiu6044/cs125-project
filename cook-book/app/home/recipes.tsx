import PageWithIcons from "@/components/PageWithIcons";
import Text from "@/components/Text";
import {
	Colors,
	DIET_OPTIONS,
	Layout,
	RECIPE_PAGE_SIZE,
	Typography,
} from "@/constants";
import { Flame, Search, Settings2, Users, X } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Pressable,
	StyleSheet,
	TextInput,
	View,
	Image,
	FlatList,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Button from "@/components/Button";
import FilterSection from "@/components/FilterSection";
import { UserApi } from "@/api/userApi";
import Spinner from "@/components/Spinner";
import { RecipeApi } from "@/api/recipeApi";

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
	const [searchResult, setSearchResult] = useState<Record<string, any>[]>([]);
	const [totalSearchResultCount, setTotalSearchResultCount] = useState(0);
	const [isLoadingQuery, setIsLoadingQuery] = useState(false);
	const [isLoadingExtra, setIsLoadingExtra] = useState(false);
	const [pageIndex, setPageIndex] = useState(0);

	const isEndReached =
		pageIndex >= Math.floor(totalSearchResultCount / RECIPE_PAGE_SIZE);

	const updateSearchResult = useCallback(
		(debouncedString: string, pageIndex: number) => {
			if (debouncedString.length === 0) return;
			if (isLoadingQuery) return;

			setIsLoadingQuery(true);
			RecipeApi.searchRecipes({
				query: debouncedString,
				page_index: pageIndex,
				autocomplete: false,
				...Object.fromEntries(
					Object.entries(selectedFilters).map(
						([filterKey, options]) => [
							filterKey,
							Array.from(options),
						],
					),
				)

			})
				.then((response) => {
					const data = response.data;
					setSearchResult(data.recipes);
					setTotalSearchResultCount(data.totalCount[0].count);
				})
				.finally(() => setIsLoadingQuery(false));
		},
		[selectedFilters],
	);

	const handleOnEndReached = useCallback(() => {
		if (isEndReached) return;

		setIsLoadingExtra(true);
		setPageIndex((prev) => {
			console.log("Loading page: ", prev + 1)
			RecipeApi.searchRecipes({
				query: debouncedString,
				page_index: prev + 1,
				autocomplete: false,
				...Object.fromEntries(
					Object.entries(selectedFilters).map(
						([filterKey, options]) => [
							filterKey,
							Array.from(options),
						],
					),
				)
			})
				.then((response) => {
					setSearchResult((prevResult) => [
						...prevResult,
						...response.data.recipes,
					]);
				})
				.finally(() => setIsLoadingExtra(false));

			return prev + 1;
		});
	}, [debouncedString, isEndReached, selectedFilters]);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedString(searchString), 200);
		return () => clearTimeout(handler);
	}, [searchString]);

	useEffect(() => {
		setPageIndex(0);
		setTotalSearchResultCount(0);
		updateSearchResult(debouncedString, 0);
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

	const handleApplyFilter = useCallback(() => {
		setPageIndex(0);
		setTotalSearchResultCount(0);

		setIsLoadingFilter(true);

		try {
			UserApi.setSearchPreferences(
				Object.fromEntries(
					Object.entries(selectedFilters).map(
						([filterKey, options]) => [
							filterKey,
							Array.from(options),
						],
					),
				),
			);

			updateSearchResult(debouncedString, 0);
		} finally {
			setIsLoadingFilter(false);
			bottomSheetRef.current?.close();
		}
	}, [selectedFilters, debouncedString, updateSearchResult]);

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
						onEndReached={handleOnEndReached}
						onEndReachedThreshold={0.7}
						data={searchResult}
						contentContainerStyle={{ gap: Layout.gap.sm }}
						ListHeaderComponent={
							<Text weight="light">
								<Text weight="bold">
									{totalSearchResultCount}
								</Text>{" "}
								recipes found
							</Text>
						}
						ListFooterComponent={
							<View
								style={{
									width: "100%",
									flexDirection: "row",
									justifyContent: "center",
								}}
							>
								{isEndReached ? (
									<Text>You've reached the end</Text>
								) : isLoadingExtra ? (
									<Spinner color={Colors.gray[300]}></Spinner>
								) : null}
							</View>
						}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
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
										uri: item.image_url,
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
										{item.recipe_name}
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
												{item.calories.toFixed(0)}
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
												{item.servings}
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
										{item.health_labels
											.slice(0, 2)
											.map((label: string) => (
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
										{item.health_labels.length > 2 && (
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
												+{item.health_labels.length - 2}
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
