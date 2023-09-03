import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedList from "./components/WatchedList";
import MovieDetails from "./components/MovieDetails";

const Search = ({ query, setQuery }) => (
    <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
);

const NumResults = ({ movies }) => (
    <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
);
const Loader = () => <p className="loader">Loading...</p>;

const ErrorMessage = ({ message }) => (
    <p className="error">
        <span>❌</span>
        {message}
    </p>
);
const KEY = "e919e855";

export default function App() {
    const [query, setQuery] = useState("inception");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedId, setSelectedId] = useState("tt1375666");

    const handleSelectMovie = (id) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    const handleCloseMovie = () => {
        setSelectedId(null);
    };

    const handleAddWatched = (movie) => {
        setWatched((watched) => [...watched, movie]);
    };

    console.log(watched);
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
                );
                if (!res.ok)
                    throw new Error(
                        "Something went wrong, please try again later."
                    );

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("Movie not found!");

                setMovies(data.Search);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        fetchMovies();
    }, [query]);

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </Navbar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
