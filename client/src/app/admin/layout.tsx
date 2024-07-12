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
			<h1 className="p-4">Admin Dashboard</h1>
			{children}
			<Footer />
		</>
	);
};

export default AdminLayout;
