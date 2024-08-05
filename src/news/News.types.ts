export type News = {
	title: string;
	paragraph?: string;
	date: string;
	category: string;
	author?: string;
	source: string;
	snippet?: string;
    url: string;
    api: 'NYTimes' | 'Guardian' | 'NewsApi';
};

export type NyTimesNews = {
    title: string;
    abstract: string;
    created_date: string;
    source: string;
    byline: string;
    section: string;
    snippet: string;
    url: string;
}

export type GuardianNews = {
    webTitle: string;
    webPublicationDate: string;
    pillarName: string;
    snippet: string;
    webUrl: string;
}

export type NewsApiNews = {
    title: string;
    description?: string;
    content?: string;
    source: { name: string };
    author: string;
    url: string;
    publishedAt: string;
}

export type Category = "news" | "sports" | "books" | "politics" | "science" | "technology"
