import { ICrypto } from "@/types";
import React from "react";
import Image from "next/image";

const CryptoListItem = ({ item, image }: { item: ICrypto; image: string }) => {
	return (
		<>
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center">
					<Image
						src={image}
						alt="image"
						width={25}
						height={25}
						className="rounded-lg"
					/>
					<div className="ml-2">
						<h1 className="font-bold ">{item.name}</h1>
						<p>{item.ticker}</p>
					</div>
				</div>
				<div>{item.amount}</div>
			</div>
		</>
	);
};

export default CryptoListItem;
