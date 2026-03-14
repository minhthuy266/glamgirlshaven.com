import { BadgeCheck, Instagram, Twitter, Globe } from 'lucide-react';

interface AuthorBoxProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export function AuthorBox({ name, role, bio, image, socials }: AuthorBoxProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start mt-12 shadow-sm">
      <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border-4 border-primary/10">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer" 
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">{name}</h3>
          <BadgeCheck className="w-5 h-5 text-blue-500" aria-label="Verified Expert" />
        </div>
        <p className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">{role}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {bio}
        </p>
        
        {socials && (
          <div className="flex gap-3">
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {socials.website && (
              <a href={socials.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-700 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
