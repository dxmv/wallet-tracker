import Link from "next/link";

const Nav = () => (
	/* Dodati efekat kada smo na aktivnoj stranici */
	/* Profile drop down */
	<nav className="flex flex-row justify-between p-4 relative">
		<div>Logo</div>
		<div className="flex flex-row w-1/5 justify-between">
			<Link href={"/"}>Home</Link>
			<Link href={"/news"}>News</Link>
			<Link href={"/"}>Profile</Link>
		</div>
	</nav>
);

export default Nav;
