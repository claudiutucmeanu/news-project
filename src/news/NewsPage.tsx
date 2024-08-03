import { useEffect, useState } from "react";
import { News } from "./News.types";
import NewsCard from "./newsCard/NewsCard";
import { getGuardianNews, getNewsApiNews, getNyTimesNews } from "./News.api";

function NewsPage() {
	const [news, setNews] = useState<News[]>([]);

	useEffect(() => {
		getNyTimesNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});

		getGuardianNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});

		getNewsApiNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});
	}, []);

	return (
		<>
			{news &&
				news
					.sort((a, b) => {
						return Date.parse(b.date) - Date.parse(a.date);
					})
					.map((art: News, idx) => {
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
