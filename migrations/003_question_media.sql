-- Add media columns to questions table
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS youtube_url text,
  ADD COLUMN IF NOT EXISTS poll_json jsonb,
  ADD COLUMN IF NOT EXISTS headlines_json jsonb;
  