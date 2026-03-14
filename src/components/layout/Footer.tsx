import Link from 'next/link';
import { Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bg-light dark:bg-bg-dark border-t border-border-light dark:border-border-dark mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl text-text-light dark:text-white block mb-6 group">
              GlamGirls<span className="text-primary italic font-medium">Haven</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
              Curated beauty and wellness for the modern woman. We believe in intentional self-care, ethical products, and timeless elegance.
            </p>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Est. 2024 • Editorial & Beauty
            </div>
          </div>

          <div className="md:col-span-1 md:pl-8">
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-light dark:text-white mb-6">Explore</h4>
            <ul className="grid grid-cols-1 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/category/skincare" className="hover:text-primary transition-colors">Skincare</Link></li>
              <li><Link href="/category/makeup" className="hover:text-primary transition-colors">Makeup</Link></li>
              <li><Link href="/category/haircare" className="hover:text-primary transition-colors">Haircare</Link></li>
              <li><Link href="/category/wellness-self-love" className="hover:text-primary transition-colors">Wellness</Link></li>
            </ul>
          </div>

          {/* Column 3: More Collections */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-light dark:text-white mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/category/fragrance-body" className="hover:text-primary transition-colors">Fragrance & Body</Link></li>
              <li><Link href="/category/nails-beauty-tools" className="hover:text-primary transition-colors">Nails & Tools</Link></li>
              <li><Link href="/category/beauty-tips-hacks" className="hover:text-primary transition-colors">Tips & Hacks</Link></li>
              <li><Link href="/category/gift-guides" className="hover:text-primary transition-colors">Gift Guides</Link></li>
              <li className="pt-2"><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-widest text-text-light dark:text-white mb-6">The Beauty Edit</h4>
            <p className="text-gray-500 dark:text-gray-400 text-[11px] mb-4">Join our inner circle for exclusive beauty insights and luxury finds.</p>
            <div className="flex gap-4 mb-8">
              <a href="#" aria-label="Pinterest" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={18} /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={18} /></a>
              <a href="#" aria-label="Youtube" className="text-gray-400 hover:text-primary transition-colors"><Youtube size={18} /></a>
            </div>
            <Link href="/#newsletter" className="inline-block w-full border border-primary text-primary hover:bg-primary hover:text-white text-center py-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors">
              Subscribe to Newsletter
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-light dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-gray-400 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} GlamGirls Haven. All rights reserved.
          </div>
          <div className="text-gray-400 text-[10px] leading-relaxed max-w-lg text-left md:text-right italic">
            GlamGirls Haven is a participant in the Amazon Services LLC Associates Program. We may earn commissions from qualifying purchases.
          </div>
        </div>
      </div>
    </footer>
  );
}
