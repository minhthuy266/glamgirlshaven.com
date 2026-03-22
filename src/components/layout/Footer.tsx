import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

const PinterestIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
    stroke="transparent"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.188 0 7.427 2.981 7.427 6.953 0 4.167-2.626 7.525-6.275 7.525-1.225 0-2.376-.637-2.768-1.385l-.754 2.872c-.27 1.033-1.002 2.324-1.492 3.116 1.144.352 2.361.542 3.618.542 6.621 0 11.988-5.367 11.988-11.988 0-6.62-5.367-11.987-11.988-11.987z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-bg-light dark:bg-bg-dark border-t border-border-light dark:border-border-dark mt-32 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Branding Text Background */}
      <div className="absolute bottom-0 right-0 text-[8rem] md:text-[15rem] font-serif font-bold text-primary/5 select-none pointer-events-none leading-none -translate-y-1/4">
        GLAM
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-7xl pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">
          
          {/* Column 1: Brand & Identity */}
          <div className="md:col-span-4 max-w-sm">
            <Link href="/" className="font-serif text-3xl text-text-light dark:text-white block mb-8 group tracking-tighter">
              GlamGirls<span className="text-primary italic font-medium">Haven</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 italic font-serif">
              A digital editorial dedicated to the art of intentional beauty. We curate the science and the soul behind your most radiant self.
            </p>
            <div className="flex gap-6 mb-10">
              <a href="https://www.pinterest.com/glamgirlshaven/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border-light dark:border-border-dark flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all">
                <PinterestIcon size={18} />
              </a>
            </div>
            <div className="text-[10px] text-primary font-bold uppercase tracking-[0.4em]">
              Est. 2024 • Editorial & Beauty
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 md:pl-8">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-text-light dark:text-white mb-8 flex items-center gap-2">
              <Compass size={14} className="text-primary" /> Explore
            </h4>
            <ul className="space-y-5 text-sm font-medium text-gray-500 dark:text-gray-400">
              <li><Link href="/category/skincare" className="hover:text-primary transition-colors hover:pl-2 transition-all block">Skincare</Link></li>
              <li><Link href="/category/make-up" className="hover:text-primary transition-colors hover:pl-2 transition-all block">Makeup</Link></li>
              <li><Link href="/category/haircare" className="hover:text-primary transition-colors hover:pl-2 transition-all block">Haircare</Link></li>
              <li><Link href="/category/wellness-self-love" className="hover:text-primary transition-colors hover:pl-2 transition-all block">Wellness</Link></li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-text-light dark:text-white mb-8">Collections</h4>
            <ul className="space-y-5 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/category/fragrance-body" className="hover:text-primary transition-colors">Fragrance & Body</Link></li>
              <li><Link href="/category/nails-beauty-tools" className="hover:text-primary transition-colors">Nails & Tools</Link></li>
              <li><Link href="/category/beauty-tips-hacks" className="hover:text-primary transition-colors">Tips & Hacks</Link></li>
              <li><Link href="/category/gift-guides" className="hover:text-primary transition-colors">Gift Guides</Link></li>
              <li className="pt-4 border-t border-border-light dark:border-border-dark">
                <Link href="/about" className="text-[10px] uppercase font-bold tracking-widest text-text-light dark:text-white hover:text-primary transition-colors">Our Mission</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Promo */}
          <div className="md:col-span-4 bg-stone-50 dark:bg-white/5 p-10 border border-border-light dark:border-border-dark flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-text-light dark:text-white mb-4">The Beauty Edit</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">Join 50,000+ insiders. Get the weekly confidential directly to your inbox.</p>
            </div>
            <Link href="/#newsletter" className="group flex items-center justify-between w-full border-b-2 border-gray-900 dark:border-white pb-4 font-bold text-[10px] uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:border-primary transition-all">
              Join The Circle <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Bottom Bar: Multi-layered */}
        <div className="border-t border-border-light dark:border-border-dark pt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
               <div className="text-gray-400 text-[9px] uppercase tracking-[0.5em] mb-4">Global Network</div>
               <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  <span className="cursor-default">New York</span>
                  <span className="cursor-default">London</span>
                  <span className="cursor-default">Paris</span>
                  <span className="cursor-default">Tokyo</span>
                  <span className="cursor-default">Seoul</span>
               </div>
            </div>
            <div className="text-gray-400 text-[10px] italic leading-relaxed max-w-md text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-primary/20 pl-4 md:pl-0 md:pr-4">
              GlamGirls Haven is a participant in the Amazon Services LLC Associates Program. We provide expert, unbiased recommendations.
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-border-light/50 dark:border-border-dark/30">
            <div className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-medium">
              &copy; {new Date().getFullYear()} GlamGirls Haven. Digital Editorial.
            </div>
            <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500">
               <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
               <Link href="/disclosure" className="hover:text-primary transition-colors">Affiliate Disclosure</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
