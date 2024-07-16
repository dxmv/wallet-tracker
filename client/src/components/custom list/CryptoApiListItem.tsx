import { ICoinFromCoinGecko } from "@/types";
import React from "react";

const CryptoApiListItem = ({ item }: { item: ICoinFromCoinGecko }) => {
	return (
		<>
			<div className="flex">
				<img src={item.image} width={25} height={25} className="rounded-lg" />
				<h1 className="font-bold ml-2">{item.name}</h1>
			</div>
		</>
	);
};

export default CryptoApiListItem;
