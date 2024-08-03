import { GuardianNews, News, NewsApiNews, NyTimesNews } from "./News.types";

export const getNyTimesNews = () => {
    return fetch(
        `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/2024/8.json?api-key=${
            import.meta.env.VITE_API_NY_TIMES_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            const timesNews: News[] = [];
            data.response.docs
                .slice(data.response.docs.length - 20, data.response.docs.length)
                .map((art: NyTimesNews) => {
                    timesNews.push({
                        headline: art.headline.main,
                        paragraph: art.lead_paragraph,
                        date: art.pub_date,
                        category: art.type_of_material,
                        author: art.byline.original,
                        source: art.source,
                        snippet: art.snippet,
                        url: art.web_url,
                        api: "NYTimes",
                    });
                });
            return timesNews;
        });
}

export const getGuardianNews = () => {
    return fetch(
        `https://content.guardianapis.com/search?page-size=20&api-key=${
            import.meta.env.VITE_API_GUARDIAN_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            const guardianNews: News[] = [];
            data.response.results.map((art: GuardianNews) => {
                guardianNews.push({
                    headline: art.webTitle,
                    date: art.webPublicationDate,
                    category: art.pillarName,
                    source: "Guardian",
                    url: art.webUrl,
                    api: "Guardian",
                });
            });
            return guardianNews;
        });
}

export const getNewsApiNews = () => {
    return fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${
            import.meta.env.VITE_API_NEWS_API_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            const newsApiNews: News[] = [];
            data.articles.map((art: NewsApiNews) => {
                if (art.title !== "[Removed]") {
                    newsApiNews.push({
                        headline: art.title,
                        date: art.publishedAt,
                        category: "News",
                        source: art.source.name,
                        author: art.author,
                        paragraph: art.description,
                        snippet: art.content,
                        url: art.url,
                        api: "NewsApi",
                    });
                }
            });
            return newsApiNews;
        });
}