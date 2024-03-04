import React, {useState, useEffect} from 'react'
import {Box, CircularProgress, useMediaQuery, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
 
import { useGetMoviesQuery } from '../../services/moviesData.js';
import {MoviesList} from '..';

const Movies = () => {
  const {data, error, isFetching} = useGetMoviesQuery()
  console.log("movies", data) 

  if(isFetching){
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size="4rem" />
      </Box>
    )
  }

  if(!data?.results.length){
    return (
      <Box display='flex' alignItems="center" mt="20px">
        <Typography variant="h4">
          No Match
          <br/>
          Please search for something else
        </Typography>
      </Box>
    )
  }

  if(error) return 'An Error has occured'


  return (
    <div><MoviesList movies={data} /></div>
  )
}

export default Movies