import { NextResponse } from 'next/server'
import getSql from '@/lib/db'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Get database connection
    let sql
    try {
      sql = getSql()
    } catch (dbConnectionError) {
      console.error('Database connection error:', dbConnectionError)
      return NextResponse.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: dbConnectionError.message
        },
        { status: 500 }
      )
    }

    // Save to database
    try {
      await sql`
        INSERT INTO contact_submissions (name, email, subject, message)
        VALUES (${name}, ${email}, ${subject || null}, ${message})
      `
      
      console.log('Contact form submission saved to database:', {
        name,
        email,
        subject,
        timestamp: new Date().toISOString()
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Check if it's a connection error or table doesn't exist
      if (dbError.message.includes('relation') && dbError.message.includes('does not exist')) {
        return NextResponse.json(
          { 
            error: 'Database table not found. Please run the schema SQL from lib/schema.sql in your Neon dashboard.',
            details: 'The contact_submissions table does not exist yet.'
          },
          { status: 500 }
        )
      }
      
      if (dbError.message.includes('DATABASE_URL')) {
        return NextResponse.json(
          { 
            error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
            details: 'See DATABASE_SETUP.md for instructions.'
          },
          { status: 500 }
        )
      }
      
      // Generic database error
      return NextResponse.json(
        { error: 'Failed to save your message to the database. Please try again later.' },
        { status: 500 }
      )
    }

    // Return success response
    return NextResponse.json(
      { 
        message: 'Thank you for your message! I will reply promptly within 24 hours.',
        success: true 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    console.error('Error stack:', error.stack)
    console.error('Error message:', error.message)
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      )
    }
    
    // In development, show more details
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Failed to process your message: ${error.message}` 
      : 'Failed to process your message. Please try again later.'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Please use POST.' },
    { status: 405 }
  )
}

