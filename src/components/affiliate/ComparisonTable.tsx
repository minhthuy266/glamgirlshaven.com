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
      <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
              <th className="p-4 font-serif font-bold text-gray-900 dark:text-white w-1/3">Product</th>
              <th className="p-4 font-serif font-bold text-gray-900 dark:text-white">Best For</th>
              <th className="p-4 font-serif font-bold text-gray-900 dark:text-white">Rating</th>
              <th className="p-4 font-serif font-bold text-gray-900 dark:text-white">Price</th>
              <th className="p-4 font-serif font-bold text-gray-900 dark:text-white text-center">Action</th>
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
                      <span className="font-bold text-gray-900 dark:text-white text-base block mb-1">{product.name}</span>
                      {product.award && <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.award}</span>}
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
                <td className="p-4 font-bold text-gray-900 dark:text-white text-lg">{product.price}</td>
                <td className="p-4 text-center">
                  <a 
                    href={product.link} 
                    target="_blank" 
                    rel="noopener noreferrer nofollow" 
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF9900] hover:bg-[#E48A00] text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
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
