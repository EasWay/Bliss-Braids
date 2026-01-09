import Link from 'next/link';
import { Instagram, Music2, Diamond } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ backgroundColor: '#111827' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Diamond className="w-6 h-6" style={{ color: '#F50057' }} fill="#F50057" />
              <span className="text-xl font-bold">Bliss Braids</span>
            </div>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Professional braiding services in Pobiman, Accra. Creating beautiful styles with care and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Home
              </Link>
              <Link href="#services" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Services
              </Link>
              <Link href="#portfolio" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Portfolio
              </Link>
              <Link href="/booking" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Book Appointment
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/blissbraids"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F50057] flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com/@blissbraids"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F50057] flex items-center justify-center transition-colors duration-200"
                aria-label="TikTok"
              >
                <Music2 className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Stay updated with our latest styles and promotions
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              © {currentYear} Bliss Braids. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#6B7280] hover:text-[#F50057] transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
