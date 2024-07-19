"use client";
import React, { useState } from "react";
import WalletsModal from "./_components/WalletsModal";
import CryptoModal from "./_components/CryptoModal";
import RightHalf from "./_components/RightHalf";

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

			{/* Show a modal based on the current showing */}
			{openModal &&
				(showing == "Wallets" ? (
					<WalletsModal closeModal={() => setOpenModal(false)} />
				) : (
					<CryptoModal closeModal={() => setOpenModal(false)} />
				))}
		</main>
	);
};

export default Dashboard;
