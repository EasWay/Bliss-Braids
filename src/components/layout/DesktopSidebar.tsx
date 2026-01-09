"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Calendar,
  Home,
  Image as ImageIcon,
  Phone,
  Scissors,
  Diamond,
} from "lucide-react"
import { SmartLink } from "@/components/ui/smart-link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Services", url: "/services", icon: Scissors },
  { title: "Portfolio", url: "/portfolio", icon: ImageIcon },
  { title: "Book Now", url: "/booking", icon: Calendar },
  { title: "Contact", url: "/contact", icon: Phone },
]

export function DesktopSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar 
      collapsible="none"
      className="bg-[#020119] !border-r !border-gray-800/50 h-screen fixed left-0 top-0 z-50 w-[15rem]"
      {...props}
    >
      {/* Header with Logo */}
      <SidebarHeader className="!border-b !border-gray-800/50 py-4 flex-shrink-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-white/5">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#F50057] text-white">
                  <Diamond className="size-4" fill="white" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-sm text-white">Bliss Braids</span>
                  <span className="text-xs text-gray-400">Studio</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="bg-[#020119] flex-1">
        <SidebarMenu className="gap-2 px-2 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.url
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  className={`h-10 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? '!text-[#F50057] !bg-white/10 hover:!bg-white/15' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <SmartLink href={item.url}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SmartLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer with Quick Actions */}
      <SidebarFooter className="!border-t !border-gray-800/50 py-4 bg-[#020119] flex-shrink-0">
        <SidebarMenu className="gap-2 px-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="h-9 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-all"
              style={{ backgroundColor: '#F50057' }}
            >
              <Link href="/booking">
                <Calendar className="size-4" />
                <span>Book Now</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="h-9 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded-lg transition-all"
            >
              <Link href="https://wa.me/233247173819" target="_blank">
                <Phone className="size-4" />
                <span>WhatsApp</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
