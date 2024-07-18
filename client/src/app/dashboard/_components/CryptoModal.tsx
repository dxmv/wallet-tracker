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

// first stage show crypto list
// second stage show wallet list and amount input
const CryptoModal = ({ closeModal }: { closeModal: () => void }) => {
	const [stage, setStage] = useState<number>(1); // what stage are we in?
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [walletId, setWalletId] = useState<number | null>(null);
	const [amount, setAmount] = useState<number>(0);

	// for search in modal
	const [search, setSearch] = useState<string>("");

	const crypto = useCrypto();

	const handleNext = async () => {
		if (stage == 1 && selectedId != null) {
			await setStage(prev => prev + 1);
		} else if (stage == 2 && selectedId && walletId && amount > 0) {
			// can only add if we selected the crypto wallet and entered a valid value for the amount
			const payload: Omit<ICrypto, "id"> = {
				name: crypto[selectedId - 1].name,
				imageURL: crypto[selectedId - 1].image,
				ticker: crypto[selectedId - 1].symbol,
				amount,
			};
			const c = await cryptoApi.addCrypto(walletId, payload);
			closeModal();
		}
	};

	const handleBack = () => {
		setStage(prev => prev - 1);
	};

	const getCoins = async () => {
		return crypto;
	};

	// optimized rendering the list of cryptos
	const renderCryptoList = useCallback(
		() => (
			<MyList
				apiCall={getCoins}
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
		),
		[selectedId, setSelectedId, search, getCoins]
	);

	// optimized the second step
	const renderSecondStage = useCallback(
		() => (
			<>
				<MyList
					apiCall={walletApi.getAllWallets}
					renderItem={item => (
						<SelectItemWrapper
							selectedId={walletId}
							setSelectedId={setWalletId}
							itemId={item.id}
						>
							<WalletListItem item={item} />
						</SelectItemWrapper>
					)}
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
		[walletId, setWalletId, amount]
	);

	return (
		<Modal
			title={`Add crypto`}
			closeModal={closeModal}
			handleNext={handleNext}
			search={search}
			setSearch={setSearch}
		>
			{stage == 1 ? renderCryptoList() : renderSecondStage()}
		</Modal>
	);
};

export default CryptoModal;
