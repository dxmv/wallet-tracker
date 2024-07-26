"use client";
import { authApi } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const ProfilePage = () => {
	const { user } = useAuth();
	const { push } = useRouter();

	const handleLogout = async () => {
		await authApi.logout();
		await push("/login");
	};

	return (
		<main style={{ height: "87vh" }} className="py-8 px-4 text-white">
			<h1 className="font-bold text-4xl">
				Hello, {user?.email} (if admin, ADMIN)
			</h1>
			<div className="my-8">
				<h1 className="font-bold text-2xl border-b-2 border-b-white w-1/3 pb-2 mb-4">
					Stats
				</h1>
				<p>
					Total amount in USD: <b>$totalvalue</b>
				</p>
				<StatLine text="Total amount in USD:" value="0" dollarSign={true} />
				<StatLine text="Number of wallets:" value="0" />
				<StatLine text="Top wallet:" value="0" />
				<StatLine text="Coins held:" value="0" />
				<p>Top 5 coins by amount in USD:</p>
			</div>
			<button
				className="text-red-500 border-2 py-2 px-4 rounded-lg"
				onClick={handleLogout}
			>
				Logout
			</button>
		</main>
	);
};

const StatLine = ({
	text,
	dollarSign = false,
	value,
}: {
	text: string;
	value: string;
	dollarSign?: boolean;
}): React.JSX.Element => {
	return (
		<p>
			{text}: {dollarSign && "$"}
			<b>{value}</b>
		</p>
	);
};

export default ProfilePage;
