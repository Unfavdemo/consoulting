import getSql from '../../../lib/db'

// GET - Fetch content for a page
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    
    if (!page) {
      return Response.json({ error: 'Page parameter is required' }, { status: 400 })
    }

    // Get database connection
    let sql
    try {
      sql = getSql()
    } catch (dbConnectionError) {
      console.error('Database connection error:', dbConnectionError)
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: dbConnectionError.message
        },
        { status: 500 }
      )
    }

    const content = await sql`
      SELECT content_key, content_value, content_type
      FROM page_content
      WHERE page = ${page}
      ORDER BY content_key
    `

    // Convert array to object for easier access
    const contentObject = {}
    content.forEach(item => {
      if (item.content_type === 'json') {
        try {
          contentObject[item.content_key] = JSON.parse(item.content_value)
        } catch {
          contentObject[item.content_key] = item.content_value
        }
      } else {
        contentObject[item.content_key] = item.content_value
      }
    })

    return Response.json(contentObject)
  } catch (error) {
    console.error('Error fetching content:', error)
    
    // Handle database-specific errors
    if (error.message && error.message.includes('DATABASE_URL')) {
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: error.message
        },
        { status: 500 }
      )
    }
    
    return Response.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

// POST - Save content for a page
export async function POST(request) {
  try {
    const body = await request.json()
    const { page, content } = body

    if (!page || !content) {
      return Response.json({ error: 'Page and content are required' }, { status: 400 })
    }

    // Get database connection
    let sql
    try {
      sql = getSql()
    } catch (dbConnectionError) {
      console.error('Database connection error:', dbConnectionError)
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: dbConnectionError.message
        },
        { status: 500 }
      )
    }

    // Insert or update each content item
    for (const [key, value] of Object.entries(content)) {
      const contentValue = typeof value === 'object' 
        ? JSON.stringify(value) 
        : String(value)
      
      const contentType = typeof value === 'object' ? 'json' : 'text'

      await sql`
        INSERT INTO page_content (page, content_key, content_value, content_type)
        VALUES (${page}, ${key}, ${contentValue}, ${contentType})
        ON CONFLICT (page, content_key)
        DO UPDATE SET 
          content_value = EXCLUDED.content_value,
          content_type = EXCLUDED.content_type,
          updated_at = NOW()
      `
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    
    // Handle database-specific errors
    if (error.message && error.message.includes('DATABASE_URL')) {
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: error.message
        },
        { status: 500 }
      )
    }
    
    return Response.json({ error: 'Failed to save content' }, { status: 500 })
  }
}

// PUT - Update a single content item
export async function PUT(request) {
  try {
    const body = await request.json()
    const { page, key, value } = body

    if (!page || !key || value === undefined) {
      return Response.json({ error: 'Page, key, and value are required' }, { status: 400 })
    }

    // Get database connection
    let sql
    try {
      sql = getSql()
    } catch (dbConnectionError) {
      console.error('Database connection error:', dbConnectionError)
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: dbConnectionError.message
        },
        { status: 500 }
      )
    }
    
    const contentValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value)
    
    const contentType = typeof value === 'object' ? 'json' : 'text'

    await sql`
      INSERT INTO page_content (page, content_key, content_value, content_type)
      VALUES (${page}, ${key}, ${contentValue}, ${contentType})
      ON CONFLICT (page, content_key)
      DO UPDATE SET 
        content_value = EXCLUDED.content_value,
        content_type = EXCLUDED.content_type,
        updated_at = NOW()
    `

    return Response.json({ success: true })
  } catch (error) {
    console.error('Error updating content:', error)
    
    // Handle database-specific errors
    if (error.message && error.message.includes('DATABASE_URL')) {
      return Response.json(
        {
          error: 'Database connection not configured. Please add DATABASE_URL to your .env.local file.',
          details: error.message
        },
        { status: 500 }
      )
    }
    
    return Response.json({ error: 'Failed to update content' }, { status: 500 })
  }
}

