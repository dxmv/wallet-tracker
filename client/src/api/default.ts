import { RequestError } from "@/types";

// main route
const API_URL = "http://localhost:8080/api";

export async function fetchCustom<T>(
	endpoint: string,
	options: RequestInit
): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			...options.headers,
		},
	});

	if (!response.ok) {
		const error: RequestError = await response.json();
		throw new Error(error.message || "An error occurred, try again");
	}

	return response.json();
}
