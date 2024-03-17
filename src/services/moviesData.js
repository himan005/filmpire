import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const tmdbApiKey = import.meta.env.VITE_TMDB_KEY; 

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
            query : ({genreIdOrCategoryName,page,searchQuery}) => {
                //Get Movies by Search
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
                }
                
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

        //Get Movie Detail with credits
        getMovie:builder.query({
            query:(id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),

        //Get Recommendation Movies List
        getRecommendations:builder.query({
          query:({movieId, list}) => `/movie/${movieId}/${list}?api_key=${tmdbApiKey}` 
        }),



    }),
});

//export hook for usage in function components which are auto-generated based on the defined endpoints
export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery } = tmdbApi