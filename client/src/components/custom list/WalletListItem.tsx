import { IWallet } from "@/types";
import React from "react";
import Image from "next/image";

const WalletListItem = ({ item }: { item: IWallet }) => {
	if (!item.adminWallet) {
		return <div>Loading</div>;
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
				<h1 className="font-bold ml-2">{item.adminWallet.name}</h1>
			</div>
			<p>{item.coins.length}</p>
		</>
	);
};

export default WalletListItem;
