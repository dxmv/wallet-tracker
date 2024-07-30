"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ReactNode } from "react";

const Nav = () => {
	const { isAdmin, loading } = useAuth();

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<nav
			className="flex flex-row justify-between p-4 relative "
			style={{
				background:
					"linear-gradient(180deg, rgba(103,58,183,0.5) 6%, rgba(0,0,0,1) 40%)",
			}}
		>
			<div>Logo</div>
			<div className="flex flex-row w-2/6 justify-between">
				<NavLink href={"/dashboard"}>Dashboard</NavLink>
				{isAdmin && <NavLink href="/admin">Admin</NavLink>}
				<NavLink href="/profile">Profile</NavLink>
			</div>
		</nav>
	);
};

const activeLinkClass = "rounded-lg font-bold text-custom-purple-light";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
	const pathname = usePathname();
	return (
		<div
			className={`h-full w-full ml-2 text-end  ${
				pathname === href && activeLinkClass
			}`}
		>
			<Link className="text-lg" href={href}>
				{children}
			</Link>
		</div>
	);
};

export default React.memo(Nav);
