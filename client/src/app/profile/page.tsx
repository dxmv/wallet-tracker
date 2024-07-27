"use client";
import { authApi } from "@/api/auth";
import { walletApi } from "@/api/wallet";
import MyList from "@/components/custom list/MyList";
import { useAuth } from "@/hooks/useAuth";
import { useCrypto } from "@/hooks/useCrypto";
import { ICrypto, IWallet } from "@/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface IStat {
	text: string;
	value: string | number;
}

interface IStats {
	totalValueUsd: IStat;
	numberOfWallets: IStat;
	topWallet: IStat;
	coinsHeld: IStat;
}

const initialStats: IStats = {
	totalValueUsd: { text: "Total amount in USD: $", value: "0" },
	numberOfWallets: { text: "Number of wallets: ", value: "0" },
	topWallet: { text: "Top wallet: ", value: "0" },
	coinsHeld: { text: "Coins held: ", value: "0" },
};

const ProfilePage = () => {
	const { user, isAdmin } = useAuth();
	const { push } = useRouter();
	const cryptoMap = useCrypto();
	// State to hold stats data, initialized with initialStats
	const [stats, setStats] = useState<IStats>(initialStats);
	// holds the top coins that user holds
	const [topCoins, setTopCoins] = useState<
		Array<{ name: string; value: string }>
	>([]);

	// fetch the wallets
	useEffect(() => {
		const fetchWallets = async () => {
			const res = await walletApi.getAllWallets();
			// keeping track of the top wallet
			let topWalletName: String = res[0].adminWallet.name;
			let currentMax: number = -1;
			const coins: Map<string, number> = new Map(); // Map to track total value of each coin

			// // Fetch the wallets and calculate stats
			const totalValue = res.reduce((total, item) => {
				const res =
					total +
					item.coins.reduce((total, coin) => {
						const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
						coins.set(
							coin.name as string,
							(coins.get(coin.name as string) || 0) + currentPrice
						); // change the amount in the map
						return total + coin.amount * currentPrice;
					}, 0);

				if (res > currentMax) {
					topWalletName = item.adminWallet.name;
					currentMax = res;
				}

				return total + res;
			}, 0);

			// get the top coins
			const top = Array.from(coins.entries())
				.sort((a, b) => b[1] - a[1]) // sort by the amount in usd
				.slice(0, 3)
				.map(([name, value]) => ({ name, value: value.toFixed(2) }));

			setTopCoins(top);

			// Number of wallets
			await setStats(prev => ({
				...prev,
				numberOfWallets: {
					...prev.numberOfWallets,
					value: res.length,
				},
				topWallet: {
					...prev.topWallet,
					value: topWalletName as string,
				},
				totalValueUsd: {
					...prev.totalValueUsd,
					value: totalValue.toFixed(2),
				},
				coinsHeld: {
					...prev.coinsHeld,
					value: coins.size,
				},
			}));
		};
		fetchWallets();
	}, []);

	const handleLogout = async () => {
		await authApi.logout();
		await push("/login");
	};

	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white">
			<h1 className="font-bold text-4xl">
				Hello, {user?.email} {isAdmin && "(ADMIN)"}
			</h1>
			<div className="my-8">
				<h1 className="font-bold text-2xl border-b-2 border-b-white w-1/3 pb-2 mb-4">
					Stats
				</h1>
				{Object.values(stats).map(stat => (
					<StatLine key={stat.text} text={stat.text} value={stat.value} />
				))}
				<p>Top 5 coins by amount in USD:</p>
				<MyList
					apiCall={async () => await topCoins}
					renderItem={item => (
						<div className="flex">
							<div>{item.name}</div>
							<div>{item.value}</div>
						</div>
					)}
				/>
			</div>
			<button
				className="text-red-500 border-2 py-2 px-4 rounded-lg"
				onClick={handleLogout}
			>
				Logout
			</button>
		</main>
	);
};

const StatLine = ({
	text,
	value,
}: {
	text: string;
	value: string;
}): React.JSX.Element => {
	return (
		<div className="my-4">
			<span>{text}</span>
			<b>{value}</b>
		</div>
	);
};

export default ProfilePage;
