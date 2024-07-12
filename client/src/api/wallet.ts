import { IWallet } from "@/types";
import { fetchCustom } from "./defaul";
import { getCookie } from "@/utils/cookies";

export const walletApi = {
	addWallet: (adminWalletId: number) =>
		fetchCustom<IWallet>(`/wallets/${adminWalletId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	getOneWallet: (walletId: number) =>
		fetchCustom<IWallet>(`/wallets/${walletId}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
