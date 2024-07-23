"use client";
import ImageUpload from "@/components/ImageUpload";
import Modal from "@/components/Modal";
import { TextInput } from "@/components/TextInput";
import React, { useState } from "react";

const AdminWalletModal = ({
	title,
	closeModal,
	handleNext,
	givenName = "",
}: {
	title: string;
	closeModal: () => void;
	handleNext: (name: string, image: File | null) => void;
	givenName?: string;
}) => {
	const [name, setName] = useState<string>(givenName);
	const [image, setImage] = useState<File | null>(null);

	// Handler for image change
	const handleImageChange = (file: File) => {
		setImage(file);
	};

	return (
		<Modal
			searchPart={false}
			closeModal={closeModal}
			title={title}
			handleNext={async () => await handleNext(name, image)}
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

export default AdminWalletModal;
