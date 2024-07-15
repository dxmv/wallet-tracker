import { IWallet } from "@/types";
import Link from "next/link";
import React from "react";

const WalletListItem = ({ item }: { item: IWallet }) => {
	return (
		<Link
			href={`/wallets/${item.id}`}
			className="flex py-2 border-b-2 border-gray-800 justify-between hover:bg-gray-500 mb-2 items-center"
		>
			<div className="flex">
				<img
					src={item.adminWallet.iconUrl}
					width={25}
					height={25}
					className="rounded-lg"
				/>
				<h1 className="font-bold ml-2">{item.adminWallet.name}</h1>
			</div>
			<p>{item.coins.length}</p>
		</Link>
	);
};

export default WalletListItem;
