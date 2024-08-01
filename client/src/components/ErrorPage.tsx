import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

const ErrorPage = ({ errorMessage }: { errorMessage: string }) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full">
			<BiSolidErrorAlt className="text-custom-purple-light text-8xl mb-6" />
			<h1 className="text-custom-purple-dark font-bold text-4xl">
				Oops there was an error...
			</h1>
			<p className="mt-10 text-red-500">{errorMessage}</p>
		</div>
	);
};

export default ErrorPage;
