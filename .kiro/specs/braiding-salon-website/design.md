# Design Document

## Overview

"Bliss Braids" is a modern, high-performance booking application built for the Ghanaian market. It utilizes a **"Request-First" workflow**, where users customize their style through an interactive configurator and submit a booking request without immediate online payment. The system features device-specific rendering, live braid preview, comprehensive portfolio management, and relies on **Next.js Server Actions** to trigger instant email notifications to the owner for manual settlement via WhatsApp/Mobile Money. The application is built with performance optimization, accessibility, and mobile-first design principles.

## Architecture

### Technology Stack

- **Frontend Framework**: Next.js 15 (App Router) with TypeScript and React 19 RC for server-side rendering and SEO optimization
- **Styling**: Tailwind CSS v4 (Alpha) with custom configuration for brand colors and design system
- **UI Components**: Radix UI primitives for accessible components (Dialog, Scroll Area, Separator, etc.)
- **Routing**: Next.js App Router for file-based routing and SEO-friendly URLs
- **State Management**: React Context API for booking flow state and validation context
- **Date Handling**: date-fns for calendar operations and react-day-picker for date selection
- **Email Service**: Resend API for transactional email notifications to owner
- **Validation**: Zod for comprehensive form and data validation
- **Communication**: WhatsApp Deep Linking (wa.me) for manual settlement coordination
- **Build Tool**: Next.js built-in compiler (Turbopack) for fast development and optimized production builds
- **Performance**: Image optimization, lazy loading, dynamic imports, and preloading strategies
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support, and error boundaries
- **Device Detection**: Server-side user agent analysis for device-specific rendering

### Application Structure

```
app/
├── layout.tsx (Root layout with sidebar, metadata, structured data)
├── page.tsx (Device-detected homepage)
├── booking/
│   ├── page.tsx (Booking Wizard with providers)
│   ├── loading.tsx (Loading state)
│   └── success/
│       └── page.tsx (Success Page)
├── portfolio/
│   └── page.tsx (Portfolio gallery)
├── services/
│   └── page.tsx (Services overview)
├── contact/
│   └── page.tsx (Contact information)
├── actions/
│   └── submitBooking.ts (Server Action with validation)
├── globals.css (Tailwind v4 configuration)
└── manifest.ts (PWA manifest)

components/
├── layout/
│   ├── Header.tsx (Navigation with responsive menu)
│   ├── Footer.tsx (Social links and info)
│   └── AppSidebar.tsx (Collapsible navigation)
├── hero/
│   ├── HeroSection.tsx (Video background with fallback)
│   └── VideoBackground.tsx (Optimized video component)
├── home/
│   ├── ServicesPreview.tsx (Service cards preview)
│   └── WhyChooseUsSection.tsx (Benefits section)
├── mobile/
│   ├── home/MobileHomePage.tsx (Mobile-optimized homepage)
│   └── MobileFooter.tsx (Mobile footer)
├── desktop/
│   └── home/DesktopHomePage.tsx (Desktop-optimized homepage)
├── services/
│   ├── ServiceGrid.tsx (Responsive service grid)
│   └── ServiceHoverReveal.tsx (Interactive service cards)
├── portfolio/
│   ├── PortfolioGallery.tsx (Masonry grid with filtering)
│   ├── FilterPills.tsx (Category filters)
│   └── ImageCard.tsx (Portfolio image cards)
├── booking/
│   ├── BookingWizard.tsx (Main wizard container)
│   ├── BraidConfigurator.tsx (Live preview system)
│   ├── LiveBraidPreview.tsx (Visual braid preview)
│   ├── ProgressBar.tsx (Step progress indicator)
│   ├── ServiceSelection.tsx (Service selection step)
│   ├── SizeSelector.tsx (Size selection step)
│   ├── LengthSelector.tsx (Length selection step)
│   ├── AddOnsStep.tsx (Add-ons selection step)
│   ├── DatePicker.tsx (Calendar selection)
│   ├── TimeSlots.tsx (Time slot selection)
│   ├── ContactForm.tsx (Customer information)
│   └── AppointmentSummary.tsx (Price summary)
├── contact/
│   └── LocationSection.tsx (Privacy-focused location)
├── ui/ (Reusable UI components)
│   ├── ErrorBoundary.tsx (Error handling)
│   ├── Toast.tsx (Notifications)
│   ├── sidebar.tsx (Sidebar primitives)
│   ├── drawer.tsx (Mobile drawer)
│   ├── card.tsx (Card components)
│   ├── carousel.tsx (Image carousel)
│   ├── scroll-area.tsx (Scrollable areas)
│   ├── separator.tsx (Visual separators)
│   └── external-link.tsx (External link component)
├── debug/
│   └── ColorPaletteTester.tsx (Development tool)
├── ImagePreloader.tsx (Performance optimization)
└── HeadPreloader.tsx (Critical resource preloading)

context/
├── BookingContext.tsx (Booking state management)
└── ValidationContext.tsx (Form validation state)

types/
└── index.ts (TypeScript definitions)

data/
├── services.ts (9 braiding services with pricing)
├── addOns.ts (Optional extras)
├── portfolio.ts (25+ portfolio images)
├── timeSlots.ts (Available appointment times)
└── serviceImages.ts (Service image mappings)

lib/
├── email-templates.ts (HTML/text email generation)
├── validation.ts (Zod schemas)
└── device-detection.ts (Server-side device detection)

scripts/
└── optimize-images.js (Image optimization utility)

public/
├── images/ (Optimized portfolio and service images)
├── videos/ (Hero background videos)
└── svg/ (Icon assets)
```

## Components and Interfaces

### 1. Design System Configuration

**Tailwind v4 Configuration** (`tailwind.config.js`):

```javascript
{
  theme: {
    extend: {
      colors: {
        primary: '#F50057',      // Hot Pink
        'primary-light': '#FEF2F7', // Light Pink Background
        charcoal: '#111827',     // Dark Text
        slate: '#6B7280',        // Body Text
        'bg-light': '#F9FAFB',   // Page Background
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        }
      },
      borderRadius: {
        '2xl': '16px',
        'full': '9999px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite'
      }
    }
  }
}
```

**CSS Variables** (`globals.css`):
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --sidebar-background: 0 0% 98%;
  --sidebar-foreground: 240 5.3% 26.1%;
  --sidebar-primary: 240 5.9% 10%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 240 4.8% 95.9%;
  --sidebar-accent-foreground: 240 5.9% 10%;
  --sidebar-border: 220 13% 91%;
  --sidebar-ring: 217.2 91.2% 59.8%;
}
```

### 2. Type Definitions

```typescript
// Core type definitions for Bliss Braids booking system
export type BraidSize = 'small' | 'medium' | 'jumbo';
export type HairLength = 'short' | 'medium' | 'long';
export type ServiceCategory = 'box-braids' | 'cornrows' | 'knotless' | 'twists' | 'locs';
export type BookingStatus = 'draft' | 'pending_deposit' | 'confirmed' | 'completed' | 'cancelled';

interface SizeVariant {
  priceMultiplier: number;
  timeMultiplier: number;
  label: string;
}

interface LengthVariant {
  priceAdd: number;
  label: string;
}

// Service Types with Size & Length Multipliers
interface Service {
  id: string;
  name: string;
  description: string;
  baseDuration: number; // Base duration in hours (for medium size, short length)
  basePrice: number; // Base price for short length, medium size
  category: ServiceCategory;
  image?: string; // Optional image URL for the service
  
  // Size variants affect both price and time
  sizeVariants: {
    small: SizeVariant;
    medium: SizeVariant;
    jumbo: SizeVariant;
  };
  
  // Length variants add to base price
  lengthVariants: {
    short: LengthVariant;
    medium: LengthVariant;
    long: LengthVariant;
  };
}

// Add-ons for upselling
interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

// Customer Information
interface CustomerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  specialRequests?: string;
}

// Booking State with Enhanced Logic
interface BookingState {
  selectedService: Service | null;
  selectedSize: BraidSize | null;
  selectedLength: HairLength | null;
  selectedAddOns: AddOn[];
  selectedDate: Date | null;
  selectedTime: string | null;
  customerInfo: CustomerInfo | null;
  depositPaid: boolean;
  status: BookingStatus;
}

// Portfolio Image
interface PortfolioImage {
  id: string;
  url: string;
  styleName: string;
  basePrice: number;
  category: ServiceCategory;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}
```

### 3. Booking Context

The BookingContext manages the entire booking flow state and provides methods to update selections.

```typescript
interface BookingContextType {
  bookingState: BookingState;
  updateService: (service: Service) => void;
  updateSize: (size: 'small' | 'medium' | 'jumbo') => void;
  updateLength: (length: 'shoulder' | 'midBack' | 'waist' | 'butt') => void;
  toggleAddOn: (addOn: AddOn) => void;
  updateDate: (date: Date) => void;
  updateTime: (time: string) => void;
  updateCustomerInfo: (info: BookingState['customerInfo']) => void;
  getTotalPrice: () => number;
  getEstimatedDuration: () => number;
  getDepositAmount: () => number; // 30% of total
  calculatePrice: (service: Service, size: string, length: string, addOns: AddOn[]) => number;
  resetBooking: () => void;
  currentStep: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Price Calculation Logic
const calculateTotal = (
  service: Service,
  size: 'small' | 'medium' | 'jumbo',
  length: 'shoulder' | 'midBack' | 'waist' | 'butt',
  addOns: AddOn[]
): number => {
  // Start with base price
  let total = service.basePrice;
  
  // Add length premium
  total += service.lengthVariants[length].priceAdd;
  
  // Apply size multiplier
  total = total * service.sizeVariants[size].priceMultiplier;
  
  // Add selected add-ons
  addOns.forEach(addOn => {
    total += addOn.price;
  });
  
  return Math.round(total);
};

// Duration Calculation Logic
const calculateDuration = (
  service: Service,
  size: 'small' | 'medium' | 'jumbo'
): number => {
  return Math.round(service.baseDuration * service.sizeVariants[size].timeMultiplier);
};
```

### 4. Header Component

- Fixed position navigation bar
- Logo on the left (hot pink diamond icon + "Salon Name")
- Navigation links: Home, Services, Portfolio, About, Contact
- Hot pink "Book Now" CTA button on the right
- Responsive hamburger menu for mobile

### 5. Hero Section Component

**Props**: None (static content)

**Structure**:
- Full-width container with **background video loop** (close-up of braiding process, 10-15 seconds)
- Video should be muted, autoplay, loop, and optimized for web (WebM/MP4)
- Gradient overlay (linear-gradient from rgba(0,0,0,0.7) at bottom to transparent)
- Centered or bottom-left text: "Our Braiding Services"
- **Trust Badge Overlay**: "Verified Stylist • Private Studio • 500+ Happy Clients"
- Minimum height: 60vh on desktop, 40vh on mobile
- Fallback to static image if video fails to load

### 6. Service Grid Component

**Props**: None (uses static service data)

**Structure**:
- Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile
- Each ServiceCard contains:
  - Square image (aspect-ratio: 1/1)
  - White background bottom section
  - Service name (bold, charcoal)
  - Description (slate grey, smaller)
  - "Starting from GHS [price]" (primary pink)

### 7. Portfolio Gallery Component

**State**:
- `activeFilter`: string (default: 'all')
- `images`: PortfolioImage[]

**Structure**:
- Header with title "Our Braiding Artistry"
- FilterPills component for category selection
- Masonry grid using CSS Grid with `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`
- ImageCard components with hover effects

**ImageCard Hover Effect**:
```css
.image-card:hover::after {
  content: '';
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
}
```

### 8. Device-Specific Homepage Components

**MobileHomePage**:
- Dark theme background (#020119)
- Compact hero section with video background
- Horizontal scrolling services preview
- 2x2 portfolio grid with overlay text
- Social proof section with stats
- Optimized for touch interactions

**DesktopHomePage**:
- Same dark theme with expanded layouts
- Full-width hero with larger video
- 3-column social proof section
- 4-column portfolio grid with hover effects
- Enhanced typography and spacing

### 9. Booking Wizard System

**BookingWizard Component**:
- **Progress Bar**: Visual indicator at top showing steps (0% → 100%)
- Conditional rendering: ServiceSelection first, then BraidConfigurator
- Error boundaries for each step with graceful error handling
- Screen reader announcements for booking state changes
- ValidationProvider wrapper for form validation

**BraidConfigurator Component**:
- Two-column layout on desktop (Live Preview + Form Steps)
- Left column: LiveBraidPreview with sticky positioning
- Right column: Current step component with navigation
- Price display below preview with dynamic updates
- Step navigation with validation checks

**LiveBraidPreview Component**:
- Visual representation of selected braid style
- Dynamic image updates based on service, size, length
- Add-on visualization (curls, beads) overlay
- Fallback images for incomplete selections
- Responsive image sizing and aspect ratios

**ServiceSelection**:
- Grid layout of 9 service cards
- Each card displays:
  - Service image with Next.js Image optimization
  - Service name and description
  - Starting price with "From GHS X" format
  - Click handler to update context and advance step
  - Active state: `border-primary bg-primary-light`

**SizeSelector** (NEW):
- Segmented control (3 buttons: Small, Medium, Jumbo)
- Active button: `bg-primary text-white`
- Inactive buttons: `bg-gray-100 text-charcoal`
- Display multiplier info: "Small (1.5x price, 1.5x time)"
- Updates price and duration in real-time

**LengthSelector**:
- Segmented control (4 buttons: Shoulder, Mid-Back, Waist, Butt)
- Active button: `bg-primary text-white`
- Inactive buttons: `bg-gray-100 text-charcoal`
- Display price additions: "Mid-Back (+40 GHS)"
- Updates price in real-time via context

**AddOnsStep** (NEW - Upsell):
- Grid of optional add-on cards
- Examples: "Boho Curls (+20 GHS)", "Beads (+10 GHS)"
- Checkbox-style selection (multiple allowed)
- Skip button: "No thanks, continue"

**DatePicker**:
- Month/year header with navigation arrows
- 7-column grid (Su-Sa)
- Date cells:
  - Default: `text-charcoal hover:bg-gray-100`
  - Selected: `bg-primary text-white rounded-full`
  - Disabled (past): `text-gray-300 cursor-not-allowed`

**TimeSlots**:
- Grid layout: 4 columns on desktop, 3 on mobile
- Pill-shaped buttons with time labels
- Active state: `bg-primary text-white`
- Disabled state: `bg-gray-100 text-gray-400 line-through`

**ContactForm** (NEW - Final Step):
- Form fields:
  - Full Name (required, text input)
  - WhatsApp Number (required, numeric validation, Ghana format)
  - Email Address (required, email validation)
  - Special Requests (optional, textarea)
- Submit button: "Request Appointment" (NOT "Pay Now")
- On mobile: Button fixed to bottom viewport (sticky footer)

**AppointmentSummary**:
- White card with shadow-lg
- Sticky positioning: `sticky top-24`
- Sections:
  - "Your Appointment" header
  - Service details list (Service, Size, Length, Add-ons)
  - Estimated Duration display
  - **Social Proof**: Single review quote below price
    - Example: "Best knotless in Spintex! - Ama S." with 5-star rating display
  - Divider line
  - Total price (large, bold, primary color)
  - Full-width CTA button (changes per step):
    - Steps 1-4: "Next: [Step Name]"
    - Final step: "Request Appointment"

### 9. Location Section Component

**Layout**:
- Two-column grid (50/50 split)
- Left: Contact information with icons
- Right: Map container

**Contact Info Structure**:
- Each item has hot pink icon + text
- Icon size: 24x24px
- Text: charcoal color, 16px
- Social icons: circular, 40x40px, hover effect

**Map Container** (Privacy Mode):
- Rounded-3xl corners
- Display **Radius Circle** (not exact pin) around Spintex/East Legon area
- Overlay text: "Exact location shared via WhatsApp upon booking confirmation"
- Use semi-transparent circle overlay for privacy

## Data Models

### Current Services Implementation (9 Services)

```typescript
const services: Service[] = [
  {
    id: 'knotless-braids',
    name: 'Knotless Braids',
    description: 'Tension-free, lightweight braiding technique. The Accra favorite.',
    baseDuration: 4, // hours for medium size, shoulder length
    basePrice: 150, // GHS for shoulder length, medium size
    category: 'knotless',
    sizeVariants: {
      small: { 
        priceMultiplier: 1.5, 
        timeMultiplier: 1.5,
        label: 'Small (High Density)'
      },
      medium: { 
        priceMultiplier: 1.0, 
        timeMultiplier: 1.0,
        label: 'Medium (Standard)'
      },
      jumbo: { 
        priceMultiplier: 0.8, 
        timeMultiplier: 0.6,
        label: 'Jumbo (Quick)'
      }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Shoulder Length' },
      midBack: { priceAdd: 40, label: 'Mid-Back' },
      waist: { priceAdd: 70, label: 'Waist Length' },
      butt: { priceAdd: 100, label: 'Butt Length' }
    }
  },
  {
    id: 'box-braids',
    name: 'Box Braids',
    description: 'Classic and versatile, perfect for any occasion',
    baseDuration: 4,
    basePrice: 120,
    category: 'box-braids',
    sizeVariants: {
      small: { 
        priceMultiplier: 1.5, 
        timeMultiplier: 1.5,
        label: 'Small (High Density)'
      },
      medium: { 
        priceMultiplier: 1.0, 
        timeMultiplier: 1.0,
        label: 'Medium (Standard)'
      },
      jumbo: { 
        priceMultiplier: 0.8, 
        timeMultiplier: 0.6,
        label: 'Jumbo (Quick)'
      }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Shoulder Length' },
      midBack: { priceAdd: 40, label: 'Mid-Back' },
      waist: { priceAdd: 70, label: 'Waist Length' },
      butt: { priceAdd: 100, label: 'Butt Length' }
    }
  },
  {
    id: 'cornrows',
    name: 'Cornrows',
    description: 'Sleek and close to the scalp, a timeless style',
    baseDuration: 2,
    basePrice: 80,
    category: 'cornrows',
    sizeVariants: {
      small: { 
        priceMultiplier: 1.5, 
        timeMultiplier: 1.5,
        label: 'Small (High Density)'
      },
      medium: { 
        priceMultiplier: 1.0, 
        timeMultiplier: 1.0,
        label: 'Medium (Standard)'
      },
      jumbo: { 
        priceMultiplier: 0.8, 
        timeMultiplier: 0.6,
        label: 'Jumbo (Quick)'
      }
    },
    lengthVariants: {
      shoulder: { priceAdd: 0, label: 'Shoulder Length' },
      midBack: { priceAdd: 30, label: 'Mid-Back' },
      waist: { priceAdd: 50, label: 'Waist Length' },
      butt: { priceAdd: 70, label: 'Butt Length' }
    }
  }
];
```

**Complete Service Catalog**:
1. **Knotless Braids** (80-150 GHS) - Pain-free, natural looking braids
2. **Jumbo Braids** (70-100 GHS) - Thick, bold box braids, quick install
3. **Spiral Braids** (90-150 GHS) - Beautiful curled ends with spiral pattern
4. **Boho Braids** (80-150 GHS) - Viral look with loose curly strands
5. **Island Twist** (80-150 GHS) - Two-strand twists with tropical vibe
6. **Cornrow Raster** (70-120 GHS) - Side-swept cornrows, intricate patterns
7. **Cornrow Pony** (70-110 GHS) - Cornrows feeding into ponytail
8. **Butterfly Locs** (80-120 GHS) - Distressed or smooth locs wrapping
9. **Kinky Twist** (70-120 GHS) - Natural looking twists with afro-textured hair

**Pricing Formula**: `(basePrice + lengthAdd) * sizeMultiplier + addOns`

### Portfolio Data (25+ Images)

```typescript
const portfolioImages: PortfolioImage[] = [
  // Organized by categories: knotless, box-braids, locs, cornrows, twists
  // Each image includes: id, url, styleName, basePrice, category, aspectRatio
  // Supports responsive masonry grid layout
  // Optimized for lazy loading and performance
];
```

### Add-Ons Data

```typescript
const addOns: AddOn[] = [
  {
    id: 'boho-curls',
    name: 'Boho Curls',
    price: 20,
    description: 'Add curly ends for a bohemian look'
  },
  {
    id: 'beads',
    name: 'Decorative Beads',
    price: 10,
    description: 'Colorful beads woven into braids'
  },
  {
    id: 'edge-control',
    name: 'Premium Edge Control',
    price: 15,
    description: 'Long-lasting edge styling'
  }
];
```

### Time Slots Data

```typescript
const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];
```

### 10. Email Notification System (Server-Side)

**Technology**: Resend API for transactional emails

**Server Action** (`app/actions/submitBooking.ts`):

```typescript
'use server'

import { Resend } from 'resend';
import { z } from 'zod';

// Validation Schema
const BookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  whatsappNumber: z.string().regex(/^233\d{9}$/, 'Invalid Ghana WhatsApp number'),
  email: z.string().email('Invalid email address'),
  serviceName: z.string(),
  size: z.enum(['small', 'medium', 'jumbo']),
  sizeLabel: z.string(),
  length: z.enum(['shoulder', 'midBack', 'waist', 'butt']),
  lengthLabel: z.string(),
  addOns: z.array(z.object({
    name: z.string(),
    price: z.number()
  })),
  date: z.string(),
  time: z.string(),
  totalPrice: z.number(),
  estimatedDuration: z.number(),
  specialRequests: z.string().optional()
});

export async function submitBooking(formData: z.infer<typeof BookingSchema>) {
  try {
    // Validate input
    const validated = BookingSchema.parse(formData);
    
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Generate email HTML
    const emailHTML = generateBookingEmailHTML(validated);
    
    // Send email to owner
    const { data, error } = await resend.emails.send({
      from: 'Bliss Braids Bookings <bookings@blissbraids.com>',
      to: process.env.OWNER_EMAIL!,
      subject: `New Booking Request from ${validated.customerName}`,
      html: emailHTML
    });
    
    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: 'Failed to send booking request' };
    }
    
    return { success: true, bookingId: data?.id };
    
  } catch (error) {
    console.error('Booking submission error:', error);
    return { success: false, error: 'Invalid booking data' };
  }
}

// Email HTML Generator
function generateBookingEmailHTML(data: z.infer<typeof BookingSchema>): string {
  const addOnsHTML = data.addOns.length > 0 
    ? data.addOns.map(addon => `<li>${addon.name} (+${addon.price} GHS)</li>`).join('')
    : '<li>None</li>';
    
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #F50057; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; width: 40%; }
        .price { font-size: 24px; color: #F50057; font-weight: bold; }
        .cta { background: #25D366; color: white; padding: 15px 30px; text-decoration: none; 
               display: inline-block; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bliss Braids - New Booking Request</h1>
        </div>
        <div class="content">
          <h2>Customer Details</h2>
          <table>
            <tr>
              <td class="label">Name:</td>
              <td>${data.customerName}</td>
            </tr>
            <tr>
              <td class="label">WhatsApp:</td>
              <td><a href="https://wa.me/${data.whatsappNumber}">${data.whatsappNumber}</a></td>
            </tr>
            <tr>
              <td class="label">Email:</td>
              <td>${data.email}</td>
            </tr>
          </table>
          
          <h2>Service Details</h2>
          <table>
            <tr>
              <td class="label">Style:</td>
              <td>${data.serviceName}</td>
            </tr>
            <tr>
              <td class="label">Size:</td>
              <td>${data.sizeLabel}</td>
            </tr>
            <tr>
              <td class="label">Length:</td>
              <td>${data.lengthLabel}</td>
            </tr>
            <tr>
              <td class="label">Add-ons:</td>
              <td><ul style="margin: 0; padding-left: 20px;">${addOnsHTML}</ul></td>
            </tr>
            <tr>
              <td class="label">Date & Time:</td>
              <td>${data.date} at ${data.time}</td>
            </tr>
            <tr>
              <td class="label">Duration:</td>
              <td>${data.estimatedDuration} hours</td>
            </tr>
            ${data.specialRequests ? `
            <tr>
              <td class="label">Special Requests:</td>
              <td>${data.specialRequests}</td>
            </tr>
            ` : ''}
          </table>
          
          <h2>Pricing</h2>
          <p class="price">Total: ${data.totalPrice} GHS</p>
          <p style="color: #666; font-size: 14px;">Deposit Required: 50 GHS</p>
          
          <center>
            <a href="https://wa.me/${data.whatsappNumber}?text=Hi%20${encodeURIComponent(data.customerName)}!%20Your%20booking%20request%20for%20${encodeURIComponent(data.serviceName)}%20has%20been%20received.%20Please%20send%2050%20GHS%20deposit%20to%20confirm." 
               class="cta">
              Contact via WhatsApp
            </a>
          </center>
        </div>
      </div>
    </body>
    </html>
  `;
}
```

**Email Template Features**:
- Hot pink header
- Clean table layout for all booking details
- Clickable WhatsApp number link
- Pre-filled WhatsApp CTA button with deposit message
- Responsive HTML design
- Professional styling

### 11. Success Page Component

**Route**: `/booking/success`

**Structure**:
- Large animated green checkmark icon (Lucide `CheckCircle2` with fade-in animation)
- Heading: "Request Received!" (text-3xl font-bold)
- Subheading: "Your booking request has been sent successfully" (text-slate-600)
- Info card with gradient border:
  - Title: "What happens next?" (font-semibold)
  - Numbered steps with Lucide icons (Phone, CheckCircle, DollarSign, MapPin):
    1. "Check your WhatsApp for a message from us"
    2. "We'll confirm availability and send Mobile Money details"
    3. "Pay 50 GHS deposit to secure your slot"
    4. "Receive exact studio location"
- Primary CTA: "Chat with us now" button (bg-[#25D366] - WhatsApp green)
  - Opens WhatsApp with pre-filled message
- Secondary link: "Back to Home" (text-primary underline)

**WhatsApp Link Format**:
```typescript
const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP}?text=${encodeURIComponent(
  `Hi! I just submitted a booking request for ${serviceName} on ${date}. Looking forward to hearing from you!`
)}`;
```

**Mobile Optimization**:
- Full-screen centered layout
- Large touch-friendly buttons (min 56px height)
- Confetti animation on page load (optional, using canvas-confetti)

## Error Handling

### User Input Validation

1. **Service Selection**: Required before showing size selector
2. **Size Selection**: Required before showing length selector
3. **Length Selection**: Required before showing add-ons
4. **Date Selection**: Must be present or future date
5. **Time Selection**: Required before contact form
6. **Contact Form**:
   - Name: Minimum 2 characters
   - WhatsApp: Ghana format (233XXXXXXXXX)
   - Email: Valid email format

### Error States

- Display inline error messages in red below invalid fields
- Disable "Next" button until all required fields are valid
- Show toast notifications for system errors
- Server-side validation using Zod before email dispatch
- If email fails: Show error message with retry option

### Unavailable Dates/Times

- For MVP: Disable past dates, show all times as available
- Visual indicator: greyed out with `cursor-not-allowed`
- Future enhancement: Real-time availability check

## Testing Strategy

### Unit Tests

1. **BookingContext**: Test state updates and price calculations
2. **DatePicker**: Test date selection and disabled date logic
3. **LengthSelector**: Test price updates based on length
4. **FilterPills**: Test portfolio filtering logic

### Component Tests

1. **ServiceSelection**: Test card selection and active states
2. **AppointmentSummary**: Test real-time updates from context
3. **TimeSlots**: Test selection and disabled states
4. **PortfolioGallery**: Test image filtering and hover effects

### Integration Tests

1. Complete booking flow from service selection to summary
2. Portfolio filtering across all categories
3. Responsive layout behavior at different breakpoints
4. Navigation between sections

### Visual Regression Tests

1. Screenshot comparison for design system consistency
2. Hover state verification
3. Mobile vs desktop layout verification

## SEO & Local Search Optimization

### Meta Tags & Structured Data

**Homepage** (`app/page.tsx`):
```typescript
export const metadata = {
  title: 'Bliss Braids - Professional Braiding Salon in Accra | Knotless, Box Braids',
  description: 'Expert braiding services in Spintex, Accra. Specializing in knotless braids, box braids, and cornrows. Book your appointment today!',
  keywords: 'braiding salon Accra, knotless braids Ghana, box braids Spintex, cornrows Accra',
  openGraph: {
    title: 'Bliss Braids - Accra\'s Premier Braiding Studio',
    description: 'Professional braiding services in a private studio',
    images: ['/og-image.jpg']
  }
}
```

**Structured Data** (JSON-LD):
- LocalBusiness schema with:
  - Name: "Bliss Braids"
  - Address: Spintex Area, Accra (approximate)
  - Service offerings
  - Operating hours
  - Contact information

### Server-Side Rendering Benefits

- All content (portfolio, services, pricing) rendered on server
- Google can crawl and index all text immediately
- Fast First Contentful Paint (FCP)
- Improved Core Web Vitals scores

## Performance Optimizations

### Image and Asset Optimization
1. **Next.js Image Component**: WebP format, lazy loading, responsive sizing
2. **Image Preloader**: Critical resource preloading for above-the-fold content
3. **Portfolio Lazy Loading**: Intersection Observer for portfolio gallery
4. **Video Optimization**: Compressed hero video <2MB with poster fallback
5. **Image Optimization Script**: Automated WebP conversion and compression

### Code Splitting and Loading
1. **Dynamic Imports**: Lazy load booking wizard and heavy components
2. **Route-based Splitting**: Automatic code splitting by Next.js App Router
3. **Component Memoization**: React.memo for ServiceCard, ImageCard, and portfolio components
4. **Loading States**: Skeleton screens and loading indicators
5. **Error Boundaries**: Graceful error handling with fallback UI

### State Management Optimization
1. **Context Optimization**: Minimal re-renders with proper dependency arrays
2. **Debounced Filtering**: Portfolio filter changes debounced for performance
3. **Validation Caching**: Zod schema validation with memoization
4. **Device Detection**: Server-side detection to avoid client-side hydration mismatches

## Accessibility & User Experience

### Accessibility Features
1. **Keyboard Navigation**: Full keyboard support for all interactive elements
2. **ARIA Labels**: Comprehensive labeling for date picker, time slots, form fields
3. **Focus Management**: Visible focus indicators with proper focus trapping
4. **Color Contrast**: WCAG AA compliance with 4.5:1 contrast ratios
5. **Screen Reader Support**: Live regions for booking state announcements
6. **Error Handling**: Clear error messages with proper ARIA attributes

### User Experience Enhancements
1. **Error Boundaries**: Graceful error handling with recovery options
2. **Toast Notifications**: Non-intrusive feedback for user actions
3. **Loading States**: Skeleton screens and progress indicators
4. **Responsive Design**: Mobile-first approach with touch-friendly interactions
5. **Progressive Enhancement**: Core functionality works without JavaScript
6. **Offline Considerations**: Service worker for basic offline functionality

## Responsive Breakpoints

- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile Adaptations

- Stack booking wizard columns vertically
- 2-column portfolio grid
- Hamburger menu navigation
- Larger touch targets (min 44x44px)
- **Sticky Mobile Footer**: On mobile (<768px), the appointment summary transforms into a sticky bottom bar:
  - Fixed position: `fixed bottom-0 left-0 right-0 z-50`
  - Shows: Total price + "Next" button side-by-side
  - Background: White with shadow-2xl
  - Padding: Safe area insets for iOS notch
  - Layout: Price on left, button on right with arrow icon
- Full appointment details accessible via slide-up drawer (tap price to expand)
