"use client";
import WavyBackground from "@/components/WavyBackground";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function Home() {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return <WavyBackground>Loading...</WavyBackground>;
	}

	return (
		<WavyBackground>
			<div className="w-full h-screen flex items-center justify-center">
				<div className="w-1/2">
					<h1 className="text-2xl font-bold mb-8">Welcome to NAME OF APP</h1>
					{/* Short description of the app */}
					<p className="text-xl font-semibold mb-2">
						Do you have so many crypto wallets that you can't keep track of all
						of them?
					</p>
					<p>
						Say no to notebooks and spreadsheets. With our app you see real time
						value of your crypto across different wallets. To improve your
						experience we also visualize the distribution of your crypto across
						different wallets, and the distribution of cryptos you hold.
					</p>
					<div>
						{isAuthenticated ? (
							<Link href="/dashboard">Dashboard</Link>
						) : (
							<div>
								<Link href="/login">Login</Link>
								<Link href="/register">Register</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</WavyBackground>
	);
}
