import React, { useEffect, useState } from "react";
import StarRating from "../StarRating";

const KEY = "e919e855";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Plot: plot,
        Actors: actors,
        Director: director,
        Genre: genre,
        Runtime: runtime,
        Relesed: released,
        imdbRating,
    } = movie;

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ")[0]),
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    };
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
                setIsLoading(false);
            } catch (error) {}
        };
        getMovieDetails();
    }, [selectedId]);
    return (
        <div className="details">
            {isLoading ? (
                <p className="loader">Loading...</p>
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`${title} poster`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released}&bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐️</span>
                                {imdbRating}
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />
                            <button className="btn-add" onClick={handleAdd}>
                                + Add to List
                            </button>
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
