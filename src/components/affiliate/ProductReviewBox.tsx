import { CheckCircle2, XCircle, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface ProductReviewBoxProps {
  title: string;
  image: string;
  rating: number;
  price: string;
  description: string;
  pros: string[];
  cons: string[];
  affiliateLink: string;
  buttonText?: string;
  badgeText?: string;
}

export function ProductReviewBox({
  title,
  image,
  rating,
  price,
  description,
  pros,
  cons,
  affiliateLink,
  buttonText = "View on Amazon",
  badgeText,
}: ProductReviewBoxProps) {
  return (
    <div className="bg-white dark:bg-bg-dark border border-border-light dark:border-border-dark overflow-hidden my-16 relative group">
      {badgeText && (
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 z-10">
          {badgeText}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row p-8 md:p-12 gap-12">
        {/* Product Image */}
        <div className="w-full md:w-2/5 flex-shrink-0">
          <div className="relative w-full aspect-[4/5] bg-bg-light dark:bg-gray-900 border border-border-light dark:border-border-dark p-8 flex items-center justify-center overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className={`w-4 h-4 ${star <= rating ? 'text-primary' : 'text-gray-200 dark:text-gray-800'} fill-current`} viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400 italic font-serif">Editor's Rating: {rating}/5</span>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-3/5 flex flex-col">
          <div className="mb-8">
            <h3 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-3 leading-tight tracking-tight">{title}</h3>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl font-serif italic text-primary">Check Price on Amazon</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Curated Selection</span>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-serif text-lg italic">
            "{description}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
            {/* Pros */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-white mb-5 border-b border-border-light pb-2">
                The Highlights
              </h4>
              <ul className="space-y-3">
                {pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 italic">
                    <span className="text-primary font-bold">+</span> {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-white mb-5 border-b border-border-light pb-2">
                Considerations
              </h4>
              <ul className="space-y-3">
                {cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400 italic">
                    <span className="text-gray-300 font-bold">—</span> {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <a 
              href={affiliateLink}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="group/btn relative inline-flex items-center justify-center w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[11px] uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-500 hover:bg-primary"
            >
              <span className="relative z-10 flex items-center gap-3">
                <ShoppingCart className="w-4 h-4" />
                {buttonText}
              </span>
            </a>
            <p className="text-center text-[9px] uppercase tracking-widest font-bold text-gray-400 mt-4">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
