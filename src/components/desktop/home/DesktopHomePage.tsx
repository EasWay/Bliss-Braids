import HeroSection from '@/components/hero/HeroSection';
import DesktopWhyChooseUs from '@/components/desktop/home/DesktopWhyChooseUs';
import { DesktopServicesPreview } from '@/components/desktop/home/DesktopServicesPreview';
import MobileFooter from '@/components/mobile/MobileFooter';
import Image from 'next/image';

export default function DesktopHomePage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: '#020119' }}>
        {/* Hero Section - Desktop Optimized */}
        <div className="w-full">
          <HeroSection />
        </div>
        
        {/* Why Choose Us Section */}
        <div className="w-full">
          <DesktopWhyChooseUs />
        </div>

        {/* Services Preview */}
        <div className="w-full">
          <DesktopServicesPreview />
        </div>

        {/* Portfolio Preview - Desktop Grid */}
        <section className="py-12 px-6 w-full" style={{ backgroundColor: '#020119' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Recent Transformations
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto text-white/80">
            Every braid tells a story. Here are some of our latest masterpieces.
          </p>
          
          <div className="grid grid-cols-4 gap-3 mb-8">
            <div className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src="/images/portfolio/Knotless-1.jpg"
                alt="Knotless Braids"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Knotless Braids</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src="/images/Butterfly lock.jpg"
                alt="Box Braids"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Box Braids</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src="/images/Cornrow rasta4.jpg"
                alt="Cornrows"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Cornrows</span>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-xl overflow-hidden group">
              <Image 
                src="/images/Boho braids.jpg"
                alt="Boho Braids"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="20vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-white text-sm font-semibold">Boho Braids</span>
              </div>
            </div>
          </div>
          
          <a
            href="/portfolio"
            className="inline-block bg-white px-6 py-3 rounded-full hover:bg-gray-50 
                       transition-all duration-300 font-bold text-base border-2
                       shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ color: '#F50057', borderColor: '#F50057' }}
          >
            View Full Portfolio
          </a>
        </div>
      </section>

      {/* Footer */}
      <MobileFooter />
    </div>
  );
}
