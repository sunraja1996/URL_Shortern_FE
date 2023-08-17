import React  from 'react'
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Urls from './components/Urls';
import Allurls from './components/Allurls';

function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path = "*" element = {<Urls/>}/>
      <Route path = "/allurls" element = {<Allurls/>}/> 
    </Routes>
    </BrowserRouter>
      
      
  );
}

export default App;
