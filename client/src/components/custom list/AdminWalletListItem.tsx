import { IAdminWallet } from "@/types";
import React from "react";

const AdminWalletListItem = ({ item }: { item: IAdminWallet }) => {
	return (
		<>
			<div className="flex">
				<img src={item.iconUrl} width={25} height={25} className="rounded-lg" />
				<h1 className="font-bold ml-2">{item.name}</h1>
			</div>
		</>
	);
};

export default AdminWalletListItem;
