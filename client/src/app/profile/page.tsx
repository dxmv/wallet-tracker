"use client";
import { authApi } from "@/api/auth";
import { walletApi } from "@/api/wallet";
import MyList from "@/components/custom list/MyList";
import { useAuth } from "@/hooks/useAuth";
import { useCrypto } from "@/hooks/useCrypto";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

const headerStyle =
	"font-bold text-2xl border-b-2 border-b-white w-1/3 pb-2 mb-4";

const ProfilePage = () => {
	const { user, isAdmin } = useAuth();
	const { push } = useRouter();
	const cryptoMap = useCrypto();
	// State to hold stats data, initialized with initialStats
	const [stats, setStats] = useState<IStats>(initialStats);
	// holds the top coins that user holds
	const [topCoins, setTopCoins] = useState<
		Array<{ name: string; iconUrl: string; value: string }>
	>([]);

	// fetch the wallets
	useEffect(() => {
		const fetchWallets = async () => {
			const res = await walletApi.getAllWallets();
			// keeping track of the top wallet
			let topWalletName: String = res[0].adminWallet.name;
			let currentMax: number = -1;
			const coins: Map<string, { iconUrl: string; valueUSD: number }> =
				new Map(); // Map to track total value of each coin

			// Fetch the wallets and calculate stats
			const totalValue = res.reduce((total, item) => {
				const walletValue = item.coins.reduce((walletTotal, coin) => {
					const currentPrice = cryptoMap.get(coin.apiId)?.current_price || 0;
					const coinValue = coin.amount * currentPrice;
					const existingCoin = coins.get(coin.name as string) || {
						iconUrl: coin.imageUrl,
						valueUSD: 0,
					};
					coins.set(coin.name as string, {
						...existingCoin,
						valueUSD: existingCoin.valueUSD + coinValue,
					});
					return walletTotal + coinValue;
				}, 0);

				if (walletValue > currentMax) {
					topWalletName = item.adminWallet.name;
					currentMax = walletValue;
				}

				return total + walletValue;
			}, 0);

			console.log(coins.entries());

			// get the top coins
			const top = Array.from(coins.entries())
				.sort((a, b) => b[1].valueUSD - a[1].valueUSD) // sort by the amount in usd
				.slice(0, 3)
				.map(
					([name, value]): {
						name: string;
						iconUrl: string;
						value: string;
					} => ({
						name,
						iconUrl: value.iconUrl,
						value: value.valueUSD.toFixed(2),
					})
				);

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
	}, [cryptoMap]);

	const handleLogout = async () => {
		await authApi.logout();
		await push("/login");
	};

	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white">
			<h1 className="font-bold text-4xl ">
				Hello, {user?.email} {isAdmin && "(ADMIN)"}
			</h1>
			<div className="my-8 flex">
				<div className="w-1/2">
					<h1 className={headerStyle}>Stats</h1>
					{Object.values(stats).map(stat => (
						<StatLine key={stat.text} text={stat.text} value={stat.value} />
					))}
				</div>
				<div className="w-1/2">
					<h1 className={headerStyle}>Top 5 coins by amount in USD:</h1>
					<MyList
						apiCall={async () => await topCoins}
						renderItem={item => (
							<div className="flex justify-between border-b-2 border-custom-purple-light py-2 hover:bg-custom-purple-dark cursor-pointer">
								<div className="flex items-center">
									<img
										src={item.iconUrl}
										alt="icon"
										style={{ width: "24px", height: "24px" }}
									/>
									<span className="ml-4 font-bold">{item.name}</span>
								</div>
								<span>${item.value}</span>
							</div>
						)}
					/>
				</div>
			</div>
			<button className={`btn-purple font-bold `} onClick={handleLogout}>
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
