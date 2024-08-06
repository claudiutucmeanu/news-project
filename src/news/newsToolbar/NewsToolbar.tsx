import {
	Button,
	Checkbox,
	Dialog,
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
import { DateRange, Range } from "react-date-range";

import { Category, News } from "../News.types";
import { useEffect, useState } from "react";
import { getGuardianNews, getNewsApiNews, getNyTimesNews } from "../News.api";
import "./NewsToolbar.scss";

const categories: Category[] = [
	"news",
	"sports",
	"books",
	"politics",
	"science",
	"technology",
];

const sourcesArr: string[] = ["New York Times", "Guardian", "NewsAPI"];

const convertTime = (date: Date) => {
	return new Date(date.getTime() + 12000000).toISOString().slice(0, 10);
};

const NewsToolbar = ({
	setNews,
}: {
	setNews: React.Dispatch<React.SetStateAction<News[]>>;
}) => {
	const [search, setSearch] = useState<string>("");
	const [category, setCategory] = useState<Category>("news");
	const [sources, setSources] = useState<string[]>([
		"New York Times",
		"Guardian",
		"NewsAPI",
	]);
	const [openDateDialog, setOpenDateDialog] = useState<boolean>(false);
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
	});

	const handleSearch = () => {
		setNews([]);
		if (sources.includes("Guardian")) {
			getGuardianNews(category, search).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("NewsAPI")) {
			getNewsApiNews(category, search).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}
	};

	const handleSelect = (ranges: { [key: string]: Range }) => {
		if (ranges.range1.startDate && ranges.range1.endDate) {
			setSelectionRange({
				startDate: ranges.range1.startDate,
				endDate: ranges.range1.endDate,
			});
		}
	};

	const dateSubmitHandler = () => {
		setNews([]);
		setOpenDateDialog(false);
		if (sources.includes("Guardian")) {
			getGuardianNews(
				category,
				undefined,
				convertTime(selectionRange.startDate),
				convertTime(selectionRange.endDate)
			).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("NewsAPI")) {
			getNewsApiNews(
				category,
				undefined,
				convertTime(selectionRange.startDate),
				convertTime(selectionRange.endDate)
			).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}
	};

	useEffect(() => {
		setNews([]);
		if (sources.includes("New York Times")) {
			getNyTimesNews(category).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("Guardian")) {
			getGuardianNews(category).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}

		if (sources.includes("NewsAPI")) {
			getNewsApiNews(category).then((data) => {
				setNews((prevState) => [...prevState, ...data]);
			});
		}
	}, [category, sources, setNews]);

	return (
		<>
			<Paper className='toolbar'>
				<Paper component='form' className='searchWrapper'>
					<InputBase
						className='search'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder='Search'
						inputProps={{ "aria-label": "search google maps" }}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								handleSearch();
							}
						}}
					/>
					<IconButton onClick={handleSearch} type='button' aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
				<div className='filtersWrapper'>
					<FormControl className='selectWrapper'>
						<InputLabel id='demo-multiple-checkbox-label'>
							Categories
						</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={category}
							label='Category'
							onChange={(e) => setCategory(e.target.value as Category)}
						>
							{categories.map((cat) => {
								return (
									<MenuItem key={cat} value={cat}>
										{cat.toUpperCase()}
									</MenuItem>
								);
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
					<Button onClick={() => setOpenDateDialog(true)}>Date Range</Button>
				</div>
			</Paper>
			<Dialog open={openDateDialog}>
				<DateRange ranges={[selectionRange]} onChange={handleSelect} />
				<Button onClick={dateSubmitHandler}>Submit</Button>
			</Dialog>
		</>
	);
};

export default NewsToolbar;
