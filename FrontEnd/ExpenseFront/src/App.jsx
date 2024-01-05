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



const AuthenticatedHome = AuthHOC({ WrappedComponent: Home });
const AuthenticatedIncome = AuthHOC({ WrappedComponent: Income });
const AuthenticatedExpense = AuthHOC({ WrappedComponent: Expense });
const AuthenticatedDashBoard = AuthHOC({ WrappedComponent: DashBoard });
const AuthenticatedNews=AuthHOC({WrappedComponent: News})

function App() {
  return (
    <>
  <BrowserRouter>
      <Routes> 
          <Route path="/" element={<Signup/>} />
       
          <Route path="/income" element={<AuthenticatedIncome />} />
          <Route path="/expense" element={<AuthenticatedExpense />} />
          <Route path="/dashboard" element={<AuthenticatedDashBoard />} />
          <Route path="/news"  element={<AuthenticatedNews/>} />
          <Route path="/signin"   element={<SignIn/>} />
          {/* <Route path="/signup"  element={<Signup/>} /> */}
          <Route path="/game"  element={<Game/>} />
          <Route path="/navbar"  element={<Navbar/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
