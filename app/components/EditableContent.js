'use client'

import { useState, useEffect } from 'react'
import { useAdmin } from '../contexts/AdminContext'

export function EditableText({ children, onSave, className = '', tag: Tag = 'span', page, contentKey }) {
  const { isAdmin } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(children)
  const [isSaving, setIsSaving] = useState(false)

  // Update value when children changes (e.g., when content loads from database)
  useEffect(() => {
    if (!isEditing && children !== undefined && children !== null) {
      setValue(children)
    }
  }, [children, isEditing])

  const handleSave = async () => {
    if (value === children) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    
    // If page and contentKey are provided, save to database
    if (page && contentKey) {
      try {
        const response = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, key: contentKey, value })
        })
        
        if (!response.ok) {
          throw new Error('Failed to save')
        }
      } catch (error) {
        console.error('Error saving to database:', error)
        alert('Failed to save. Please try again.')
        setValue(children)
        setIsEditing(false)
        setIsSaving(false)
        return
      }
    }
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(value)
    }
    
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setValue(children)
    setIsEditing(false)
  }

  if (!isAdmin) {
    return <Tag className={className}>{children}</Tag>
  }

  if (isEditing) {
    // Use span wrapper when Tag is 'p' to avoid nesting div inside p
    const Wrapper = Tag === 'p' ? 'span' : 'div'
    return (
      <Wrapper className="relative group inline-block">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSaving}
          className={`${className} border-2 border-green-500 dark:border-red-500 bg-white dark:bg-gray-900 px-2 py-1 rounded`}
          autoFocus
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isSaving) {
              handleSave()
            } else if (e.key === 'Escape') {
              handleCancel()
            }
          }}
        />
        <span className="absolute top-full left-0 mt-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap block">
          {isSaving ? 'Saving...' : 'Press Enter to save, Esc to cancel'}
        </span>
      </Wrapper>
    )
  }

  return (
    <Tag
      className={`${className} relative group cursor-pointer hover:outline hover:outline-1 hover:outline-green-400 dark:hover:outline-red-600 hover:outline-dashed rounded px-0.5`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {children}
      <span className="absolute -top-1 -right-1 bg-green-400 dark:bg-red-600 text-white text-[10px] px-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ✏
      </span>
    </Tag>
  )
}

export function EditableTextarea({ children, onSave, className = '', page, contentKey }) {
  const { isAdmin } = useAdmin()
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(children)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (value === children) {
      setIsEditing(false)
      return
    }

    setIsSaving(true)
    
    // If page and contentKey are provided, save to database
    if (page && contentKey) {
      try {
        const response = await fetch('/api/content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page, key: contentKey, value })
        })
        
        if (!response.ok) {
          throw new Error('Failed to save')
        }
      } catch (error) {
        console.error('Error saving to database:', error)
        alert('Failed to save. Please try again.')
        setValue(children)
        setIsEditing(false)
        setIsSaving(false)
        return
      }
    }
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(value)
    }
    
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setValue(children)
    setIsEditing(false)
  }

  if (!isAdmin) {
    return <p className={className}>{children}</p>
  }

  if (isEditing) {
    return (
      <div className="relative group">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSaving}
          className={`${className} border-2 border-green-500 dark:border-red-500 bg-white dark:bg-gray-900 px-2 py-1 rounded w-full min-h-[100px]`}
          autoFocus
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleCancel()
            }
          }}
        />
        <div className="absolute top-full left-0 mt-1 text-xs text-gray-500 dark:text-gray-400">
          {isSaving ? 'Saving...' : 'Click outside to save, Esc to cancel'}
        </div>
      </div>
    )
  }

  return (
    <p
      className={`${className} relative group cursor-pointer hover:outline hover:outline-1 hover:outline-green-400 dark:hover:outline-red-600 hover:outline-dashed rounded px-0.5`}
      onClick={() => setIsEditing(true)}
      title="Click to edit"
    >
      {children}
      <span className="absolute -top-1 -right-1 bg-green-400 dark:bg-red-600 text-white text-[10px] px-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        ✏
      </span>
    </p>
  )
}

