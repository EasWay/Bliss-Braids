'use client';

import Link from 'next/link';
import { Diamond } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function MobileHeader() {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{ 
        backgroundColor: 'rgba(2, 1, 25, 0.95)',
        borderColor: 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <nav className="flex h-16 items-center px-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <Diamond 
            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" 
            style={{ color: '#F50057' }} 
            fill="#F50057" 
          />
          <span className="text-lg font-bold text-white">
            Bliss<span style={{ color: '#F50057' }}>Braids</span>
          </span>
        </Link>

        {/* Right: Sidebar trigger */}
        <div className="ml-auto">
          <SidebarTrigger className="h-8 w-8 text-white hover:text-white/80 [&>svg]:w-5 [&>svg]:h-5" />
        </div>
      </nav>
    </header>
  );
}
