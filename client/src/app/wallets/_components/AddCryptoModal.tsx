"use client";
import { adminApi } from "@/api/admin";
import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoApiListItem from "@/components/custom list/CryptoApiListItem";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import SelectItemWrapper from "@/components/custom list/wrappers/SelectItemWrapper";
import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import { useCrypto } from "@/hooks/useCrypto";
import { ICrypto } from "@/types";
import React, { useCallback, useState } from "react";

const AddCryptoModal = ({
	closeModal,
	walletId,
	refreshWallet,
}: {
	closeModal: () => void;
	walletId: number;
	refreshWallet: () => Promise<void>;
}) => {
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [amount, setAmount] = useState<number>(0);

	// for search in modal
	const [search, setSearch] = useState<string>("");

	const crypto = useCrypto();

	const handleNext = async () => {
		// can only add if we selected the crypto wallet and entered a valid value for the amount
		if (selectedId == null || amount <= 0) {
			return;
		}
		const payload: Omit<ICrypto, "id"> = {
			name: crypto[selectedId - 1].name,
			imageUrl: crypto[selectedId - 1].image as string,
			ticker: crypto[selectedId - 1].symbol,
			apiId: crypto[selectedId - 1].id as string,
			amount,
		};
		await cryptoApi.addCrypto(walletId, payload);
		await refreshWallet();
		closeModal();
	};

	// optimized rendering the list of cryptos
	const renderCryptoList = useCallback(
		() => (
			<>
				<MyList
					apiCall={async () => await crypto}
					renderItem={item => (
						<SelectItemWrapper
							selectedId={selectedId}
							setSelectedId={setSelectedId}
							itemId={item.market_cap_rank}
						>
							<CryptoApiListItem item={item} />
						</SelectItemWrapper>
					)}
					searchTerm={search}
					searchKeys={["name", "symbol"]}
				/>
				<TextInput
					inputText="Amount"
					placeholderText={amount + ""}
					value={amount + ""}
					setValue={e => setAmount(Number.parseInt(e.target.value))}
					icon={<></>}
				/>
			</>
		),
		[selectedId, setSelectedId, search, amount]
	);

	return (
		<Modal
			title={`Add crypto`}
			closeModal={closeModal}
			handleNext={handleNext}
			search={search}
			setSearch={setSearch}
		>
			{renderCryptoList()}
		</Modal>
	);
};

export default AddCryptoModal;
