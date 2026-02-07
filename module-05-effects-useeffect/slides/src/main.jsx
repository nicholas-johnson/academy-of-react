import React from 'react'
import ReactDOM from 'react-dom/client'
import { SlideDeck } from 'slide-deck'
import { slides } from './slides'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SlideDeck slides={slides} />
  </React.StrictMode>
)
