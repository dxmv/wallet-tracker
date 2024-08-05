import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

// generates a random hex string
const genRanHex = (size: number): string =>
	[...Array(size)]
		.map(() => Math.floor(Math.random() * 10 + 6).toString(16))
		.join("");

// extracts the color from the image
export const extractColor = async (imageUrl: string): Promise<string> => {
	try {
		const color = await fac.getColorAsync(imageUrl, { algorithm: "simple" });
		return color.hex;
	} catch (e) {
		return genRanHex(8); // fallback color
	}
};
