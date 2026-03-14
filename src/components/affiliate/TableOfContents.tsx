"use client";

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  selector?: string;
}

export function TableOfContents({ selector = '.ghost-content' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [items, setItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // 1. Extract headings dynamically from the content area
    const contentElement = document.querySelector(selector);
    if (!contentElement) return;

    const headingElements = Array.from(contentElement.querySelectorAll('h2, h3'));
    
    const extractedItems: TOCItem[] = headingElements.map((heading, index) => {
      // Ensure every heading has an ID
      if (!heading.id) {
        heading.id = `heading-${index}-${heading.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || index}`;
      }
      
      return {
        id: heading.id,
        title: heading.textContent || '',
        level: parseInt(heading.tagName.replace('H', ''), 10),
      };
    });

    setItems(extractedItems);

    // 2. Set up Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -80% 0%' }
    );

    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [selector]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; // Offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (items.length === 0) {
    return null; // Don't render if no headings found
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 sticky top-32 border border-gray-100 dark:border-gray-700">
      <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
        <List className="w-5 h-5 text-primary" /> Table of Contents
      </h3>
      <nav>
        <ul className="space-y-3 text-sm">
          {items.map((item) => (
            <li 
              key={item.id} 
              style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
            >
              <a 
                href={`#${item.id}`} 
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block transition-colors duration-200 hover:text-primary",
                  activeId === item.id 
                    ? "text-primary font-bold" 
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
