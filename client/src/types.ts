export interface INews {
	// for the news pages
	url: String;
	title: String;
	description: String;
	thumbnail: String;
	createdAt: String;
}

type Role = "USER" | "ADMIN";

export interface IUser {
	id: number;
	email: String;
	password: String;
	roles: Array<Role>;
}

export interface IAdminWallet {
	id: number;
	name: String;
	iconUrl: String;
}

export interface IWallet {
	id: number;
	coins: Array<ICrypto>;
	adminWallet: IAdminWallet;
	walletName: string;
}

export interface ICrypto {
	id: number;
	name: String;
	ticker: String;
	amount: number;
	imageUrl: string;
	apiId: string;
}

// used for working with TextInput component
export interface InputState {
	value: string;
	errorMessage?: string;
}

// used for working with errors on request
export interface RequestError {
	statusCode: number;
	message: string;
}

// interface for coins from the Coin Market Cap API
export interface ICoinFromCoinGecko {
	id: String;
	symbol: String;
	name: String;
	image: String;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
}
