# Project Structure

## Directory Organization

```
app/
├── layout.tsx                    # Root layout with metadata
├── page.tsx                      # Homepage (hero, services, portfolio)
├── booking/
│   ├── page.tsx                  # Booking wizard page
│   └── success/
│       └── page.tsx              # Success confirmation page
├── actions/
│   └── submitBooking.ts          # Server Action for email dispatch
└── api/                          # Future: Payment webhooks

components/
├── layout/
│   ├── Header.tsx                # Fixed navigation bar
│   └── Footer.tsx                # Social links footer
├── hero/
│   ├── HeroSection.tsx           # Hero container
│   └── VideoBackground.tsx       # Autoplay video with fallback
├── services/
│   ├── GlobeInteractive.tsx      # Main 3D interactive service globe
│   ├── ServiceGlobe.tsx          # Globe wrapper component
│   ├── ServiceGlobeClient.tsx    # Client-side globe logic
│   ├── ServiceGlobeInner.tsx     # Inner globe rendering
│   └── ServiceHoverReveal.tsx    # Hover interaction component
├── portfolio/
│   ├── PortfolioGallery.tsx     # Masonry grid container
│   ├── FilterPills.tsx           # Category filter buttons
│   └── ImageCard.tsx             # Portfolio image with hover
├── booking/
│   ├── BookingWizard.tsx         # Main wizard container
│   ├── ProgressBar.tsx           # Step progress indicator
│   ├── ServiceSelection.tsx      # Step 1: Choose service
│   ├── SizeSelector.tsx          # Step 2: Choose braid size
│   ├── LengthSelector.tsx        # Step 3: Choose hair length
│   ├── AddOnsStep.tsx            # Step 4: Optional add-ons
│   ├── DatePicker.tsx            # Step 5: Calendar selection
│   ├── TimeSlots.tsx             # Step 6: Time selection
│   ├── ContactForm.tsx           # Step 7: Customer details
│   └── AppointmentSummary.tsx    # Sticky sidebar with price
├── contact/
│   └── LocationSection.tsx       # Map with privacy mode
└── success/
    └── SuccessMessage.tsx        # Success page content

context/
└── BookingContext.tsx            # Global booking state management

types/
└── index.ts                      # TypeScript interfaces

data/
├── services.ts                   # Service definitions with pricing logic
├── addOns.ts                     # Upsell items
└── timeSlots.ts                  # Available appointment times

lib/
├── email-templates.ts            # HTML email generator
└── validation.ts                 # Zod schemas
```

## Key Architectural Patterns

### Component Organization
- **Layout components**: Shared UI elements (header, footer)
- **Feature components**: Domain-specific (booking, portfolio, services)
- **Page components**: Route-level containers in app/ directory

### State Management
- **BookingContext**: Centralized booking flow state with price calculation logic
- **Server Actions**: Form submissions and email dispatch
- **Local state**: Component-specific UI state (filters, modals)

### Data Flow
1. User interacts with booking wizard components
2. Components update BookingContext via provided methods
3. AppointmentSummary reactively displays calculated totals
4. ContactForm triggers Server Action on submission
5. Server Action validates with Zod and sends email via Resend
6. User redirected to success page

### Responsive Strategy
- Desktop: Two-column booking layout (60/40 split)
- Mobile: Stacked layout with sticky bottom summary bar
- Breakpoints: <768px (mobile), 768-1024px (tablet), >1024px (desktop)

### Pricing Calculation
Formula: `(basePrice + lengthPremium) × sizeMultiplier + addOns`
- Implemented in BookingContext.calculateTotal()
- Updates in real-time as user makes selections
