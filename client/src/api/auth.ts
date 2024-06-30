import { IUser, RequestError } from "@/types";

// API calls to auth routes
const API_URL = "http://localhost:8080/api/auth";

async function fetchWithAuth<T>(
	endpoint: string,
	options: RequestInit
): Promise<T> {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			...options.headers,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const error: RequestError = await response.json();
		throw new Error(error.message || "An error occurred, try again");
	}

	return response.json();
}

export const authApi = {
	login: (email: string, password: string) =>
		fetchWithAuth<{ jwt: string }>("/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),

	logout: () => fetchWithAuth<void>("/logout", { method: "POST" }),

	register: (email: string, password: string) =>
		fetchWithAuth<IUser>("/register", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),

	checkAuth: () => fetchWithAuth<void>("/check", { method: "GET" }),
};
