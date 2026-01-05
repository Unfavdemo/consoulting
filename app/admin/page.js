'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '../contexts/AdminContext'
import ThemeToggle from '../components/ThemeToggle'

export default function AdminLogin() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAdmin, isLoading: adminLoading } = useAdmin()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (!adminLoading && isAdmin) {
      router.push('/')
    }
  }, [isAdmin, adminLoading, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (login(pin)) {
      router.push('/')
    } else {
      setError('Invalid PIN. Please try again.')
      setPin('')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-black dark:via-black dark:to-black relative">
      {/* Theme Toggle in top right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full bg-white dark:bg-gray-950 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">
            Admin Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your PIN to access admin mode
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pin" className="block text-sm font-semibold text-black dark:text-white mb-2">
              PIN
            </label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-transparent transition-all text-center text-2xl tracking-widest"
              placeholder="••••••"
              maxLength="6"
              autoComplete="off"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold text-lg"
          >
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>🔒 Secure admin access</p>
        </div>
      </div>
    </div>
  )
}

