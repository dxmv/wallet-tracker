"use client";
import { adminApi } from "@/api/admin";
import { cryptoApi } from "@/api/crypto";
import AdminWalletListItem from "@/components/custom list/AdminWalletListItem";
import CryptoApiListItem from "@/components/custom list/CryptoApiListItem";
import MyList from "@/components/custom list/MyList";
import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import { useCrypto } from "@/hooks/useCrypto";
import { ICrypto } from "@/types";
import React, { useState } from "react";

// first stage show crypto list
// second stage show wallet list and amount input
const CryptoModal = ({ closeModal }: { closeModal: () => void }) => {
	const [stage, setStage] = useState<number>(1); // what stage are we in?
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const [walletId, setWalletId] = useState<number | null>(null);
	const [amount, setAmount] = useState<number>(0);

	const crypto = useCrypto();

	const handleNext = async () => {
		if (stage == 1 && selectedId) {
			await setStage(prev => prev + 1);
		} else if (stage == 2 && selectedId && walletId) {
			const payload: Omit<ICrypto, "id"> = {
				name: crypto[selectedId - 1].name,
				imageURL: crypto[selectedId - 1].image,
				ticker: crypto[selectedId - 1].symbol,
				amount,
			};
			const c = await cryptoApi.addCrypto(walletId, payload);
		}
	};

	const handleBack = () => {
		setStage(prev => prev - 1);
	};

	const getCoins = async () => {
		return crypto;
	};

	console.log(selectedId);

	return (
		<Modal title={`Add crypto`} closeModal={closeModal} handleNext={handleNext}>
			{stage == 1 ? (
				<MyList
					apiCall={getCoins}
					renderItem={item => (
						<CryptoApiListItem
							item={item}
							selectedId={selectedId}
							setSelectedId={setSelectedId}
						/>
					)}
				/>
			) : (
				<>
					<MyList
						key={selectedId}
						apiCall={adminApi.getAllAdminWallets}
						renderItem={item => (
							<AdminWalletListItem
								item={item}
								selectedId={walletId}
								setSelectedId={setWalletId}
							/>
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
			)}
		</Modal>
	);
};

export default CryptoModal;
