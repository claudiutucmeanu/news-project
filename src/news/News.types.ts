export type News = {
	headline: string;
	paragraph: string;
	date: string;
	category: string;
	author: string;
	source: string;
	snippet: string;
};

export type NyTimesNews = {
    headline: { main: string };
    lead_paragraph: string;
    pub_date: string;
    source: string;
    byline: { original: string };
    type_of_material: string;
    snippet: string;
}