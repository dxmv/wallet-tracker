import { ICrypto } from "@/types";
import React from "react";

const CryptoDetails = ({ crypto }: { crypto: ICrypto }) => {
	return (
		<div>
			<div className="flex justify-center">
				<h2>{crypto.name}</h2>
				<p>Amount: {crypto.amount}</p>
			</div>
		</div>
	);
};

export default CryptoDetails;
