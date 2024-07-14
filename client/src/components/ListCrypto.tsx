import { useCrypto } from "@/hooks/useCrypto";
import { ICoinFromCoinGecko } from "@/types";
import React from "react";

const ListCrypto = ({
	selectedId,
	setSelectedId,
}: {
	selectedId: number | null;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	// get cryptos
	const crypto = useCrypto();

	console.log(crypto);

	return (
		<div className="w-full h-3/4 overflow-scroll overflow-x-hidden">
			{crypto.map(el => (
				<ListItem
					key={el.id + " "}
					item={el}
					setSelectedId={setSelectedId}
					isSelected={Number.parseInt(el.id as string) == selectedId}
				/>
			))}
		</div>
	);
};

const ListItem = ({
	item,
	isSelected,
	setSelectedId,
}: {
	item: ICoinFromCoinGecko;
	isSelected: boolean;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	const ICON_SIZE = 20;
	return (
		<div
			className="flex justify-self-start py-2 border-b-2 cursor-pointer"
			onClick={() => {
				setSelectedId(Number.parseInt(item.id as string));
			}}
			style={{ backgroundColor: `${isSelected ? "gray" : "transparent"}` }}
		>
			<img src={item.image} alt="Image" width={ICON_SIZE} height={ICON_SIZE} />
			<p className="font-semibold">{item.name}</p>
		</div>
	);
};

export default ListCrypto;
