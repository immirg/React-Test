import type {MoviesDetailsType} from "../types/Movies.ts";
import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {moviesService} from "../services/api.services.ts";

type MoviesSliceType = {
    pages: Record<number, MoviesDetailsType[]>;
    currentPage: number;
    isLoading: boolean;
    error: string | null;
};

const initialState: MoviesSliceType = {
    pages: {},
    currentPage: 1,
    isLoading: false,
    error: null,
};

export const loadMovies = createAsyncThunk(
    "movies/loadMovies",
    async (page: number, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as any;
            if (state.moviesList.pages[page]) {
                return thunkAPI.fulfillWithValue({ movies: state.moviesList.pages[page], page });
            }

            const data = await moviesService.getAllMovies(page);
            return thunkAPI.fulfillWithValue({ movies: data.results, page: data.page });
        } catch {
            return thunkAPI.rejectWithValue("Failed to load movies");
        }
    }
);

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadMovies.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMovies.fulfilled, (state, action: PayloadAction<{ movies: MoviesDetailsType[]; page: number }>) => {
                state.isLoading = false;
                state.pages[action.payload.page] = action.payload.movies;
                state.currentPage = action.payload.page;
            })
            .addCase(loadMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = String(action.payload ?? "Error");
            }),
});

export const movieActions = { ...moviesSlice.actions, loadMovies };

