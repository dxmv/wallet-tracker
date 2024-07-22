import { createContext } from "react";

import { ICoinFromCoinGecko } from "@/types";

// we're saving coins from coin gecko in the context
const CryptoContext = createContext<Map<string, ICoinFromCoinGecko>>(new Map());

export default CryptoContext;
