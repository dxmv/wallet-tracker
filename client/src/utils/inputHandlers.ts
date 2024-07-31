// For text inputs
import React from "react";
import { InputState } from "@/types";

export const handleEmailChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	setEmail: React.Dispatch<React.SetStateAction<InputState>>
) => {
	// checks if the emails match the regex
	const validEmail = (value: string): boolean => {
		const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // letters before '@', letters after '@', after those letters a '.' and then more letters
		return emailRegex.test(value);
	};

	setEmail({
		value: e.target.value,
		errorMessage:
			!validEmail(e.target.value) && e.target.value != ""
				? "The email isn't in correct format"
				: "",
	});
};

export const handlePasswordChange = (
	e: React.ChangeEvent<HTMLInputElement>,
	setPassword: React.Dispatch<React.SetStateAction<InputState>>
) => {
	// checks if the password has at least one uppercase letter and one number
	const validPassword = (value: string): boolean => {
		const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d).+$/;
		return passwordRegex.test(value);
	};

	setPassword({
		value: e.target.value,
		errorMessage:
			!validPassword(e.target.value) && e.target.value != ""
				? "The password must contain at least one uppercase letter and one number"
				: "",
	});
};
