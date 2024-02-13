import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Income from './Components/Income'
import Expense from './Components/Expense'
import DashBoard from './Components/DashBoard'
import SignIn from './Components/SignIn'
import Signup from './Components/Signup'
import AuthHOC from './Components/AuthHOC'
import Game from './Components/Game'
import News from './Components/News'
import Navbar from './Components/Navbar'


const AuthenticatedIncome=AuthHOC({WrappedComponent:Income})
const AuthenticatedGame = AuthHOC({ WrappedComponent: Game });
const AuthenticatedExpense = AuthHOC({ WrappedComponent: Expense });
const AuthenticatedDashBoard = AuthHOC({ WrappedComponent: DashBoard });
const AuthenticatedNews=AuthHOC({WrappedComponent: News})

function App() {
  return (
    <>
  <BrowserRouter>
      <Routes> 
          <Route path="/income" element={<AuthenticatedIncome />} />
          <Route path="/expense" element={<AuthenticatedExpense />} />
          <Route path="/dashboard" element={<AuthenticatedDashBoard />} /> 
          <Route path="/news"  element={<AuthenticatedNews/>}/>
          <Route path="/game"  element={<AuthenticatedGame/>} />
          <Route path="/signin"   element={<SignIn/>} />
          <Route path="/"  element={<Signup/>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
