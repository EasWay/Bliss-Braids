# Requirements Document

## Introduction

This document outlines the requirements for "Bliss Braids," a modern braiding salon website serving the Ghanaian market. The system operates on a "Request-First" model, enabling customers to build their style (Service + Size + Length), view a price estimate, and submit a booking request. The system does not process payments; instead, it triggers email notifications to the owner to facilitate manual Mobile Money settlement via WhatsApp. The application features device-specific rendering, a live braid configurator, and comprehensive portfolio management.

## Glossary

- **Booking_Request**: The data packet sent when a user finishes the wizard (Status: Pending Deposit)
- **Booking_Wizard**: The multi-step interface for selecting style options and inputting contact info
- **Server_Action**: A backend function (Next.js) that triggers the email dispatch
- **Resend_API**: The third-party service used to send transactional emails to the owner
- **Service_Card**: A clickable UI element representing a braiding service
- **Length_Selector**: Control for choosing hair length (Short, Medium, Long)
- **Size_Selector**: Control for choosing braid size (Small, Medium, Jumbo)
- **Portfolio_Gallery**: The image gallery component displaying braiding work samples with filtering capabilities
- **Appointment_Summary**: The sticky sidebar displaying selected service details and total price during booking
- **Time_Slot**: A selectable button representing an available appointment time
- **Filter_Pill**: A capsule-shaped button used to filter portfolio images by braid style category
- **Braid_Configurator**: The live preview system showing visual representation of selected braid style
- **Device_Detection**: Server-side logic to render mobile or desktop optimized components
- **Image_Preloader**: System for optimizing image loading performance
- **Sidebar_Navigation**: Collapsible navigation system with persistent state

## Functional Requirements

### Requirement 1: Device-Optimized Homepage

**User Story:** As a user, I want the website to automatically detect my device and provide an optimized experience

#### Acceptance Criteria

1. THE Booking_System SHALL detect device type server-side using user agent analysis
2. THE system SHALL render MobileHomePage component for mobile devices
3. THE system SHALL render DesktopHomePage component for desktop devices
4. THE system SHALL display hero section with video background and trust badges
5. THE system SHALL include WhyChooseUsSection with service benefits
6. THE system SHALL display ServicesPreview with horizontal scroll on mobile
7. THE system SHALL show portfolio preview with responsive grid (2 cols mobile, 4 cols desktop)

### Requirement 2: Portfolio Gallery System

**User Story:** As a potential customer, I want to view the salon's portfolio so I can judge the quality of work

#### Acceptance Criteria

1. THE Booking_System SHALL display a section titled "Our Braiding Artistry"
2. THE Portfolio_Gallery SHALL render images in a responsive grid layout (2/3/4 columns)
3. THE Booking_System SHALL provide filters: "All", "Box Braids", "Knotless", "Cornrows", "Twists", "Locs"
4. WHEN a user hovers over an image, THE system SHALL display the Style Name and Price Overlay
5. THE system SHALL support 25+ portfolio images across all categories
6. THE Portfolio_Gallery SHALL implement lazy loading for performance optimization

### Requirement 3: Advanced Service Configuration with Live Preview

**User Story:** As a customer, I want to customize my braid style (Size and Length) and see a live preview so I can get an accurate price estimate

#### Acceptance Criteria

1. THE Booking_Wizard SHALL allow users to select from 9 services (Knotless Braids, Jumbo Braids, Spiral Braids, Boho Braids, Island Twist, Cornrow Raster, Cornrow Pony, Butterfly Locs, Kinky Twist)
2. UPON service selection, THE system SHALL display a Size_Selector (Small, Medium, Jumbo/Large)
3. THE system SHALL display a Length_Selector (Short, Medium, Long)
4. THE system SHALL calculate price dynamically: (Base Price + Length Price) * Size Multiplier + Add-ons
5. THE Booking_System SHALL update the displayed price immediately upon any selection change
6. THE system SHALL display a LiveBraidPreview component showing visual representation of selections
7. THE Braid_Configurator SHALL update preview images based on style, size, length, and add-ons

### Requirement 4: Date & Time Scheduling

**User Story:** As a customer, I want to request a specific time slot for my appointment

#### Acceptance Criteria

1. THE Booking_Wizard SHALL display a calendar using react-day-picker for the current month
2. THE system SHALL display time slots as pill-shaped buttons in a responsive grid
3. THE system SHALL prevent selection of past dates or times with visual indicators
4. Selected dates SHALL be highlighted in Hot Pink (#F50057)
5. THE system SHALL use date-fns for date manipulation and formatting
6. THE DatePicker SHALL support month navigation with previous/next arrows

### Requirement 5: Enhanced Appointment Summary System

**User Story:** As a customer, I want to see a running total of my estimated cost with responsive design

#### Acceptance Criteria

1. THE system SHALL display a sticky Appointment_Summary card on the right (desktop) or integrated in configurator (mobile)
2. THE Summary SHALL list: Service, Size, Length, Add-ons, Selected Date, and Estimated Duration
3. THE Summary SHALL display the Total Price in large bold text with GHS currency
4. THE Summary SHALL show dynamic pricing updates as selections change
5. ON mobile devices, THE system SHALL integrate summary within the BraidConfigurator layout
6. THE Summary SHALL display "Starting Price" vs "Current Price" based on selection completeness
7. THE Summary SHALL show duration estimates and add-on details

### Requirement 6: Contact Information Collection with Validation

**User Story:** As a customer, I need to provide my details so the stylist can contact me to confirm

#### Acceptance Criteria

1. AFTER the Time step, THE Booking_Wizard SHALL display a Contact Form
2. THE form SHALL require the following fields: Full Name, WhatsApp Number (Ghana format validation), and Email Address
3. THE form SHALL include an optional "Special Requests" text area
4. THE final submission button SHALL read: "Request Appointment" (NOT "Pay Now")
5. THE system SHALL implement Zod validation schemas for all form fields
6. THE form SHALL provide real-time validation feedback with error messages
7. THE system SHALL use ValidationContext for form state management

### Requirement 7: Enhanced Email Notification System

**User Story:** As the business owner, I want to receive a professional email with complete booking details so I can efficiently process requests

#### Acceptance Criteria

1. WHEN the "Request Appointment" button is clicked, THE system SHALL trigger a Next.js Server_Action
2. THE Server_Action SHALL validate the form data using comprehensive Zod schemas
3. THE system SHALL send an email via Resend API to the owner's email address
4. THE email body SHALL contain a professional HTML template with: Customer Details, Service Specifications, Add-ons, Pricing Breakdown, and Appointment Details
5. THE email SHALL include a pre-filled WhatsApp CTA button for immediate customer contact
6. THE system SHALL generate both HTML and plain text versions of the email
7. THE email SHALL include booking ID for tracking and professional branding
8. THE system SHALL handle email failures gracefully with user-friendly error messages

### Requirement 8: Success & Manual Settlement Flow

**User Story:** As a customer, I want to know what to do next after I submit my request

#### Acceptance Criteria

1. UPON successful email dispatch, THE system SHALL redirect the user to a Success Page
2. THE Success Page SHALL display a large animated Green Checkmark and the text: "Request Received!"
3. THE page SHALL display clear next steps with numbered instructions and icons
4. THE page SHALL include a "Chat with us now" button that opens a direct WhatsApp link to the owner
5. THE Success Page SHALL include proper SEO metadata and Open Graph tags
6. THE page SHALL provide a "Back to Home" navigation option
7. THE system SHALL use dynamic imports for performance optimization

### Requirement 9: Location & Navigation System

**User Story:** As a customer, I want to know the general location of the studio and navigate the site easily

#### Acceptance Criteria

1. THE system SHALL display a LocationSection with privacy-focused mapping
2. THE map SHALL display a Radius Circle around the Pobiman area (Privacy Mode)
3. THE text SHALL state: "Exact location shared via WhatsApp upon booking confirmation"
4. THE system SHALL implement a collapsible AppSidebar with persistent state
5. THE Footer SHALL contain links to TikTok, Instagram, and WhatsApp
6. THE navigation SHALL support both mobile and desktop layouts
7. THE system SHALL use cookies to persist sidebar state across sessions

### Requirement 10: Advanced UI/UX & Performance

**User Story:** As a user, I want a fast, accessible, and visually appealing experience across all devices

#### Acceptance Criteria

1. THE system SHALL use Hot Pink (#F50057) for primary actions and consistent design system
2. THE system SHALL implement comprehensive responsive design with mobile-first approach
3. THE system SHALL include ErrorBoundary components for graceful error handling
4. THE system SHALL implement Toast notifications for user feedback
5. THE system SHALL use ImagePreloader for optimized loading performance
6. THE system SHALL support accessibility features including keyboard navigation and ARIA labels
7. THE system SHALL implement proper SEO with structured data and metadata
8. THE system SHALL use Tailwind CSS v4 for styling with custom configuration
9. THE system SHALL support dark theme elements with proper contrast ratios

### Requirement 11: Add-Ons and Upselling System

**User Story:** As a customer, I want to add optional extras to my braiding service to customize my look

#### Acceptance Criteria

1. THE Booking_Wizard SHALL include an AddOnsStep after length selection
2. THE system SHALL display available add-ons with prices and descriptions
3. THE system SHALL support multiple add-on selection with checkbox interface
4. THE system SHALL include add-ons in price calculation and email notifications
5. THE LiveBraidPreview SHALL reflect selected add-ons (curls, beads) in the visual preview
6. THE system SHALL allow customers to skip add-ons with a "No thanks, continue" option

### Requirement 12: Advanced Booking Context Management

**User Story:** As a developer, I want robust state management for the booking flow with proper validation

#### Acceptance Criteria

1. THE BookingContext SHALL manage all booking state with TypeScript interfaces
2. THE system SHALL implement step navigation with validation checks
3. THE context SHALL calculate pricing using the formula: (basePrice + lengthAdd) * sizeMultiplier + addOns
4. THE system SHALL calculate duration based on size time multipliers
5. THE context SHALL support resetting selections when navigating backwards
6. THE system SHALL provide real-time price and duration updates
7. THE context SHALL validate required selections before allowing step progression
