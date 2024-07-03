"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import React from "react";
import { MyLegend } from "./_components/MyLegend";

const Dashboard = () => {
	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white">
			{/* Pie chart */}
			{/* Show the elements currently shown in the chart */}
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
		</main>
	);
};

export default Dashboard;
