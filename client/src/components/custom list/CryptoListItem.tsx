import { ICrypto } from "@/types";
import React from "react";
import Image from "next/image";

const CryptoListItem = ({ item }: { item: ICrypto }) => {
	console.log(item);
	return (
		<>
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<img
						src={item.imageUrl}
						alt="image"
						width={25}
						height={25}
						className="rounded-lg"
					/>
					<div className="ml-2">
						<h1 className="font-bold ">{item.name}</h1>
						<p>{item.ticker.toUpperCase()}</p>
					</div>
				</div>
				<div>{item.amount}</div>
			</div>
		</>
	);
};

export default CryptoListItem;
