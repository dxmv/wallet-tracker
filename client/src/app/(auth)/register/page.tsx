"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TextInput } from "@/components/TextInput";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { InputState } from "@/types";
import {
	handleConfirmPasswordChange,
	handleEmailChange,
	handlePasswordChange,
} from "@/utils/inputHandlers";

const Register = () => {
	const [email, setEmail] = useState<InputState>({
		value: "",
	});

	const [password, setPassword] = useState<InputState>({
		value: "",
	});

	const [confirmPassword, setConfirm] = useState<InputState>({
		value: "",
	});

	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Welcome to name of the website</h1>
			<h1>Please register</h1>
			{/* Register window */}
			<div className="w-full flex-col flex bg-white text-black mt-4">
				<TextInput
					inputText={"Your email:"}
					placeholderText={"eg. example@mail.com"}
					icon={
						<MdEmail className="absolute" style={{ top: "3px", left: "3px" }} />
					}
					value={email.value}
					setValue={e => handleEmailChange(e, setEmail)}
					errorMessage={email.errorMessage}
				/>
				<TextInput
					inputText={"Your password:"}
					placeholderText={"eg. Example123"}
					password={true}
					icon={
						<MdKey className="absolute" style={{ top: "3px", left: "3px" }} />
					}
					value={password.value}
					errorMessage={password.errorMessage}
					setValue={e => handlePasswordChange(e, setPassword)}
				/>
				<TextInput
					inputText={"Confirm your password:"}
					placeholderText={"eg. Example123"}
					icon={
						<MdKey className="absolute" style={{ top: "3px", left: "3px" }} />
					}
					value={confirmPassword.value}
					setValue={e =>
						handleConfirmPasswordChange(e, setConfirm, password.value)
					}
					errorMessage={confirmPassword.errorMessage}
				/>
				<button className="bg-green">Register</button>
				<Link href={"/login"}>Already have an account?</Link>
				<Link href={"/register"}>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Register;
