"use client";

import { TextInput } from "@/components/TextInput";
import Link from "next/link";
import React from "react";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { useState } from "react";
import { InputState } from "@/types";
import { handleEmailChange, handlePasswordChange } from "@/utils/inputHandlers";
import { setCookie } from "@/utils/cookies";

// login response type
interface ResponseJwt {
	jwt: String;
}

const Login = () => {
	const [email, setEmail] = useState<InputState>({
		value: "",
	});

	const [password, setPassword] = useState<InputState>({
		value: "",
	});

	const handleLogin = async () => {
		// Request payload
		const payload = {
			email: email.value,
			password: password.value,
		};

		try {
			const response = await fetch("http://localhost:8080/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				const data = (await response.json()) as ResponseJwt;

				// setting the id as cookie
				setCookie("token", data.jwt, 1);
				// Redirect the user or handle success response
			} else {
				// TODO: ADD ERROR MESSAGE TO THE FORM
				const error = await response.json();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Good to see you again</h1>
			<h1>Please log in</h1>

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
