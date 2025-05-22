import React, { useEffect } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Loader } from "lucide-react"     // For icons and stuff
import { Toaster } from "react-hot-toast"; // For notifications
import './index.css'

import { useAuthStore } from '../store/useAuthStore'

import Navbar from '../components/Navbar'

import Home from '../pages/home'
import Login from '../pages/login'
import Signup from '../pages/signup'
import Profile from '../pages/profile'
import Settings from '../pages/settings'

function App() {
  const {authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  
  console.log({ authUser })

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-ring loading-xl"></span>
      </div>
  );

  return (
    <div data-theme="retro">
      <Navbar />
      <Toaster />

      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />} />
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/" />} />
        <Route path='/settings' element={authUser ? <Settings/> : <Navigate to="/login" />} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />} />
      </Routes>

    </div>
  )
}

export default App