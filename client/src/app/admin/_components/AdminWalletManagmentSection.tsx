"use client";
import { adminApi } from "@/api/admin";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import { useCallback, useState } from "react";
import AdminWalletModal from "./AdminWalletModal";
import { IAdminWallet } from "@/types";
import {
	handleErrorToast,
	showSuccessToast,
	showWarningToast,
} from "@/utils/toasts";

// Component for managing admin wallets
export const AdminWalletSection = () => {
	const [addWalletModal, setAddWalletModal] = useState<boolean>(false);
	// keeps the track of the selected id for edit
	const [editAdminWallet, setEditAdminWallet] = useState<IAdminWallet | null>(
		null
	);
	// State to trigger refetch
	const [refetchTrigger, setRefetchTrigger] = useState(0);

	// Callback to refetch users
	const refetchWallets = useCallback(() => {
		setRefetchTrigger(prev => prev + 1);
	}, []);

	// Handler for deleting an admin wallet
	const handleDelete = async (id: number) => {
		if (!id) return;
		try {
			await adminApi.deleteAdminWallet(id);
			showSuccessToast("Successfully deleted a wallet");
			refetchWallets();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// Handler for adding a new wallet (to be implemented)
	const handleAddWallet = async (name: string, image: File | null) => {
		// Validate inputs
		if (!name || !image) {
			showWarningToast("You haven't typed a name, or selected an image");
			return;
		}

		// Prepare form data
		const formData = new FormData();
		formData.append("icon", image);
		formData.append("name", name);

		try {
			// Send request to add admin wallet
			await adminApi.addAdminWallet(formData);
			setAddWalletModal(false); // close the modal
			showSuccessToast("Successfully added a wallet");
			refetchWallets();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	const handleEditWallet = async (name: string, image: File | null) => {
		// Validate inputs
		if (!name || !image || !editAdminWallet) {
			showWarningToast("You haven't typed a name, or selected an image");
			return;
		}
		// Prepare form data
		const formData = new FormData();
		formData.append("icon", image);
		formData.append("name", name);

		try {
			// Send request to add admin wallet
			await adminApi.updateAdminWallet(editAdminWallet.id, formData);
			setEditAdminWallet(null); // close the modal
			showSuccessToast("Successfully updated a wallet");
			refetchWallets();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	const apiCall = useCallback(() => {
		return adminApi.getAllAdminWallets();
	}, [refetchTrigger]);

	return (
		<div>
			<h1 className="font-bold text-2xl pb-2 border-b-2 border-b-gray-300 mb-8">
				Admin wallets
			</h1>
			<MyList
				apiCall={apiCall}
				renderItem={item => (
					<EditAndDeleteItemWrapper
						id={item.id}
						onDelete={handleDelete}
						onEdit={() => setEditAdminWallet(item)} // open edit modal and set the id of wallet
						renderEditModal={
							<AdminWalletModal
								title={`Edit ${editAdminWallet?.name}`}
								givenName={
									editAdminWallet ? (editAdminWallet.name as string) : ""
								}
								closeModal={() => {}} // This will be overwritten by the wrapper
								handleNext={async (name, image) =>
									await handleEditWallet(name, image)
								}
							/>
						}
					>
						<AdminWalletListItem item={item} />
					</EditAndDeleteItemWrapper>
				)}
			/>
			<button onClick={() => setAddWalletModal(true)}>Add a wallet</button>
			{addWalletModal && (
				<AdminWalletModal
					title="Add Admin Wallet"
					closeModal={() => setAddWalletModal(false)}
					handleNext={handleAddWallet}
				/>
			)}
		</div>
	);
};
