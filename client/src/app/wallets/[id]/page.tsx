"use client";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import MyList from "@/components/custom list/MyList";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import Modal from "@/components/Modal";
import { IWallet } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import AddCryptoModal from "../_components/AddCryptoModal";

const Wallet = ({ params }: { params: { id: string } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null);
	const [deleteWalletModal, setDeleteWalletModal] = useState<boolean>(false);
	const [addCryptoModal, setAddCryptoModal] = useState<boolean>(false);
	const { push } = useRouter();

	useEffect(() => {
		const fetchWallet = async () => {
			try {
				const wallet = await walletApi.getOneWallet(Number.parseInt(params.id));
				setWallet(wallet);
				console.log(wallet);
			} catch (e) {
				console.error(e);
			}
		};
		fetchWallet();
	}, [params.id]);

	const handleDeleteWallet = async () => {
		if (!wallet) {
			return;
		}
		try {
			await walletApi.deleteWallet(wallet?.id);
			await push("/dashboard");
		} catch (e) {
			console.error(e);
		}
	};

	if (!wallet) {
		return <>a</>;
	}

	return (
		<main className="flex flex-col w-full py-8 px-4" style={{ height: "87vh" }}>
			{/* Wallet info */}
			<div className="flex justify-between pb-4 border-b-2 border-gray-300">
				<div className="flex">
					<img
						src={wallet?.adminWallet.iconUrl}
						alt="Zoki"
						width={240}
						height={240}
						className="rounded-md shadow-md shadow-white"
					/>
					<div className="flex flex-col justify-between ml-3 h-1/2">
						<h1 className="font-bold text-2xl">{wallet?.adminWallet.name}</h1>
						<p>Number of coins: {wallet?.coins.length}</p>
						<p>Amount in dollars: {wallet?.coins.length}</p>
					</div>
				</div>
				<div>
					<FaRegTrashAlt
						className="text-lg text-red-600 cursor-pointer hover:text-red-800"
						onClick={() => setDeleteWalletModal(true)}
					/>
				</div>
			</div>
			{/* Grid of coins */}
			<div className="mt-4"></div>
			<MyList
				apiCall={async () => await wallet.coins}
				renderItem={item => (
					<LinkItemWrapper href="/test">
						<CryptoListItem item={item} image="" />
					</LinkItemWrapper>
				)}
				display="grid"
			/>
			{/* Button for adding crypto */}
			<button onClick={() => setAddCryptoModal(true)}>Add crypto</button>

			{/* Show the delete wallet modal */}
			{deleteWalletModal && (
				<Modal
					closeModal={() => setDeleteWalletModal(false)}
					handleNext={handleDeleteWallet}
					searchPart={false}
					title="Confirm"
					search=""
					setSearch={() => {}}
				>
					<div>
						<p>
							Are you sure you want to delete the wallet with id {wallet.id}?
						</p>
						<button onClick={() => setDeleteWalletModal(false)}>No</button>
					</div>
				</Modal>
			)}
			{addCryptoModal && (
				<AddCryptoModal
					closeModal={() => setAddCryptoModal(false)}
					walletId={wallet.id}
				/>
			)}
		</main>
	);
};

export default Wallet;
