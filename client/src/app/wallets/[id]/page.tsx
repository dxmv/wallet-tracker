"use client";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import MyList from "@/components/custom list/MyList";
import Modal from "@/components/Modal";
import { IWallet } from "@/types";
import { useRouter } from "next/navigation";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import AddCryptoModal from "../_components/AddCryptoModal";
import EditAndDeleteItemWrapper from "@/components/custom list/wrappers/EditAndDeleteItemWrapper";
import { cryptoApi } from "@/api/crypto";
import { useCrypto } from "@/hooks/useCrypto";
import EditCryptoModal from "../_components/EditCryptoModal";
import WalletInfo from "../_components/WalletInfo";
import { PURPLE_BUTTON_STYLE } from "@/utils/styles";

const Wallet = ({ params }: { params: { id: string } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null);
	const [deleteWalletModal, setDeleteWalletModal] = useState<boolean>(false);
	const [addCryptoModal, setAddCryptoModal] = useState<boolean>(false);
	const parentRef = useRef<HTMLDivElement>(null); // for the width of MyList

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
			await refreshWallet();
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
				refreshWallet={refreshWallet}
			/>
			{/* Grid of coins */}
			<div className="mt-4"></div>
			<div ref={parentRef}>
				<MyList
					apiCall={async () => await wallet.coins.sort()}
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
							<CryptoListItem
								current={cryptoMap.get(item.apiId)}
								item={item}
								percentage={false}
							/>
						</EditAndDeleteItemWrapper>
					)}
					display="grid"
				/>
			</div>
			{/* Button for adding crypto */}
			<div className="flex justify-center">
				<button
					onClick={() => setAddCryptoModal(true)}
					className={`${PURPLE_BUTTON_STYLE} w-1/12 font-semibold `}
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
								className={`${PURPLE_BUTTON_STYLE}  mt-8 bg-red-600 hover:bg-red-800`}
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
					refreshWallet={refreshWallet}
				/>
			)}
		</main>
	);
};

export default Wallet;
