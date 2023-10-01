import React from 'react';
import { ToastContainer } from "react-toastify"
import { Navigation } from "./routes";
import { AuthProvider } from "./context";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function App() {
  return (
    <div>
      <AuthProvider>
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
      </AuthProvider>
    </div >
  )
}
