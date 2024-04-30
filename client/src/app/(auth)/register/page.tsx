import React from "react";
import Link from "next/link";
import { TextInput } from "@/components/TextInput";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";

const Register = () => {
	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Good to see you again</h1>
			<h1>Please log in</h1>
			{/* Login window */}
			<div className="w-full flex-col flex bg-white text-black mt-4">
				{/* <TextInput
					inputText={"Your email:"}
					placeholderText={"eg. example@mail.com"}
					password={false}
					icon={
						<MdEmail className="absolute" style={{ top: "3px", left: "3px" }} />
					}
				/>
				<TextInput
					inputText={"Your password:"}
					placeholderText={"eg. Example123"}
					password={true}
					icon={
						<MdKey className="absolute" style={{ top: "3px", left: "3px" }} />
					}
				/>
				<TextInput
					inputText={"Confirm password:"}
					placeholderText={"eg. Example123"}
					password={true}
					icon={
						<MdKey className="absolute" style={{ top: "3px", left: "3px" }} />
					}
				/> */}
				<button className="bg-green">Log in</button>
				<Link href={"/login"}>Already have an account?</Link>
				<Link href={"/register"}>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Register;
