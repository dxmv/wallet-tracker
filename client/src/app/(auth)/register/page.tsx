"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TextInput } from "@/components/TextInput";
import { MdEmail } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { InputState } from "@/types";
import { handleEmailChange, handlePasswordChange } from "@/utils/inputHandlers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { authApi } from "@/api/auth";

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
		// password must match
		if (password.value !== confirmPassword.value) {
			setErrorMessage("Passwords do not match");
			return;
		}

		try {
			await authApi.register(email.value, password.value);
			// redirect to login page
			router.push("/login");
		} catch (error) {
			if (error instanceof Error) {
				setErrorMessage(error.message);
			} else {
				setErrorMessage("An unexpected error occurred during registration");
			}
		}
	};

	return (
		<div className="text-center">
			{/* Logo */}
			<h1 className="font-bold my-3">Welcome to name of the website</h1>
			<h1>Please register</h1>

			{errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}

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
					setValue={e => handlePasswordChange(e, setConfirm)}
					errorMessage={confirmPassword.errorMessage}
				/>

				{/* 
					disable the button if:
						any of the text fields is empty
						any of the error messages aren't empty
				*/}
				<button className="bg-green" onClick={handleRegister}>
					Register
				</button>
				<Link href={"/login"}>Already have an account?</Link>
				<Link href={"/register"}>Forgot your password?</Link>
			</div>
		</div>
	);
};

export default Register;
