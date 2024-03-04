import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY; 
const page = 1
// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
//Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
    reducerPath : 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints:(builder) =>({
        //Get Movies by [type]
        getMovies: builder.query({
            query : () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
        }), 
    }),
});

//export hook for usage in function components which are auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = tmdbApi