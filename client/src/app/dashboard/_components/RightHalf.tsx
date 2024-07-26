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
import { useCrypto } from "@/hooks/useCrypto";
import { ChartData } from "chart.js";
import { extractColor } from "@/utils/colorExtraction";

const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

// shows the list of elements currently on the chart
const RightHalf = ({
	showing,
	totalValue,
	setShowing,
	openModal,
	setTotalValue,
	setChartData,
}: {
	showing: "Wallets" | "Crypto";
	totalValue: number;
	setShowing: React.Dispatch<React.SetStateAction<"Wallets" | "Crypto">>;
	openModal: () => void;
	setTotalValue: React.Dispatch<React.SetStateAction<number>>;
	setChartData: React.Dispatch<React.SetStateAction<ChartData<"pie"> | null>>;
}) => {
	const handleChangeShowing = (): void => {
		setShowing(showing == "Wallets" ? "Crypto" : "Wallets");
	};
	const cryptoMap = useCrypto();

	// refresh wallets and calculate the total value and chart data
	const refreshWallets = useCallback(async () => {
		const wallets = await walletApi.getAllWallets();
		const labels: string[] = [];
		const values: number[] = [];
		const colorPromises: Promise<string>[] = [];

		// calculate the value of coins in the wallet
		const totalWalletValue = wallets.reduce((total, wallet) => {
			const res =
				total +
				wallet.coins.reduce((total, coin) => {
					const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
					return total + coin.amount * currentPrice;
				}, 0);
			values.push(res);
			labels.push(wallet.adminWallet.name as string);
			colorPromises.push(extractColor(wallet.adminWallet.iconUrl as string)); // we will await this later

			return res;
		}, 0);

		const colors = await Promise.all(colorPromises);
		await setTotalValue(totalWalletValue);

		await setChartData({
			labels: labels,
			datasets: [
				{
					data: values,
					backgroundColor: colors,
				},
			],
		});

		return wallets;
	}, [cryptoMap, setTotalValue, setChartData]);

	// refresh coins and calculate the total value and chart data
	const refreshCoins = useCallback(async () => {
		const coins = await cryptoApi.getAllCryptoForUser();
		// for the chart
		const labels: string[] = [];
		const values: number[] = [];
		const colorPromises: Promise<string>[] = [];

		const totalCryptoValue = coins.reduce((total, coin) => {
			const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
			const res = total + coin.amount * currentPrice;

			labels.push(coin.name as string);
			values.push(coin.amount * currentPrice);
			colorPromises.push(extractColor(coin.imageUrl));

			return res;
		}, 0);

		const colors = await Promise.all(colorPromises);
		await setTotalValue(totalCryptoValue);

		await setChartData({
			labels: labels,
			datasets: [
				{
					data: values,
					backgroundColor: colors,
				},
			],
		});

		return coins;
	}, [cryptoMap, setTotalValue, setChartData]);

	const renderWalletList = useCallback(
		() => (
			<MyList
				apiCall={refreshWallets}
				renderItem={item => (
					<LinkItemWrapper href={`/wallets/${item.id}`}>
						<WalletListItem
							item={item}
							percentage={(1 / totalValue).toFixed(2)}
						/>
					</LinkItemWrapper>
				)}
			/>
		),
		[refreshWallets]
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
						<CryptoListItem
							item={item}
							percentage={true}
							totalValue={totalValue}
						/>
					</DetailsModalWrapper>
				)}
			/>
		),
		[refreshCoins]
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
