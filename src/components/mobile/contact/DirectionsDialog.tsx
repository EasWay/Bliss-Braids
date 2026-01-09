'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, HelpCircle, Car, Bus, MapPin } from 'lucide-react';
import PrivacyDialog from '@/components/mobile/contact/PrivacyDialog';

type DirectionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DirectionsDialog({ open, onOpenChange }: DirectionsDialogProps) {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020119] rounded-lg shadow-xl w-[80vw] max-w-md flex flex-col z-50 max-h-[50vh]">
            {/* Header */}
            <div className="bg-[#020119] px-3 py-2.5 flex items-center justify-between flex-shrink-0">
              <Dialog.Title className="text-sm font-semibold text-white flex items-center gap-1.5">
                Getting to Our Studio
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="w-4 h-4 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Privacy information"
                >
                  <HelpCircle className="w-2.5 h-2.5 text-white/80" />
                </button>
              </Dialog.Title>
              <Dialog.Close className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-white/80" />
              </Dialog.Close>
            </div>

            {/* Content - Scrollable with auto-fit */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              {/* By Car */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Car className="w-4 h-4 text-[#F50057]" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">By Car</h3>
                </div>
                <ul className="space-y-0.5 text-[11px] text-white/80 pl-10 leading-relaxed">
                  <li>• Located in Pobiman, Accra</li>
                  <li>• Near Pobiman Junction</li>
                  <li>• Easy access from main roads</li>
                  <li>• Parking available on-site</li>
                </ul>
              </div>

              {/* By Public Transport */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bus className="w-4 h-4 text-[#F50057]" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">By Public Transport</h3>
                </div>
                <ul className="space-y-0.5 text-[11px] text-white/80 pl-10 leading-relaxed">
                  <li>• Accessible via trotro from main bus stops</li>
                  <li>• Uber/Bolt readily available</li>
                  <li>• Near major transport routes</li>
                </ul>
              </div>

              {/* Nearby Landmarks */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#F50057]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#F50057]" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">Nearby Landmarks</h3>
                </div>
                <ul className="space-y-0.5 text-[11px] text-white/80 pl-10 leading-relaxed">
                  <li>• Near Pobiman Junction</li>
                  <li>• Near the Accra Hearts of Oak park</li>
                  <li>• Walking distance from Total Filling Station</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#020119] px-3 py-2.5 flex-shrink-0">
              <button
                onClick={() => onOpenChange(false)}
                className="w-full bg-[#F50057] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#F50057]/90 transition-colors shadow-lg"
              >
                Got it
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Privacy Dialog */}
      <PrivacyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
}
