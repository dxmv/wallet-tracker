"use client";
import { walletApi } from "@/api/wallet";
import MyList from "@/components/custom list/MyList";
import Modal from "@/components/Modal";
import { IWallet } from "@/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AddCryptoModal from "../_components/AddCryptoModal";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import { cryptoApi } from "@/api/crypto";
import { useCrypto } from "@/hooks/useCrypto";
import EditCryptoModal from "../_components/EditCryptoModal";
import WalletInfo from "../_components/WalletInfo";
import { useApiWithRefetch } from "@/hooks/useApiWithRefetch";
import { handleErrorToast } from "@/utils/toasts";
import LoadingPage from "@/components/LoadingPage";

const Wallet = ({ params }: { params: { id: string } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null);
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [deleteWalletModal, setDeleteWalletModal] = useState<boolean>(false);
	const [addCryptoModal, setAddCryptoModal] = useState<boolean>(false);
	const parentRef = useRef<HTMLDivElement>(null); // for the width of MyList

	const { push } = useRouter();
	const cryptoMap = useCrypto();

	// when we modify the coins, we need to refetch the wallet
	// returns coins sorted by value
	const refreshWallet = useCallback(async () => {
		let wallet;
		try {
			wallet = await walletApi.getOneWallet(Number.parseInt(params.id));
		} catch (e) {
			handleErrorToast(e);
			return [];
		}
		if (!wallet) {
			return [];
		}
		await setWallet(wallet);
		return wallet.coins
			.map(coin => {
				const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
				setTotalAmount(prev => prev + currentPrice * coin.amount);
				return { ...coin, value: coin.amount * currentPrice };
			})
			.sort((a, b) => b.value - a.value);
	}, [params.id, cryptoMap]);

	// fetch the wallet
	const { apiCall, refetch } = useApiWithRefetch(refreshWallet);

	// fetch on start
	useEffect(() => {
		apiCall();
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
			handleErrorToast(e);
		}
	};

	// edits the crypto
	const handleEditCrypto = async (id: number, amount: number) => {
		try {
			await cryptoApi.changeAmount(id, amount);
			await refetch();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// deletes the crypto
	const handleDeleteCrypto = async (id: number) => {
		try {
			await cryptoApi.deleteCrypto(id);
			await refetch();
		} catch (e) {
			handleErrorToast(e);
		}
	};

	// optimized list loading
	const loadCryptoList = useCallback(
		() => (
			<MyList
				apiCall={apiCall}
				containerWidth={parentRef.current?.offsetWidth || 1400}
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
						<div className="flex justify-between items-center w-full">
							<div className="flex items-center">
								<img
									src={item.imageUrl}
									alt="image"
									width={25}
									height={25}
									className="rounded-lg"
								/>
								<div className="ml-2">
									<h1 className="font-bold ">{item.name}</h1>
									<p className="text-sm">
										{item.ticker && item.ticker.toUpperCase()}
									</p>
								</div>
							</div>
							<p>${item.value.toFixed(2)}</p>
						</div>
					</EditAndDeleteItemWrapper>
				)}
				display="grid"
			/>
		),
		[apiCall, cryptoMap]
	);

	if (!wallet) {
		return <LoadingPage />;
	}

	return (
		<main className="flex flex-col w-full py-8 px-4" style={{ height: "87vh" }}>
			{/* Wallet info */}
			<WalletInfo
				wallet={wallet}
				amountInDollars={totalAmount}
				openDeleteModal={() => setDeleteWalletModal(true)}
				refreshWallet={refetch}
			/>
			{/* Grid of coins */}
			<div className="mt-4">{loadCryptoList()}</div>
			<div ref={parentRef}></div>
			{/* Button for adding crypto */}
			<div className="flex justify-center">
				<button
					onClick={() => setAddCryptoModal(true)}
					className={`btn-purple w-1/12 font-semibold `}
				>
					Add crypto
				</button>
			</div>

			{/* Show the delete wallet modal */}
			{deleteWalletModal && (
				<Modal
					closeModal={() => setDeleteWalletModal(false)}
					handleNext={handleDeleteWallet}
					searchPart={false}
					title="Confirm"
					nextButtonText="Yes"
				>
					<div>
						<p>
							Are you sure you want to delete the wallet with id {wallet.id}?
						</p>
						<div className="flex justify-center">
							<button
								onClick={() => setDeleteWalletModal(false)}
								className={`btn-purple mt-8 bg-red-600 hover:bg-red-800`}
							>
								No
							</button>
						</div>
					</div>
				</Modal>
			)}
			{addCryptoModal && (
				<AddCryptoModal
					closeModal={() => setAddCryptoModal(false)}
					walletId={wallet.id}
					refreshWallet={refetch}
				/>
			)}
		</main>
	);
};

export default Wallet;
