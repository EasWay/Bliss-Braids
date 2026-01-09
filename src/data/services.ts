import { Service } from '@/types';

export const services: Service[] = [
  // 1. Knotless Braids (80 | 120 | 150)
  {
    id: 'knotless-braids',
    name: 'Knotless Braids',
    description: 'This is the gold standard for modern braiding. Unlike the old-school way where we tie a tight knot at the root, we feed the hair in gradually. The result? Zero pain, zero tension bumps, and they lay completely flat against your scalp immediately—no "stiff robot" phase for the first two days. They look incredibly natural, like the hair is growing out of your scalp, and they are lightweight enough to flip around as soon as you leave the chair.',
    baseDuration: 5,
    basePrice: 80, // Short Price
    category: 'knotless',
    image: '/images/portfolio/Knotless-1.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.5, timeMultiplier: 1.4, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.7, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short (Shoulder)' },
      midBack: { priceAdd: 20, label: 'Mid-Back' },
      waist: { priceAdd: 40, label: 'Waist' }, // 80 + 40 = 120
      butt: { priceAdd: 70, label: 'Butt/Thigh' } // 80 + 70 = 150
    }
  },
  
  // 2. Jumbo Braids (70 | 80 | 100)
  {
    id: 'jumbo-braids',
    name: 'Jumbo Braids',
    description: 'For the babe who hates sitting in the salon chair for 6 hours. Jumbo braids are big, bold, and beautiful statement pieces that we can install in half the time of standard sizes. Because the sections are larger, they put less tension on individual strands. It\'s a powerful, chunky aesthetic that looks amazing in a high bun. Perfect if you\'re busy but still want that long, dramatic braided look without the all-day commitment.',
    baseDuration: 3,
    basePrice: 70,
    category: 'box-braids',
    image: '/images/jumbo braids.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Standard' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Standard' },
      jumbo: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Standard' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 5, label: 'Mid-Back' },
      waist: { priceAdd: 10, label: 'Waist' }, // 70 + 10 = 80
      butt: { priceAdd: 30, label: 'Butt/Thigh' }      // 70 + 30 = 100
    }
  },
  
  // 3. Spiral Braids (90 | 130 | 150)
  {
    id: 'spiral-braids',
    name: 'Spiral Braids',
    description: 'Beautiful curled ends with a unique spiral pattern.',
    baseDuration: 6,
    basePrice: 90,
    category: 'box-braids',
    image: '/images/configurator/spiral braids.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.4, timeMultiplier: 1.3, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 20, label: 'Mid-Back' },
      waist: { priceAdd: 40, label: 'Waist' }, // 90 + 40 = 130
      butt: { priceAdd: 60, label: 'Butt/Thigh' }      // 90 + 60 = 150
    }
  },
  
  // 4. Boho/Goddess Braids (80 | 120 | 150)
  {
    id: 'boho-braids',
    name: 'Boho Braids',
    description: 'The viral look. Braids with loose curly strands throughout.',
    baseDuration: 6,
    basePrice: 80,
    category: 'knotless',
    image: '/images/Boho braids.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.5, timeMultiplier: 1.4, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.7, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 20, label: 'Mid-Back' },
      waist: { priceAdd: 40, label: 'Waist' }, // 80 + 40 = 120
      butt: { priceAdd: 70, label: 'Butt/Thigh' }      // 80 + 70 = 150
    }
  },
  
  // 5. Island Twist (80 | 120 | 150)
  {
    id: 'island-twist',
    name: 'Island Twist',
    description: 'Two-strand twists with a relaxed, tropical vibe.',
    baseDuration: 5,
    basePrice: 80,
    category: 'twists',
    image: '/images/Island twist.png',
    sizeVariants: {
      small: { priceMultiplier: 1.4, timeMultiplier: 1.3, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 20, label: 'Mid-Back' },
      waist: { priceAdd: 40, label: 'Waist' },
      butt: { priceAdd: 70, label: 'Butt/Thigh' }
    }
  },
  
  // 6. Lemonade / Cornrow Raster (70 | 100 | 120)
  {
    id: 'lemonade',
    name: 'Lemonade / Cornrow Raster',
    description: 'Yes, the Beyoncé style. These are intricate, side-swept cornrows that frame your face beautifully. It\'s more than just a hairstyle; it\'s basically art on your head. We can go simple with straight lines or get creative with geometric patterns. It\'s super low maintenance because everything is neatly tucked away, giving you that "I wake up flawless" energy every single morning.',
    baseDuration: 4,
    basePrice: 70,
    category: 'cornrows',
    image: '/images/Cornrow rasta.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.3, timeMultiplier: 1.3, label: 'Intricate' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Standard' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Simple' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 15, label: 'Mid-Back' },
      waist: { priceAdd: 30, label: 'Waist' }, // 70 + 30 = 100
      butt: { priceAdd: 50, label: 'Butt/Thigh' }      // 70 + 50 = 120
    }
  },
  
  // 7. Cornrow Pony (70 | 100 | 110)
  {
    id: 'cornrow-pony',
    name: 'Cornrow Pony',
    description: 'This is the ultimate "snatched" look. We braid everything up toward the crown into a ponytail, which gives you an instant, natural facelift. It\'s perfect for the Accra heat because it keeps hair off your neck and shoulders. Whether you\'re hitting the gym or a wedding, you look polished and put-together. Plus, you don\'t have to worry about styling it every morning—it\'s just done.',
    baseDuration: 4,
    basePrice: 70,
    category: 'cornrows',
    image: '/images/Cornrow pony.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.2, timeMultiplier: 1.2, label: 'Detailed' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Standard' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Simple' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 15, label: 'Mid-Back' },
      waist: { priceAdd: 30, label: 'Waist' }, // 70 + 30 = 100
      butt: { priceAdd: 40, label: 'Butt/Thigh' }      // 70 + 40 = 110
    }
  },
  
  // 8. Faux / Butterfly Locs (80 | 100 | 120)
  {
    id: 'butterfly-locs',
    name: 'Faux / Butterfly Locs',
    description: 'Want the loc look without the 10-year commitment? This is it. We wrap hair loosely around a braid to create a textured, "distressed" look that mimics real, matured locs. They are supposed to look a bit messy and lived-in, which is part of the charm—they actually look better the longer you wear them. They are surprisingly light and give you that earthy, bohemian vibe instantly.',
    baseDuration: 6,
    basePrice: 80,
    category: 'locs',
    image: '/images/Butterfly lock.jpg',
    sizeVariants: {
      small: { priceMultiplier: 1.3, timeMultiplier: 1.3, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 10, label: 'Mid-Back' },
      waist: { priceAdd: 20, label: 'Waist' }, // 80 + 20 = 100
      butt: { priceAdd: 40, label: 'Butt/Thigh' }      // 80 + 40 = 120
    }
  },
  
  // 9. Kinky Twist (70 | 100 | 120)
  {
    id: 'kinky-twist',
    name: 'Kinky Twist',
    description: 'If you love your natural hair texture and want something that matches it perfectly, Kinky Twists are the way to go. We use afro-textured extensions that blend seamlessly with 4C hair. They are super soft to the touch and mimic a natural twist-out. It\'s one of the best protective styles because it keeps your ends tucked away safely while looking like your own hair, just fuller and longer.',
    baseDuration: 4,
    basePrice: 70,
    category: 'twists',
    image: '/images/configurator/Kinky twist.png',
    sizeVariants: {
      small: { priceMultiplier: 1.3, timeMultiplier: 1.3, label: 'Small' },
      medium: { priceMultiplier: 1.0, timeMultiplier: 1.0, label: 'Medium' },
      jumbo: { priceMultiplier: 0.9, timeMultiplier: 0.8, label: 'Large' }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Short' },
      midBack: { priceAdd: 15, label: 'Mid-Back' },
      waist: { priceAdd: 30, label: 'Waist' }, // 70 + 30 = 100
      butt: { priceAdd: 50, label: 'Butt/Thigh' }      // 70 + 50 = 120
    }
  }
];
