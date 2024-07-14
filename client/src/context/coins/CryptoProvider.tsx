"use client";
import { ICoinFromCoinGecko } from "@/types";
import React, { useEffect, useState } from "react";
import CryptoContext from "./CryptoContext";
import { coinGecko } from "@/api/coinGecko";

// wrapper for context
const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
	const [cryptocurrencies, setCryptocurrencies] = useState<
		Array<ICoinFromCoinGecko>
	>([]);
	// const [loading, setLoading] = useState<boolean>(true);
	// const [error, setError] = useState<String>("");

	useEffect(() => {
		const fetchCryptocurrencies = async () => {
			try {
				const response = await coinGecko.getCoinListWithMarketData(1);
				setCryptocurrencies(response);
			} catch (err) {
				console.error(err);
			} finally {
				// setLoading(false);
			}
		};

		fetchCryptocurrencies();
	}, []);

	return (
		<CryptoContext.Provider value={cryptocurrencies}>
			{children}
		</CryptoContext.Provider>
	);
};

export default CryptoProvider;
