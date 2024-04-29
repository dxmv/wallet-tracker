import Link from "next/link";
import React from "react";

const Login = () => {
	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Good to see you again</h1>
			<h1>Please log in</h1>
			{/* Login window */}
			<div className="w-full flex-col flex bg-white text-black mt-4">
				<button className="bg-green">Log in</button>
				<Link href={"/register"}>Don't have an account?</Link>
				<Link href={"/register"}>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Login;
