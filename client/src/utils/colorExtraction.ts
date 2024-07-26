import { FastAverageColor } from "fast-average-color";

const fac = new FastAverageColor();

export const extractColor = async (imageUrl: string): Promise<string> => {
	try {
		const color = await fac.getColorAsync(imageUrl, { algorithm: "dominant" });
		return color.hex;
	} catch (e) {
		console.error(e);
		return "#CCCCCC"; // fallback color
	}
};
