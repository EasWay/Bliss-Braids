import Link from 'next/link';
import { CheckCircle2, Phone, CheckCircle, DollarSign, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Booking Request Received',
  description: 'Your booking request has been received successfully. We will contact you shortly via WhatsApp to confirm your appointment and arrange payment.',
  alternates: {
    canonical: '/booking/success',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Booking Request Received - Bliss Braids',
    description: 'Your booking request has been received successfully',
    url: 'https://blissbraids.com/booking/success',
  },
};

export default function SuccessPage() {
  // Get WhatsApp link from environment variable
  const whatsappNumber = process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233000000000';
  const whatsappMessage = encodeURIComponent(
    "Hi! I just submitted a booking request. Looking forward to hearing from you!"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Animated Checkmark - Responsive sizing */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full mb-4 sm:mb-6 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 animate-scale-in" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2 sm:mb-3">
            Request Received!
          </h1>
          <p className="text-base sm:text-lg text-slate">
            Your booking request has been sent successfully
          </p>
        </div>

        {/* What Happens Next Card - Responsive padding */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 border-2 border-transparent bg-gradient-to-r from-primary/10 via-transparent to-primary/10">
          <h2 className="text-xl sm:text-2xl font-semibold text-charcoal mb-4 sm:mb-6">
            What happens next?
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">
                    1
                  </span>
                  <h3 className="font-semibold text-charcoal">
                    Check your WhatsApp
                  </h3>
                </div>
                <p className="text-slate text-sm">
                  We'll message you shortly to confirm your appointment details
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">
                    2
                  </span>
                  <h3 className="font-semibold text-charcoal">
                    Confirm availability
                  </h3>
                </div>
                <p className="text-slate text-sm">
                  We'll verify your requested time slot and send Mobile Money payment details
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">
                    3
                  </span>
                  <h3 className="font-semibold text-charcoal">
                    Pay deposit
                  </h3>
                </div>
                <p className="text-slate text-sm">
                  Send 50 GHS deposit via Mobile Money to secure your appointment slot
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex-1 pt-1 sm:pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white rounded-full text-sm font-bold">
                    4
                  </span>
                  <h3 className="font-semibold text-charcoal">
                    Get location
                  </h3>
                </div>
                <p className="text-slate text-sm">
                  Receive exact studio location and directions after deposit confirmation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons - Touch-friendly */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] 
                       hover:bg-[#20BA5A] active:bg-[#1DA851] text-white font-semibold px-6 sm:px-8 py-4 
                       rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl 
                       min-h-[44px] sm:min-h-[56px] touch-manipulation"
          >
            <Phone className="w-5 h-5" />
            Chat with us now
          </a>
          
          <Link
            href="/"
            className="w-full sm:w-auto text-primary hover:text-primary/80 active:text-primary/70 
                       font-semibold underline transition-colors duration-200 text-center 
                       min-h-[44px] sm:min-h-[56px] flex items-center justify-center touch-manipulation"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
