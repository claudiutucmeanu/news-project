import { useEffect, useState } from "react";
import { Category, News } from "./News.types";
import NewsCard from "./newsCard/NewsCard";
import { getGuardianNews, getNewsApiNews, getNyTimesNews } from "./News.api";
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
