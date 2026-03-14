'use client';

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('.editorial-content h2, .editorial-content h3'));
    const items: TocItem[] = headings.map((heading, index) => {
      const text = heading.textContent || '';
      const id = heading.id || `heading-${index}`;
      if (!heading.id) heading.id = id;
      return {
        id,
        text,
        level: parseInt(heading.tagName.substring(1)),
      };
    });
    setToc(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -40% 0px' }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <div className="flex flex-col">
      <div className="mb-6 shrink-0">
        <h3 className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-gray-500 dark:text-gray-400">
          Contents
        </h3>
      </div>
      <nav className="space-y-4 border-l border-border-light dark:border-border-dark ml-2">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition-all duration-300 hover:text-gray-900 dark:hover:text-white pl-4 -ml-[1px] border-l-2 ${
              item.level === 3 ? 'ml-8' : ''
            } ${
              activeId === item.id
                ? 'text-gray-900 dark:text-white font-medium border-primary'
                : 'text-gray-400 dark:text-gray-500 border-transparent'
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
