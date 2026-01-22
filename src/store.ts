import {configureStore} from "@reduxjs/toolkit";
import {moviesSlice} from "./slices/MoviesSlice.ts";
import {movieDetailsSlice} from "./slices/MovieDetailsSlice.ts";
import {useDispatch, useSelector} from "react-redux";

export const store = configureStore(
    {
        reducer: {
            moviesList: moviesSlice.reducer,
            movieDetails: movieDetailsSlice.reducer,
        }
    }
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
