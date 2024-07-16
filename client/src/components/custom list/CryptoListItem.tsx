import { ICrypto } from "@/types";
import React from "react";
import Image from "next/image";

const CryptoListItem = ({ item, image }: { item: ICrypto; image: string }) => {
	return (
		<>
			<div className="flex">
				<Image
					src={image}
					alt="image"
					width={25}
					height={25}
					className="rounded-lg"
				/>
				<h1 className="font-bold ml-2">{item.name}</h1>
			</div>
		</>
	);
};

export default CryptoListItem;
