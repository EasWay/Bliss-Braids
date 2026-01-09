'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, HelpCircle, Car, Bus, MapPin } from 'lucide-react';
import DesktopPrivacyDialog from './DesktopPrivacyDialog';

type DesktopDirectionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DesktopDirectionsDialog({ open, onOpenChange }: DesktopDirectionsDialogProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020119] rounded-2xl shadow-xl w-[90vw] max-w-2xl flex flex-col z-50 max-h-[80vh]">
            {/* Header */}
            <div className="bg-[#020119] px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-white/10">
              <Dialog.Title className="text-xl font-semibold text-white flex items-center gap-3">
                Getting to Our Studio
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Privacy information"
                >
                  <HelpCircle className="w-4 h-4 text-white/80" />
                </button>
              </Dialog.Title>
              <Dialog.Close className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <X className="w-6 h-6 text-white/80" />
              </Dialog.Close>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* By Car */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Car className="w-6 h-6 text-[#F50057]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">By Car</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-white/80 pl-15 leading-relaxed">
                      <li>• Located in Pobiman, Accra</li>
                      <li>• Near Pobiman Junction</li>
                      <li>• Easy access from main roads</li>
                      <li>• Parking available on-site</li>
                    </ul>
                  </div>

                  {/* By Public Transport */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bus className="w-6 h-6 text-[#F50057]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">By Public Transport</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-white/80 pl-15 leading-relaxed">
                      <li>• Accessible via trotro from main bus stops</li>
                      <li>• Uber/Bolt readily available</li>
                      <li>• Near major transport routes</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Nearby Landmarks */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-[#F50057]" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Nearby Landmarks</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-white/80 pl-15 leading-relaxed">
                      <li>• Near Pobiman Junction</li>
                      <li>• Near the Accra Hearts of Oak park</li>
                      <li>• Walking distance from Total Filling Station</li>
                    </ul>
                  </div>

                  {/* Privacy Note */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2">Privacy & Safety</h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      For your privacy and security, we share our exact location via WhatsApp 
                      only after booking confirmation. Our studio is in a safe, residential area 
                      with secure parking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#020119] px-6 py-4 flex-shrink-0 border-t border-white/10">
              <button
                onClick={() => onOpenChange(false)}
                className="w-full bg-[#F50057] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#F50057]/90 transition-colors shadow-lg"
              >
                Got it
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Privacy Dialog */}
      <DesktopPrivacyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
}