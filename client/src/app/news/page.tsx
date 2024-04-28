interface News {
	url: String;
	title: String;
	description: String;
	thumbnail: String;
	createdAt: String;
}

const getNews = async (): Promise<Array<News>> => {
	const url = "https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk";
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "ed65176dc7mshbb873922bf4d559p10a4c2jsn681e7baab0f8",
			"X-RapidAPI-Host": "cryptocurrency-news2.p.rapidapi.com",
		},
	};

	const json = await (await fetch(url, options)).json();
	const res: Array<News> = await json.data;
	return res;
};

export default async function News() {
	const news = await getNews();
	console.log(news);
	return (
		<main
			className="flex flex-col w-full bg-white text-black py-8 px-4"
			style={{ height: "87vh" }}
		>
			<h1 className="font-bold text-2xl">Today in crypto</h1>
			<div className="mt-3 flex flex-row justify-between">
				<div style={{ width: "49%" }} className="bg-black">
					Breaking news
				</div>
				<div style={{ width: "49%" }}>Other news</div>
			</div>
		</main>
	);
}
