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
import { handleErrorToast, showWarningToast } from "@/utils/toasts";

const Login = () => {
	const [email, setEmail] = useState<InputState>({
		value: "",
		errorMessage: "",
	});

	const [password, setPassword] = useState<InputState>({
		value: "",
		errorMessage: "",
	});

	// error for the whole form
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const router = useRouter(); // to go to another page

	const handleLogin = async () => {
		setErrorMessage("");
		// check that all fields all aren't empty and that there aren't any errors
		if (email.value == "" || password.value == "") {
			showWarningToast("Please enter your email and password");
			return;
		}
		// check that there aren't any errors for fields
		if (email.errorMessage != "" || password.errorMessage != "") {
			console.log(email, password);
			showWarningToast("Please enter a valid email and password");
			return;
		}

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
			handleErrorToast(error);
		}
	};

	return (
		<div className=" text-center w-full flex-col flex justify-center bg-white text-black mt-4 p-4">
			{/* Logo */}
			<h1 className="font-bold mt-2 mb-4 text-2xl border-b-2 border-custom-gray text-center pb-2">
				Please log in
			</h1>
			{errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

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
			<div className="mb-4"></div>
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
			<button className="bg-green my-4" onClick={handleLogin}>
				Log in
			</button>
			<Link href={"/register"}>Don&apos;t have an account?</Link>
			<Link href={"/register"}>Forgot your password?</Link>
		</div>
	);
};

export default React.memo(Login);
