import { IWallet } from "@/types";
import React from "react";

const WalletListItem = ({ item }: { item: IWallet }) => {
	console.log(item);
	return (
		<>
			<div className="flex">
				<img
					src={item.adminWallet.iconUrl as string}
					alt=""
					width={25}
					height={25}
					className="rounded-lg"
				/>
				<h1 className="font-bold ml-2">{item.adminWallet.name}</h1>
			</div>
			<p>{item.coins.length}</p>
		</>
	);
};

export default WalletListItem;
