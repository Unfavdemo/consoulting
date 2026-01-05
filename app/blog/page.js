'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EditableText, EditableTextarea } from '../components/EditableContent'

const DEFAULT_POSTS = [
  {
    id: 1,
    title: 'Getting Started with Next.js',
    date: 'January 15, 2025',
    excerpt: 'A beginner-friendly guide to building your first Next.js application. Learn the basics of routing, components, and server-side rendering.',
    category: 'Tutorial'
  },
  {
    id: 2,
    title: 'Building Responsive Designs with Tailwind CSS',
    date: 'January 10, 2025',
    excerpt: 'Tips and tricks for creating beautiful, responsive layouts using Tailwind CSS utility classes. From mobile-first design to complex grid layouts.',
    category: 'Design'
  },
  {
    id: 3,
    title: 'My Journey into Web Development',
    date: 'January 5, 2025',
    excerpt: 'Reflecting on my path from curiosity to code. The challenges, wins, and lessons learned along the way.',
    category: 'Personal'
  }
]

export default function Blog() {
  const [posts, setPosts] = useState(DEFAULT_POSTS)
  const [intro, setIntro] = useState('Thoughts on web development, design, and the occasional random musing.')
  const [pageTitle, setPageTitle] = useState('Blog')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=blog')
        if (response.ok) {
          const data = await response.json()
          if (data.posts) {
            setPosts(JSON.parse(data.posts))
          }
          if (data.intro) {
            setIntro(data.intro)
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

  const updatePost = async (postId, field, value) => {
    const updated = posts.map(p => 
      p.id === postId ? { ...p, [field]: value } : p
    )
    setPosts(updated)
    
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'blog',
          content: { posts: JSON.stringify(updated) }
        })
      })
    } catch (error) {
      console.error('Error saving post:', error)
    }
  }

  const updateIntro = async (value) => {
    setIntro(value)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'blog', key: 'intro', value })
      })
    } catch (error) {
      console.error('Error saving intro:', error)
    }
  }

  const updatePageTitle = async (value) => {
    setPageTitle(value)
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: 'blog', key: 'title', value })
      })
    } catch (error) {
      console.error('Error saving title:', error)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-black dark:text-white animate-slide-down">
          <EditableText page="blog" contentKey="title" onSave={updatePageTitle} tag="span">
            {pageTitle}
          </EditableText>
        </h1>
        
        <div className="text-lg text-black dark:text-white mb-12 animate-fade-in-delay">
          <EditableTextarea page="blog" contentKey="intro" onSave={updateIntro}>{intro}</EditableTextarea>
        </div>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-100 dark:bg-red-900/30 text-green-800 dark:text-red-400 px-3 py-1 rounded-full text-sm font-semibold">
                  <EditableText onSave={(v) => updatePost(post.id, 'category', v)}>{post.category}</EditableText>
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  <EditableText onSave={(v) => updatePost(post.id, 'date', v)}>{post.date}</EditableText>
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
                <EditableText onSave={(v) => updatePost(post.id, 'title', v)}>{post.title}</EditableText>
              </h2>
              <div className="text-black dark:text-white leading-relaxed mb-4">
                <EditableTextarea onSave={(v) => updatePost(post.id, 'excerpt', v)}>{post.excerpt}</EditableTextarea>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="text-green-500 dark:text-red-500 hover:text-green-600 dark:hover:text-red-600 font-semibold transition-colors duration-300 inline-flex items-center gap-2"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

