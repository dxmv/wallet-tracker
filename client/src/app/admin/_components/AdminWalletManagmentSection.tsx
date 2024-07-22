"use client";
import { adminApi } from "@/api/admin";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import Modal from "@/components/Modal";
import { useState } from "react";

// Component for managing admin wallets
export const AdminWalletSection = () => {
	const [addWalletModal, setAddWalletModal] = useState<boolean>(false);

	// Handler for deleting an admin wallet
	const handleDelete = async (id: number) => {
		if (!id) return;
		try {
			await adminApi.deleteAdminWallet(id);
		} catch (e) {
			console.error("Error deleting admin wallet:", e);
		}
	};

	// Handler for adding a new wallet (to be implemented)
	const handleAddWallet = async () => {
		// Implementation pending
	};

	return (
		<div>
			<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
				Admin wallets
			</h1>
			<MyList
				apiCall={adminApi.getAllAdminWallets}
				renderItem={item => (
					<EditAndDeleteItemWrapper
						id={item.id}
						name={item.name as string}
						onDelete={handleDelete}
					>
						<AdminWalletListItem item={item} />
					</EditAndDeleteItemWrapper>
				)}
			/>
			<button onClick={() => setAddWalletModal(true)}>Add a wallet</button>
			{addWalletModal && (
				<Modal
					searchPart={false}
					closeModal={() => setAddWalletModal(false)}
					title="Add admin wallet"
					handleNext={handleAddWallet}
				/>
			)}
		</div>
	);
};
