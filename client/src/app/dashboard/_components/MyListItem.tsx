import { IWallet } from "@/types";
import Link from "next/link";
import React from "react";

// displays a single item in the list
const MyListItem = ({
	name,
	iconUrl,
	amount,
	link,
}: {
	name: String;
	iconUrl: String;
	amount: number;
	link: String;
}) => {
	return (
		<Link
			href={link}
			className="flex py-2 border-b-2 border-gray-800 justify-between hover:bg-gray-500 mb-2 items-center"
		>
			<div className="flex">
				<img src={iconUrl} />
				<h1 className="font-bold ml-2">{name}</h1>
			</div>
			<p>{amount}</p>
		</Link>
	);
};

export default MyListItem;
