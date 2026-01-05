'use client'

import { useState, useEffect } from 'react'

export function usePageContent(pageName, defaultContent) {
  const [content, setContent] = useState(defaultContent)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/content?page=${pageName}`)
        if (response.ok) {
          const data = await response.json()
          if (Object.keys(data).length > 0) {
            setContent({ ...defaultContent, ...data })
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [pageName])

  const updateContent = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const saveContent = async (key, value) => {
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageName, key, value })
      })
      if (!response.ok) {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      throw error
    }
  }

  return { content, updateContent, saveContent, isLoading }
}

