import { createContext, useContext } from "react";

import { ICoinFromCoinGecko } from "@/types";

// we're saving coins from coin gecko in the context
const CryptoContext = createContext<Array<ICoinFromCoinGecko>>([]);

export default CryptoContext;
