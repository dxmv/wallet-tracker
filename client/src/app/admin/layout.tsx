import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React from "react";

const AdminLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
};

export default AdminLayout;
