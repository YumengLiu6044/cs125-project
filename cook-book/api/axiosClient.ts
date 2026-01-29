import { BACKEND_URL } from "@/constants";
import useAuthStore from "@/context/authStore";
import axios from "axios";
import { toast } from "sonner-native";

const axiosClient = axios.create({
	baseURL: BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState();
	if (token && !config.headers.Authorization) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const response = error.response;
		const status = response?.status;
		const data = response?.data;

		// extract detail safely
		const detail = data?.detail;

		if (status === 401) {
			useAuthStore.getState().logout();
			return Promise.resolve({ data: null });
		}

		let message = "An unexpected error occurred";

		if (typeof detail === "string") {
			message = detail;
		} else if (Array.isArray(detail) && detail.length > 0) {
			message = detail[0].msg || message;
		} else if (status) {
			// fallback: include status text or code if detail is missing
			message = data?.message || `Request failed with status ${status}`;
		}

		return Promise.reject(new Error(message));
	},
);
export default axiosClient;
