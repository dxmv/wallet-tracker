import { coinGecko } from "@/api/coinGecko";
import { cryptoApi } from "@/api/crypto";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import { useCrypto } from "@/hooks/useCrypto";
import { ICrypto } from "@/types";
import React, { useCallback } from "react";

const CryptoDetails = ({ crypto }: { crypto: ICrypto }) => {
	const cryptoMap = useCrypto();

	// optimize details rendering
	const renderDetails = useCallback(() => {
		if (!cryptoMap.has(crypto.apiId)) {
			return <div>a</div>;
		}

		const current = cryptoMap.get(crypto.apiId);

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
				{current && (
					<>
						<p className="mt-2">Market-Cap rank: {current.market_cap_rank}</p>
						<p
							className={`${
								current.price_change_24h > 0 ? "text-green-500" : "text-red-500"
							} mt-2`}
						>
							24h change: ${current.price_change_24h.toFixed(2)} (
							{current.price_change_percentage_24h.toFixed(2)}%)
						</p>
						<p
							className={`${
								current.price_change_24h > 0 ? "text-green-500" : "text-red-500"
							} mt-2`}
						>
							Amount in USD: $
							{(crypto.amount * current.current_price).toFixed(2)}
						</p>
					</>
				)}

				<p className="mt-2">Amount: {crypto.amount}</p>
			</div>
		);
	}, [cryptoMap, crypto]);

	return (
		<div className="w-full flex-col justify-center items-center">
			{renderDetails()}
			{/* List of wallets where this crypto appears */}
			<MyList
				containerWidth={480}
				containerHeight={300}
				apiCall={() => cryptoApi.getWalletsByName(crypto.name as string)}
				renderItem={item => (
					<LinkItemWrapper href={`/wallets/${item.id}`}>
						<WalletListItem item={item} totalValue={0} cryptoMap={new Map()} />
					</LinkItemWrapper>
				)}
			></MyList>
		</div>
	);
};

export default CryptoDetails;
