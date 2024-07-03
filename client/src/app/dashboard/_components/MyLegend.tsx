import { ICrypto, IWallet } from "@/types";
import React from "react";
import { MyLegendItem } from "./MyLegendItem";

export const MyLegend = ({ items }: { items: Array<ICrypto | IWallet> }) => {
	return (
		<div>
			{items.map(item => (
				<MyLegendItem key={item.id + ""} item={item} />
			))}
		</div>
	);
};
