'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EditableText, EditableTextarea } from '../components/EditableContent'

const DEFAULT_CONTENT = {
  title: 'About Me',
  bio1: "I've always been drawn to the intersection of design and code. There's something satisfying about taking an idea and watching it come to life in the browser whether that's a simple animation that makes someone smile or a feature that solves a real problem.",
  bio2: 'I work on both the visual side of things and the logic that makes everything tick. I like building things that look good and actually work well, without the jargon. If something I make feels intuitive and looks clean, I\'ve done my job.',
  bio3: "Outside of work, I'm usually tinkering with new tools, working on side projects, or learning something completely unrelated. I'm always up for interesting projects and conversations about what we're building.",
  skillsTitle: 'My Skills',
  skills: ['HTML & CSS', 'JavaScript', 'Next.js']
}

export default function About() {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=about')
        if (response.ok) {
          const data = await response.json()
          if (Object.keys(data).length > 0) {
            const updated = { ...DEFAULT_CONTENT, ...data }
            if (data.skills) {
              updated.skills = typeof data.skills === 'string' ? JSON.parse(data.skills) : data.skills
            }
            setContent(updated)
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

  const updateSkill = async (index, value) => {
    const newSkills = [...content.skills]
    newSkills[index] = value
    updateContent('skills', newSkills)
    
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'about', key: 'skills', value: newSkills })
      })
    } catch (error) {
      console.error('Error saving skill:', error)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-black dark:text-white">
          <EditableText page="about" contentKey="title" onSave={(v) => updateContent('title', v)}>{content.title}</EditableText>
        </h1>
        
        <div className="flex gap-8 items-center mb-8 bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          {/* Profile photo */}
          <Image 
            src="/pfp.jpeg"
            alt="Siquil Ward"
            width={300}
            height={300}
            className="rounded-full transition-transform duration-300 hover:scale-105"
            style={{ width: '300px', height: 'auto', objectFit: 'cover', aspectRatio: '1 / 1' }}
          />
          
          {/* Bio */}
          <div>
            <div className="text-lg text-black dark:text-white leading-relaxed mb-4">
              <EditableTextarea page="about" contentKey="bio1" onSave={(v) => updateContent('bio1', v)}>{content.bio1}</EditableTextarea>
            </div>
            <div className="text-lg text-black dark:text-white leading-relaxed mb-4">
              <EditableTextarea page="about" contentKey="bio2" onSave={(v) => updateContent('bio2', v)}>{content.bio2}</EditableTextarea>
            </div>
            <div className="text-lg text-black dark:text-white leading-relaxed">
              <EditableTextarea page="about" contentKey="bio3" onSave={(v) => updateContent('bio3', v)}>{content.bio3}</EditableTextarea>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
            <EditableText page="about" contentKey="skillsTitle" onSave={(v) => updateContent('skillsTitle', v)}>{content.skillsTitle}</EditableText>
          </h2>
          <div className="flex flex-wrap gap-3">
            {content.skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default"
              >
                <EditableText onSave={(v) => updateSkill(index, v)}>{skill}</EditableText>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

