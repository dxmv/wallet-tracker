// API calls to user routes
import { IUser, IWallet } from "@/types";
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
};
