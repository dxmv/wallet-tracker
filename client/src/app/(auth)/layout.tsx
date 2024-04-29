import Footer from "@/components/Footer";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div
			className="w-full flex flex-col justify-center items-center"
			style={{ height: "100%" }}
		>
			<div className="w-1/5 h-4/6">{children}</div>
		</div>
	);
}
