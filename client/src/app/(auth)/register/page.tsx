"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TextInput } from "@/components/TextInput";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { InputState } from "@/types";
import { handleEmailChange, handlePasswordChange } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authApi } from "@/api/auth";
import {
	handleErrorToast,
	showErrorToast,
	showWarningToast,
} from "@/utils/toasts";
import { PURPLE_BUTTON_STYLE } from "@/utils/styles";

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

	// error for the whole form
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const router = useRouter(); // to go to another page

	const handleRegister = async () => {
		setErrorMessage("");
		// all fields must not be empty
		if (
			password.value == "" ||
			email.value == "" ||
			confirmPassword.value == ""
		) {
			showWarningToast("Please enter your email and password");
			return;
		}
		// all fields must not have an error
		if (
			email.errorMessage != "" ||
			password.errorMessage != "" ||
			confirmPassword.errorMessage != ""
		) {
			showWarningToast("Please enter a valid email and password");
			return;
		}
		// password must match
		if (password.value !== confirmPassword.value) {
			showErrorToast("Passwords do not match");
			return;
		}

		try {
			const data = await authApi.register(email.value, password.value);
			// redirect to login page
			router.push("/login");
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("An unexpected error occurred during registration");
			}
			handleErrorToast(error);
		}
	};

	return (
		<div className=" text-center w-full flex-col flex justify-center bg-white items-center text-black mt-4 p-4 rounded-md shadow-lg shadow-custom-gray">
			<Image src="/logo.png" width={100} height={100} alt="Logo" />
			<h1 className="font-bold mt-2 mb-4 text-2xl border-b-2 border-custom-gray text-center pb-2">
				Welcome, please register
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
			<div className="mb-4"></div>
			<TextInput
				inputText={"Confirm your password:"}
				placeholderText={"eg. Example123"}
				icon={
					<MdKey className="absolute" style={{ top: "3px", left: "3px" }} />
				}
				value={confirmPassword.value}
				setValue={e => handlePasswordChange(e, setConfirm)}
				errorMessage={confirmPassword.errorMessage}
			/>
			<button
				className={`${PURPLE_BUTTON_STYLE} my-4 w-1/4 font-semibold`}
				onClick={handleRegister}
			>
				Register
			</button>
			<Link href={"/login"} className="text-custom-gray hover:text-black">
				Already have an account?
			</Link>
		</div>
	);
};

export default Register;
