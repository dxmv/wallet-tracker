import { IAdminWallet, IUser } from "@/types";
import { fetchCustom } from "./default";
import { getCookie } from "@/utils/cookies";

export const adminApi = {
	getAllAdminWallets: () =>
		fetchCustom<Array<IAdminWallet>>("/admin/wallets", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	addAdminWallet: (formData: FormData) =>
		fetchCustom<IAdminWallet>("/admin/wallets", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
			body: formData,
		}),
	deleteAdminWallet: (id: number) =>
		fetchCustom<{ message: string }>(`/admin/wallets/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),

	promoteUser: (id: number) =>
		fetchCustom<IUser>(`/admin/promote/${id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
	demoteUser: (id: number) =>
		fetchCustom<IUser>(`/admin/demote/${id}`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${getCookie("token")}`,
			},
		}),
};
