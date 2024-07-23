import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import { ICrypto } from "@/types";
import React, { useState } from "react";

const EditCryptoModal = ({
	item,
	handleEditCrypto,
}: {
	item: ICrypto;
	handleEditCrypto: (id: number, amount: number) => Promise<void>;
}) => {
	const [amount, setAmount] = useState<number>(0);

	return (
		<Modal
			title={`Edit the amount of ${item.name}`}
			closeModal={() => {}} // This will be overwritten by the wrapper
			handleNext={async () => {
				await handleEditCrypto(item.id, amount);
				// Close modal logic will be handled by the wrapper
			}}
			searchPart={false}
		>
			<TextInput
				inputText="Amount"
				placeholderText={amount + ""}
				value={amount + ""}
				setValue={e => setAmount(Number.parseInt(e.target.value))}
				icon={<></>}
			/>
		</Modal>
	);
};

export default EditCryptoModal;
