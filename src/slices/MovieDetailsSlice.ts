
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { MoviesDetailsType } from "../types/Movies";
import { movieDetailsService } from "../services/api.services";
import type { RootState } from "../store";

type MovieDetailsState = {
    byId: Record<string, MoviesDetailsType>;
    isLoading: boolean;
    error: string | null;
};

const initialState: MovieDetailsState = {
    byId: {},
    isLoading: false,
    error: null,
};

export const loadMovieById = createAsyncThunk(
    "movieDetails/loadById",
    async (id: string, thunkAPI) => {
        const state = thunkAPI.getState() as RootState;

        if (state.movieDetails.byId[id]) {
            return thunkAPI.fulfillWithValue(state.movieDetails.byId[id]);
        }

        const movie = await movieDetailsService.getById(id);
        return thunkAPI.fulfillWithValue(movie);
    }
);

export const movieDetailsSlice = createSlice({
    name: "movieDetails",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(loadMovieById.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMovieById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.byId[String(action.payload.id)] = action.payload;
            })
            .addCase(loadMovieById.rejected, (state) => {
                state.isLoading = false;
                state.error = "Failed to load movie details";
            }),
});

