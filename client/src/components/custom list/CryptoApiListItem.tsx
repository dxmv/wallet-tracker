import { ICoinFromCoinGecko } from "@/types";
import React from "react";

const CryptoApiListItem = ({
	item,
	selectedId,
	setSelectedId,
}: {
	item: ICoinFromCoinGecko;
	selectedId: number | null;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	return (
		<div
			className={`flex py-2 border-b-2 border-gray-200 justify-between mb-2 items-center w-full ${
				selectedId == item.market_cap_rank && "bg-gray-500"
			}`}
			onClick={() => {
				setSelectedId(item.market_cap_rank);
			}}
		>
			<div className="flex">
				<img src={item.image} width={25} height={25} className="rounded-lg" />
				<h1 className="font-bold ml-2">{item.name}</h1>
			</div>
		</div>
	);
};

export default CryptoApiListItem;
