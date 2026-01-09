'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X, Shield } from 'lucide-react';

type DesktopPrivacyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DesktopPrivacyDialog({ open, onOpenChange }: DesktopPrivacyDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-[60]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020119] rounded-2xl shadow-xl w-[90vw] max-w-md z-[60]">
          {/* Header */}
          <div className="bg-[#F50057]/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <Dialog.Title className="text-lg font-semibold text-white flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#F50057]" />
              Privacy & Safety
            </Dialog.Title>
            <Dialog.Close className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <X className="w-6 h-6 text-white/80" />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-base text-white/80 leading-relaxed">
              For your privacy and security, we share our exact location via WhatsApp 
              only after booking confirmation. Our studio is in a safe, residential area 
              with secure parking.
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={() => onOpenChange(false)}
              className="w-full bg-[#F50057] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#F50057]/90 transition-colors shadow-lg"
            >
              Understood
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}