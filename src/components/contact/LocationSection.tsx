'use client';

import { MapPin, Phone, Clock, Instagram, Send } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal text-center mb-8 sm:mb-12">
          Find Us
        </h2>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Information - Responsive spacing */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-charcoal mb-4 sm:mb-6">
              Get in Touch
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-light flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">Location</h4>
                <p className="text-slate">
                  Pobiman, Accra
                </p>
                <p className="text-sm text-slate mt-1">
                  Near Pobiman Junction
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-light flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">WhatsApp</h4>
                <a 
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233XXXXXXXXX'}`}
                  className="text-slate hover:text-primary transition-colors"
                >
                  +233 24 717 3819            </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-light flex items-center justify-center">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-charcoal mb-1">Hours</h4>
                <div className="text-slate space-y-1">
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: By Appointment Only</p>
                </div>
              </div>
            </div>

            {/* Social Media - Touch-friendly */}
            <div className="pt-4 sm:pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-charcoal mb-3 sm:mb-4">Follow Us</h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://instagram.com/blissbraids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary-light hover:bg-primary active:bg-primary/90 
                             flex items-center justify-center transition-colors group touch-manipulation"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://tiktok.com/@blissbraids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-primary-light hover:bg-primary active:bg-primary/90 
                             flex items-center justify-center transition-colors group touch-manipulation"
                  aria-label="Follow us on TikTok"
                >
                  <Send className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="relative h-[400px] md:h-full min-h-[400px] rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
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
    </section>
  );
}
