import { adminApi } from "@/api/admin";
import ImageUpload from "@/components/ImageUpload";
import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import React, { useState } from "react";

const AddAdminWalletModal = ({
	closeModal,
	refreshWallets,
}: {
	closeModal: () => void;
	refreshWallets: () => Promise<IAdminWallet[]>;
}) => {
	const [name, setName] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);

	// Handler for image change
	const handleImageChange = (file: File) => {
		setImage(file);
	};

	// Handler for adding a new wallet (to be implemented)
	const handleAddWallet = async () => {
		// Validate inputs
		if (!name || !image) {
			return;
		}

		// Prepare form data
		const formData = new FormData();
		console.log(image);
		formData.append("icon", image);
		formData.append("name", name);

		console.log(Object.fromEntries(formData));
		try {
			// Send request to add admin wallet
			await adminApi.addAdminWallet(formData);
			closeModal();
			await refreshWallets();
		} catch (error) {
			console.error("Failed to add admin wallet:", error);
			alert("Failed to add admin wallet. Please try again.");
		}
	};

	return (
		<Modal
			searchPart={false}
			closeModal={closeModal}
			title="Add admin wallet"
			handleNext={handleAddWallet}
		>
			<TextInput
				inputText="Name:"
				placeholderText={"Enter the name of the wallet..."}
				value={name}
				setValue={e => setName(e.target.value)}
				icon={<></>}
			/>
			<ImageUpload
				title="Wallet image"
				currentImage={image}
				onImageChange={handleImageChange}
			/>
		</Modal>
	);
};

export default AddAdminWalletModal;
