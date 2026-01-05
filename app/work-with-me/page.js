'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { EditableText, EditableTextarea } from '../components/EditableContent'

const DEFAULT_CONTENT = {
  heroTitle: "Let's Work Together",
  heroSubtitle: "I'm always open to new projects, collaborations, and opportunities. Whether you need a website, web app, or just want to chat about an idea, let's connect.",
  whatIOfferTitle: 'What I Offer',
  webDevTitle: 'Web Development',
  webDevDesc: 'Custom websites and web applications built with modern technologies. From simple landing pages to interactive web apps.',
  uiuxTitle: 'UI/UX Design',
  uiuxDesc: 'User-centered design that looks great and works even better. Wireframes, prototypes, and polished interfaces.',
  pythonTitle: 'Python Development',
  pythonDesc: 'Backend development, automation scripts, and data processing. Over 200 hours of hands-on Python experience.',
  consultationTitle: 'Consultation',
  consultationDesc: "Need advice on a project? Let's discuss your ideas, review code, or brainstorm solutions together.",
  howIWorkTitle: 'How I Work',
  discoveryTitle: 'Discovery',
  discoveryDesc: "We'll start by discussing your goals, target audience, and what you're looking to build. Understanding the problem is the first step to a great solution.",
  planningTitle: 'Planning & Design',
  planningDesc: "I'll create wireframes and designs to visualize the solution. We'll iterate until it's right before writing any code.",
  developmentTitle: 'Development',
  developmentDesc: "Building with clean, maintainable code. I'll keep you updated throughout the process and welcome your feedback.",
  launchTitle: 'Launch & Support',
  launchDesc: "Once everything is polished and tested, we'll launch. I'm here to help with any adjustments or questions afterward.",
  whyWorkTitle: 'Why Work With Me',
  detailTitle: '✨ Attention to Detail',
  detailDesc: 'I care about the small things that make a big difference. Clean code, thoughtful design, and smooth user experiences.',
  collaborativeTitle: '🤝 Collaborative Approach',
  collaborativeDesc: 'Your input matters. I believe in working together, not just for you. Regular communication and feedback loops.',
  fastTitle: '🚀 Fast & Responsive',
  fastDesc: 'Quick turnaround times and prompt responses. I respect your time and keep projects moving forward.',
  clearTitle: '💬 Clear Communication',
  clearDesc: "No jargon, no confusion. I'll explain things clearly and keep you in the loop every step of the way.",
  readyTitle: 'Ready to Get Started?',
  readySubtitle: "Let's talk about your project. Fill out the form below and i will reply promptly within 24 hours."
}

export default function WorkWithMe() {
  const [content, setContent] = useState(DEFAULT_CONTENT)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content?page=work-with-me')
        if (response.ok) {
          const data = await response.json()
          if (Object.keys(data).length > 0) {
            setContent({ ...DEFAULT_CONTENT, ...data })
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    }
    fetchContent()
  }, [])

  const updateContent = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      let data = {}
      try {
        const text = await response.text()
        data = text ? JSON.parse(text) : {}
      } catch (parseError) {
        console.error('Error parsing response:', parseError)
      }

      if (response.ok) {
        setSubmitStatus('success')
        setErrorMessage('')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || `Server error (${response.status}). Please try again.`)
        setTimeout(() => {
          setSubmitStatus(null)
          setErrorMessage('')
        }, 8000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
      setTimeout(() => {
        setSubmitStatus(null)
        setErrorMessage('')
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-black dark:text-white animate-slide-down">
            <EditableText page="work-with-me" contentKey="heroTitle" onSave={(v) => updateContent('heroTitle', v)}>{content.heroTitle}</EditableText>
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            <EditableTextarea page="work-with-me" contentKey="heroSubtitle" onSave={(v) => updateContent('heroSubtitle', v)}>{content.heroSubtitle}</EditableTextarea>
          </div>
        </div>

        {/* What I Offer */}
        <section className="mb-16 animate-fade-in-delay-2">
          <h2 className="text-4xl font-bold mb-8 text-black dark:text-white text-center">
            <EditableText page="work-with-me" contentKey="whatIOfferTitle" onSave={(v) => updateContent('whatIOfferTitle', v)}>{content.whatIOfferTitle}</EditableText>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">
                <EditableText page="work-with-me" contentKey="webDevTitle" onSave={(v) => updateContent('webDevTitle', v)}>{content.webDevTitle}</EditableText>
              </h3>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <EditableTextarea page="work-with-me" contentKey="webDevDesc" onSave={(v) => updateContent('webDevDesc', v)}>{content.webDevDesc}</EditableTextarea>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">
                <EditableText page="work-with-me" contentKey="uiuxTitle" onSave={(v) => updateContent('uiuxTitle', v)}>{content.uiuxTitle}</EditableText>
              </h3>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <EditableTextarea page="work-with-me" contentKey="uiuxDesc" onSave={(v) => updateContent('uiuxDesc', v)}>{content.uiuxDesc}</EditableTextarea>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">
                <EditableText page="work-with-me" contentKey="pythonTitle" onSave={(v) => updateContent('pythonTitle', v)}>{content.pythonTitle}</EditableText>
              </h3>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <EditableTextarea page="work-with-me" contentKey="pythonDesc" onSave={(v) => updateContent('pythonDesc', v)}>{content.pythonDesc}</EditableTextarea>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-950 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">
                <EditableText page="work-with-me" contentKey="consultationTitle" onSave={(v) => updateContent('consultationTitle', v)}>{content.consultationTitle}</EditableText>
              </h3>
              <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <EditableTextarea page="work-with-me" contentKey="consultationDesc" onSave={(v) => updateContent('consultationDesc', v)}>{content.consultationDesc}</EditableTextarea>
              </div>
            </div>
          </div>
        </section>

        {/* My Process */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-black dark:text-white text-center">
            <EditableText page="work-with-me" contentKey="howIWorkTitle" onSave={(v) => updateContent('howIWorkTitle', v)}>{content.howIWorkTitle}</EditableText>
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="discoveryTitle" onSave={(v) => updateContent('discoveryTitle', v)}>{content.discoveryTitle}</EditableText>
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="discoveryDesc" onSave={(v) => updateContent('discoveryDesc', v)}>{content.discoveryDesc}</EditableTextarea>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="planningTitle" onSave={(v) => updateContent('planningTitle', v)}>{content.planningTitle}</EditableText>
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="planningDesc" onSave={(v) => updateContent('planningDesc', v)}>{content.planningDesc}</EditableTextarea>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="developmentTitle" onSave={(v) => updateContent('developmentTitle', v)}>{content.developmentTitle}</EditableText>
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="developmentDesc" onSave={(v) => updateContent('developmentDesc', v)}>{content.developmentDesc}</EditableTextarea>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start bg-white dark:bg-gray-950 rounded-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="launchTitle" onSave={(v) => updateContent('launchTitle', v)}>{content.launchTitle}</EditableText>
                </h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="launchDesc" onSave={(v) => updateContent('launchDesc', v)}>{content.launchDesc}</EditableTextarea>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Me */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-black dark:text-white text-center">
            <EditableText page="work-with-me" contentKey="whyWorkTitle" onSave={(v) => updateContent('whyWorkTitle', v)}>{content.whyWorkTitle}</EditableText>
          </h2>
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-red-900/20 dark:to-red-900/30 rounded-xl p-8 border border-green-200 dark:border-red-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="detailTitle" onSave={(v) => updateContent('detailTitle', v)}>{content.detailTitle}</EditableText>
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="detailDesc" onSave={(v) => updateContent('detailDesc', v)}>{content.detailDesc}</EditableTextarea>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="collaborativeTitle" onSave={(v) => updateContent('collaborativeTitle', v)}>{content.collaborativeTitle}</EditableText>
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="collaborativeDesc" onSave={(v) => updateContent('collaborativeDesc', v)}>{content.collaborativeDesc}</EditableTextarea>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="fastTitle" onSave={(v) => updateContent('fastTitle', v)}>{content.fastTitle}</EditableText>
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="fastDesc" onSave={(v) => updateContent('fastDesc', v)}>{content.fastDesc}</EditableTextarea>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  <EditableText page="work-with-me" contentKey="clearTitle" onSave={(v) => updateContent('clearTitle', v)}>{content.clearTitle}</EditableText>
                </h3>
                <div className="text-gray-700 dark:text-gray-300">
                  <EditableTextarea page="work-with-me" contentKey="clearDesc" onSave={(v) => updateContent('clearDesc', v)}>{content.clearDesc}</EditableTextarea>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section>
          <div className="bg-white dark:bg-gray-950 rounded-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
                <EditableText page="work-with-me" contentKey="readyTitle" onSave={(v) => updateContent('readyTitle', v)}>{content.readyTitle}</EditableText>
              </h2>
              <div className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                <EditableTextarea page="work-with-me" contentKey="readySubtitle" onSave={(v) => updateContent('readySubtitle', v)}>{content.readySubtitle}</EditableTextarea>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black dark:text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-transparent transition-all"
                  placeholder="What&apos;s this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-black dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 dark:bg-red-900/30 border border-green-200 dark:border-red-800 text-green-800 dark:text-red-400 px-4 py-3 rounded-lg">
                  ✓ Your message has been received! i will reply promptly within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 px-4 py-3 rounded-lg">
                  <div className="font-semibold mb-1">✗ Error submitting form</div>
                  <div className="text-sm">{errorMessage || 'Something went wrong. Please try again or contact me directly at siquilward221@gmail.com'}</div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-green-500 dark:bg-red-500 hover:bg-green-600 dark:hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold text-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </button>
                <Link
                  href="/projects"
                  className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl font-semibold text-lg text-center"
                >
                  View My Work
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}


