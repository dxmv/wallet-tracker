"use client";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import MyList from "@/components/custom list/MyList";
import Modal from "@/components/Modal";
import { IWallet } from "@/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import AddCryptoModal from "../_components/AddCryptoModal";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import { cryptoApi } from "@/api/crypto";
import { useCrypto } from "@/hooks/useCrypto";
import EditCryptoModal from "../_components/EditCryptoModal";
import WalletInfo from "../_components/WalletInfo";

const Wallet = ({ params }: { params: { id: string } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null);
	const [deleteWalletModal, setDeleteWalletModal] = useState<boolean>(false);
	const [addCryptoModal, setAddCryptoModal] = useState<boolean>(false);
	const { push } = useRouter();
	const cryptoMap = useCrypto();

	// calculate the amount in dollars
	const amountInDollars = useMemo(() => {
		if (!wallet) {
			return 0;
		}
		return wallet.coins
			.reduce((previous, current) => {
				const currentApi = cryptoMap.get(current.apiId);
				if (!currentApi) {
					return previous;
				}
				return previous + current.amount * currentApi.current_price;
			}, 0)
			.toFixed(2);
	}, [wallet, cryptoMap]);

	// when we modify the coins, we need to refetch the wallet
	const refreshWallet = useCallback(async () => {
		try {
			const updatedWallet = await walletApi.getOneWallet(
				Number.parseInt(params.id)
			);
			setWallet(updatedWallet);
		} catch (e) {
			console.error(e);
		}
	}, [params.id]);

	// fetch the wallet
	useEffect(() => {
		refreshWallet();
	}, []);

	// deletes the wallet
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

	// edits the crypto
	const handleEditCrypto = async (id: number, amount: number) => {
		try {
			await cryptoApi.changeAmount(id, amount);
			await refreshWallet();
		} catch (e) {
			console.error(e);
		}
	};

	// deletes the crypto
	const handleDeleteCrypto = async (id: number) => {
		try {
			await cryptoApi.deleteCrypto(id);
			refreshWallet();
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
			<WalletInfo
				wallet={wallet}
				amountInDollars={amountInDollars}
				openDeleteModal={() => setDeleteWalletModal(true)}
			/>
			{/* Grid of coins */}
			<div className="mt-4"></div>
			<MyList
				apiCall={async () => await wallet.coins}
				renderItem={item => (
					<EditAndDeleteItemWrapper
						onEdit={() => console.log("edit")}
						onDelete={handleDeleteCrypto}
						id={item.id}
						renderEditModal={
							<EditCryptoModal
								handleEditCrypto={handleEditCrypto}
								item={item}
							/>
						}
					>
						<CryptoListItem item={item} percentage={false} />
					</EditAndDeleteItemWrapper>
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
					refreshWallet={refreshWallet}
				/>
			)}
		</main>
	);
};

export default Wallet;
