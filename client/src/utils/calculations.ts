import { ChartData } from "chart.js";
import { extractColor } from "./colorExtraction";
import { ICrypto, IWallet } from "@/types";

// to calculate the chart data
type Item = IWallet | ICrypto;

const isWallet = (item: Item): item is IWallet => {
	return "coins" in item && "adminWallet" in item;
};

// works for ICrypto & IWallet
export const calculateValuesAndChartData = async (
	items: Item[],
	cryptoMap: Map<string, { current_price: number }>
) => {
	const labels: string[] = [];
	const values: number[] = [];
	const colorPromises: Promise<string>[] = []; // for color extraction
	const itemsWithValue: Array<{ item: Item; value: number }> = []; // to sort the values

	// calculate the total value
	const totalValue = items.reduce((total, item) => {
		let itemValue: number;

		if (isWallet(item)) {
			// calculate the value of all crypto in a wallet
			itemValue = item.coins.reduce((walletTotal, coin) => {
				const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
				return walletTotal + coin.amount * currentPrice;
			}, 0);
			labels.push(item.adminWallet.name);
			colorPromises.push(extractColor(item.adminWallet.iconUrl));
		} else {
			const currentPrice = cryptoMap.get(item.apiId)?.current_price || 0;
			itemValue = item.amount * currentPrice;
			labels.push(item.name);
			colorPromises.push(extractColor(item.imageUrl));
		}

		itemsWithValue.push({ item, value: itemValue });
		values.push(itemValue);

		return total + itemValue;
	}, 0);

	const colors = await Promise.all(colorPromises);

	const chartData: ChartData<"pie"> = {
		labels: labels,
		datasets: [
			{
				data: values,
				backgroundColor: colors,
			},
		],
	};

	// Sort items by value in descending order
	const sortedItems = itemsWithValue
		.sort((a, b) => b.value - a.value)
		.map(item => item.item);

	return { totalValue, chartData, sortedItems };
};
