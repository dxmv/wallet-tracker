import CryptoContext from "@/context/coins/CryptoContext";
import { useContext } from "react";

export const useCrypto = () => {
	const context = useContext(CryptoContext);
	if (context === undefined) {
		throw new Error("useCrypto must be used within a CryptoProvider");
	}
	return context;
};
