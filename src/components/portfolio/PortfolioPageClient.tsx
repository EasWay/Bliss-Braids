'use client';

import { useDeviceType } from '@/lib/device-detection.client';
import PortfolioGallery from '@/components/portfolio/PortfolioGallery';
import MobilePortfolioGallery from '@/components/portfolio/MobilePortfolioGallery';
import { portfolioImages } from '@/data/portfolio';

export default function PortfolioPageClient() {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const totalImages = portfolioImages.length;
  const categories = Array.from(new Set(portfolioImages.map(img => img.category)));

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Mobile version - hidden on desktop with CSS */}
      <div className={`md:hidden ${!isMobile ? 'hidden' : ''}`}>
        <MobilePortfolioGallery />
      </div>

      {/* Desktop version - hidden on mobile with CSS */}
      <div className={`hidden md:block ${isMobile ? 'md:hidden' : ''}`}>
        <>
          {/* Hero Section for Portfolio - Desktop Only */}
          <section className="py-12 px-4 bg-white pt-28">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
                Our Braiding Artistry Portfolio
              </h1>
              <p className="text-lg text-slate mb-8 max-w-2xl mx-auto">
                Explore {totalImages}+ stunning examples of our professional braiding work. 
                From intricate knotless braids to bold box braids, see the artistry and precision 
                that makes Bliss Braids Accra's premier braiding destination.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {categories.map((category) => (
                  <span 
                    key={category}
                    className="bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium capitalize"
                  >
                    {category.replace('-', ' ')}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-slate">
                <div>
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div>Happy Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">3+</div>
                  <div>Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div>Style Variations</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Gallery - Desktop */}
          <PortfolioGallery />

          {/* Testimonials Section - Desktop Only */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-charcoal text-center mb-12">
                What Our Clients Say
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-bg-light p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary text-lg">★★★★★</div>
                  </div>
                  <p className="text-slate mb-4 italic">
                    "The knotless braids were absolutely perfect! The stylist was so skilled and the 
                    studio atmosphere was very comfortable. My braids lasted 8 weeks and looked fresh the whole time."
                  </p>
                  <div className="font-semibold text-charcoal">- Ama K.</div>
                  <div className="text-sm text-slate">Knotless Braids Client</div>
                </div>
                
                <div className="bg-bg-light p-6 rounded-2xl">
                  <div className="flex items-center mb-4">
                    <div className="flex text-primary text-lg">★★★★★</div>
                  </div>
                  <p className="text-slate mb-4 italic">
                    "Best box braids I've ever had! The attention to detail and the quality of hair used 
                    was exceptional. Definitely my go-to braiding salon in Accra now."
                  </p>
                  <div className="font-semibold text-charcoal">- Efua M.</div>
                  <div className="text-sm text-slate">Box Braids Client</div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action - Desktop Only */}
          <section className="py-16 px-4 bg-primary-light">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-charcoal mb-6">
                Ready for Your Perfect Braids?
              </h2>
              <p className="text-lg text-slate mb-8">
                Join hundreds of satisfied clients who trust Bliss Braids for their protective styling needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 
                             transition-colors font-semibold text-lg"
                >
                  Book Your Appointment
                </a>
                <a
                  href="/services"
                  className="bg-white text-primary px-8 py-3 rounded-full hover:bg-gray-50 
                             transition-colors font-semibold text-lg border border-primary"
                >
                  View All Services
                </a>
              </div>
            </div>
          </section>
        </>
      </div>
    </div>
  );
}
