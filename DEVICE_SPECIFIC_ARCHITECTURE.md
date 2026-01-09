# Device-Specific Architecture

## Overview

The application now uses a complete device-specific architecture where mobile and desktop users get entirely separate page implementations, not just responsive components. This provides optimal performance and user experience for each platform.

## Architecture Structure

```
src/
├── app/
│   ├── services/
│   │   └── page.tsx                # Device-agnostic entry point
│   └── portfolio/
│       └── page.tsx                # Device-agnostic entry point
│
├── components/
│   ├── mobile/
│   │   ├── services/
│   │   │   └── MobileServicesPage.tsx
│   │   ├── portfolio/
│   │   │   └── MobilePortfolioPage.tsx
│   │   ├── MobileHeader.tsx
│   │   └── MobileFooter.tsx
│   │
│   ├── desktop/
│   │   ├── services/
│   │   │   └── DesktopServicesPage.tsx
│   │   └── portfolio/
│   │       └── DesktopPortfolioPage.tsx
│   │
│   ├── services/
│   │   └── ServicesPageWrapper.tsx  # Client-side device router
│   ├── portfolio/
│   │   └── PortfolioPageWrapper.tsx # Client-side device router
│   │
│   └── providers/
│       └── DeviceDetectionProvider.tsx
│
├── middleware.ts                    # Security & caching headers
└── lib/
    ├── device-detection.ts          # Client-side detection
    └── device-detection.server.ts   # Server-side detection
```

## How It Works

### 1. Device Detection

**Client-Side Detection (`src/lib/device-detection.ts`)**
- Provides `isMobileDevice()` function for client components
- Checks User-Agent string in browser
- Used by page wrappers and DeviceDetectionProvider

**Server-Side Detection (`src/lib/device-detection.server.ts`)**
- Provides `getDeviceType()` async function for Server Components
- Uses Next.js `headers()` to read User-Agent
- Used by homepage for initial server-side rendering

### 2. Page Wrappers

Each device-specific page uses a wrapper component that:
1. Detects device type on client-side
2. Shows loading state during detection
3. Renders appropriate layout (Mobile or Desktop)
4. Includes device-specific header/footer

**Example: ServicesPageWrapper**
```typescript
// Detects device and renders:
// Mobile: MobileHeader + MobileServicesPage + MobileFooter
// Desktop: Header + DesktopServicesPage + Footer
```

### 3. User Experience

**Device Detection Toast**
- Sonner toast shows "Optimizing for [device] experience..."
- Appears for 2 seconds on page load
- Provides feedback during device detection

**Separate Layouts**
- Mobile: `MobileHeader` + `MobileFooter` (optimized for touch)
- Desktop: `Header` + `Footer` (optimized for mouse/keyboard)

**Loading States**
- Brief loading indicator during client-side device detection
- Prevents layout shift between mobile/desktop renders

### 4. Page Implementations

**Mobile Pages**
- 2-column grid layout
- Touch-optimized interactions
- Compact card designs
- Bottom-fixed CTAs
- Drawer-based detail views

**Desktop Pages**
- 3-column grid layout
- Hover interactions
- Larger card designs
- Inline CTAs
- Modal-based detail views

## Benefits

1. **Performance**: Each device loads only the code it needs
2. **Optimization**: Separate implementations optimized for each platform
3. **Maintainability**: Clear separation of mobile/desktop concerns
4. **User Experience**: Platform-specific interactions and layouts
5. **SEO**: Same URLs for both devices (no m.domain.com)

## Adding New Device-Specific Pages

To add a new page with device-specific implementations:

1. Create component implementations:
   ```
   src/components/mobile/your-page/MobileYourPage.tsx
   src/components/desktop/your-page/DesktopYourPage.tsx
   ```

2. Create page wrapper:
   ```typescript
   // src/components/your-page/YourPageWrapper.tsx
   'use client';
   
   import { useEffect, useState } from 'react';
   import { isMobileDevice } from '@/lib/device-detection';
   import MobileHeader from '@/components/mobile/MobileHeader';
   import MobileFooter from '@/components/mobile/MobileFooter';
   import Header from '@/components/layout/Header';
   import Footer from '@/components/layout/Footer';
   import MobileYourPage from '@/components/mobile/your-page/MobileYourPage';
   import DesktopYourPage from '@/components/desktop/your-page/DesktopYourPage';
   
   export default function YourPageWrapper() {
     const [deviceType, setDeviceType] = useState<'mobile' | 'desktop' | null>(null);
   
     useEffect(() => {
       setDeviceType(isMobileDevice() ? 'mobile' : 'desktop');
     }, []);
   
     if (!deviceType) {
       return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
           <div className="animate-pulse text-gray-500">Loading...</div>
         </div>
       );
     }
   
     if (deviceType === 'mobile') {
       return (
         <>
           <MobileHeader />
           <MobileYourPage />
           <MobileFooter />
         </>
       );
     }
   
     return (
       <>
         <Header />
         <DesktopYourPage />
         <Footer />
       </>
     );
   }
   ```

3. Create page entry point:
   ```typescript
   // src/app/your-page/page.tsx
   import YourPageWrapper from '@/components/your-page/YourPageWrapper';
   
   export default function YourPage() {
     return <YourPageWrapper />;
   }
   ```

## Testing

**Test Mobile View:**
1. Open DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select a mobile device
4. Refresh page
5. Should see mobile-optimized layout

**Test Desktop View:**
1. Open in regular browser window
2. Should see desktop-optimized layout

**Test Toast Notification:**
1. Open page in any device
2. Should see "Optimizing for [device] experience..." toast
3. Toast disappears after 2 seconds

## Dependencies

- **sonner**: Toast notifications for device detection feedback
- **Next.js 14**: Route groups and middleware support
- **framer-motion**: Animations (mobile portfolio)

## Notes

- Device detection happens client-side for page wrappers
- Server-side detection used for homepage (better initial render)
- All pages maintain same SEO-friendly URLs
- No duplicate content issues (same canonical URLs)
- Brief loading state during client-side detection
- Mobile and desktop components completely separated for optimal bundle size
