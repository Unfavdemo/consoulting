'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useAdmin } from '../contexts/AdminContext'

export default function Navbar() {
  const { isAdmin, logout } = useAdmin()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-white dark:bg-gray-950 text-black dark:text-white shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Your name or logo */}
          <Link href="/" className="text-2xl font-bold text-black dark:text-white hover:text-green-400 dark:hover:text-red-500 transition-colors">
            Siquil Ward
          </Link>
          
          {/* Navigation links */}
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link href="/" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                Projects
              </Link>
              <Link href="/blog" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                Blog
              </Link>
              <Link href="/resume" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                Resume
              </Link>
              <Link href="/work-with-me" className="text-black dark:text-white font-semibold hover:text-green-400 dark:hover:text-red-500 transition-colors">
                Work With Me
              </Link>
             
            </div>
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors opacity-50 hover:opacity-100"
                title="Exit Admin Mode"
              >
                Exit
              </button>
            )}
            {!isAdmin && (
              <Link 
                href="/admin" 
                className="text-xs text-gray-300 dark:text-gray-700 hover:text-gray-500 dark:hover:text-gray-600 transition-colors opacity-30 hover:opacity-60"
                title="Admin Access"
              >
                ⚙
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
