import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY; 
const page = 1

export const tmdbApi = createApi({
    reducerPath : 'tmdbApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints:(builder) =>({

        //Get Genres
        getGenres : builder.query({
            query: () => `/genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //Get Movies by [type]
        getMovies: builder.query({
            query : ({genreIdOrCategoryName}) => {

               // Get Movies by Category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
  
                // // Get Movies by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`  
            },
        }),

    }),
});

//export hook for usage in function components which are auto-generated based on the defined endpoints
export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi