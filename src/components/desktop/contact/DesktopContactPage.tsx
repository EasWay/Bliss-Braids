'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import DesktopDirectionsDialog from './DesktopDirectionsDialog';
import DesktopFAQAccordion from './DesktopFAQAccordion';

// 🎨 SPACING CONFIGURATION - Edit these values to adjust layout spacing
const SPACING_CONFIG = {
  // Section spacing
  heroSection: {
    paddingTop: 'pt-8',       // Hero top padding - reduced from pt-24
    paddingBottom: 'pb-16',   // Hero bottom padding
    paddingX: 'px-8'          // Hero horizontal padding
  },
  
  mapSection: {
    paddingY: 'py-12',        // Map section vertical padding
    paddingX: 'px-',         // Map section horizontal padding
    maxWidth: 'max-w-6xl'     // Container max width
  },
  
  // Grid and component spacing
  grid: {
    gap: 'gap-4',             // Gap between grid items (info cards, divider, map)
    infoCardsSpacing: 'space-y-4'  // Vertical spacing between info cards
  },
  
  // Info cards spacing
  infoCards: {
    padding: 'p-4',           // Internal padding of each info card
    marginBottom: 'mb-2',     // Space below icon in cards
    titleMargin: 'mb-1'       // Space below card titles
  },
  
  // Map specific spacing
  map: {
    height: 'h-[380px]',      // Map container height
    borderRadius: 'rounded-xl' // Map border radius
  },
  
  // Divider spacing
  divider: {
    height: 'h-96',           // Divider line height
    width: 'w-px'             // Divider line width
  },
  
  // Other sections
  directionsSection: {
    paddingY: 'py-12',        // Directions button section padding
    paddingX: 'px-8'
  },
  
  faqSection: {
    paddingY: 'py-16',        // FAQ section padding
    paddingX: 'px-8'
  }
};

export default function DesktopContactPage() {
  const [directionsOpen, setDirectionsOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020119' }}>
      {/* Hero Section */}
      <section className={`${SPACING_CONFIG.heroSection.paddingTop} ${SPACING_CONFIG.heroSection.paddingBottom} ${SPACING_CONFIG.heroSection.paddingX}`} style={{ backgroundColor: '#020119' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Visit Our Studio
          </h1>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Pobiman, Accra - Professional braiding in a private home.
          </p>
          
          <div className="flex gap-6 justify-center items-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233247173819'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors flex items-center"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="w-14 h-14"/>
            </a>
            <a
              href="/booking"
              className="bg-[#F50057] text-white px-8 py-4 rounded-full hover:bg-[#F50057]/90 
                         transition-colors text-lg font-semibold shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Info Cards and Map Section */}
      <section className={`${SPACING_CONFIG.mapSection.paddingY} ${SPACING_CONFIG.mapSection.paddingX}`} style={{ backgroundColor: '#020119' }}>
        <div className={`${SPACING_CONFIG.mapSection.maxWidth} mx-auto`}>
          <div className="flex lg:flex-row flex-col items-start gap-6">
            {/* Quick Info Cards - Fixed width */}
            <div className={`lg:w-64 w-full flex-shrink-0 ${SPACING_CONFIG.grid.infoCardsSpacing}`}>
              {/* Location */}
              <div className={`bg-white/5 backdrop-blur-sm ${SPACING_CONFIG.map.borderRadius} ${SPACING_CONFIG.infoCards.padding} flex flex-col items-center text-center`}>
                <div className={`w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center ${SPACING_CONFIG.infoCards.marginBottom}`}>
                  <MapPin className="w-5 h-5 text-[#F50057]" />
                </div>
                <h3 className={`text-sm font-semibold text-white ${SPACING_CONFIG.infoCards.titleMargin}`}>Location</h3>
                <p className="text-xs text-white/70">Pobiman, Accra</p>
              </div>

              {/* Hours */}
              <div className={`bg-white/5 backdrop-blur-sm ${SPACING_CONFIG.map.borderRadius} ${SPACING_CONFIG.infoCards.padding} flex flex-col items-center text-center`}>
                <div className={`w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center ${SPACING_CONFIG.infoCards.marginBottom}`}>
                  <Clock className="w-5 h-5 text-[#F50057]" />
                </div>
                <h3 className={`text-sm font-semibold text-white ${SPACING_CONFIG.infoCards.titleMargin}`}>Hours</h3>
                <p className="text-xs text-white/70">Mon-Sat: 9AM - 6PM</p>
              </div>

              {/* Contact */}
              <div className={`bg-white/5 backdrop-blur-sm ${SPACING_CONFIG.map.borderRadius} ${SPACING_CONFIG.infoCards.padding} flex flex-col items-center text-center`}>
                <div className={`w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center ${SPACING_CONFIG.infoCards.marginBottom}`}>
                  <Phone className="w-5 h-5 text-[#F50057]" />
                </div>
                <h3 className={`text-sm font-semibold text-white ${SPACING_CONFIG.infoCards.titleMargin}`}>Contact</h3>
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233247173819'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#F50057] hover:text-[#F50057]/80 transition-colors"
                >
                  +233 24 717 3819
                </a>
              </div>
            </div>

            {/* Divider with minimal spacing */}
            <div className="hidden lg:flex items-center px-2">
              <div className={`${SPACING_CONFIG.divider.width} ${SPACING_CONFIG.divider.height} bg-gray-500`}></div>
            </div>

            {/* Map - Takes remaining space */}
            <div className="flex-1 min-w-0">
              <div className={`relative ${SPACING_CONFIG.map.height} ${SPACING_CONFIG.map.borderRadius} overflow-hidden shadow-lg`}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127034.94411433832!2d-0.4664016027343882!3d5.7358811999999935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf0b3a06e27147%3A0x35e8ea4e80d718c7!2sPobiman%20bus%20stop!5e0!3m2!1sen!2sgh!4v1764281105612!5m2!1sen!2sgh"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bliss Braids Location - Pobiman, Accra"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Button */}
      <section className={`${SPACING_CONFIG.directionsSection.paddingY} ${SPACING_CONFIG.directionsSection.paddingX}`} style={{ backgroundColor: '#020119' }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setDirectionsOpen(true)}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-8 py-6 rounded-2xl 
                       hover:bg-white/20 transition-all duration-300 text-lg font-semibold 
                       flex items-center justify-center gap-3 shadow-lg"
          >
            <Navigation className="w-6 h-6" />
            Need Directions?
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`${SPACING_CONFIG.faqSection.paddingY} ${SPACING_CONFIG.faqSection.paddingX}`} style={{ backgroundColor: '#020119' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <DesktopFAQAccordion />
        </div>
      </section>

      {/* Directions Dialog */}
      <DesktopDirectionsDialog open={directionsOpen} onOpenChange={setDirectionsOpen} />
    </div>
  );
}
