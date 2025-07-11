import React from 'react'
import MpgPredictor from './MpgPredictor'
import {ToastContainer} from "react-toastify"
import "../src/index.css"
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <MpgPredictor/>
    </div>
  )
}

export default App

