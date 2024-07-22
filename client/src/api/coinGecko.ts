import { ICoinFromCoinGecko } from "@/types";
import { CoinGeckoClient } from "coingecko-api-v3";

const clientApi = new CoinGeckoClient(); // we're using this because it's free

// const API_KEY = "CG-KCkwa9NJzSHPLHJoL3JTkyUj";

export const coinGecko = {
	// page - on what page we're on, perPage - how many per page
	getCoinListWithMarketData: async (
		page: number,
		perPage: number = 255
	): Promise<Array<ICoinFromCoinGecko>> => {
		try {
			const response = (await clientApi.coinMarket({
				vs_currency: "usd",
				page: page,
				per_page: perPage,
			})) as Array<ICoinFromCoinGecko>;
			return response;
		} catch (e) {
			throw new Error("Error while fetching coin gecko");
		}
	},
};
