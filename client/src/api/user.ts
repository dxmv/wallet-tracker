// API calls to user routes
import { IUser } from "@/types";
import { fetchCustom } from "./default";
import { getCookie } from "@/utils/cookies";

export const userApi = {
	getAllUsers: () =>
		fetchCustom<Array<IUser>>("/users/all", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	getCurrentUser: () =>
		fetchCustom<IUser>("/users/current", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
