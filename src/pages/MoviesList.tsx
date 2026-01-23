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
        genres.map(genre => [genre.id, genre.name])
    );

    useEffect(() => {
        if (!search) return;
        moviesService.getSearchMovies(search, searchPage)
            .then(data => setSearchMovies(data.results))
    }, [search, searchPage]);

    const dispatch = useAppDispatch();
    const { pages, currentPage, isLoading, error } = useAppSelector(s => s.moviesList);
    let movies: MoviesDetailsType[];
    if (pages[currentPage]) {
        movies = pages[currentPage];
    } else {
        movies = [];
    }

    useEffect(() => {
        dispatch(loadMovies(currentPage));
    }, [dispatch, currentPage]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    let page = currentPage;
    let disablePrevPage = currentPage <= 1;
    let prev = () => {
        dispatch(loadMovies(currentPage - 1));
    };
    let next = () => {
        dispatch(loadMovies(currentPage + 1));
    };
    let disableNextPage = false;
    if (search) {
        disableNextPage = searchMovies.length === 0;
    } else {
        disableNextPage = movies.length === 0;
    }
    if (search) {
        page = searchPage;
        disablePrevPage = searchPage <= 1;

        prev = () => setSearchPage((page:number) => Math.max(1, page - 1));
        next = () => setSearchPage((page:number) => page + 1);
    }
    let list: MoviesDetailsType[] = movies;
    if (search) {
        list = searchMovies;
    }
    return (
        <>
            <MoviesListCards movies={list} genresMap={genresMap} />
            <NavigationButtons
                page={page}
                disablePrevPage={disablePrevPage}
                prev={prev}
                disableNextPage={disableNextPage}
                next={next}
            />
        </>
    );
};
