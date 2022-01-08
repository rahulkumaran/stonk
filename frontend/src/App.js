import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Attributes from './components/Attributes'
import MyStonks from './components/MyStonks'
import NotFound from './components/NotFound'
import { fetchSupply, fetchContract } from './redux/data/supplyActions'
import { useDispatch, useSelector } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContract())
  }, [dispatch])

  // uncomment to fetch supply on app load
  const supplyState = useSelector(state => state.supply)

  useEffect(
    () => {
      if (supplyState.contract !== null) {
        dispatch(fetchSupply())
      }
    },
    [supplyState.contract]
  )

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
        <Route exact path="/my-stonks" element={<MyStonks />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
