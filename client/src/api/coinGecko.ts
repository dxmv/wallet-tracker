import { ICoinFromCoinGecko, RequestError } from "@/types";
import { CoinGeckoClient } from "coingecko-api-v3";

const clientApi = new CoinGeckoClient({
	timeout: 1000,
}); // we're using this because it's free

// const API_KEY = "CG-KCkwa9NJzSHPLHJoL3JTkyUj";

async function fetchCoinGecko<T>(page: number, perPage: number): Promise<T> {
	try {
		const response = (await clientApi.coinMarket({
			vs_currency: "usd",
			page: page,
			per_page: perPage,
		})) as T;
		return response;
	} catch (e) {
		throw new Error("Error while fetching coin gecko");
	}
}

export const coinGecko = {
	// page - on what page we're on, perPage - how many per page
	getCoinListWithMarketData: (page: number, perPage?: number) =>
		fetchCoinGecko<Array<ICoinFromCoinGecko>>(page, perPage ?? 250),
};
