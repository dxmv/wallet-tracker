import { IUser, RequestError } from "@/types";
import { fetchCustom } from "./default";
import { removeCookie } from "@/utils/cookies";

export const authApi = {
	login: (email: string, password: string) =>
		fetchCustom<{ jwt: string }>("/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}),

	logout: () => removeCookie("token"),

	register: (email: string, password: string) =>
		fetchCustom<IUser>("/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		}),
};
