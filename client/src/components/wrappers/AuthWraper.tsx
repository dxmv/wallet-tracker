"use client";
import { useAuth } from "@/hooks/useAuth";
import { ReactNode } from "react";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";

// This wrapper makes sure that the user is always loaded and that there weren't any errors
const AuthWrapper = ({ children }: { children: ReactNode }) => {
	const { loading, error } = useAuth();

	if (loading) {
		return <LoadingPage />;
	}

	if (error) {
		return <ErrorPage errorMessage={"Error while fetching a user!"} />;
	}

	return <>{children}</>;
};

export default AuthWrapper;
