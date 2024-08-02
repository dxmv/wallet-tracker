import { ICoinFromCoinGecko } from "@/types";
import { CoinGeckoClient } from "coingecko-api-v3";
import NodeCache from "node-cache";

const clientApi = new CoinGeckoClient(); // we're using this because it's free
const cache = new NodeCache({ stdTTL: 300 }); // cache items for 5 minutes

export const coinGecko = {
	// page - on what page we're on, perPage - how many per page
	getCoinListWithMarketData: async (
		page: number,
		perPage: number = 255
	): Promise<Array<ICoinFromCoinGecko>> => {
		const cacheKey = `coinList_${page}_${perPage}`;
		const cachedData = cache.get<Array<ICoinFromCoinGecko>>(cacheKey);

		if (cachedData) {
			return cachedData;
		}
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
