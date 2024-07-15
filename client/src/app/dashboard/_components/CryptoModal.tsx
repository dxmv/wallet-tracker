"use client";
import CryptoApiListItem from "@/components/custom list/CryptoApiListItem";
import MyList from "@/components/custom list/MyList";
import Modal from "@/components/Modal";
import { useCrypto } from "@/hooks/useCrypto";
import React from "react";

const CryptoModal = ({ closeModal }: { closeModal: () => void }) => {
	const crypto = useCrypto();

	const handleNext = () => {
		console.log("a");
	};

	const getCoins = async () => {
		return crypto;
	};

	return (
		<Modal title={`Add crypto`} closeModal={closeModal} handleNext={handleNext}>
			<MyList
				apiCall={getCoins}
				renderItem={item => <CryptoApiListItem item={item} />}
			/>
		</Modal>
	);
};

export default CryptoModal;
