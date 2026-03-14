import { Star, ShoppingCart, Trophy } from 'lucide-react';

export interface ComparisonProduct {
  id: string;
  name: string;
  image: string;
  bestFor: string;
  rating: number;
  price: string;
  link: string;
  award?: string;
}

interface ComparisonTableProps {
  title?: string;
  products: ComparisonProduct[];
}

export function ComparisonTable({ title = "Top Picks Comparison", products }: ComparisonTableProps) {
  return (
    <div className="my-10">
      <h3 className="text-2xl font-serif font-bold text-text-light dark:text-text-dark mb-6 tracking-tight">{title}</h3>
      <div className="overflow-x-auto rounded-sm border border-border-light dark:border-border-dark shadow-md bg-white dark:bg-gray-900 scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-stone-50 dark:bg-bg-dark border-b border-border-light dark:border-border-dark">
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 w-1/3">The Selection</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">Best For</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">Expert Rank</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400">Value</th>
              <th className="p-5 text-[10px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {products.map((product, index) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors relative">
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg bg-white border border-gray-100 dark:border-gray-700 p-2 flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                        referrerPolicy="no-referrer" 
                      />
                      {product.award && (
                        <div className="absolute -top-2 -left-2 bg-primary text-white p-1 rounded-full shadow-md" title={product.award}>
                          <Trophy className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-serif font-bold text-text-light dark:text-text-dark text-lg block mb-1">{product.name}</span>
                      {product.award && <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{product.award}</span>}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-300 font-medium">{product.bestFor}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">{product.rating}</span>
                  </div>
                </td>
                <td className="p-4 font-serif font-bold text-text-light dark:text-text-dark text-lg">{product.price}</td>
                <td className="p-4 text-center">
                  <a 
                    href={product.link} 
                    target="_blank" 
                    rel="noopener noreferrer nofollow" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-text-light dark:bg-white text-white dark:text-text-light text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all whitespace-nowrap shadow-sm rounded-sm"
                  >
                    Check Price
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
