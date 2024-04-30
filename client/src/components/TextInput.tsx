import React from "react";

interface TextInputProps {
	inputText: string;
	placeholderText: string;
	password?: boolean;
	icon: React.ReactNode;
	value: string;
	errorMessage?: string;
	setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Used for all text inputs in forms
export const TextInput = ({
	inputText,
	placeholderText,
	password,
	icon,
	value,
	errorMessage,
	setValue,
}: TextInputProps) => {
	return (
		<div className="w-full text-left">
			<p className="">{inputText}</p>
			<div className="relative w-full mt-2">
				{password ? (
					<input
						type="password"
						placeholder={placeholderText}
						className="border-2 w-full h-full relative"
						style={{ paddingLeft: "30px" }}
						value={value}
						onChange={setValue}
					/>
				) : (
					<input
						type="text"
						placeholder={placeholderText}
						className="border-2 w-full h-full relative"
						style={{ paddingLeft: "30px" }}
						value={value}
						onChange={setValue}
					/>
				)}

				{/* For the icon part of the input */}
				<div
					className="absolute bg-gray-500 h-full border-r-2 flex flex-row justify-center text-center"
					style={{ width: "28px", top: 0, left: 0 }}
				>
					{icon}
				</div>
			</div>
			<p className="text-red-600">{errorMessage && errorMessage}</p>
		</div>
	);
};
