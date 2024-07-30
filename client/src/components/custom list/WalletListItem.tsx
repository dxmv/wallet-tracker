import { ICoinFromCoinGecko, IWallet } from "@/types";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { useCrypto } from "@/hooks/useCrypto";

const WalletListItem = ({
	item,
	percentage = false,
	totalValue,
	cryptoMap,
}: {
	item: IWallet;
	percentage?: boolean;
	totalValue: number;
	cryptoMap: Map<string, ICoinFromCoinGecko>;
}) => {
	const { walletValue, walletPercentage } = useMemo(() => {
		if (!item.adminWallet || !item.coins || !cryptoMap) {
			return { walletValue: 0, walletPercentage: "0" };
		}

		const value = item.coins.reduce((total, coin) => {
			const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
			return total + coin.amount * currentPrice;
		}, 0);

		const percentageValue = totalValue > 0 ? (value / totalValue) * 100 : 0;

		return {
			walletValue: value,
			walletPercentage: percentageValue.toFixed(2),
		};
	}, [item, cryptoMap, totalValue]);

	if (!item.adminWallet || !cryptoMap) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="flex">
				<Image
					src={item.adminWallet.iconUrl && (item.adminWallet.iconUrl as string)}
					alt=""
					width={25}
					height={25}
					className="rounded-lg"
				/>
				<h1 className="font-bold ml-2">{item.walletName}</h1>
			</div>
			{percentage && <p>{walletPercentage} %</p>}
		</>
	);
};

export default WalletListItem;
