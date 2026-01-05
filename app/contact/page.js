'use client'

import { useState, useEffect } from 'react'
import { EditableText } from '../components/EditableContent'

const DEFAULT_CONTENT = {
  title: 'Get In Touch',
  email: 'siquilward221@gmail.com',
  linkedin: 'linkedin.com/in/siquil-ward-211828318',
  github: 'github.com/unfavdemo'
}

export default function Contact() {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=contact')
        if (response.ok) {
          const data = await response.json()
          if (Object.keys(data).length > 0) {
            setContent({ ...DEFAULT_CONTENT, ...data })
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchContent()
  }, [])

  const updateContent = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-black dark:text-white">
          <EditableText page="contact" contentKey="title" onSave={(v) => updateContent('title', v)}>{content.title}</EditableText>
        </h1>
        
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-100 dark:border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-3xl">📧</span>
              <div>
                <p className="font-bold text-black dark:text-white text-lg">Email</p>
                <p className="text-black dark:text-white text-base font-bold">
                  <EditableText page="contact" contentKey="email" onSave={(v) => updateContent('email', v)}>{content.email}</EditableText>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">🔗</span>
              <div>
                <p className="font-bold text-black dark:text-white text-lg">LinkedIn</p>
                <p className="text-black dark:text-white text-base font-bold">
                  <EditableText page="contact" contentKey="linkedin" onSave={(v) => updateContent('linkedin', v)}>{content.linkedin}</EditableText>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl">💻</span>
              <div>
                <p className="font-bold text-black dark:text-white text-lg">GitHub</p>
                <p className="text-black dark:text-white text-base font-bold">
                  <EditableText page="contact" contentKey="github" onSave={(v) => updateContent('github', v)}>{content.github}</EditableText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

