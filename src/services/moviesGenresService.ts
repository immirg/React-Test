import {baseUrl} from "./api.services.ts";

export const moviesGenresService = {
    getGenres: async () => {
        const res = await fetch(`${baseUrl}/genre/movie/list`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to load genres");
        }

        return res.json();
    },
};
