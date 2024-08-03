import { useEffect, useState } from "react";
import { News } from "./News.types";
import NewsCard from "./newsCard/NewsCard";
import { getGuardianNews, getNewsApiNews, getNyTimesNews } from "./News.api";
import { IconButton, InputBase, MenuItem, Paper, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./NewsPage.scss";

const categories = [
	"news",
	"sports",
	"books",
	"politics",
	"science",
	"technology",
];

function NewsPage() {
	const [news, setNews] = useState<News[]>([]);
	const [category, setCategory] = useState<string>();

	useEffect(() => {
		getNyTimesNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});

		getGuardianNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});

		getNewsApiNews().then((data) => {
			setNews((prevState) => [...prevState, ...data]);
		});
	}, []);

	console.log(category);

	return (
		<>
			<Paper className='toolbar'>
				<Paper
					component='form'
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: 400,
					}}
				>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search'
						inputProps={{ "aria-label": "search google maps" }}
					/>
					<IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={category}
					label='Category'
					variant='filled'
					onChange={(e) => setCategory(e.target.value)}
				>
					{categories.map((cat) => {
						return <MenuItem value={cat}>{cat.toUpperCase()}</MenuItem>;
					})}
				</Select>
			</Paper>
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
