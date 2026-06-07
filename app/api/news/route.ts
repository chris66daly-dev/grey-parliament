import { NextResponse } from 'next/server';

const FEEDS = [
  { url: 'https://feeds.bbci.co.uk/news/politics/rss.xml', source: 'BBC Politics' },
  { url: 'https://www.theguardian.com/politics/rss', source: 'The Guardian' },
];

export const revalidate = 1800;

async function parseFeed(url: string, source: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 1800 } });
    const text = await res.text();
    const items: { title: string; link: string; source: string; pubDate: string }[] = [];
    const itemMatches = Array.from(text.matchAll(/<item>([\s\S]*?)<\/item>/g));
    for (const match of itemMatches) {
      const item = match[1];
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || item.match(/<title>(.*?)<\/title>/)?.[1] || '';
      const link = item.match(/<link>(.*?)<\/link>/)?.[1] || item.match(/<guid>(.*?)<\/guid>/)?.[1] || '';
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      if (title && link) {
        items.push({
          title: title.trim(),
          link: link.trim(),
          source,
          pubDate: pubDate ? new Date(pubDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '',
        });
      }
    }
    return items.slice(0, 5);
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(FEEDS.map(f => parseFeed(f.url, f.source)));
  const items = results.flat().sort(() => Math.random() - 0.5).slice(0, 8);
  return NextResponse.json({ items });
}
