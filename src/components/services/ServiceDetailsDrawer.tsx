'use client';

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

// Updated Interface
interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
  duration?: string;
  features?: string[];
  sizeVariants?: Record<string, { label: string }>;
  lengthVariants?: Record<string, { label: string }>;
}

interface ServiceDetailsDrawerProps {
  children: React.ReactNode; 
  service: ServiceData;
}

export function ServiceDetailsDrawer({ children, service }: ServiceDetailsDrawerProps) {
  const images = service.gallery && service.gallery.length > 0 ? service.gallery : [service.image];
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  React.useEffect(() => {
    setSelectedImage(images[0]);
  }, [service.id, images]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh] border-0" style={{ backgroundColor: '#020119' }}>
        <div className="mx-auto w-full max-w-sm p-5 pb-8">
          
          {/* Handle Bar */}
          <div className="h-1 w-10 rounded-full bg-white/20 mx-auto mb-6" />

          {/* --- TOP SECTION: Split Layout (Image Left | Details Right) --- */}
          <div className="flex gap-5 mb-6">
            
            {/* LEFT: Image Column (Fixed Width) */}
            <div className="w-[110px] shrink-0 flex flex-col gap-2">
              {/* Main Preview */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-white/5 shadow-sm">
                <Image
                  src={selectedImage}
                  alt={service.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Tiny Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {images.slice(0, 3).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={cn(
                        "relative w-7 h-7 shrink-0 rounded-md overflow-hidden transition-all",
                        selectedImage === img 
                          ? "ring-2 ring-primary" 
                          : "opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image src={img} alt="thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Info Column */}
            <div className="flex-1 min-w-0 py-1">
              <DrawerHeader className="p-0 mb-4 text-left space-y-1">
                <DrawerTitle className="text-xl font-bold text-white leading-tight">
                  {service.name}
                </DrawerTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">GHS {service.price}</span>
                  <span className="text-[10px] text-white/50 uppercase tracking-wide font-medium">Starting Price</span>
                </div>
              </DrawerHeader>

              {/* Minimalist Specs List */}
              <div className="space-y-3">
                {service.sizeVariants && (
                  <div>
                    <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Sizes</h4>
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      {Object.values(service.sizeVariants).map(v => v.label).join(' • ')}
                    </p>
                  </div>
                )}
                
                {service.lengthVariants && (
                  <div>
                    <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-1">Lengths</h4>
                    <p className="text-xs text-white/80 font-medium leading-relaxed">
                      {Object.values(service.lengthVariants).map(v => v.label).join(' • ')}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-white/70 bg-white/5 w-fit px-2 py-1 rounded">
                  <span>⏱️ ~{service.duration || '4'} hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- MIDDLE SECTION: Description --- */}
          <div className="mb-8">
            <DrawerDescription className="text-sm text-white/70 leading-relaxed">
              {service.description}
            </DrawerDescription>
          </div>

          {/* --- BOTTOM SECTION: Action --- */}
          <Link href={`/booking?style=${service.id}`} className="block">
            <Button 
              className="w-full h-11 text-sm font-semibold bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md shadow-primary/10 transition-transform active:scale-[0.98]"
            >
              Book Now
            </Button>
          </Link>

        </div>
      </DrawerContent>
    </Drawer>
  )
}