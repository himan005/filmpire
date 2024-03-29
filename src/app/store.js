import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import {tmdbApi} from '../services/moviesData.js';

import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import userReducer from '../features/auth';


export default configureStore({
    // Add the generated reducer as a specific top-level slice
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: userReducer
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware)
})