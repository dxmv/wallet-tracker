"use client";
import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import React, { useCallback } from "react";
import DetailsModalWrapper from "@/components/custom list/wrappers/DetailsModalItemWrapper";
import CryptoDetails from "./CryptoDetails";
import { ICrypto, IWallet } from "@/types";

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
	const renderChoice = useCallback(() => {
		const handleChangeShowing = (): void => {
			setShowing(showing == "Wallets" ? "Crypto" : "Wallets");
		};

		return (
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
		);
	}, [showing, setShowing]);

	const renderWalletItem = useCallback(
		(item: IWallet) => (
			<LinkItemWrapper href={`/wallets/${item.id}`}>
				<WalletListItem item={item} />
			</LinkItemWrapper>
		),
		[]
	);

	const renderCryptoItem = useCallback(
		(item: ICrypto) => (
			<DetailsModalWrapper
				item={item}
				renderDetails={crypto => <CryptoDetails crypto={crypto} />}
			>
				<CryptoListItem item={item} />
			</DetailsModalWrapper>
		),
		[]
	);

	return (
		<div className="flex flex-col w-1/2">
			{renderChoice()}
			{/* Different api calls for both wallets and crypto */}
			{showing == "Wallets" ? (
				<MyList
					apiCall={walletApi.getAllWallets}
					renderItem={renderWalletItem}
				/>
			) : (
				<MyList
					apiCall={cryptoApi.getAllCryptoForUser}
					renderItem={renderCryptoItem}
				/>
			)}

			<button className="mt-8" onClick={openModal}>
				Add {showing}
			</button>
		</div>
	);
};

export default RightHalf;
