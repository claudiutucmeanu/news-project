import { useEffect, useState } from "react";
import { News, NyTimesNews } from "./News.types";
import NewsCard from "./newsCard/NewsCard";

function NewsPage() {
	const [timesNews, setTimesNews] = useState<undefined | News[]>(undefined);

	useEffect(() => {
		fetch(
			`https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/2024/8.json?api-key=${
				import.meta.env.VITE_API_NY_TIMES_KEY
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				const news: News[] = [];
				data.response.docs.map((art: NyTimesNews) => {
					news.push({
						headline: art.headline.main,
						paragraph: art.lead_paragraph,
						date: art.pub_date,
						category: art.type_of_material,
						author: art.byline.original,
						source: art.source,
						snippet: art.snippet,
					});
				});
				setTimesNews(news);
			});
	}, []);

	return (
		<>
			{timesNews &&
				timesNews.map((art: News, idx) => {
					return (
						<>
							<NewsCard art={art} key={idx} />
						</>
					);
				})}
		</>
	);
}

export default NewsPage;
