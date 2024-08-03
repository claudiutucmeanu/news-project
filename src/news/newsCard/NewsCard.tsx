import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Typography,
} from "@mui/material";
import { News } from "../News.types";
import { useState } from "react";

const NewsCard = (props: { art: News }) => {
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar
						src={
							props.art.source === "The New York Times"
								? "/src/assets/ny-times.svg"
								: ""
						}
					/>
				}
				title={props.art.headline}
				subheader={props.art.author}
			/>
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					{props.art.paragraph}
				</Typography>
			</CardContent>
			<Collapse in={expanded} unmountOnExit>
				<CardContent>
					<Typography paragraph>{props.art.snippet}</Typography>
				</CardContent>
			</Collapse>
			<CardActions>
				<Typography color={"rgba(0, 0, 0, 0.6)"}>
					{props.art.category}, {new Date(props.art.date).toDateString()}
				</Typography>
				<Button onClick={handleExpandClick}>ASD</Button>
			</CardActions>
		</Card>
	);
};

export default NewsCard;
