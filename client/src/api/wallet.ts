import { IWallet } from "@/types";
import { fetchCustom } from "./default";
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
	getAllWallets: () =>
		fetchCustom<Array<IWallet>>("/wallets/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	updateWalletName: (walletId: number, newWalletName: string) =>
		fetchCustom<IWallet>(`/wallets/name/${walletId}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
			body: newWalletName,
		}),
	deleteWallet: (id: number) =>
		fetchCustom(`/wallets/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
