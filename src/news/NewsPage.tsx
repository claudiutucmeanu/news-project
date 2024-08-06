import { useState } from "react";
import { News } from "./News.types";
import NewsCard from "./newsCard/NewsCard";
import "./NewsPage.scss";
import NewsToolbar from "./newsToolbar/NewsToolbar";

function NewsPage() {
	const [news, setNews] = useState<News[]>([]);

	return (
		<>
			<NewsToolbar setNews={setNews} />
			{news &&
				news
					.sort((a, b) => {
						return Date.parse(b.date) - Date.parse(a.date);
					})
					.map((art: News, i: number) => (
						<NewsCard art={art} key={art.url + i} />
					))}
		</>
	);
}

export default NewsPage;
