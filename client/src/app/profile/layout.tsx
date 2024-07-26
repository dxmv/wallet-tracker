import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ProfileLayout({
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
