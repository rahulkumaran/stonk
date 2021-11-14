import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Header from './components/Header'
import Home from './components/Home'
import Attributes from './components/Attributes'


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/attributes' element={<Attributes />} />
      </Routes>
    </div>

  );
}

export default App;
