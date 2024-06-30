export interface INews {
	// for the news pages
	url: String;
	title: String;
	description: String;
	thumbnail: String;
	createdAt: String;
}

export interface IUser {
	id: BigInteger;
	email: String;
	password: String;
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
