import { ICrypto } from "@/types";
import React from "react";

const CryptoDetails = ({ crypto }: { crypto: ICrypto }) => {
	return (
		<div>
			<h2>{crypto.name}</h2>
			<p>Amount: {crypto.amount}</p>
			<p>Value:</p>
			{/* Add more details as needed */}
		</div>
	);
};

export default CryptoDetails;
