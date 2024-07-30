import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => (
	<footer className="p-4 flex justify-end">
		<Link href="https://github.com/dxmv/wallet-tracker" target="_blank">
			<FaGithub size={24} />
		</Link>
	</footer>
);

export default React.memo(Footer);
