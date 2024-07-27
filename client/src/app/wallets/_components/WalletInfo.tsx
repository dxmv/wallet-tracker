import { walletApi } from "@/api/wallet";
import { IWallet } from "@/types";
import React, { useState } from "react";
import { FaCheck, FaRegTrashAlt, FaTimes } from "react-icons/fa";

const WalletInfo = ({
	wallet,
	amountInDollars,
	openDeleteModal,
}: {
	wallet: IWallet;
	amountInDollars: string | number;
	openDeleteModal: () => void;
}) => {
	// State to control whether the wallet name is being edited
	const [editWalletName, setEditWalletName] = useState<boolean>(false);
	// State to hold the new wallet name during editing
	const [newWalletName, setNewWalletName] = useState<string>(wallet.walletName);

	// Function to handle the submission of a new wallet name
	const handleSubmit = async () => {
		try {
			await walletApi.updateWalletName(wallet.id, newWalletName);
			setEditWalletName(false);
		} catch (error) {
			console.error("Failed to update wallet name:", error);
		}
	};

	// Function to handle canceling the edit
	const handleCancel = () => {
		setNewWalletName(wallet.walletName);
		setEditWalletName(false);
	};

	return (
		<div className="flex justify-between pb-4 border-b-2 border-gray-300">
			<div className="flex">
				<img
					src={wallet.adminWallet.iconUrl}
					alt="Zoki"
					width={240}
					height={240}
					className="rounded-md shadow-md shadow-white"
				/>
				<div className="flex flex-col justify-between ml-3 h-1/2">
					{editWalletName ? (
						// Input form for editing wallet name
						<div className="flex items-center">
							<input
								type="text"
								value={newWalletName}
								onChange={e => setNewWalletName(e.target.value)}
								className="border rounded px-2 py-1 mr-2 bg-black"
							/>
							<button
								onClick={handleSubmit}
								className="text-green-600 hover:text-green-800 mr-2"
							>
								<FaCheck />
							</button>
							<button
								onClick={handleCancel}
								className="text-red-600 hover:text-red-800"
							>
								<FaTimes />
							</button>
						</div>
					) : (
						<h1
							className="font-bold text-2xl"
							onClick={() => setEditWalletName(true)}
						>
							{wallet.walletName}
						</h1>
					)}

					<p>Number of coins: {wallet.coins.length}</p>
					<p>
						Amount in dollars: <b>${amountInDollars}</b>
					</p>
				</div>
			</div>
			<div>
				<FaRegTrashAlt
					className="text-lg text-red-600 cursor-pointer hover:text-red-800"
					onClick={openDeleteModal}
				/>
			</div>
		</div>
	);
};

export default WalletInfo;
