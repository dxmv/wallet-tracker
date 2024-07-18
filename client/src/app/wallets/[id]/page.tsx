"use client";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import MyList from "@/components/custom list/MyList";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import { IWallet } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Wallet = ({ params }: { params: { id: string } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null);

	useEffect(() => {
		const fetchWallet = async () => {
			try {
				const wallet = await walletApi.getOneWallet(Number.parseInt(params.id));
				setWallet(wallet);
				console.log(wallet);
			} catch (e) {
				console.error(e);
			}
		};
		fetchWallet();
	}, [params.id]);

	if (!wallet) {
		return <>a</>;
	}

	return (
		<main className="flex flex-col w-full py-8 px-4" style={{ height: "87vh" }}>
			{/* Wallet info */}
			<div className="flex pb-2 border-b-2 border-gray-300">
				<img
					src={wallet?.adminWallet.iconUrl}
					alt="Zoki"
					width={240}
					height={240}
				/>
				<div className="flex flex-col justify-between ml-3 h-1/2">
					<h1 className="font-bold text-2xl">{wallet?.adminWallet.name}</h1>
					<p>Number of coins: {wallet?.coins.length}</p>
					<p>Amount in dollars: {wallet?.coins.length}</p>
				</div>
			</div>
			{/* Grid of coins */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(5,1fr)",
					gridGap: "20px",
				}}
			>
				<MyList
					apiCall={async () => await wallet.coins}
					renderItem={item => (
						<LinkItemWrapper href="/test">
							<CryptoListItem item={item} image="" />
						</LinkItemWrapper>
					)}
					display="grid"
				/>
			</div>
			{/* Button for adding crypto */}
			<button>Add crypto</button>
		</main>
	);
};

export default Wallet;
