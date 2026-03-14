import { AlertCircle } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 flex gap-3 text-sm text-gray-600 dark:text-gray-400">
      <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
      <p>
        <strong>Affiliate Disclosure:</strong> This post may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you. This helps support our blog and allows us to continue creating free content. Read our full <a href="/affiliate-disclosure" className="text-primary hover:underline">disclosure policy</a>.
      </p>
    </div>
  );
}
