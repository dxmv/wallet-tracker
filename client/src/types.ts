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

export interface IWallet {
	id: number;
	name: String;
	coins: Array<ICrypto>;
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
