"use client";
import React, { useState } from "react";
import { MyLegend } from "./_components/MyLegend";
import { AddModal } from "@/components/AddModal";

type IShow = "Wallets" | "Crypto";

const Dashboard = () => {
	const [showing, setShowing] = useState<IShow>("Wallets");
	const [openModal, setOpenModal] = useState<boolean>(false);

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
				<AddModal
					showing={showing}
					list={[
						{
							id: 1,
							name: "Bitcoin",
							ticker: "BTC",
							amount: 1.05,
							imageURL:
								"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
						},
						{
							id: 2,
							name: "Solana",
							ticker: "SOL",
							amount: 4.05,
							imageURL:
								"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
						},
					]}
					closeModal={() => setOpenModal(false)}
				/>
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

			<MyLegend
				items={[
					{
						id: 1,
						name: "Bitcoin",
						ticker: "BTC",
						amount: 1.05,
						imageURL:
							"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
					},
					{
						id: 2,
						name: "Solana",
						ticker: "SOL",
						amount: 4.05,
						imageURL:
							"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
					},
				]}
			/>
			<button onClick={openModal}>Add {showing}</button>
		</div>
	);
};

export default Dashboard;
