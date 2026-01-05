'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ProjectEditor({ project, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    url: '',
    tech: [],
    details: []
  })
  const [techInput, setTechInput] = useState('')
  const [detailInput, setDetailInput] = useState('')

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        url: project.url || '',
        tech: project.tech || [],
        details: project.details || []
      })
    } else {
      // New project defaults
      setFormData({
        title: '',
        description: '',
        image: '',
        url: '',
        tech: [],
        details: []
      })
    }
    setTechInput('')
    setDetailInput('')
  }, [project, isOpen])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        tech: [...formData.tech, techInput.trim()]
      })
      setTechInput('')
    }
  }

  const removeTech = (index) => {
    setFormData({
      ...formData,
      tech: formData.tech.filter((_, i) => i !== index)
    })
  }

  const addDetail = () => {
    if (detailInput.trim()) {
      setFormData({
        ...formData,
        details: [...formData.details, detailInput.trim()]
      })
      setDetailInput('')
    }
  }

  const removeDetail = (index) => {
    setFormData({
      ...formData,
      details: formData.details.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/image.png or https://..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
              />
              {formData.image && (
                <div className="mt-2 h-32 relative rounded overflow-hidden border border-gray-300 dark:border-gray-700">
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Project URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTech()
                    }
                  }}
                  placeholder="Add technology..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={addTech}
                  className="bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-300 dark:bg-gray-900 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 border border-gray-400 dark:border-gray-700"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black dark:text-white mb-2">
                Project Details
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={detailInput}
                  onChange={(e) => setDetailInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addDetail()
                    }
                  }}
                  placeholder="Add detail..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={addDetail}
                  className="bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {formData.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between bg-gray-50 dark:bg-gray-900 p-2 rounded"
                  >
                    <span className="text-black dark:text-white">• {detail}</span>
                    <button
                      type="button"
                      onClick={() => removeDetail(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                {project ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

