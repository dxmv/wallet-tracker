"use client";
import { IWallet } from "@/types";
import React, { useEffect, useState } from "react";
import MyListItem from "./MyListItem";

// list of items showing on the right side
// it can show both wallets and crypto
const MyList = ({ apiCall }: { apiCall: () => Promise<Array<IWallet>> }) => {
	const [list, setList] = useState<Array<IWallet>>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiCall();
				await setList(data);
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, [apiCall]);

	return (
		<div>
			{list.map(el => (
				<MyListItem
					key={el.id}
					name={el.adminWallet.name}
					iconUrl={el.adminWallet.iconUrl}
					amount={0}
					link={`/wallets/${el.id}`}
				/>
			))}
		</div>
	);
};

export default MyList;
