import { IUser, RequestError } from "@/types";
import { fetchCustom } from "./default";

export const authApi = {
	login: (email: string, password: string) =>
		fetchCustom<{ jwt: string }>("/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),

	logout: () => fetchCustom<void>("/logout", { method: "POST" }),

	register: (email: string, password: string) =>
		fetchCustom<IUser>("/register", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		}),
};
