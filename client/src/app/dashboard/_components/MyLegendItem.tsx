import { ICrypto, IWallet } from "@/types";
import Image from "next/image";
import React from "react";

export const MyLegendItem = ({ item }: { item: IWallet | ICrypto }) => {
	// check if the item is ICrypto
	if ((item as ICrypto).ticker !== undefined) {
		return (
			<div className="flex flex-row">
				<Image
					src={(item as ICrypto).imageURL}
					alt="Crypto logo"
					width={20}
					height={20}
				/>
			</div>
		);
	}

	// the item is IWallet
	return <div>MyLegendItem</div>;
};
