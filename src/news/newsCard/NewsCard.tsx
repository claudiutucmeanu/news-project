import { useState } from "react";

import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	IconButton,
	Link,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { News } from "../News.types";
import "./NewsCard.scss";

const imageMapper: { NYTimes: string; Guardian: string; NewsApi: string } = {
	NYTimes: "/src/assets/ny-times.svg",
	Guardian: "src/assets/guardian.svg",
	NewsApi: "src/assets/newsApi.jpg",
};

const NewsCard = (props: { art: News }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className='newsCard'>
			<CardHeader
				avatar={<Avatar src={imageMapper[props.art.api]} />}
				title={
					props.art.headline +
					" " +
					props.art.source +
					" " +
					Date.parse(props.art.date)
				}
				subheader={props.art?.author}
			/>
			<CardContent>
				<Typography>{props.art?.paragraph}</Typography>
			</CardContent>
			<Collapse in={expanded} unmountOnExit>
				<CardContent>
					<Typography paragraph>{props.art.snippet}</Typography>
					<Typography paragraph>
						Read more{" "}
						<Link href={props.art.url} target='_blank' rel='noreferrer'>
							Here
						</Link>
					</Typography>
				</CardContent>
			</Collapse>
			<CardActions>
				<Typography color={"rgba(0, 0, 0, 0.6)"}>
					{props.art.category}, {new Date(props.art.date).toDateString()}
				</Typography>
				<IconButton className='expandButton' onClick={handleExpandClick}>
					<ExpandMoreIcon
						className={`expandButtonIcon ${expanded ? "expanded" : ""}`}
					/>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
