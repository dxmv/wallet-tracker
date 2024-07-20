import { ICrypto } from "@/types";
import React from "react";

const CryptoListItem = ({ item }: { item: ICrypto }) => {
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
			<div>{item.amount}</div>
		</div>
	);
};

export default CryptoListItem;
