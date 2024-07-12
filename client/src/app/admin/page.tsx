import ListAdminWallets from "@/components/ListAdminWallets";
import React from "react";

// Page only accessible by admins
const AdminDashboard = () => {
	// check if the user is admin, if the user isn't an admin redirect to dashboard
	return (
		<main className="flex" style={{ height: "80vh" }}>
			<div className="w-1/2 p-4">
				<div className="flex justify-between">
					<h1>Wallets</h1>
					<button>+</button>
				</div>
				<ListAdminWallets />
			</div>
			<div className="w-1/2 p-4">
				<h1>Tickets</h1>
			</div>
		</main>
	);
};

export default AdminDashboard;
