import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bg-light dark:bg-bg-dark border-t border-border-light dark:border-border-dark pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-20">
          <Link href="/" className="flex flex-col items-center group mb-10">
            <span className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 dark:text-white transition-transform duration-500 group-hover:scale-105">
              GlamGirls<span className="text-primary italic font-medium">Haven</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mt-2 font-bold">Editorial & Beauty</span>
          </Link>
          
          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-12">
            {['Skincare', 'Make-up', 'Haircare', 'Wellness', 'About', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={item === 'About' ? '/about' : `/category/${item.toLowerCase()}`}
                className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-border-light dark:border-border-dark">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div className="text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Affiliate Disclosure</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed max-w-xl italic font-serif">
                GlamGirls Haven is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, we earn from qualifying purchases. Our reviews are honest and based on real experience.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                © {new Date().getFullYear()} GlamGirls Haven Editorial.
              </p>
              <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-gray-500">
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
                <Link href="/affiliate-disclosure" className="hover:text-primary transition-colors">Disclosure</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
