"use client";
import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import React, { useMemo } from "react";
import DetailsModalItemWrapper from "@/components/custom list/wrappers/DetailsModalItemWrapper";
import DetailsModalWrapper from "@/components/custom list/wrappers/DetailsModalItemWrapper";

const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

// shows the list of elements currently on the chart
const RightHalf = ({
	showing,
	setShowing,
	openModal,
}: {
	showing: "Wallets" | "Crypto";
	setShowing: React.Dispatch<React.SetStateAction<"Wallets" | "Crypto">>;
	openModal: () => void;
}) => {
	const handleChangeShowing = (): void => {
		setShowing(showing == "Wallets" ? "Crypto" : "Wallets");
	};

	return (
		<div className="flex flex-col w-1/2">
			<div className="flex justify-between">
				<h1>Your {showing}</h1>
				{/* Choose what items to show */}
				<div className="mb-4 items-end">
					{["Wallets", "Crypto"].map(type => (
						<button
							key={type}
							className={`${SHOW_STYLE} ${
								type === "Crypto" ? "" : "border-r-0"
							} ${showing === type ? "bg-gray-500" : ""}`}
							onClick={handleChangeShowing}
						>
							{type}
						</button>
					))}
				</div>
			</div>

			{/* Different api calls for both wallets and crypto */}
			{showing == "Wallets" ? (
				<MyList
					apiCall={walletApi.getAllWallets}
					renderItem={item => (
						<LinkItemWrapper href={`/wallets/${item.id}`}>
							<WalletListItem item={item} />
						</LinkItemWrapper>
					)}
				/>
			) : (
				<MyList
					apiCall={cryptoApi.getAllCryptoForUser}
					renderItem={item => (
						<DetailsModalWrapper
							item={item}
							renderDetails={crypto => (
								<div>
									<h2>{crypto.name}</h2>
									<p>Amount: {crypto.amount}</p>
									<p>Value:</p>
									{/* Add more details as needed */}
								</div>
							)}
						>
							<CryptoListItem item={item} image="" />
						</DetailsModalWrapper>
					)}
				/>
			)}

			<button className="mt-8" onClick={openModal}>
				Add {showing}
			</button>
		</div>
	);
};

export default RightHalf;
