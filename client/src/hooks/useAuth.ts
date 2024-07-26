"use client";
import { useState, useEffect } from "react";
import { getCookie, removeCookie } from "@/utils/cookies";
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/api/user";

// Hook that keeps track of the user's authentication status
export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<IUser>();
	// const router = useRouter(); // to route throughout the app

	useEffect(() => {
		authenticate();
	}, []);

	const authenticate = async (): Promise<void> => {
		const token = getCookie("token");
		if (token) {
			try {
				// verify the token's expiration
				const decodedToken = jwtDecode(token);

				const currentTime = Date.now() / 1000;
				// the token is valid
				if (decodedToken.exp && decodedToken.exp > currentTime) {
					setIsAuthenticated(true);
					setUser(await userApi.getCurrentUser());
				} else {
					// Token is expired
					setIsAuthenticated(false);
					removeCookie("token");
				}
			} catch (error) {
				// Invalid token
				console.error("Invalid token:", error);
				setIsAuthenticated(false);
				removeCookie("token");
			}
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false);
	};

	return { isAuthenticated, loading, user };
}
