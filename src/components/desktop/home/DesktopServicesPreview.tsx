"use client"

import * as React from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import ExternalLink from "@/components/ui/external-link"
import { services } from "@/data/services"

// TypewriterEffect component for animated text
const TypewriterEffect = ({ text, delay = 0, speed = 0.02 }: { text: string; delay?: number; speed?: number }) => {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-15%" 
  })

  const characters = text.split("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: speed,
        delayChildren: delay
      }
    }
  }

  const characterVariants = {
    hidden: { 
      opacity: 0,
      y: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="inline-block"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={characterVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export function DesktopServicesPreview() {
  // Display all services
  const displayServices = services;

  // Editorial descriptions for magazine-style content
  const editorialDescriptions = {
    'knotless-braids': "This is the gold standard for modern braiding. Unlike the old-school way where we tie a tight knot at the root, we feed the hair in gradually. The result? Zero pain, zero tension bumps, and they lay completely flat against your scalp immediately—no 'stiff robot' phase for the first two days. They look incredibly natural, like the hair is growing out of your scalp, and they are lightweight enough to flip around as soon as you leave the chair.",
    'jumbo-braids': "For the babe who hates sitting in the salon chair for 6 hours. Jumbo braids are big, bold, and beautiful statement pieces that we can install in half the time of standard sizes. Because the sections are larger, they put less tension on individual strands. It's a powerful, chunky aesthetic that looks amazing in a high bun. Perfect if you're busy but still want that long, dramatic braided look without the all-day commitment.",
    'lemonade': "Yes, the Beyoncé style. These are intricate, side-swept cornrows that frame your face beautifully. It's more than just a hairstyle; it's basically art on your head. We can go simple with straight lines or get creative with geometric patterns. It's super low maintenance because everything is neatly tucked away, giving you that 'I wake up flawless' energy every single morning.",
    'cornrow-pony': "This is the ultimate 'snatched' look. We braid everything up toward the crown into a ponytail, which gives you an instant, natural facelift. It's perfect for the Accra heat because it keeps hair off your neck and shoulders. Whether you're hitting the gym or a wedding, you look polished and put-together. Plus, you don't have to worry about styling it every morning—it's just done.",
    'butterfly-locs': "Want the loc look without the 10-year commitment? This is it. We wrap hair loosely around a braid to create a textured, 'distressed' look that mimics real, matured locs. They are supposed to look a bit messy and lived-in, which is part of the charm—they actually look better the longer you wear them. They are surprisingly light and give you that earthy, bohemian vibe instantly.",
    'kinky-twist': "If you love your natural hair texture and want something that matches it perfectly, Kinky Twists are the way to go. We use afro-textured extensions that blend seamlessly with 4C hair. They are super soft to the touch and mimic a natural twist-out. It's one of the best protective styles because it keeps your ends tucked away safely while looking like your own hair, just fuller and longer.",
    'boho-braids': "The bohemian aesthetic meets protective styling in this effortlessly chic look. Boho braids blend structured elegance with free-spirited curly strands that cascade naturally throughout. This versatile protective style offers perfect balance of sophistication and carefree beauty for the modern woman.",
    'island-twist': "Transport yourself to tropical paradise with these luxuriously textured two-strand twists. Island twists embody laid-back elegance with rope-like structure creating beautiful definition and natural movement. This protective style celebrates textured hair with stunning visual appeal.",
    'spiral-braids': "Where artistry meets innovation, spiral braids represent evolution of traditional box braids. The signature curled ends create dynamic silhouette adding drama and sophistication. This masterful technique results in protective styling that's truly a work of art."
  };

  const ServiceFeatureSection = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const ref = React.useRef(null)
    const isInView = useInView(ref, { 
      once: true, 
      margin: "-15%",
      amount: 0.3
    })

    // Calculate starting price (base price for shoulder length, medium size)
    const startingPrice = service.basePrice + (service.lengthVariants?.shoulder?.priceAdd || 0);
    
    // Alternate layout: even index = image left, odd index = image right
    const isImageLeft = index % 2 === 0;
    
    // Smooth easing curve for all animations
    const smoothEase = [0.22, 1, 0.36, 1] as const;
    
    return (
      <motion.section 
        ref={ref}
        className="mb-16 last:mb-0"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ 
          duration: 0.7, 
          delay: 0.1,
          ease: smoothEase
        }}
      >
        <div className={`grid grid-cols-10 gap-16 items-start max-w-4xl mx-auto ${!isImageLeft ? 'grid-flow-col-dense' : ''}`}>
          {/* Image Container - Much smaller size */}
          <motion.div 
            className={`col-span-3 relative overflow-hidden rounded-xl ${!isImageLeft ? 'col-start-8' : ''}`}
            initial={{ opacity: 0, scale: 0.92, x: isImageLeft ? -30 : 30 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.92, x: isImageLeft ? -30 : 30 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: smoothEase
            }}
          >
            {service.image ? (
              <Image
                src={service.image}
                alt={service.name}
                className="aspect-[3/4] w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
                width={280}
                height={373}
                sizes="(max-width: 1024px) 25rvw, 280px"
                priority={index === 0}
              />
            ) : (
              <div className="aspect-[3/4] w-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
            {/* Subtle cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>

          {/* Content Container - Compact editorial content */}
          <motion.div 
            className={`col-span-7 space-y-4 ${!isImageLeft ? 'col-start-1 row-start-1' : ''}`}
            initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isImageLeft ? 40 : -40 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.3,
              ease: smoothEase
            }}
          >
            {/* Service Name with Typewriter Effect */}
            <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              <TypewriterEffect 
                text={service.name} 
                delay={0.5}
                speed={0.04}
              />
            </h3>

            {/* Editorial Description with Typewriter Effect */}
            <div className="text-sm text-white/80 leading-relaxed font-light max-w-xs">
              <TypewriterEffect 
                text={editorialDescriptions[service.id as keyof typeof editorialDescriptions] || service.description}
                delay={0.8}
                speed={0.008}
              />
            </div>

            {/* Pricing and Details */}
            <motion.div 
              className="flex items-center justify-between pt-3 border-t border-white/10"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.5,
                ease: smoothEase
              }}
            >
              <motion.div 
                className="space-y-1"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6,
                  ease: smoothEase
                }}
              >
                <p className="text-lg font-bold" style={{ color: '#F50057' }}>
                  Starting at GH₵{startingPrice}
                </p>
                <p className="text-xs text-white/60 uppercase tracking-wide">
                  {service.baseDuration}+ Hours • Price varies by size & length
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.7,
                  ease: smoothEase
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink
                  href="/booking"
                  label="Book This Style"
                  variant="button"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  };

  const headerRef = React.useRef(null)
  const isHeaderInView = useInView(headerRef, { 
    once: true, 
    margin: "-10%",
    amount: 0.5
  })

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="py-20 px-6 bg-[#020119]">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-white">
            <TypewriterEffect text="Signature Styles" speed={0.05} />
          </h2>
          <motion.div 
            className="text-base max-w-xl mx-auto text-white/75 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: smoothEase }}
          >
            <TypewriterEffect 
              text="Discover our curated collection of trending protective styles." 
              delay={0.7}
              speed={0.02}
            />
          </motion.div>
        </motion.div>
        
        {/* Feature Sections - Vertical Stack */}
        <div className="space-y-0">
          {displayServices.map((service, index) => (
            <ServiceFeatureSection key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
