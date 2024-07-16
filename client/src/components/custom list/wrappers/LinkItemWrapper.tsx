import React from "react";
import Link from "next/link";

interface PropsLinkItemWrapper {
	href: string;
	children: React.ReactNode;
}

// we use this when an item links to another page
const LinkItemWrapper = ({ href, children }: PropsLinkItemWrapper) => {
	return (
		<Link
			href={href}
			className="flex py-2 border-b-2 border-gray-800 justify-between hover:bg-gray-500 mb-2 items-center"
		>
			{children}
		</Link>
	);
};

export default LinkItemWrapper;
