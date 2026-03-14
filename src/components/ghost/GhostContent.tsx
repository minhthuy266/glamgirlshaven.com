import React from 'react';

interface GhostContentProps {
  html: string;
}

export function GhostContent({ html }: GhostContentProps) {
  return (
    <div 
      className="ghost-content prose prose-lg md:prose-xl dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary-dark prose-p:leading-relaxed prose-img:rounded-3xl prose-img:shadow-md"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
