import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com/?apikey=8dfaa431";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`); // call API
		const data = await response.json(); // get data from API
		// console.log(data);
		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies("Avengers");
	}, []);

	return (
		<div className="app">
			<h1>YIFY Movies</h1>

			<div className="search">
				<input
					placeholder="Search for movies"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				></input>
				<img
					src={SearchIcon}
					alt="search"
					onClick={() => {
						searchMovies(searchTerm);
					}}
				/>
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} />
					))}
				</div>
			) : (
				<div>
					<div className="empty">
						<h2>No movies found</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
