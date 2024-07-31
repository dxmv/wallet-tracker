import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"custom-purple": {
					light: "#673AB7",
					dark: "#522E93",
				},
				"custom-gray": "#CDCDCD",
			},
			animation: {
				wave: "wave 10s linear infinite",
			},
			keyframes: {
				wave: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			const newUtilities = {
				".animation-delay-1000": { animationDelay: "1000ms" },
				".animation-delay-2000": { animationDelay: "2000ms" },
			};
			addUtilities(newUtilities);
		}),
	],
};
export default config;
