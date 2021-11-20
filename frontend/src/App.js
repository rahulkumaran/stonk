import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Attributes from './components/Attributes'

function App() {
  const [clicks, setClicks] = useState(0)
  const [BG, setBG] = useState('')
  const [EE, setEE] = useState(false)

  const handleEasterEgg = e => {
    e.preventDefault()
    setClicks(clicks + 1)
    if (clicks >= 9) {
      setEE(true)
      setBG('/images/stonkss.gif')
    }
  }

  return (
    <div className="App">
      <Header handleEasterEgg={handleEasterEgg} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home BG={clicks >= 9 ? BG : ''} EE={EE} />}
        />
        <Route exact path="/attributes" element={<Attributes />} />
      </Routes>
    </div>
  )
}

export default App
