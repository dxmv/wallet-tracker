"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

// protect all routes except home, login and register route
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const router = useRouter();

	const { isAuthenticated, loading } = useAuth();

	useEffect(() => {
		if (!loading) {
			const path = "/" + document.URL.split("/").pop() || "";
			const allowedPaths = ["/", "/login", "/register"];

			// if the user isn't authenticated, redirect them to home page
			if (!allowedPaths.includes(path) && !isAuthenticated) {
				router.push("/");
			}
		}
	}, [isAuthenticated, loading, router]);

	if (loading) {
		return <div>Loading...</div>; // Or any loading indicator you prefer
	}

	return <>{children}</>;
};

export default ProtectedRoute;
