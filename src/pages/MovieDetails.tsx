import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { loadMovieById } from "../slices/MovieDetailsSlice";

export const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { byId, isLoading, error } = useAppSelector(s => s.movieDetails);
    const movie = id ? byId[id] : undefined;

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(loadMovieById(id));
    }, [dispatch, id]);

    if (isLoading && !movie) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Movie not found</div>;

    return (
        <div>
            <div>
                <button className="button-in-movie-details" onClick={() => navigate(-1)}>← Back</button>
            </div>
            <h1>{movie.title}</h1>
            {movie.poster_path && (
                <img className="image-in-movie-details" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            )}
            <p>{movie.overview}</p>
        </div>
    );
};

