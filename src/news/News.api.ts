import { Category, GuardianNews, News, NewsApiNews, NyTimesNews } from "./News.types";
export const getNyTimesNews = (category: Category) => {
    return fetch(
        `https://api.nytimes.com/svc/topstories/v2/${category === 'news' ? 'world' : category}.json?api-key=${
            import.meta.env.VITE_API_NY_TIMES_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {            
            const timesNews: News[] = [];
            data.results
                .slice(data.results.length - 12, data.results.length)
                .map((art: NyTimesNews) => {                    
                    timesNews.push({
                        title: art.title,
                        paragraph: art.abstract,
                        date: art.created_date,
                        category: art.section,
                        author: art.byline,
                        source: "NYTimes",
                        url: art.url,
                        api: "NYTimes",
                    });
                });
            return timesNews;
        });
}

export const getGuardianNews = (category: Category, search?: string, fromDate?: string, toDate?: string) => {
    return fetch(
        `https://content.guardianapis.com/search?${search ? 'q=' + search + '&' : ''}section=${category === 'sports' ? 'sport' : category}${fromDate && toDate ? '&from-date='+fromDate+'&to-date='+toDate : ''}&page-size=12&api-key=${
            import.meta.env.VITE_API_GUARDIAN_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            const guardianNews: News[] = [];
            data.response.results.map((art: GuardianNews) => {
                guardianNews.push({
                    title: art.webTitle,
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

export const getNewsApiNews = (category: Category, search?: string, fromDate?: string, toDate?: string) => {
    console.log(fromDate, toDate);
    
    return fetch(
        `https://newsapi.org/v2/top-headlines?${search ? 'q=' + search + '&' : ''}category=${category === 'news' ? 'general' : category}${fromDate && toDate ? '&from='+fromDate+'&to='+toDate : ''}&country=us&pageSize=12&apiKey=${
            import.meta.env.VITE_API_NEWS_API_KEY
        }`
    )
        .then((res) => res.json())
        .then((data) => {
            const newsApiNews: News[] = [];
            data.articles.map((art: NewsApiNews) => {
                if (art.title !== "[Removed]") {
                    newsApiNews.push({
                        title: art.title,
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