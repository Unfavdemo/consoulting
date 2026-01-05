-- Create table for storing page content
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  page VARCHAR(100) NOT NULL,
  content_key VARCHAR(200) NOT NULL,
  content_value TEXT,
  content_type VARCHAR(50) DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page, content_key)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page);
CREATE INDEX IF NOT EXISTS idx_page_content_key ON page_content(page, content_key);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

