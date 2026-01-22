import {useAppDispatch, useAppSelector} from "../store.ts";
import {useEffect, useState} from "react";
import {loadMovies} from "../slices/MoviesSlice.ts";
import { useSearchParams } from "react-router-dom";
import type {Genre, MoviesDetailsType} from "../types/Movies.ts";
import {moviesService} from "../services/api.services.ts";
import {moviesGenresService} from "../services/moviesGenresService.ts";
import { MoviesListCards } from "./MoviesListCards";
import {NavigationButtons} from "../components/NavigationButtons.tsx";


export const MoviesList = () => {
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search")?.trim() || "";

    const [searchMovies, setSearchMovies] = useState<MoviesDetailsType[]>([]);
    const [searchPage, setSearchPage] = useState(1);

    const [genres, setGenres] = useState<Genre[]>([]);
    useEffect(() => {
        moviesGenresService.getGenres()
            .then(data => setGenres(data.genres));
    }, []);

    const genresMap = Object.fromEntries(
        genres.map(g => [g.id, g.name])
    );

    useEffect(() => {
        if (!search) return;
        moviesService.getSearchMovies(search, searchPage)
            .then(data => setSearchMovies(data.results))
    }, [search, searchPage]);

    const dispatch = useAppDispatch();
    const { pages, currentPage, isLoading, error } = useAppSelector(s => s.moviesList);
    const movies = pages[currentPage] ?? [];

    useEffect(() => {
        dispatch(loadMovies(currentPage));
    }, [dispatch, currentPage]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const list = search ? searchMovies : movies;
    return (
        <>
            <MoviesListCards movies={list} genresMap={genresMap} />
            <NavigationButtons
                page={search ? searchPage : currentPage}
                disablePrev={search ? searchPage <= 1 : currentPage <= 1}
                prev={() => search ? setSearchPage(p => Math.max(1, p - 1)) : dispatch(loadMovies(currentPage - 1))}
                next={() => search ? setSearchPage(p => p + 1) : dispatch(loadMovies(currentPage + 1))}
            />
        </>
    );
};
