'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { RootLayoutContent } from "@/components/layout/RootLayoutContent";
import { 
  SidebarProvider, 
  SidebarInset
} from "@/components/ui/sidebar";

export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Get sidebar state from localStorage for persistence (client-side only)
    const savedState = localStorage.getItem("sidebar_state");
    if (savedState !== null) {
      setDefaultOpen(savedState === "true");
    }
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <SidebarProvider defaultOpen={true}>
        <div className="lg:hidden">
          <AppSidebar />
        </div>
        <div className="hidden lg:block">
          <DesktopSidebar />
        </div>
        <SidebarInset className="overflow-x-hidden lg:ml-[14rem]">
          <RootLayoutContent>
            {children}
          </RootLayoutContent>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider 
      defaultOpen={defaultOpen}
      style={{
        "--sidebar-width": "20rem",
        "--sidebar-width-mobile": "11rem",
      } as React.CSSProperties}
    >
      {/* Mobile Sidebar - Hidden on desktop */}
      <div className="lg:hidden">
        <AppSidebar />
      </div>
      
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>
      
      <SidebarInset className="overflow-x-hidden lg:ml-[14rem]">
        <RootLayoutContent>
          {children}
        </RootLayoutContent>
      </SidebarInset>
    </SidebarProvider>
  );
}