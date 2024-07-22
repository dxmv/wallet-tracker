"use client";
import { adminApi } from "@/api/admin";
import { userApi } from "@/api/user";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { UserManagementSection } from "./_components/UserManagmentSection";
import { AdminWalletSection } from "./_components/AdminWalletManagmentSection";

// Page only accessible by admins
const AdminDashboard = () => {
	const [addWalletModal, setAddWalletModal] = useState<boolean>(false);

	const handleDelete = async (id: number) => {
		if (!id) {
			return;
		}
		try {
			await adminApi.deleteAdminWallet(id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleAddWallet = async () => {};

	const handlePromoteUser = async (id: number) => {
		try {
			await adminApi.promoteUser(id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDemoteUser = async (id: number) => {
		try {
			await adminApi.demoteUser(id);
		} catch (e) {
			console.error(e);
		}
	};

	// check if the user is admin, if the user isn't an admin redirect to dashboard
	return (
		<main
			className="grid px-4"
			style={{
				height: "87vh",
				gridTemplateColumns: "repeat(2,1fr)",
				gridGap: "100px",
			}}
		>
			<AdminWalletSection />
			<UserManagementSection />
		</main>
	);
};

export default AdminDashboard;
