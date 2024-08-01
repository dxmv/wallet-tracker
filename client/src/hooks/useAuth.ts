"use client";
import { useState, useEffect, useCallback } from "react";
import { getCookie, removeCookie } from "@/utils/cookies";
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { userApi } from "@/api/user";
import { handleErrorToast, showErrorToast } from "@/utils/toasts";

// Hook that keeps track of the user's authentication status
export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<IUser>();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const auth = useCallback(async () => {
		const token = getCookie("token");
		if (token) {
			try {
				// verify the token's expiration
				const decodedToken = jwtDecode(token);

				const currentTime = Date.now() / 1000;
				// the token is valid
				if (decodedToken.exp && decodedToken.exp > currentTime) {
					setIsAuthenticated(true);
					const res = await userApi.getCurrentUser();
					await setUser(res);
					if (res.roles.includes("ADMIN")) {
						setIsAdmin(true);
					}
				} else {
					// Token is expired
					setIsAuthenticated(false);
					removeCookie("token");
				}
			} catch (e) {
				// Invalid token
				handleErrorToast(e);
				setIsAuthenticated(false);
				removeCookie("token");
				setError(e as Error);
			}
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		auth();
	}, [auth]);

	return { isAuthenticated, loading, user, isAdmin, error };
};
