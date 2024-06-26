// Function to get a cookie value by name
export const getCookie = (name: String) => {
	const cookies = document.cookie
		.split("; ")
		.find(row => row.startsWith(`${name}=`));

	return cookies ? cookies.split("=")[1] : null;
};

// Set the cookies with expiration date
export const setCookie = (name: String, value: String, days: number) => {
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + days);

	document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
};
