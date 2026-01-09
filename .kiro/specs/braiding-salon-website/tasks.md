# Implementation Plan

## Overview

This implementation plan breaks down the Bliss Braids booking website into discrete, actionable coding tasks. Each task builds incrementally on previous work, following the "Request-First" workflow with email notifications and WhatsApp settlement.

---

## Tasks

- [ ] 1. Initialize Next.js project and configure design system















  - Create Next.js 14 app with TypeScript and App Router
  - Install dependencies: Tailwind CSS, date-fns, Resend, Zod, Lucide React
  - Configure Tailwind with custom colors (Hot Pink #F50057, charcoal, slate)
  - Set up custom fonts (Plus Jakarta Sans or Inter)
  - Create base layout with metadata for SEO
  - _Requirements: 9.1, 9.2_

- [x] 2. Define TypeScript interfaces and data models





  - Create types/index.ts with Service, AddOn, BookingState, PortfolioImage interfaces
  - Include size/length multiplier logic in Service interface
  - Create data/services.ts with three services (Knotless Braids, Box Braids, Cornrows)
  - Create data/addOns.ts with upsell items (Boho Curls, Beads, Edge Control)
  - Create data/timeSlots.ts with available appointment times
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3. Implement Booking Context with price calculation logic





  - Create context/BookingContext.tsx with BookingContextType interface
  - Implement calculateTotal function: (basePrice + lengthAdd) * sizeMultiplier + addOns
  - Implement calculateDuration function with size time multipliers
  - Add state management for all booking steps (service, size, length, addOns, date, time, contact)
  - Add step navigation (currentStep, goToNextStep, goToPreviousStep)
  - _Requirements: 2.4, 2.5, 4.3_

- [x] 4. Build layout components (Header and Footer)





  - Create components/layout/Header.tsx with fixed navigation
  - Add logo, navigation links (Home, Services, Portfolio, Contact)
  - Add hot pink "Book Now" CTA button
  - Implement responsive hamburger menu for mobile
  - Create components/layout/Footer.tsx with social links (Instagram, TikTok)
  - _Requirements: 8.3, 9.3_

- [x] 5. Create Homepage with Hero section





  - Create app/page.tsx with SEO metadata
  - Create components/hero/VideoBackground.tsx with autoplay loop
  - Add gradient overlay and trust badges ("Verified Stylist • Private Studio • 500+ Happy Clients")
  - Implement fallback to static image if video fails
  - Add responsive height (60vh desktop, 40vh mobile)
  - _Requirements: 1.1, 1.4, 9.1_

- [x] 6. Build Service Grid for homepage





  - Create components/services/ServiceGrid.tsx with responsive grid (4/2/1 columns)
  - Create components/services/ServiceCard.tsx with image, name, description, starting price
  - Use Next.js Image component for optimization
  - Link cards to booking page with service pre-selected
  - _Requirements: 2.1, 2.2_

- [x] 7. Implement Portfolio Gallery with filtering





  - Create components/portfolio/PortfolioGallery.tsx with masonry grid layout
  - Create components/portfolio/FilterPills.tsx for category filtering (All, Box Braids, Knotless, Cornrows)
  - Create components/portfolio/ImageCard.tsx with hover overlay showing style name and price
  - Implement filter state management and image filtering logic
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 8. Create Booking Wizard shell and Progress Bar




  - Create app/booking/page.tsx with two-column layout
  - Create components/booking/BookingWizard.tsx as main container
  - Create components/booking/ProgressBar.tsx showing completion percentage
  - Implement step-based rendering logic
  - Add responsive stacking for mobile
  - _Requirements: 2.1, 4.1, 9.2_

- [x] 9. Build Service Selection step





  - Create components/booking/ServiceSelection.tsx with vertical card list
  - Implement radio button selection with active state styling (border-primary, bg-primary-light)
  - Connect to BookingContext updateService method
  - Show service name, description, and base duration
  - _Requirements: 2.1, 2.2_

- [x] 10. Build Size Selector step





  - Create components/booking/SizeSelector.tsx with segmented control (3 buttons)
  - Display size options: Small (1.5x), Medium (1.0x), Jumbo (0.8x)
  - Show multiplier info on each button
  - Connect to BookingContext updateSize method
  - Update price and duration in real-time
  - _Requirements: 2.2, 2.3, 2.5_

- [x] 11. Build Length Selector step





  - Create components/booking/LengthSelector.tsx with segmented control (4 buttons)
  - Display length options: Shoulder (+0), Mid-Back (+40), Waist (+70), Butt (+100)
  - Show price additions on each button
  - Connect to BookingContext updateLength method
  - Update total price in real-time
  - _Requirements: 2.2, 2.3, 2.5_
- [x] 12. Build Add-Ons upsell step




- [ ] 12. Build Add-Ons upsell step

  - Create components/booking/AddOnsStep.tsx with checkbox grid
  - Display add-on cards with name, price, and description
  - Implement multi-select checkbox logic
  - Add "No thanks, continue" skip button
  - Connect to BookingContext toggleAddOn method
  - _Requirements: 2.5_

- [x] 13. Build Date Picker component





  - Create components/booking/DatePicker.tsx with calendar grid
  - Use date-fns for date manipulation
  - Implement month navigation (previous/next arrows)
  - Disable past dates with visual indicator
  - Apply hot pink styling to selected date
  - Connect to BookingContext updateDate method
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 14. Build Time Slots component





  - Create components/booking/TimeSlots.tsx with pill-shaped buttons
  - Display time slots from data/timeSlots.ts
  - Implement grid layout (4 columns desktop, 3 mobile)
  - Apply hot pink styling to selected time
  - Connect to BookingContext updateTime method
  - _Requirements: 3.1, 3.2, 3.4_

- [x] 15. Build Contact Form (final step)





  - Create components/booking/ContactForm.tsx with form fields
  - Add inputs: Full Name, WhatsApp Number, Email, Special Requests (optional)
  - Implement client-side validation (Ghana WhatsApp format: 233XXXXXXXXX)
  - Add "Request Appointment" submit button
  - Connect to BookingContext updateCustomerInfo method
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 16. Build Appointment Summary sidebar





  - Create components/booking/AppointmentSummary.tsx with sticky positioning
  - Display service details, size, length, add-ons, date, time, duration
  - Show total price in large bold text
  - Add social proof review quote with 5-star rating
  - Implement dynamic CTA button text based on current step
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 17. Implement mobile sticky footer for Appointment Summary





  - Add responsive logic to transform summary into bottom bar on mobile (<768px)
  - Use fixed positioning with z-50
  - Show price on left, CTA button on right
  - Add slide-up drawer for full details (tap price to expand)
  - Include safe area insets for iOS notch
  - _Requirements: 9.2, 9.3_

- [x] 18. Create Zod validation schemas





  - Create lib/validation.ts with BookingSchema
  - Define validation rules for all form fields
  - Add custom error messages
  - Export schema for use in Server Action
  - _Requirements: 5.2, 6.2_

- [x] 19. Build email template generator





  - Create lib/email-templates.ts with generateBookingEmailHTML function
  - Design HTML email with hot pink header and table layout
  - Include customer details, service specs, pricing, and WhatsApp CTA
  - Make email responsive and professional
  - Add clickable WhatsApp link with pre-filled message
  - _Requirements: 6.4_

- [x] 20. Implement Server Action for email dispatch





  - Create app/actions/submitBooking.ts with 'use server' directive
  - Import and initialize Resend with API key from env
  - Validate form data using Zod schema
  - Generate email HTML using template function
  - Send email to owner via Resend API
  - Return success/error response
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [x] 21. Connect Contact Form to Server Action







  - Import submitBooking action in ContactForm component
  - Handle form submission with loading state
  - Display error messages if validation fails
  - Redirect to success page on successful submission
  - Add retry logic for failed email sends
  - _Requirements: 5.4, 6.1_

- [x] 22. Build Success Page





  - Create app/booking/success/page.tsx
  - Add animated green checkmark icon (Lucide CheckCircle2)
  - Display "Request Received!" heading and success message
  - Create numbered steps card with Lucide icons explaining next steps
  - Add WhatsApp CTA button (green #25D366) with pre-filled message
  - Add "Back to Home" link
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 23. Build Location Section with privacy mode





  - Create components/contact/LocationSection.tsx with two-column layout
  - Add contact info with hot pink icons (address, phone, hours)
  - Implement map with radius circle overlay (not exact pin)
  - Add text: "Exact location shared via WhatsApp upon booking confirmation"
  - Include social media icons
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 24. Add environment variables and configuration










  - Create .env.local with RESEND_API_KEY, OWNER_EMAIL, NEXT_PUBLIC_OWNER_WHATSAPP
  - Add .env.example with placeholder values
  - Configure Next.js to load environment variables
  - Document required environment variables in README
  - _Requirements: 6.1, 6.3, 7.4_

- [ ] 25. Implement error handling and validation feedback






  - Add inline error messages for all form fields
  - Disable "Next" buttons until required fields are valid
  - Show toast notifications for system errors
  - Add error boundary for React errors
  - Display user-friendly error messages for email failures
  - _Requirements: 5.2, 6.2_



- [x] 26. Add SEO metadata and structured data




  - Add metadata to app/page.tsx with title, description, keywords
  - Create JSON-LD structured data for LocalBusiness
  - Add Open Graph tags for social sharing
  - Implement dynamic metadata for booking pages
  - _Requirements: 9.1_

- [x] 27. Optimize images and assets





  - Use Next.js Image component throughout
  - Compress hero video to <2MB
  - Add poster image for video instant display
  - Convert portfolio images to WebP format
  - Implement lazy loading for portfolio gallery
  - _Requirements: 1.1, 1.4_

- [x] 28. Implement responsive design and mobile optimizations





  - Test all breakpoints (mobile <768px, tablet 768-1024px, desktop >1024px)
  - Ensure touch targets are min 44x44px on mobile
  - Stack booking wizard columns on mobile
  - Convert portfolio to 2-column grid on mobile
  - Test hamburger menu functionality
  - _Requirements: 9.2, 9.3_

- [x] 29. Add accessibility features






  - Ensure keyboard navigation works for all interactive elements
  - Add ARIA labels to date picker, time slots, and form fields
  - Implement visible focus indicators (ring-2 ring-primary)
  - Test color contrast for WCAG AA compliance
  - Add screen reader announcements for booking state changes
  - _Requirements: 9.1, 9.3_

- [ ] 30. Final integration testing and deployment preparation




  - Test complete booking flow end-to-end
  - Verify email delivery with test bookings
  - Test WhatsApp deep links on mobile devices
  - Verify all environment variables are configured
  - Test on multiple browsers (Chrome, Safari, Firefox)
  - Create deployment documentation
  - _Requirements: All_
