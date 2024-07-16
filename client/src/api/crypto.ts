import { fetchCustom } from "./default";
import { ICrypto } from "@/types";
import { getCookie } from "@/utils/cookies";

export const cryptoApi = {
	addCrypto: (walletId: number, crypto: Omit<ICrypto, "id">) =>
		fetchCustom<ICrypto>(`/crypto/${walletId}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
			body: JSON.stringify(crypto),
		}),
	getAllCryptoForUser: () =>
		fetchCustom<Array<ICrypto>>("/crypto/", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
