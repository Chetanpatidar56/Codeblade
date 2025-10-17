import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {Provider} from "react-redux";
import stores from './store/store.js';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={stores}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </Provider>
   
  </StrictMode>,
)
