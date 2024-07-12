"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { isAuthenticated } = useAuth();
	const { push } = useRouter();

	// redirect if the user is authenticated
	if (isAuthenticated) {
		push("/dashboard");
	}

	return (
		<div
			className="w-full flex flex-col justify-center items-center"
			style={{ height: "100%" }}
		>
			<div className="w-1/5 h-4/6">{children}</div>
		</div>
	);
}
