import { coinGecko } from "@/api/coinGecko";
import { cryptoApi } from "@/api/crypto";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import { ICoinFromCoinGeckoStats, ICrypto } from "@/types";
import React, { useCallback, useEffect, useState } from "react";

const CryptoDetails = ({ crypto }: { crypto: ICrypto }) => {
	const [coinData, setCoinData] = useState<ICoinFromCoinGeckoStats>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await coinGecko.getCoinStats(crypto.apiId);
				setCoinData(data);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [crypto.apiId]);

	// optimize details rendering
	const renderDetails = useCallback(() => {
		return (
			<div className="flex flex-col font-bold text-xl w-full mb-8 items-center">
				<div className="w-1/6">
					<img
						src={crypto.imageUrl}
						alt="image"
						className="rounded-lg text-center"
					/>
				</div>
				<h2 className="mt-2">
					{crypto.name} ({crypto.ticker.toUpperCase()})
				</h2>
				{/* Only render if the coin is loaded */}
				{coinData && coinData.market_data && (
					<>
						<p
							className={`${
								coinData.market_data.price_change_24h > 0
									? "text-green-500"
									: "text-red-500"
							}`}
						>
							24h change: {coinData.market_data.price_change_24h.toFixed(2)} (
							{coinData.market_data.price_change_percentage_24h.toFixed(2)}%)
						</p>
						<p>Market-Cap rank: {coinData.market_cap_rank}</p>
						<p className="mt-2">
							Amount in USD: $
							{(crypto.amount * coinData.market_data.current_price.usd).toFixed(
								2
							)}
						</p>
					</>
				)}
				<p className="mt-2">Amount: {crypto.amount}</p>
			</div>
		);
	}, [coinData]);

	return (
		<div className="w-full flex-col justify-center items-center">
			{renderDetails()}
			{/* List of wallets where this crypto appears */}
			<MyList
				apiCall={() => cryptoApi.getWalletsByName(crypto.name as string)}
				renderItem={item => (
					<LinkItemWrapper href={`/wallets/${item.id}`}>
						<WalletListItem item={item} />
					</LinkItemWrapper>
				)}
			></MyList>
		</div>
	);
};

export default CryptoDetails;
