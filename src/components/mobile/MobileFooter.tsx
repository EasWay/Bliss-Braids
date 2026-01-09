'use client';

import Link from 'next/link';
import { Diamond, MapPin, Phone, Mail, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

// --- Types ---
type FooterSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

// --- Sub-Component: Mobile Collapsible Section ---
function FooterSection({ title, children, className }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border-b border-white/10 md:border-none", className)}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 md:py-0 md:cursor-default md:mb-3"
      >
        <motion.h3 
          className="font-semibold text-white text-base"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform md:hidden",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Mobile: Animated Collapse */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div 
                className="pb-4 space-y-2 text-gray-400"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Always Visible */}
      <div className="hidden md:block space-y-2 text-gray-400">
        {children}
      </div>
    </div>
  );
}

export default function MobileFooter() {
  return (
    <>
      {/* Simple Separator */}
      <div className="w-full h-px bg-white/20 my-6" />
      
      <footer className="text-white pt-6 pb-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Brand Section --- */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center md:text-left">
              <Link href="/" className="inline-flex items-center space-x-2">
                <Diamond className="w-6 h-6 text-[#F50057]" fill="#F50057" />
                <span className="text-xl font-bold text-white">
                  Bliss<span className="text-[#F50057]">Braids</span>
                </span>
              </Link>
              <motion.p 
                className="text-gray-400 text-xs mt-1 max-w-xs mx-auto md:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Professional braiding services in Pobiman, Accra.
              </motion.p>
            </div>
          </motion.div>

          {/* --- Links Section (Accordion on Mobile) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-0 md:gap-y-4 mb-6">
            <FooterSection title="Quick Links">
              <ul className="space-y-1">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: "/portfolio", label: "Portfolio" },
                  { href: "/booking", label: "Book Now" }
                ].map((link, idx) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <SmartLink href={link.href} className="text-xs hover:text-[#F50057] transition-colors">
                      {link.label}
                    </SmartLink>
                  </motion.li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Legal">
              <ul className="space-y-1">
                {[
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" }
                ].map((link, idx) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Link href={link.href} className="text-xs hover:text-[#F50057] transition-colors">
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </FooterSection>

            {/* Contact Section - Always Open */}
            <div className="border-b border-white/10 md:border-none">
              <motion.h3 
                className="font-semibold text-white text-base py-3 md:py-0 md:mb-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Contact
              </motion.h3>
              
              <motion.div 
                className="pb-4 space-y-2 text-gray-400 md:pb-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin className="w-3 h-3 text-[#F50057] mt-0.5 shrink-0" />
                  <p className="text-xs leading-relaxed">
                    Pobiman, Accra
                  </p>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Phone className="w-3 h-3 text-[#F50057] shrink-0" />
                  <a 
                    href="https://wa.me/233247173819"
                    className="text-xs hover:text-white transition-colors"
                  >
                    +233 24 717 3819
                  </a>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Mail className="w-3 h-3 text-[#F50057] shrink-0" />
                  <a 
                    href="mailto:hello@blissbraids.com" 
                    className="text-xs hover:text-white transition-colors"
                  >
                    hello@blissbraids.com
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* --- Social Media Icons --- */}
          <motion.div 
            className="pt-4 pb-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a 
                href="https://tiktok.com/@blissbraids" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
              
              <a 
                href="https://instagram.com/blissbraids" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="https://wa.me/233247173819" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* --- Bottom Section: Copyright --- */}
          <motion.div 
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-gray-600 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Bliss Braids. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}