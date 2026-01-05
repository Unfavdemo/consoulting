'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated on mount
    const adminStatus = localStorage.getItem('admin_authenticated')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
    setIsLoading(false)
  }, [])

  const login = (pin) => {
    if (pin === '277353') {
      setIsAdmin(true)
      localStorage.setItem('admin_authenticated', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('admin_authenticated')
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, isLoading }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

