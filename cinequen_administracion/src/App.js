import React from 'react';
import { ToastContainer } from "react-toastify"
import { Navigation } from "./routes";
import { AuthProvider } from "./context";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from "./theme"

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function App() {

  const theme = createTheme();

  return (
    <div>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Navigation />


            <ToastContainer
              position='bottom-center'
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
            />

          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </div >
  )
}
