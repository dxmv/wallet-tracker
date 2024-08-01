"use client";
import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import React, { useCallback, useMemo, useRef, useState } from "react";
import DetailsModalWrapper from "@/components/custom list/wrappers/DetailsModalItemWrapper";
import CryptoDetails from "./CryptoDetails";
import { useCrypto } from "@/hooks/useCrypto";
import { ChartData } from "chart.js";
import { extractColor } from "@/utils/colorExtraction";
import WalletsModal from "./WalletsModal";
import CryptoModal from "./CryptoModal";
import { useApiWithRefetch } from "@/hooks/useApiWithRefetch";
import { calculateValuesAndChartData } from "@/utils/calculations";
import { ICrypto, IWallet } from "@/types";
import { PURPLE_BUTTON_STYLE } from "@/utils/styles";

const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

// shows the list of elements currently on the chart
const RightHalf = ({
	showing,
	totalValue,
	setShowing,
	setTotalValue,
	setChartData,
}: {
	showing: "Wallets" | "Crypto";
	totalValue: number;
	setShowing: React.Dispatch<React.SetStateAction<"Wallets" | "Crypto">>;
	setTotalValue: React.Dispatch<React.SetStateAction<number>>;
	setChartData: React.Dispatch<React.SetStateAction<ChartData<"pie"> | null>>;
}) => {
	const [openModal, setOpenModal] = useState<boolean>(false);
	const cryptoMap = useCrypto();
	const parentRef = useRef<HTMLDivElement>(null);

	// refresh wallets and calculate the total value and chart data
	const refreshWallets = useCallback(async () => {
		const wallets = await walletApi.getAllWallets();
		const { totalValue, chartData, sortedItems } =
			await calculateValuesAndChartData(wallets, cryptoMap);

		await setTotalValue(totalValue);
		await setChartData(chartData);

		return sortedItems as IWallet[];
	}, [cryptoMap, setTotalValue, setChartData]);

	// refresh coins and calculate the total value and chart data
	const refreshCoins = useCallback(async () => {
		const coins = await cryptoApi.getAllCryptoForUser();
		const { totalValue, chartData, sortedItems } =
			await calculateValuesAndChartData(coins, cryptoMap);

		await setTotalValue(totalValue);
		await setChartData(chartData);

		return sortedItems as ICrypto[];
	}, [cryptoMap, setTotalValue, setChartData]);

	// to refetch wallets
	const walletRefetch = useApiWithRefetch(refreshWallets);
	// to refetch coins
	const coinsRefetch = useApiWithRefetch(refreshCoins);

	const renderWalletList = useCallback(
		() => (
			<MyList
				apiCall={walletRefetch.apiCall}
				containerWidth={parentRef.current?.offsetWidth || 1200}
				renderItem={item => (
					<LinkItemWrapper href={`/wallets/${item.id}`}>
						<WalletListItem
							item={item}
							percentage={true}
							totalValue={totalValue}
							cryptoMap={cryptoMap}
						/>
					</LinkItemWrapper>
				)}
			/>
		),
		[walletRefetch.apiCall, totalValue, cryptoMap]
	);

	const renderCryptoList = useCallback(
		() => (
			<MyList
				apiCall={coinsRefetch.apiCall}
				containerWidth={parentRef.current?.offsetWidth || 1200}
				renderItem={item => (
					<DetailsModalWrapper
						item={item}
						renderDetails={crypto => <CryptoDetails crypto={crypto} />}
					>
						<CryptoListItem
							item={item}
							percentage={true}
							totalValue={totalValue}
							current={cryptoMap.get(item.apiId)}
						/>
					</DetailsModalWrapper>
				)}
			/>
		),
		[coinsRefetch.apiCall, totalValue, cryptoMap]
	);

	// Memoize the buttons to prevent unnecessary re-renders
	const showingButtons = useMemo(
		() =>
			["Wallets", "Crypto"].map(type => (
				<button
					key={type}
					className={`${SHOW_STYLE} ${type === "Crypto" ? "" : "border-r-0"} ${
						showing === type ? "bg-gray-500" : ""
					}`}
					onClick={() => setShowing(type as "Wallets" | "Crypto")}
				>
					{type}
				</button>
			)),
		[showing, setShowing]
	);

	// Memoize the modal rendering to prevent unnecessary re-renders
	const renderModal = useMemo(() => {
		if (!openModal) return null;
		return showing === "Wallets" ? (
			<WalletsModal
				closeModal={() => setOpenModal(false)}
				refetchWallets={walletRefetch.refetch}
			/>
		) : (
			<CryptoModal
				closeModal={() => setOpenModal(false)}
				refetchCoins={coinsRefetch.refetch}
			/>
		);
	}, [openModal, showing]);

	return (
		<div className="flex flex-col w-1/2" ref={parentRef}>
			<div className="flex justify-between">
				<h1>Your {showing}</h1>
				{/* Choose what items to show */}
				<div className="mb-4 items-end">{showingButtons}</div>
			</div>
			{/* Different api calls for both wallets and crypto */}
			{showing == "Wallets" ? renderWalletList() : renderCryptoList()}
			<div className="flex w-full justify-center items-center">
				<button
					className={`${PURPLE_BUTTON_STYLE} w-1/6 mt-8`}
					onClick={() => setOpenModal(true)}
				>
					Add {showing}
				</button>
			</div>

			{/* Show a modal based on the current showing */}
			{renderModal}
		</div>
	);
};

export default RightHalf;
