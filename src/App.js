// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Exchange from './components/exchange';
import Coins from './components/coins';
import CoinsDetails from './components/coinsDetails';




function App() {
  return (
    <Router>
      <div>
       
        <Routes>
          
          <Route path='/' element={<Exchange/>}/>
          <Route path='coins/' element={<Coins/>}/>
          <Route path='coins/:id' element={<CoinsDetails/>}/>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
