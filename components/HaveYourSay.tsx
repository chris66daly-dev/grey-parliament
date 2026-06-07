'use client';

import { useState, useEffect, useCallback } from 'react';

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
  upvotes: number;
  downvotes: number;
  out_votes: number;
  total_votes: number;
  profiles: { tier: string };
}

interface Props {
  questionId: string;
  userTier: string | null;
  userId: string | null;
}

export default function HaveYourSay({ questionId, userTier, userId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sort, setSort] = useState<'newest' | 'top'>('newest');
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/comments?question_id=${questionId}&sort=${sort}`);
    const data = await res.json();
    setComments(data.comments || []);
    setLoading(false);
  }, [questionId, sort]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setSubmitting(true);
    setError('');
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question_id: questionId, content: newComment })
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Failed to post comment');
    } else {
      setNewComment('');
      fetchComments();
    }
    setSubmitting(false);
  };

  const handleVote = async (commentId: string, voteType: 'up' | 'down' | 'out') => {
    await fetch('/api/comments/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_id: commentId, vote_type: voteType })
    });
    fetchComments();
  };

  const isGMP = userTier === 'gmp';

  return (
    <section id="have-your-say" className="mt-12 border-t border-gray-200 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Have Your Say</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSort('newest')}
            className={`px-3 py-1 text-sm rounded ${sort === 'newest' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Newest
          </button>
          <button
            onClick={() => setSort('top')}
            className={`px-3 py-1 text-sm rounded ${sort === 'top' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            Top rated
          </button>
        </div>
      </div>

      {isGMP && (
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value.slice(0, 280))}
            placeholder="Add your voice to the debate... (280 characters max)"
            className="w-full resize-none border border-gray-200 rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            rows={3}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{newComment.length}/280</span>
            <button
              onClick={handleSubmit}
              disabled={submitting || !newComment.trim()}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post comment'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      {!isGMP && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>Grey Parliament Members (GMPs)</strong> can join the debate.
          {!userId ? ' Sign up or log in to participate.' : ' Upgrade to GMP to post and vote on comments.'}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 text-sm">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet. {isGMP ? 'Be the first to have your say.' : ''}</p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm text-gray-900">{comment.author_name}</span>
                {comment.profiles?.tier === 'gmp' && (
                  <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">GMP</span>
                )}
                <span className="text-xs text-gray-400 ml-auto">
                  {new Date(comment.created_at).toLocaleDateString('en-GB')}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
              {isGMP && (
                <div className="flex gap-3">
                  <button onClick={() => handleVote(comment.id, 'up')} className="text-xs text-green-600 hover:text-green-800">
                    ▲ {comment.upvotes}
                  </button>
                  <button onClick={() => handleVote(comment.id, 'down')} className="text-xs text-gray-500 hover:text-gray-700">
                    ▼ {comment.downvotes}
                  </button>
                  <button onClick={() => handleVote(comment.id, 'out')} className="text-xs text-red-400 hover:text-red-600">
                    ✕ out ({comment.out_votes})
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e8e4dc' }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: '#c9a84c', color: '#1a1814', padding: '12px 28px', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontFamily: 'var(--sans)' }}
        >
          ↑ Cast my verdict
        </button>
      </div>
    </section>
  );
}
