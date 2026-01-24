import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Genre, MoviesDetailsType } from "../types/Movies";
import { moviesService } from "../services/api.services";
import { moviesGenresService } from "../services/moviesGenresService";
import { MoviesListCards } from "./MoviesListCards";
import { NavigationButtons } from "../components/NavigationButtons";

export const GenreMoviesPage = () => {
    const { genreId } = useParams<{ genreId: string }>();
    const id = Number(genreId);

    const [movies, setMovies] = useState<MoviesDetailsType[]>([]);
    const [page, setPage] = useState(1);

    const [genres, setGenres] = useState<Genre[]>([]);
    useEffect(() => {
        moviesGenresService.getGenres().then(data => setGenres(data.genres));
    }, []);

    const genresMap = Object.fromEntries(genres.map(genre => [genre.id, genre.name]));

    const getDisableNextPage = (itemsLength: number) => {
        return itemsLength === 0;
    };
    const disableNextPage = getDisableNextPage(movies.length);

    useEffect(() => {
        if (!id) return;
        moviesService.getMoviesByGenre(id, page).then(data => setMovies(data.results));
    }, [id, page]);

    return (
        <>
            <h2 style={{ paddingLeft: 20 }}>Genre: {genresMap[id] || id}</h2>

            <MoviesListCards movies={movies} genresMap={genresMap} />

            <NavigationButtons
                page={page}
                disablePrevPage={page <= 1}
                disableNextPage={disableNextPage}
                prev={() => setPage(pg => Math.max(1, pg - 1))}
                next={() => setPage(pg => pg + 1)}
            />
        </>
    );
};
