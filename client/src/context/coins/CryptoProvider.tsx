"use client";
import { ICoinFromCoinGecko } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import CryptoContext from "./CryptoContext";
import { coinGecko } from "@/api/coinGecko";

// wrapper for context
const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
	const [cryptocurrencies, setCryptocurrencies] = useState<
		Map<string, ICoinFromCoinGecko>
	>(new Map());
	// const [loading, setLoading] = useState<boolean>(true);
	// const [error, setError] = useState<String>("");

	const fetchCrypto = useCallback(async () => {
		try {
			// add all cryptos to the list
			let list: Array<ICoinFromCoinGecko> = [];
			for (let i = 1; i <= 1; i++) {
				const response = await coinGecko.getCoinListWithMarketData(i);
				list = [...list, ...response];
			}
			// then convert all of it to a map
			setCryptocurrencies(prev => {
				const newMap = new Map();
				list.forEach(c => {
					newMap.set(c.id, c);
				});
				return newMap;
			});
		} catch (err) {
			console.error(err);
		} finally {
			// setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCrypto();
	}, [fetchCrypto]);

	return (
		<CryptoContext.Provider value={cryptocurrencies}>
			{children}
		</CryptoContext.Provider>
	);
};

export default CryptoProvider;
