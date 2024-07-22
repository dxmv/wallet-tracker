"use client";
import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import React, { useCallback } from "react";
import DetailsModalWrapper from "@/components/custom list/wrappers/DetailsModalItemWrapper";
import CryptoDetails from "./CryptoDetails";
import { ICrypto, IWallet } from "@/types";
import { useCrypto } from "@/hooks/useCrypto";

const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

// shows the list of elements currently on the chart
const RightHalf = ({
	showing,
	setShowing,
	openModal,
	setTotalValue,
}: {
	showing: "Wallets" | "Crypto";
	setShowing: React.Dispatch<React.SetStateAction<"Wallets" | "Crypto">>;
	openModal: () => void;
	setTotalValue: React.Dispatch<React.SetStateAction<number>>;
}) => {
	const handleChangeShowing = (): void => {
		setShowing(showing == "Wallets" ? "Crypto" : "Wallets");
	};
	const cryptoMap = useCrypto();

	// refresh wallets and calculate the total value
	const refreshWallets = async () => {
		const wallets = await walletApi.getAllWallets();

		// calculate the value of coins in the wallet
		const totalWalletValue = wallets.reduce(
			(total, wallet) =>
				total +
				wallet.coins.reduce((total, coin) => {
					const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
					return total + coin.amount * currentPrice;
				}, 0),
			0
		);
		await setTotalValue(totalWalletValue);

		return wallets;
	};

	// refresh coins and calculate the total value
	const refreshCoins = async () => {
		const coins = await cryptoApi.getAllCryptoForUser();

		const totalCryptoValue = coins.reduce((total, coin) => {
			const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
			return total + coin.amount * currentPrice;
		}, 0);
		await setTotalValue(totalCryptoValue);

		return coins;
	};

	const renderWalletList = useCallback(
		() => (
			<MyList
				apiCall={refreshWallets}
				renderItem={item => (
					<LinkItemWrapper href={`/wallets/${item.id}`}>
						<WalletListItem item={item} />
					</LinkItemWrapper>
				)}
			/>
		),
		[]
	);

	const renderCryptoList = useCallback(
		() => (
			<MyList
				apiCall={refreshCoins}
				renderItem={item => (
					<DetailsModalWrapper
						item={item}
						renderDetails={crypto => <CryptoDetails crypto={crypto} />}
					>
						<CryptoListItem item={item} />
					</DetailsModalWrapper>
				)}
			/>
		),
		[]
	);

	return (
		<div className="flex flex-col w-1/2">
			<div className="flex justify-between">
				<h1>Your {showing}</h1>
				{/* Choose what items to show */}
				<div className="mb-4 items-end">
					{["Wallets", "Crypto"].map(type => (
						<button
							key={type}
							className={`${SHOW_STYLE} ${
								type === "Crypto" ? "" : "border-r-0"
							} ${showing === type ? "bg-gray-500" : ""}`}
							onClick={handleChangeShowing}
						>
							{type}
						</button>
					))}
				</div>
			</div>
			{/* Different api calls for both wallets and crypto */}
			{showing == "Wallets" ? renderWalletList() : renderCryptoList()}
			<button className="mt-8" onClick={openModal}>
				Add {showing}
			</button>
		</div>
	);
};

export default RightHalf;
