# Technology Stack

## Framework & Core

- **Next.js 14** with App Router and TypeScript
- **React 18** with Server Components
- **Node.js** runtime

## Styling & UI

- **Tailwind CSS** with custom configuration
- **Lucide React** for icons
- Custom design system with Hot Pink (#F50057) primary color

## State Management

- **React Context API** for booking flow state
- Server Actions for form submissions

## Data & Validation

- **Zod** for schema validation
- **date-fns** for date manipulation
- Static data files (no database for MVP)

## External Services

- **Resend API** for transactional emails
- **WhatsApp Deep Linking** (wa.me) for customer communication

## Build & Development

- **Turbopack** (Next.js built-in) for fast builds
- **TypeScript** for type safety

## Common Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Environment Variables Required

```
RESEND_API_KEY=your_resend_api_key
OWNER_EMAIL=owner@example.com
NEXT_PUBLIC_OWNER_WHATSAPP=233XXXXXXXXX
```

## Key Dependencies

- next@14
- react@18
- tailwindcss
- typescript
- zod
- date-fns
- resend
- lucide-react
