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
