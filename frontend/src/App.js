import React from 'react'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import User12 from './User12'
import { useState, useContext } from 'react'
import Admin from './Admin'
import authContext from './authContext'

function App() {

  const { loggedIn, isAdmin } = useContext(authContext)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        {
          loggedIn && (
            <Route path='/user' element={<User12 />} />
          )
        }
        {
          loggedIn && isAdmin && (
            <Route path='/admin' element={<Admin />} />
          )
        }
      </Routes>
    </Router>
  )
}

export default App
