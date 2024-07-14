export interface INews {
	// for the news pages
	url: String;
	title: String;
	description: String;
	thumbnail: String;
	createdAt: String;
}

export interface IUser {
	id: number;
	email: String;
	password: String;
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
}

export interface ICrypto {
	id: number;
	name: String;
	ticker: String;
	amount: number;
	imageURL: string;
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
}
