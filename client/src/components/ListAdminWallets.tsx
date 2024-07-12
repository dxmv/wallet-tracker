"use client";
import { adminApi } from "@/api/admin";
import { IAdminWallet } from "@/types";
import React, { useEffect, useState } from "react";

const ListAdminWallets = ({
	selectedId,
	setSelectedId,
}: {
	selectedId: number | null;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	// get admin wallets
	const [wallets, setWallets] = useState<Array<IAdminWallet>>([]);

	useEffect(() => {
		const getData = async () => {
			setWallets([...(await adminApi.getAllAdminWallets())]);
		};
		getData();
	}, []);

	return (
		<div className="w-full">
			{wallets.map(el => (
				<ListItem
					key={el.id}
					item={el}
					setSelectedId={setSelectedId}
					isSelected={el.id == selectedId}
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
	item: IAdminWallet;
	isSelected: boolean;
	setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
	const ICON_SIZE = 20;
	return (
		<div
			className="flex justify-self-start py-2 border-b-2 cursor-pointer"
			onClick={() => {
				setSelectedId(item.id);
			}}
			style={{ backgroundColor: `${isSelected ? "gray" : "transparent"}` }}
		>
			<img
				src={item.iconUrl}
				alt="Image"
				width={ICON_SIZE}
				height={ICON_SIZE}
			/>
			<p className="font-semibold">{item.name}</p>
		</div>
	);
};

export default ListAdminWallets;
