'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Diamond } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  // Check if we're on a mobile-specific page or homepage
  const isMobilePage = pathname === '/' || pathname.startsWith('/services/mobile');
  const useDarkTheme = isMobilePage;

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{ 
        backgroundColor: useDarkTheme ? 'rgba(2, 1, 25, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: useDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
      }}
    >
      <nav className="container flex h-16 md:h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <Diamond className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" style={{ color: '#F50057' }} fill="#F50057" />
            <span className={`text-xl font-bold ${useDarkTheme ? 'text-white' : 'text-black'}`}>Bliss Braids</span>
          </Link>
        </div>
        
        {/* Mobile: Logo + Sidebar trigger */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2 group">
            <Diamond className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" style={{ color: '#F50057' }} fill="#F50057" />
            <span className="text-lg font-bold text-white">Bliss Braids</span>
          </Link>
          <SidebarTrigger className="h-8 w-8 text-white hover:text-white/80 [&>svg]:w-5 [&>svg]:h-5" />
        </div>

        {/* Desktop Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#F50057] bg-[#F50057]/10'
                    : useDarkTheme
                      ? 'text-white/70 hover:text-white' 
                      : 'text-black/60 hover:text-black/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Book Now CTA */}
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow transition-all hover:opacity-90"
              style={{ backgroundColor: '#F50057' }}
            >
              Book Now
            </Link>
          </nav>
          
          {/* Desktop: Sidebar trigger on the right */}
          <div className="hidden md:flex">
            <SidebarTrigger className="h-12 w-12 text-white hover:text-white/80 [&>svg]:w-6 [&>svg]:h-6" />
          </div>
        </div>
      </nav>
    </header>
  );
}
