import { useState, useEffect } from "react";
import { authApi } from "../api/auth";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";

// Hook that keeps track of the user's authentication status
export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	// const router = useRouter(); // to route throughout the app

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async (): Promise<void> => {
		const token = getCookie("token");
		if (token) {
			try {
				// verify the token's expiration
				const decodedToken = jwtDecode(token);
				console.log(decodedToken);

				const currentTime = Date.now() / 1000;
				if (decodedToken.exp && decodedToken.exp > currentTime) {
					setIsAuthenticated(true);
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

	const login = async (email: string, password: string) => {
		try {
			const data = await authApi.login(email, password);
			setIsAuthenticated(true);
			setCookie("token", data.jwt);
			console.log(data);
		} catch (error) {
			console.log(error);
			// Rethrow the error so it can be caught in the component
			throw error;
		}
	};

	const register = async (email: string, password: string): Promise<IUser> => {
		try {
			return await authApi.register(email, password);
		} catch (error) {
			// Rethrow the error so it can be caught in the component
			throw error;
		}
	};

	const logout = async () => {
		removeCookie("token");
		setIsAuthenticated(false);
	};

	return { isAuthenticated, loading, login, register, logout, checkAuth };
}
