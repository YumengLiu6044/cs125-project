export function capitalizeWords(str: string, delimeter=" ") {
	if (!str) return "";
	return str
		.split(delimeter)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}