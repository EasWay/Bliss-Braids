'use client';

import { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import MobileFooter from '@/components/mobile/MobileFooter';
import ContactMap from '@/components/mobile/contact/ContactMap';
import DirectionsDialog from '@/components/mobile/contact/DirectionsDialog';
import FAQAccordion from '@/components/mobile/contact/FAQAccordion';

export default function MobileContactPage() {
  const [directionsOpen, setDirectionsOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#020119' }}>
      {/* Hero Section - Compact */}
      <section className="pt-8 pb-8 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            Visit Our Studio
          </h1>
          <p className="text-base text-white/80 mb-6">
            Pobiman, Accra - Professional braiding in a private home.
          </p>
          
          <div className="flex gap-3 justify-center items-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233247173819'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors flex items-center"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="w-10 h-10"/>
            </a>
            <a
              href="/booking"
              className="bg-[#F50057] text-white px-6 py-3 rounded-full hover:bg-[#F50057]/90 
                         transition-colors text-base font-semibold shadow-lg"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Quick Info Cards - Compact */}
      <section className="py-4 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-md mx-auto space-y-2.5">
          {/* Location */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#F50057]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">Location</h3>
              <p className="text-xs text-white/70">Pobiman, Accra</p>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-[#F50057]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">Hours</h3>
              <p className="text-xs text-white/70">Mon-Sat: 9AM - 6PM</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#F50057]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">Contact</h3>
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
        </div>
      </section>

      {/* Map Section */}
      <ContactMap />

      {/* Directions Button */}
      <section className="py-6 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setDirectionsOpen(true)}
            className="w-full bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl 
                       hover:bg-white/20 transition-all duration-300 text-base font-semibold 
                       flex items-center justify-center gap-2 shadow-lg"
          >
            <Navigation className="w-5 h-5" />
            Need Directions?
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-4" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Directions Dialog */}
      <DirectionsDialog open={directionsOpen} onOpenChange={setDirectionsOpen} />

      {/* Footer */}
      <MobileFooter />
    </div>
  );
}
