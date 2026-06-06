CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) <= 280),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_removed BOOLEAN DEFAULT FALSE,
  removed_by_speaker BOOLEAN DEFAULT FALSE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  out_votes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comment_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down', 'out')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, profile_id)
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments readable by all" ON comments FOR SELECT USING (true);
CREATE POLICY "GMPs can insert comments" ON comments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND tier = 'gmp')
);
CREATE POLICY "Comment votes readable by all" ON comment_votes FOR SELECT USING (true);
CREATE POLICY "GMPs can vote on comments" ON comment_votes FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND tier = 'gmp')
);
CREATE POLICY "GMPs can update own votes" ON comment_votes FOR UPDATE USING (profile_id = auth.uid());
