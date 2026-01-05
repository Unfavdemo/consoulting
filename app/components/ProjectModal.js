'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white text-2xl font-bold z-10 bg-white dark:bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 dark:border-gray-700"
          aria-label="Close"
        >
          ×
        </button>

        {/* Project Image */}
        {project.image && (
          <div className="h-64 md:h-80 relative overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Project Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            {project.title}
          </h2>
          
          <p className="text-lg text-black dark:text-white mb-6 leading-relaxed">
            {project.description}
          </p>

          {project.details && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Project Details</h3>
              <ul className="space-y-2 text-black dark:text-white">
                {project.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span 
                  key={index}
                  className="text-sm bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded font-semibold border border-gray-400 dark:border-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visit Project Button */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-semibold"
            >
              Visit Project →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

