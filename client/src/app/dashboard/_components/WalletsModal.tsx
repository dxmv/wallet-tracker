"use client";
import { adminApi } from "@/api/admin";
import { walletApi } from "@/api/wallet";
import Modal from "@/components/Modal";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import MyList from "@/components/custom list/MyList";
import SelectItemWrapper from "@/components/custom list/wrappers/SelectItemWrapper";
import { handleErrorToast, showSuccessToast } from "@/utils/toasts";
import React, { useCallback, useState } from "react";

const WalletsModal = ({
	closeModal,
	refetchWallets,
}: {
	closeModal: () => void;
	refetchWallets: () => void;
}) => {
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const [search, setSearch] = useState<string>("");

	const handleNext = async () => {
		// check if a wallet is selected
		if (selectedId != null) {
			try {
				const data = await walletApi.addWallet(selectedId);
				showSuccessToast(`Added wallet: ${data.walletName}`);
				closeModal();
				refetchWallets(); // to re-render wallet list
			} catch (e) {
				handleErrorToast(e);
			}
		}
	};

	// optimized rendering the list of cryptos
	const renderAdminWalletList = useCallback(
		() => (
			<MyList
				apiCall={adminApi.getAllAdminWallets}
				renderItem={item => (
					<SelectItemWrapper
						selectedId={selectedId}
						setSelectedId={setSelectedId}
						itemId={item.id}
					>
						<AdminWalletListItem item={item} />
					</SelectItemWrapper>
				)}
				searchTerm={search}
				searchKeys={["name"]}
			/>
		),
		[selectedId, setSelectedId, search]
	);

	return (
		<Modal
			title={`Add wallets`}
			closeModal={closeModal}
			handleNext={handleNext}
			search={search}
			setSearch={setSearch}
		>
			{renderAdminWalletList()}
		</Modal>
	);
};

export default WalletsModal;
