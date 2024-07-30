"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import WalletsModal from "./_components/WalletsModal";
import CryptoModal from "./_components/CryptoModal";
import RightHalf from "./_components/RightHalf";
import {
	Chart as ChartJS,
	ArcElement,
	Legend,
	Tooltip,
	ChartData,
	ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register the chart components we'll be using
ChartJS.register(ArcElement, Tooltip, Legend);

type IShow = "Wallets" | "Crypto";

const Dashboard = () => {
	const [showing, setShowing] = useState<IShow>("Wallets");
	const [totalValue, setTotalValue] = useState<number>(0);
	const [chartData, setChartData] = useState<ChartData<"pie"> | null>(null);

	// Define chart options
	const chartOptions: ChartOptions<"pie"> = useMemo(() => {
		return {
			plugins: {
				legend: {
					position: "right" as const,
				},
				title: {
					display: true,
					text: `Your ${showing} Distribution`,
					color: "white",
				},
			},
		};
	}, [showing]);

	const renderRightSide = useCallback(() => {
		return (
			<RightHalf
				showing={showing}
				totalValue={totalValue}
				setShowing={setShowing}
				setTotalValue={setTotalValue}
				setChartData={setChartData}
			/>
		);
	}, [showing, totalValue]);

	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white flex">
			{/* Pie chart */}
			<div className="w-1/2">
				<p className="font-bold text-2xl">
					Total value: ${totalValue.toFixed(2)}
				</p>
				{/* Render the chart */}
				{chartData && (
					<div style={{ width: "50%", margin: "auto" }}>
						<Pie data={chartData} options={chartOptions} />
					</div>
				)}
			</div>
			{renderRightSide()}
		</main>
	);
};

export default Dashboard;
