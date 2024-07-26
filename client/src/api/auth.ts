import { IUser, RequestError } from "@/types";
import { fetchCustom } from "./default";

export const authApi = {
	login: (email: string, password: string) =>
		fetchCustom<{ jwt: string }>("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}),

	logout: () => fetchCustom<void>("/logout", { method: "POST" }),

	register: (email: string, password: string) =>
		fetchCustom<IUser>("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}),
};
