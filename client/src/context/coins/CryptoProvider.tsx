"use client";
import { ICoinFromCoinGecko } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import CryptoContext from "./CryptoContext";
import { coinGecko } from "@/api/coinGecko";
import { handleErrorToast } from "@/utils/toasts";
import LoadingPage from "@/components/LoadingPage";
import ErrorPage from "@/components/ErrorPage";

// wrapper for context
const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
	const [cryptocurrencies, setCryptocurrencies] = useState<
		Map<string, ICoinFromCoinGecko>
	>(new Map());
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchCrypto = useCallback(async () => {
		setLoading(true);
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
		} catch (e) {
			console.log(e);
			handleErrorToast(e);
			setError(e as Error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchCrypto();
	}, [fetchCrypto]);

	if (loading) {
		return <LoadingPage />;
	}
	if (error) {
		return <ErrorPage errorMessage={error.message} />;
	}

	return (
		<CryptoContext.Provider value={cryptocurrencies}>
			{children}
		</CryptoContext.Provider>
	);
};

export default CryptoProvider;
