# Admin Portal Setup Guide

## Database Setup

To enable the admin portal with database storage, you need to:

1. **Run the database schema** to create the `page_content` table:
   ```sql
   -- Run the SQL from lib/content-schema.sql in your Neon database
   ```

2. **Ensure your DATABASE_URL is set** in your `.env.local` file:
   ```
   DATABASE_URL=your_neon_database_url
   ```

## How to Use

1. **Access Admin Portal**: Navigate to `/admin` and enter PIN: `277353`

2. **Edit Content**: When logged in as admin:
   - You'll see an "ADMIN MODE" badge in the navbar
   - Click on any text content to edit it
   - Press Enter to save, Esc to cancel
   - Changes are saved to the database and visible to all visitors

3. **Logout**: Click "Logout" in the navbar to exit admin mode

## Database Schema

The system uses a `page_content` table that stores:
- `page`: The page identifier (e.g., 'home', 'about', 'projects')
- `content_key`: The content field name (e.g., 'title', 'name', 'description')
- `content_value`: The actual content value
- `content_type`: Either 'text' or 'json' for complex data

All changes are automatically saved to the database and will be visible to all website visitors.

