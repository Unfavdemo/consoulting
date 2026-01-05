'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import ProjectModal from '../components/ProjectModal'
import ProjectEditor from '../components/ProjectEditor'
import { EditableText, EditableTextarea } from '../components/EditableContent'
import { useAdmin } from '../contexts/AdminContext'

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'SkillTree',
    description: 'A skill tracking and development platform that helps users visualize and manage their learning progress through an interactive skill tree system. Transform your career path through gamified learning with personalized skill trees, interactive lessons, and AI-generated challenges.',
    image: '/skilltree.png',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    details: [
      'Interactive skill tree visualization',
      'Gamified learning experience',
      'AI-generated personalized challenges',
      'Progress tracking and analytics',
      'Career path recommendations'
    ],
    url: 'https://skill-tree-38it.vercel.app'
  },
  {
    id: 2,
    title: 'Workshop Tracker',
    description: 'A time tracking and data management dashboard built with Next.js for monitoring workshop creation, student communication, and AI usage analytics. It includes workshop management, communication analytics, email tracking, AI usage tracking, ChatGPT integration, time tracking, case notes, student management, performance metrics, and Google Calendar integration.',
    image: '/Screenshot 2026-01-02 001714.png',
    tech: ['Next.js 16', 'React 19', 'Tailwind CSS v4', 'Radix UI', 'Recharts', 'Google APIs', 'OpenAI API', 'Lucide React', 'React Hook Form', 'Zod', 'date-fns', 'Sonner', 'next-themes'],
    details: [
      'Workshop management with statistics and dynamic form builder',
      'Real-time communication analytics across multiple channels',
      'Gmail integration for email tracking',
      'Comprehensive AI usage tracking and efficiency metrics',
      'Built-in ChatGPT interface for AI-assisted workshop creation',
      'Time tracking for workshops and activities',
      'Case notes management system',
      'Student feedback and calendar management',
      'Performance metrics and productivity scores',
      'Dark/light theme support',
      'Responsive design',
      'Data export functionality'
    ],
    url: 'https://work-tracker-sooty.vercel.app'
  },
  {
    id: 3,
    title: 'Project Name',
    description: 'Brief description of what this project does. Add more details about the features and functionality of your project here.',
    image: null,
    tech: ['Next.js', 'Tailwind'],
    details: [
      'Feature 1 description',
      'Feature 2 description',
      'Feature 3 description'
    ],
    url: 'https://project3.example.com'
  }
]

export default function Projects() {
  const { isAdmin } = useAdmin()
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [projects, setProjects] = useState(DEFAULT_PROJECTS)
  const [pageTitle, setPageTitle] = useState('My Projects')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=projects')
        if (response.ok) {
          const data = await response.json()
          if (data.projects) {
            setProjects(JSON.parse(data.projects))
          }
          if (data.title) {
            setPageTitle(data.title)
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

  const saveProjects = async (updatedProjects) => {
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'projects',
          content: { projects: JSON.stringify(updatedProjects) }
        })
      })
    } catch (error) {
      console.error('Error saving projects:', error)
      throw error
    }
  }

  const updateProject = async (projectId, field, value) => {
    const updated = projects.map(p => 
      p.id === projectId ? { ...p, [field]: value } : p
    )
    setProjects(updated)
    await saveProjects(updated)
  }

  const handleAddProject = () => {
    setEditingProject(null)
    setIsEditorOpen(true)
  }

  const handleEditProject = (project) => {
    setEditingProject(project)
    setIsEditorOpen(true)
  }

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }
    
    const updated = projects.filter(p => p.id !== projectId)
    setProjects(updated)
    await saveProjects(updated)
  }

  const handleSaveProject = async (projectData) => {
    let updated
    if (editingProject) {
      // Update existing project
      updated = projects.map(p => 
        p.id === editingProject.id ? { ...editingProject, ...projectData } : p
      )
    } else {
      // Add new project
      const newId = Math.max(...projects.map(p => p.id), 0) + 1
      updated = [...projects, { id: newId, ...projectData }]
    }
    
    setProjects(updated)
    await saveProjects(updated)
    setIsEditorOpen(false)
    setEditingProject(null)
  }

  const updatePageTitle = async (value) => {
    setPageTitle(value)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'projects', key: 'title', value })
      })
    } catch (error) {
      console.error('Error saving title:', error)
    }
  }

  const handleProjectClick = (project) => {
    if (!isAdmin) {
      setSelectedProject(project)
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            <EditableText page="projects" contentKey="title" onSave={updatePageTitle} tag="span">
              {pageTitle}
            </EditableText>
          </h1>
          {isAdmin && (
            <button
              onClick={handleAddProject}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-green-500 dark:hover:bg-red-500 text-gray-600 dark:text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 opacity-60 hover:opacity-100"
              title="Add new project"
            >
              +
            </button>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700 relative group"
            >
              {isAdmin && (
                <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditProject(project)
                    }}
                    className="bg-gray-700 dark:bg-gray-800 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-80 hover:opacity-100"
                    title="Edit project"
                  >
                    ✏
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProject(project.id)
                    }}
                    className="bg-gray-700 dark:bg-gray-800 hover:bg-red-600 text-white px-2 py-1 rounded text-xs opacity-80 hover:opacity-100"
                    title="Delete project"
                  >
                    ×
                  </button>
                </div>
              )}
              <div
                onClick={() => handleProjectClick(project)}
                className={!isAdmin ? 'cursor-pointer' : ''}
              >
                {project.image ? (
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                    <p className="text-white font-bold text-lg">Project Screenshot</p>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">
                    {isAdmin ? (
                      <EditableText onSave={(v) => updateProject(project.id, 'title', v)}>{project.title}</EditableText>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <div className="text-black dark:text-white mb-4 font-semibold line-clamp-2">
                    {isAdmin ? (
                      <EditableTextarea onSave={(v) => updateProject(project.id, 'description', v)}>{project.description}</EditableTextarea>
                    ) : (
                      project.description
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {project.tech?.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded font-semibold border border-gray-400 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <ProjectEditor
        project={editingProject}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false)
          setEditingProject(null)
        }}
        onSave={handleSaveProject}
      />
    </div>
  )
}

