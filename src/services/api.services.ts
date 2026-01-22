import type {Movies, MoviesDetailsType} from "../types/Movies.ts";
export const baseUrl: string = 'https://api.themoviedb.org/3';
export const imageUrl: string = 'https://image.tmdb.org/t/p/';

export const moviesService = {
    getAllMovies: async (page: number):Promise<Movies> => {
        const response = await fetch(`${baseUrl}/discover/movie?page=${page}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        })
        if (!response.ok) {
            throw new Error('Failed to load movies');
        }
        return response.json();
    },
    getSearchMovies: async (query: string, page: number): Promise<Movies> => {
        const res = await fetch(
            `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
            {
                headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
            }
        );

        if (!res.ok) throw new Error("Failed to search movies");
        return res.json();
    },
}

export const movieDetailsService = {
    getById: async (id: string): Promise<MoviesDetailsType> => {
        const response = await fetch(`${baseUrl}/movie/${id}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to load movie details');
        }
        return response.json();
    },
};


