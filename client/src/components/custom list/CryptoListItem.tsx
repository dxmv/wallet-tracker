import { useCrypto } from "@/hooks/useCrypto";
import { ICrypto } from "@/types";
import React, { useMemo } from "react";

const CryptoListItem = ({
	item,
	totalValue,
	percentage = false,
}: {
	item: ICrypto;
	totalValue?: number;
	percentage: boolean;
}) => {
	const crypto = useCrypto();
	const current = useMemo(() => crypto.get(item.apiId), [crypto, item.apiId]);

	return (
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
					<p className="text-sm">{item.ticker && item.ticker.toUpperCase()}</p>
				</div>
			</div>
			<p>
				{
					current
						? percentage && totalValue
							? `${(
									((item.amount * current.current_price) / totalValue) *
									100
							  ).toFixed(2)} %` // if the percentage is true and totalValue defined show percentage
							: (item.amount * current.current_price).toFixed(2) // if current is defined
						: 0 // current isn't  defined
				}
			</p>
		</div>
	);
};

export default CryptoListItem;
