"use client";
import React from "react";
import { UserManagementSection } from "./_components/UserManagmentSection";
import { AdminWalletSection } from "./_components/AdminWalletManagmentSection";

// Page only accessible by admins
const AdminDashboard = () => {
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
