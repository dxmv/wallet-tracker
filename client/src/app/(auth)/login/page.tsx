"use client";

import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import React from "react";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { useState } from "react";
import { InputState } from "@/types";
import { handleEmailChange, handlePasswordChange } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/auth";
import { setCookie } from "@/utils/cookies";
import { toast } from "react-toastify";

const Login = () => {
	const [email, setEmail] = useState<InputState>({
		value: "",
	});

	const [password, setPassword] = useState<InputState>({
		value: "",
	});

	// error for the whole form
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const router = useRouter(); // to go to another page

	const handleLogin = async () => {
		try {
			const { jwt } = await authApi.login(email.value, password.value);
			setCookie("token", jwt);
			// redirect here
			router.push("/dashboard");
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("An unexpected error occurred during login");
			}
		}
	};

	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Good to see you again</h1>
			<h1>Please log in</h1>

			{errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

			{/* Login window */}
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
				<button className="bg-green" onClick={handleLogin}>
					Log in
				</button>
				<Link href={"/register"}>Don&apos;t have an account?</Link>
				<Link href={"/register"}>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Login;
