'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Forcefully sync theme from localStorage to DOM
    const syncTheme = () => {
      const theme = localStorage.getItem('theme') || 'light'
      const html = document.documentElement
      
      if (theme === 'dark') {
        html.classList.add('dark')
        setIsDark(true)
      } else {
        html.classList.remove('dark')
        setIsDark(false)
        // Ensure localStorage is set to light
        localStorage.setItem('theme', 'light')
      }
    }
    
    // Initial sync
    syncTheme()

    // Listen for theme changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        syncTheme()
      }
    }

    // Listen for custom theme change events
    const handleThemeChange = (e) => {
      setIsDark(e.detail.isDark)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('themechange', handleThemeChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('themechange', handleThemeChange)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const currentIsDark = html.classList.contains('dark')
    const newIsDark = !currentIsDark
    
    // Update DOM immediately
    if (newIsDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    
    setIsDark(newIsDark)
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('themechange', { detail: { isDark: newIsDark } }))
  }

  if (!mounted) {
    return (
      <button 
        className="p-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
        aria-label="Toggle theme"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors border border-gray-300 dark:border-gray-700"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
