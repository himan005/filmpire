import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './app/store.js'

const theme = createTheme({})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter >
        <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
)
