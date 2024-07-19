import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function WalletLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
}
