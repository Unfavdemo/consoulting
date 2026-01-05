'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EditableText, EditableTextarea } from '../components/EditableContent'

const DEFAULT_CONTENT = {
  name: 'Siquil J. Ward',
  contact: 'Philadelphia, PA | (267) 338-5848 | siquilward221@gmail.com',
  summary: 'Junior developer with over 200 hours of hands-on Python experience through Launchpad Philly, specializing in user-centered design, problem-solving, and collaborative project development. Skilled in Python programming, Figma design, and applying technical knowledge to real-world community projects. Demonstrated leadership through mentoring, team coordination, and public presentations that effectively engage diverse audiences.'
}

export default function Resume() {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [pageTitle, setPageTitle] = useState('Resume')
  const [summaryTitle, setSummaryTitle] = useState('SUMMARY')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=resume')
        if (response.ok) {
          const data = await response.json()
          if (Object.keys(data).length > 0) {
            setContent({ ...DEFAULT_CONTENT, ...data })
          }
          if (data.title) {
            setPageTitle(data.title)
          }
          if (data.summaryTitle) {
            setSummaryTitle(data.summaryTitle)
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

  const updatePageTitle = async (value) => {
    setPageTitle(value)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'resume', key: 'title', value })
      })
    } catch (error) {
      console.error('Error saving title:', error)
    }
  }

  const updateSummaryTitle = async (value) => {
    setSummaryTitle(value)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'resume', key: 'summaryTitle', value })
      })
    } catch (error) {
      console.error('Error saving summary title:', error)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-black dark:text-white animate-slide-down">
          <EditableText page="resume" contentKey="title" onSave={updatePageTitle} tag="span">
            {pageTitle}
          </EditableText>
        </h1>
        
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-100 dark:border-gray-700 animate-fade-in">
          {/* Header */}
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-black dark:text-white">
              <EditableText page="resume" contentKey="name" onSave={(v) => updateContent('name', v)}>{content.name}</EditableText>
            </h2>
            <div className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
              <div>
                <EditableText page="resume" contentKey="contact" onSave={(v) => updateContent('contact', v)}>{content.contact}</EditableText>
              </div>
              <div className="flex justify-center gap-4">
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-green-500 dark:text-red-500 hover:text-green-600 dark:hover:text-red-600 transition-colors">
                  GitHub
                </Link>
                <Link href="https://linkedin.com/in/siquil-ward-211828318" target="_blank" rel="noopener noreferrer" className="text-green-500 dark:text-red-500 hover:text-green-600 dark:hover:text-red-600 transition-colors">
                  LinkedIn
                </Link>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">
              <EditableText page="resume" contentKey="summaryTitle" onSave={updateSummaryTitle} tag="span">
                {summaryTitle}
              </EditableText>
            </h2>
            <div className="text-black dark:text-white leading-relaxed">
              <EditableTextarea page="resume" contentKey="summary" onSave={(v) => updateContent('summary', v)}>{content.summary}</EditableTextarea>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">TECHNICAL SKILLS</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Languages:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Python
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    HTML
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    CSS
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    JavaScript
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    React
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Tailwind
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Tools:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Figma
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Git/GitHub
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Google Workspace
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    VS Code
                  </span>
          </div>
        </div>

              <div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Core Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Communication
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Leadership
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Collaboration
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Problem-Solving
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-110">
                    Time Management
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">PROJECTS</h2>
            
            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">TransitAlert – Community Safety App</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Launchpad Studio</p>
              <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">Tech Stack: Python, Figma</p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white">
                <li>Designed a community-driven safety platform for SEPTA, enabling riders to report real-time safety updates.</li>
                <li>Created wireframes and prototypes in Figma; simulated backend logic in Python.</li>
                <li>Presented a project to 100+ attendees, strengthening public speaking and technical presentation skills.</li>
              </ul>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">EXPERIENCE</h2>
            
            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">Launchpad Philly – Student Developer</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Philadelphia, PA | Jan 2024 – Present</p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white">
                <li>Completed 200+ hours of Python programming and project-based learning.</li>
                <li>Earned college credit in programming before high school graduation.</li>
                <li>Applied agile teamwork skills in community tech initiatives.</li>
              </ul>
            </div>

            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">HiTouch INC. – Administrative & Development Intern</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Philadelphia, PA | Jun 2025 – Present</p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white">
                <li>Supported 15+ major events (300 attendees each).</li>
                <li>Tracked sponsors, vendors, and guests using spreadsheets and CRM tools.</li>
              </ul>
            </div>

            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">Belmont Charter Middle School – Summer Intern</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Philadelphia, PA | Jul 2022 – Aug 2022</p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white">
                <li>Assisted instruction for 30+ students, reinforcing English and Math fundamentals.</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">EDUCATION</h2>
            
            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">Belmont Charter High School</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Philadelphia, PA</p>
              <p className="text-gray-600 dark:text-gray-400 mb-3">Graduated: Jun 2025</p>
              <div className="text-black dark:text-white">
                <p className="font-semibold mb-1">Honors:</p>
                <ul className="list-disc list-inside space-y-1 mb-3">
                  <li>Math (10–11)</li>
                  <li>English (11)</li>
                </ul>
                <p className="font-semibold mb-1">Clubs:</p>
                <p>4-H, Audio & Visual Club, Gender & Sexuality Alliance</p>
              </div>
            </div>
          </section>

          {/* Leadership & Volunteer */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white border-b-2 border-green-500 dark:border-red-500 pb-2">LEADERSHIP & VOLUNTEER</h2>
            
            <div className="mb-6 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-black dark:text-white mb-1">4-H Club – President</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Jun 2023 – Jun 2025</p>
              <ul className="list-disc list-inside space-y-1 text-black dark:text-white">
                <li>Lead weekly meetings to support youth engagement and leadership development.</li>
                <li>Represent organization at local and regional events.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


