import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// type;

function NewsPage() {
	const [timesNews, setTimesNews] = useState<undefined | []>(undefined);

	useEffect(() => {
		// console.log(getInfo());
		fetch(
			`https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/2024/8.json?api-key=${
				import.meta.env.VITE_API_NY_TIMES_KEY
			}`
		)
			.then((res) => res.json())
			.then((data) => setTimesNews(data.response.docs));
	}, []);

	console.log(timesNews);

	return (
		<>
			{timesNews &&
				timesNews.map((art, idx) => {
					return (
						<Card key={idx}>
							<CardActionArea>
								<CardContent>
									<Typography gutterBottom variant='h5' component='div'>
										{art.headline.main}
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										{art.lead_paragraph}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					);
				})}
		</>
	);
}

export default NewsPage;
