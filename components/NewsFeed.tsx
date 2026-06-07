'use client';

import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.items || []);
    } catch {
      console.error('News fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (news.length === 0) return null;

  return (
    <section style={{ background: '#f5f0e8', borderTop: '1px solid #e8e4dc', padding: '40px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', color: '#888074', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Latest Political News</div>
          <div style={{ fontSize: '11px', color: '#888074' }}>Refreshes every 30 minutes</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {news.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px', background: '#fff', border: '1px solid #e8e4dc', borderRadius: '8px', textDecoration: 'none', gap: '4px' }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1814', lineHeight: 1.4 }}>{item.title}</span>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#c9a84c', fontWeight: 600 }}>{item.source}</span>
                <span style={{ fontSize: '11px', color: '#888074' }}>{item.pubDate}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
