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
import { handleErrorToast } from "@/utils/toasts";
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
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [amount, setAmount] = useState<string>("");

	// for search in modal
	const [search, setSearch] = useState<string>("");

	const crypto = useCrypto();

	const handleNext = async () => {
		try {
			const newAmount = Number.parseInt(amount);
			// can only add if we selected the crypto wallet and entered a valid value for the amount
			if (selectedId == null || newAmount <= 0) {
				throw new Error(
					"You must selected a crypto and input a valid number (number>0)"
				);
			}
			const currentCrypto = crypto.get(selectedId);

			if (!currentCrypto) {
				throw new Error("Crypto not found");
			}

			const payload: Omit<ICrypto, "id"> = {
				name: currentCrypto.name,
				imageUrl: currentCrypto.image as string,
				ticker: currentCrypto.symbol,
				apiId: currentCrypto.id as string,
				amount: newAmount,
			};
			await cryptoApi.addCrypto(walletId, payload);
			await refreshWallet();
			closeModal();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// optimized rendering the list of cryptos
	const renderCryptoList = useCallback(
		() => (
			<>
				<MyList
					apiCall={async () => await Array.from(crypto.values())}
					renderItem={item => (
						<SelectItemWrapper
							selectedId={selectedId}
							setSelectedId={setSelectedId}
							itemId={item.id as string}
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
					setValue={e => setAmount(e.target.value)}
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
