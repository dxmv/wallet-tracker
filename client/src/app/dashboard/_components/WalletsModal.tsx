"use client";
import { adminApi } from "@/api/admin";
import { walletApi } from "@/api/wallet";
import Modal from "@/components/Modal";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WalletsModal = ({ closeModal }: { closeModal: () => void }) => {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { push } = useRouter();

	const handleNext = async () => {
		// check if a wallet is selected
		if (selectedId) {
			try {
				const data = await walletApi.addWallet(selectedId);
				push(`/wallets/${data.id}`); // redirect
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<Modal
			title={`Add wallets`}
			closeModal={closeModal}
			handleNext={handleNext}
		>
			<MyList
				key={selectedId}
				apiCall={adminApi.getAllAdminWallets}
				renderItem={item => <AdminWalletListItem />}
			></MyList>
		</Modal>
	);
};

export default WalletsModal;
