import React from 'react'
import { CssBaseline } from "@mui/material"
import {Route, Routes} from 'react-router-dom'
import {Actors, Movies, NavBar, MovieInformation, Profile} from './components/';

const  App = () => (
    <div>
      <CssBaseline />
      <NavBar />
      <main>
        <Routes>
          <Route path = "/" exact element={<Movies />} />
          <Route path = "/profile/:id" element={<Profile />} />
          <Route path = "/actors/:id" element={<Actors />} />
          <Route path = "/movie/:id" element={<MovieInformation />} />
        </Routes>
      </main>
    </div>
  )

export default App
