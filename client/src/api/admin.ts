import { IAdminWallet } from "@/types";
import { fetchCustom } from "./defaul";
import { getCookie } from "@/utils/cookies";

export const adminApi = {
	getAllAdminWallets: () =>
		fetchCustom<Array<IAdminWallet>>("/admin/wallets", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
