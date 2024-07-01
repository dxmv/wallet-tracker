import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function DashboardLayout({
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
