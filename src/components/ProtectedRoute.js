import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

const ProtectRoute = () => {
  const auth = useAuth()
  const location = useLocation()
  
  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return <Outlet />
};

export default ProtectRoute;
