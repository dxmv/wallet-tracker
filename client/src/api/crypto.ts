import { fetchCustom } from "./default";
import { ICrypto, IWallet } from "@/types";
import { getCookie } from "@/utils/cookies";

export const cryptoApi = {
	addCrypto: (walletId: number, crypto: Omit<ICrypto, "id">) =>
		fetchCustom<ICrypto>(`/crypto/${walletId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(crypto),
		}),
	getWalletsByName: (name: string) =>
		fetchCustom<Array<IWallet>>(`/crypto/name/${name}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	getAllCryptoForUser: () =>
		fetchCustom<Array<ICrypto>>("/crypto/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	deleteCrypto: (id: number) =>
		fetchCustom(`/crypto/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	changeAmount: (id: number, amount: number) =>
		fetchCustom<ICrypto>(`/crypto/${id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
				"Content-Type": "application/json", // Add this line
			},
			body: JSON.stringify(amount), // Change this line
		}),
};
