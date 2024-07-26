// Function to get a cookie value by name
export const getCookie = (name: String) => {
	const cookies = document.cookie
		.split("; ")
		.find(row => row.startsWith(`${name}=`));

	return cookies ? cookies.split("=")[1] : null;
};

// Set the cookies with expiration date
export const setCookie = (name: String, value: String, days?: number) => {
	if (days) {
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + days);
		document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
	} else {
		document.cookie = `${name}=${value}; path=/`;
	}
};

// Remove the cookie with the given name
// Sets the date in the past, so the browser deletes it
export const removeCookie = (name: String) => {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
