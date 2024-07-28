"use client";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const AdminLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const { isAdmin, loading } = useAuth();
	const { push } = useRouter();
	console.log(isAdmin, loading);

	if (loading) {
		return <>Loading...</>;
	}

	// redirect if not admin
	if (!isAdmin) {
		push("/dashboard");
		return;
	}

	return (
		<>
			<Nav />
			{children}
			<Footer />
		</>
	);
};

export default AdminLayout;
