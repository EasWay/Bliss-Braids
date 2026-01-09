"use client"

import * as React from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import ExternalLink from "@/components/ui/external-link"
import { SmartLink } from "@/components/ui/smart-link"
import { services } from "@/data/services"

export function ServicesPreview() {
  const displayServices = services.slice(0, 6);

  const MobileServiceCard = ({ service }: { service: typeof services[0] }) => {
    // Calculate starting price (base price for short length, medium size)
    const startingPrice = service.basePrice + (service.lengthVariants?.short?.priceAdd || 0);
    
    return (
      <a href={`/booking?style=${service.id}`} className="overflow-hidden rounded-xl cursor-pointer block">
        <div className="relative">
          {service.image ? (
            <Image
              src={service.image}
              alt={service.name}
              className="aspect-[3/4] w-full h-auto object-cover"
              width={160}
              height={213}
              sizes="(max-width: 768px) 160px, 200px"
            />
          ) : (
            <div className="aspect-[3/4] w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          {/* Always visible overlay with service name and price */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
            <h3 className="text-xs font-semibold mb-0.5 line-clamp-1">
              {service.name}
            </h3>
            <p className="text-xs font-bold" style={{ color: '#F50057' }}>
              GH₵{startingPrice}
            </p>
          </div>
        </div>
      </a>
    );
  };

  const DesktopServiceCard = ({ service }: { service: typeof services[0] }) => {
    // Calculate starting price (base price for short length, medium size)
    const startingPrice = service.basePrice + (service.lengthVariants?.short?.priceAdd || 0);
    
    return (
      <figure className="shrink-0">
        <div className="overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer">
          <div className="relative">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                className="aspect-[3/4] h-fit w-fit object-cover transition-transform duration-300 group-hover:scale-110"
                width={120}
                height={160}
                sizes="200px"
              />
            ) : (
              <div className="aspect-[3/4] w-[200px] h-[267px] bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm opacity-90 line-clamp-2">
                {service.description}
              </p>
            </div>
          </div>
        </div>
        <figcaption className="pt-3 text-center">
          <h3 className="text-sm lg:text-base font-semibold mb-0.5 text-gray-800">
            {service.name}
          </h3>
          <p className="text-sm font-bold" style={{ color: '#F50057' }}>
            Starting at GH₵{startingPrice}
          </p>
        </figcaption>
      </figure>
    );
  };

  return (
    <section className="pt-4 pb-8 md:py-16 px-4 bg-[#020119] md:bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-1 md:mb-4 text-white md:text-gray-800">
            Our Signature Styles
          </h2>
          <p className="text-xs md:text-lg max-w-2xl mx-auto text-white/80 md:text-gray-600">
            Transparent pricing, no hidden fees. What you see is what you pay.
          </p>
        </div>
        
        {/* Mobile Carousel Layout - Shows 2.5 services per view */}
        <div className="md:hidden px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-none"
          >
            <CarouselContent className="-ml-4">
              {displayServices.map((service) => (
                <CarouselItem key={service.id} className="pl-4 basis-[40%]">
                  <MobileServiceCard service={service} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop ScrollArea Layout */}
        <div className="hidden md:block">
          <ScrollArea className="w-full whitespace-nowrap rounded-lg">
            <div className="flex w-max space-x-6 p-4">
              {displayServices.map((service) => (
                <DesktopServiceCard key={service.id} service={service} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        
        <div className="text-center mt-4 md:mt-8 space-y-3">
          {/* Mobile: View All Services Link */}
          <div className="md:hidden">
            <SmartLink
              href="/services"
              className="inline-block text-sm font-semibold text-white/80 hover:text-white transition-colors underline underline-offset-4"
            >
              View All Services →
            </SmartLink>
          </div>
          
          <ExternalLink
            href="/booking"
            label="Book An Appointment"
            variant="button"
          />
        </div>
      </div>
    </section>
  )
}