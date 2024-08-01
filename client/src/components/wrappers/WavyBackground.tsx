import React, { ReactNode } from "react";

const WavyBackground = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative w-full h-screen overflow-hidden bg-black">
			<div className="absolute inset-0">
				<div className="absolute bottom-0 left-0 right-0 top-0">
					<svg
						className="absolute left-0 w-[200%] h-full animate-wave"
						viewBox="0 0 1000 1000"
						preserveAspectRatio="none"
					>
						<path
							className="fill-[#522E93] opacity-30"
							d="M0,1000 C200,1000 300,800 500,800 C700,800 800,1000 1000,1000 V1000 H0 V0 Z"
						></path>
					</svg>
					<svg
						className="absolute left-0 w-[200%] h-full animate-wave animation-delay-1000"
						viewBox="0 0 1000 1000"
						preserveAspectRatio="none"
					>
						<path
							className="fill-[#522E93] opacity-30"
							d="M0,1000 C200,1000 300,900 500,900 C700,900 800,1000 1000,1000 V1000 H0 V0 Z"
						></path>
					</svg>
					<svg
						className="absolute left-0 w-[200%] h-full animate-wave animation-delay-2000"
						viewBox="0 0 1000 1000"
						preserveAspectRatio="none"
					>
						<path
							className="fill-[#522E93] opacity-30"
							d="M0,1000 C200,1000 300,750 500,750 C700,750 800,1000 1000,1000 V1000 H0 V0 Z"
						></path>
					</svg>
				</div>
			</div>
			<div className="relative z-10 text-white text-center p-5">{children}</div>
		</div>
	);
};

export default WavyBackground;
