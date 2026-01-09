'use client';

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Service } from '@/types';
import { getServiceImages } from '@/data/serviceImages';

interface ServiceDetailsDialogProps {
  children: React.ReactNode; 
  service: Service;
}

export function ServiceDetailsDialog({ children, service }: ServiceDetailsDialogProps) {
  const images = getServiceImages(service.id);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  React.useEffect(() => {
    setSelectedImageIndex(0);
  }, [service.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#020119', border: 'none' }}>
        <div className="p-6">
          
          {/* --- TOP SECTION: Split Layout (Image Left | Details Right) --- */}
          <div className="flex gap-6 mb-6">
            
            {/* LEFT: Media Column */}
            <div className="w-[200px] shrink-0 flex flex-col gap-3">
              {/* Main Preview */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-white/5 shadow-sm">
                {images[selectedImageIndex]?.type === 'video' ? (
                  <video
                    src={images[selectedImageIndex].src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ objectPosition: images[selectedImageIndex].position }}
                  />
                ) : (
                  <Image
                    src={images[selectedImageIndex]?.src || service.image || '/images/hero-fallback.jpg'}
                    alt={service.name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: images[selectedImageIndex]?.position || 'center center' }}
                    priority
                  />
                )}
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {images.slice(0, 4).map((media, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={cn(
                        "relative w-12 h-12 shrink-0 rounded-md overflow-hidden transition-all",
                        selectedImageIndex === idx 
                          ? "ring-2 ring-[#F50057]" 
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      {media.type === 'video' ? (
                        <video
                          src={media.src}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: media.position }}
                          muted
                        />
                      ) : (
                        <Image 
                          src={media.src} 
                          alt="thumb" 
                          fill 
                          className="object-cover"
                          style={{ objectPosition: media.position }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Info Column */}
            <div className="flex-1 min-w-0">
              <DialogHeader className="text-left space-y-2 mb-6">
                <DialogTitle className="text-2xl font-bold text-white leading-tight">
                  {service.name}
                </DialogTitle>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#F50057]">GHS {service.basePrice}</span>
                  <span className="text-xs text-white/50 uppercase tracking-wide font-medium">Starting Price</span>
                </div>
              </DialogHeader>

              {/* Specs List */}
              <div className="space-y-4">
                {service.sizeVariants && (
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Available Sizes</h4>
                    <p className="text-sm text-white/80 font-medium leading-relaxed">
                      {Object.values(service.sizeVariants).map(v => v.label).join(' • ')}
                    </p>
                  </div>
                )}
                
                {service.lengthVariants && (
                  <div>
                    <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Available Lengths</h4>
                    <p className="text-sm text-white/80 font-medium leading-relaxed">
                      {Object.values(service.lengthVariants).map(v => v.label).join(' • ')}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 w-fit px-3 py-2 rounded-lg">
                  <span>⏱️ Duration: ~{service.baseDuration} hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- MIDDLE SECTION: Description --- */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3">About This Style</h4>
            <DialogDescription className="text-sm text-white/70 leading-relaxed">
              {service.description}
            </DialogDescription>
          </div>

          {/* --- BOTTOM SECTION: Action --- */}
          <Link href={`/booking?style=${service.id}`} className="block">
            <Button 
              className="w-full h-12 text-base font-semibold bg-[#F50057] hover:bg-[#F50057]/90 text-white rounded-lg shadow-md shadow-[#F50057]/10 transition-transform active:scale-[0.98]"
            >
              Book This Style Now
            </Button>
          </Link>

        </div>
      </DialogContent>
    </Dialog>
  )
}