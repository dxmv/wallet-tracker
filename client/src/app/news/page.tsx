import { BreakingSection } from "./_components/BreakingSection";
import { OtherSection } from "./_components/OtherSection";
import { INews } from "../../types";
import { GetStaticProps } from "next";

const getNews = async (): Promise<Array<INews>> => {
	const URL = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";

	const json = await (
		await fetch(URL, {
			method: "GET",
			headers: {
				"X-RapidAPI-Key": "ed65176dc7mshbb873922bf4d559p10a4c2jsn681e7baab0f8",
				"X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
			},
		})
	).json();
	const res: Array<INews> = await json.data;
	return res;
};

// fetch at build and every 1 hour
// export const getStaticProps: GetStaticProps = async () => {
// 	const news = await getNews();

// 	return {
// 		props: {
// 			news,
// 		},
// 		revalidate: 3600, // Revalidate every hour
// 	};
// };

export default async function News() {
	return (
		<main
			className="flex flex-col w-full bg-white text-black py-8 px-4"
			style={{ height: "87vh" }}
		>
			<h1 className="font-bold text-2xl">Today in crypto</h1>
			<div className="mt-3 flex flex-row justify-between ">
				{/* <BreakingSection />
				<OtherSection /> */}
			</div>
		</main>
	);
}
