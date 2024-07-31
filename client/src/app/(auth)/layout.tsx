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
			style={{
				height: "100%",
				background: "linear-gradient(135deg, #522E93 0%, #000000 50%,#522E93)",
				backgroundSize: "200% 200%",
				animation: "gradientAnimation 12s ease infinite",
			}}
		>
			<style jsx>{`
				@keyframes gradientAnimation {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			`}</style>
			<div className="w-1/5 h-4/6">{children}</div>
		</div>
	);
}
