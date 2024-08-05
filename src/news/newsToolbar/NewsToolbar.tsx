import {
	Checkbox,
	FormControl,
	IconButton,
	InputBase,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Category, News } from "../News.types";
import { useEffect, useState } from "react";
import { getGuardianNews, getNewsApiNews, getNyTimesNews } from "../News.api";

const categories: Category[] = [
	"news",
	"sports",
	"books",
	"politics",
	"science",
	"technology",
];

const sourcesArr: string[] = ["New York Times", "Guardian", "NewsAPI"];

const NewsToolbar = (props: {
	setNews: React.Dispatch<React.SetStateAction<News[]>>;
}) => {
	const [category, setCategory] = useState<Category>("news");
	const [sources, setSources] = useState<string[]>([
		"New York Times",
		"Guardian",
		"NewsAPI",
	]);

	useEffect(() => {
		props.setNews([]);
		if (sources.includes("New York Times")) {
			getNyTimesNews(category).then((data) => {
				props.setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("Guardian")) {
			getGuardianNews(category).then((data) => {
				props.setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("NewsAPI")) {
			getNewsApiNews(category).then((data) => {
				props.setNews((prevState) => [...prevState, ...data]);
			});
		}
	}, [category, sources]);

	return (
		<Paper className='toolbar'>
			<Paper component='form'>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder='Search'
					inputProps={{ "aria-label": "search google maps" }}
				/>
				<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
					<SearchIcon />
				</IconButton>
			</Paper>
			<FormControl className='selectWrapper'>
				<InputLabel id='demo-multiple-checkbox-label'>Categories</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={category}
					label='Category'
					onChange={(e) => setCategory(e.target.value as Category)}
				>
					{categories.map((cat) => {
						return <MenuItem value={cat}>{cat.toUpperCase()}</MenuItem>;
					})}
				</Select>
			</FormControl>
			<FormControl className='selectWrapper'>
				<InputLabel id='demo-multiple-checkbox-label'>Sources</InputLabel>
				<Select
					labelId='demo-multiple-checkbox-label'
					id='demo-multiple-checkbox'
					multiple
					value={sources}
					onChange={(e) => setSources([...e.target.value])}
					input={<OutlinedInput label='Sources' />}
					variant='filled'
					renderValue={(selected) => selected.join(", ")}
				>
					{sourcesArr.map((source) => (
						<MenuItem key={source} value={source}>
							<Checkbox checked={sources.indexOf(source) > -1} />
							<ListItemText primary={source} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Paper>
	);
};

export default NewsToolbar;
