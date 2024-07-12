"use client";
import React, { useState } from "react";
import Modal from "@/components/Modal";
import { walletApi } from "@/api/wallet";
import { useRouter } from "next/navigation";
import ListAdminWallets from "@/components/ListAdminWallets";

type IShow = "Wallets" | "Crypto";

const Dashboard = () => {
	const [showing, setShowing] = useState<IShow>("Wallets");
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<number | null>(null);
	const { push } = useRouter();

	const handleNext = async () => {
		// check if a wallet is selected
		if (selectedId) {
			try {
				const data = await walletApi.addWallet(selectedId);
				push(`/wallets/${data.id}`); // redirect
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white flex">
			{/* Pie chart */}
			<div className="w-1/2">a</div>
			<RightHalf
				showing={showing}
				setShowing={setShowing}
				openModal={() => setOpenModal(true)}
			/>
			{openModal && (
				<Modal
					title={`Add wallets`}
					closeModal={() => setOpenModal(false)}
					handleNext={handleNext}
				>
					<ListAdminWallets
						selectedId={selectedId}
						setSelectedId={setSelectedId}
					/>
				</Modal>
			)}
		</main>
	);
};

// shows the elements currently on the chart
const RightHalf = ({
	showing,
	setShowing,
	openModal,
}: {
	showing: IShow;
	setShowing: React.Dispatch<React.SetStateAction<IShow>>;
	openModal: () => void;
}) => {
	const SHOW_STYLE = "px-3 py-1 border-gray-600 border-2";

	return (
		<div className="flex flex-col w-1/2">
			<div className="flex justify-between">
				<h1>Your {showing}</h1>
				{/* Choose what items to show */}
				<div className="mb-4 items-end">
					<button
						className={`${SHOW_STYLE} border-r-0`}
						onClick={() => setShowing("Wallets")}
					>
						Wallets
					</button>
					<button className={SHOW_STYLE} onClick={() => setShowing("Crypto")}>
						Crypto
					</button>
				</div>
			</div>

			<button onClick={openModal}>Add {showing}</button>
		</div>
	);
};

export default Dashboard;
