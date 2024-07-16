import { cryptoApi } from "@/api/crypto";
import { walletApi } from "@/api/wallet";
import CryptoListItem from "@/components/custom list/CryptoListItem";
import LinkItemWrapper from "@/components/custom list/wrappers/LinkItemWrapper";
import MyList from "@/components/custom list/MyList";
import WalletListItem from "@/components/custom list/WalletListItem";
import React from "react";

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
	const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

	const handleChangeShowing = () => {
		setShowing(showing == "Wallets" ? "Crypto" : "Wallets");
	};

	return (
		<div className="flex flex-col w-1/2">
			<div className="flex justify-between">
				<h1>Your {showing}</h1>
				{/* Choose what items to show */}
				<div className="mb-4 items-end">
					<button
						className={`${SHOW_STYLE} border-r-0 ${
							showing == "Wallets" ? "bg-gray-500" : ""
						}`}
						onClick={handleChangeShowing}
					>
						Wallets
					</button>
					<button
						className={`${SHOW_STYLE} ${
							showing == "Crypto" ? "bg-gray-500" : ""
						}`}
						onClick={handleChangeShowing}
					>
						Crypto
					</button>
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
						<LinkItemWrapper href={`/crypto/${item.id}`}>
							<CryptoListItem
								item={item}
								image={
									"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
								}
							/>
						</LinkItemWrapper>
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
