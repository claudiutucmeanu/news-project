export type News = {
	headline: string;
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
    headline: { main: string };
    lead_paragraph: string;
    pub_date: string;
    source: string;
    byline: { original: string };
    type_of_material: string;
    snippet: string;
    web_url: string;
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