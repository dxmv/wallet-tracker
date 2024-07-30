"use client";
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
import { handleErrorToast, showSuccessToast } from "@/utils/toasts";
import React, { useCallback, useState } from "react";

// first stage show crypto list
// second stage show wallet list and amount input
const CryptoModal = ({
	closeModal,
	refetchCoins,
}: {
	closeModal: () => void;
	refetchCoins: () => void;
}) => {
	const [stage, setStage] = useState<number>(1); // what stage are we in?
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [walletId, setWalletId] = useState<number | null>(null);
	const [amount, setAmount] = useState<string>("");

	// for search in modal
	const [search, setSearch] = useState<string>("");

	const crypto = useCrypto();

	const handleNext = async () => {
		if (stage == 1 && selectedId != null) {
			await setStage(prev => prev + 1);
		} else if (stage == 2 && selectedId && walletId) {
			const selectedCrypto = crypto.get(selectedId);
			const newAmount = Number.parseInt(amount);
			if (!selectedCrypto || newAmount < 0) {
				return;
			}
			try {
				// can only add if we selected the crypto wallet and entered a valid value for the amount
				const payload: Omit<ICrypto, "id"> = {
					name: selectedCrypto.name,
					imageUrl: selectedCrypto.image as string,
					ticker: selectedCrypto.symbol,
					apiId: selectedCrypto.id as string,
					amount: newAmount,
				};
				const data = await cryptoApi.addCrypto(walletId, payload);
				showSuccessToast(`Successfully added ${data.name}`);
				refetchCoins();
				closeModal();
			} catch (e) {
				handleErrorToast(e);
			}
		}
	};

	// optimized rendering the list of cryptos
	const renderCryptoList = useCallback(() => {
		const getCoins = async () => {
			return Array.from(crypto.values());
		};
		return (
			<MyList
				apiCall={getCoins}
				containerWidth={480}
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
		);
	}, [selectedId, setSelectedId, search]);

	// optimized the second step
	const renderSecondStage = useCallback(
		() => (
			<>
				<MyList
					apiCall={walletApi.getAllWallets}
					containerWidth={480}
					renderItem={item => (
						<SelectItemWrapper
							selectedId={walletId}
							setSelectedId={setWalletId}
							itemId={item.id}
						>
							{/* have to add props so it can render the wallet */}
							<WalletListItem
								item={item}
								totalValue={0}
								cryptoMap={new Map()}
							/>
						</SelectItemWrapper>
					)}
				/>
				<TextInput
					inputText="Amount"
					placeholderText={amount}
					value={amount}
					setValue={e => setAmount(e.target.value)}
					icon={<></>}
				/>
				<button onClick={() => setStage(1)}>Back</button>
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
