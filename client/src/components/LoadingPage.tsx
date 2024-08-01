import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoadingPage = () => {
	return (
		<div className="bg-black flex justify-center items-center w-full h-full text-center">
			<TailSpin
				visible={true}
				height="200"
				width="200"
				color="#522E93"
				ariaLabel="tail-spin-loading"
				radius="2"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
};

export default LoadingPage;
