# Bliss Braids - Braiding Salon Booking Website

A modern braiding salon booking website built for the Ghanaian market. Features a "Request-First" workflow where customers customize their braiding style and submit booking requests without online payment.

## Features

- Dynamic pricing calculator based on service, size, length, and add-ons
- Multi-step booking wizard with progress tracking
- Portfolio gallery with category filtering
- Email notifications to salon owner via Resend API
- WhatsApp integration for manual payment settlement
- Mobile-first responsive design
- Privacy-focused location sharing

## Technology Stack

- **Next.js 14** with App Router and TypeScript
- **React 18** with Server Components
- **Tailwind CSS** with custom design system
- **Zod** for schema validation
- **Resend API** for transactional emails
- **WhatsApp Deep Linking** for customer communication

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Environment Variables

Before running the application, you need to set up the required environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your actual values:

```bash
# Resend API Key for sending transactional emails
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=your_resend_api_key_here

# Owner's email address to receive booking notifications
OWNER_EMAIL=owner@example.com

# Owner's WhatsApp number (Ghana format: 233XXXXXXXXX)
# This will be used for WhatsApp deep links
NEXT_PUBLIC_OWNER_WHATSAPP=233XXXXXXXXX
```

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `RESEND_API_KEY` | API key from Resend for sending emails | `re_123abc...` |
| `OWNER_EMAIL` | Email address to receive booking notifications | `owner@blissbraids.com` |
| `NEXT_PUBLIC_OWNER_WHATSAPP` | WhatsApp number in Ghana format for customer contact | `233501234567` |

### Installation & Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Optimize images (convert to WebP, resize, compress)
npm run optimize:images
```

## Image & Video Optimization

This project includes automated image optimization to ensure fast loading times and optimal performance.

### Quick Start

1. Install Sharp (if not already installed):
   ```bash
   npm install
   ```

2. Place your images in the appropriate directories:
   - Portfolio images: `public/images/portfolio/`
   - Service images: `public/images/services/`
   - Hero video: `public/videos/hero-braiding.mp4`

3. Run the optimization script:
   ```bash
   npm run optimize:images
   ```

### What Gets Optimized

- **Portfolio Images**: Resized to 800x800, converted to WebP, compressed to ~85% quality
- **Service Images**: Resized to 800x800, converted to WebP, compressed to ~85% quality
- **Hero Fallback**: Optimized for fast loading
- **Video Poster**: Auto-generated from video (requires FFmpeg)

### Manual Optimization

For detailed instructions on manual optimization, video compression, and format conversion, see:
- `public/images/IMAGE_OPTIMIZATION_GUIDE.md`

### Performance Targets

After optimization:
- Hero video: < 2MB
- Portfolio images: < 150KB each
- Service images: < 100KB each
- Total page size: < 3MB
- LCP (Largest Contentful Paint): < 2.5s

### Next.js Image Optimization

The project uses Next.js Image component which automatically:
- Serves WebP/AVIF formats to supported browsers
- Generates responsive image sizes
- Lazy loads images below the fold
- Prevents layout shift (CLS)
- Optimizes images on-demand

## Project Structure

```
app/
├── layout.tsx                    # Root layout
├── page.tsx                      # Homepage
├── booking/                      # Booking wizard pages
├── actions/                      # Server Actions
└── api/                          # API routes

components/
├── layout/                       # Header, Footer
├── hero/                         # Hero section components
├── services/                     # Service grid and cards
├── portfolio/                    # Portfolio gallery
├── booking/                      # Booking wizard components
└── contact/                      # Contact and location

context/
└── BookingContext.tsx            # Global booking state

data/
├── services.ts                   # Service definitions
├── addOns.ts                     # Add-on items
└── timeSlots.ts                  # Available times

lib/
├── email-templates.ts            # Email HTML generator
└── validation.ts                 # Zod schemas
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

Ensure your deployment platform supports:
- Node.js 18+
- Environment variables
- Next.js App Router

## Configuration Notes

- **Email Service**: Uses Resend API for reliable email delivery
- **WhatsApp Integration**: Uses wa.me deep links for seamless mobile experience
- **Payment Flow**: Manual Mobile Money settlement via WhatsApp (no online payments)
- **Location Privacy**: Shows radius circle instead of exact pin for security

## Support

For technical issues or questions about the booking system, contact the development team.
