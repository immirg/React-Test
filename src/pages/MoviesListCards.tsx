import type { MoviesDetailsType } from "../types/Movies";
import pointer from "../img/pointer.png";
import facebook from "../img/icons-facebook.png";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    movies: MoviesDetailsType[];
    genresMap: Record<number, string>;
};

export const MoviesListCards = ({ movies, genresMap }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="movies-list">
            {movies.length === 0 && <div>No movies found</div>}
            {movies.map((m) => (
                <Link key={m.id} to={`/movies/${m.id}`}>
                    <div className="movie-list-item">
                        {m.poster_path && (
                            <img
                                className="movie-image"
                                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                alt={m.title}
                            />
                        )}
                        <div className="movie-title-on-card">{m.title}</div>
                        <div className="movie-genres-on-card">
                            <img src={pointer} alt="pointer" height="20" />
                            <div className="movie-genres-on-card">
                                {m.genre_ids.map((id) => (
                                    <button key={id} type="button" onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            navigate(`/genres/${id}`);
                                        }}>
                                        {genresMap[id]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="movie-overview-on-card">
                            {m.overview.split(" ").slice(0, 10).join(" ")}...
                        </div>
                        <div className="movie-rating-on-card">
                            {"★".repeat(Math.round(m.vote_average / 2))}
                            {"☆".repeat(5 - Math.round(m.vote_average / 2))}
                            <img src={facebook} alt="facebook-icon" height="20" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
