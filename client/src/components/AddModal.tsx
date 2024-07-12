"use client";
import React, { useState } from "react";
import { TextInput } from "./TextInput";
import { IoMdSearch } from "react-icons/io";
import ListAdminWallets from "./ListAdminWallets";
import { walletApi } from "@/api/wallet";
import { useRouter } from "next/navigation";

export const AddModal = ({
	showing,
	closeModal,
}: {
	showing: any;
	closeModal: () => void;
}) => {
	const [search, setSearch] = useState<string>("");

	const [selectedId, setSelectedId] = useState<number | null>(null);

	const router = useRouter(); // to go to another page

	const handleNext = async () => {
		// check if a wallet is selected
		if (selectedId) {
			try {
				const data = await walletApi.addWallet(selectedId);
				router.push(`/wallets/${data.id}`);
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<div
			style={{
				position: "absolute",
				top: "0px",
				left: "0px",
				width: "100vw",
				height: "100vh",
				zIndex: "100",
				backgroundColor: "rgb(0,0,0,0.5)",
			}}
			className=" flex justify-center items-center text-black"
		>
			<div className="w-1/5 bg-white h-4/5 flex flex-col items-center p-4">
				<div className="w-full flex justify-end">
					<h1 className="font-semibold text-lg text-center">Add {showing}</h1>
					<button onClick={closeModal}>X</button>
				</div>
				{/* Search bar */}
				<TextInput
					placeholderText="Search by name..."
					value={search}
					setValue={e => setSearch(e.target.value)}
					inputText="Search:"
					icon={<IoMdSearch />}
				/>
				{/* List of items */}
				<ListAdminWallets
					selectedId={selectedId}
					setSelectedId={setSelectedId}
				/>
				<button className="border-2 px-3 py-1 mt-6" onClick={handleNext}>
					Next
				</button>
			</div>
		</div>
	);
};
