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
  Search,
  Diamond,
  X,
} from "lucide-react"
import { SmartLink } from "@/components/ui/smart-link"
import { useDeviceType } from "@/lib/device-detection.client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import { services } from "@/data/services"

// Menu items with mobile-specific routes
const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Services", url: "/services", icon: Scissors },
  { title: "Portfolio", url: "/portfolio", icon: ImageIcon },
  { title: "Book Now", url: "/booking", icon: Calendar },
  { title: "Contact", url: "/contact", icon: Phone },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setOpenMobile, isMobile: isMobileDevice } = useSidebar()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showResults, setShowResults] = React.useState(false)
  const deviceType = useDeviceType()
  const isMobile = deviceType === 'mobile'

  // Close sidebar on navigation (mobile only)
  React.useEffect(() => {
    if (isMobileDevice) {
      setOpenMobile(false)
    }
  }, [pathname, isMobileDevice, setOpenMobile])

  // Filter services based on search query
  const filteredStyles = React.useMemo(() => {
    if (!searchQuery.trim()) return []
    
    return services.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5) // Limit to 5 results
  }, [searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowResults(value.trim().length > 0)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowResults(false)
  }

  return (
    <Sidebar 
      collapsible={isMobile ? "offcanvas" : "none"}
      side={isMobile ? "right" : "left"}
      className="bg-[#020119]"
      style={{
        "--sidebar-width": "10rem",
        "--sidebar-width-mobile": "11rem",
        border: "none",
        borderLeft: "none",
        borderRight: "none",
      } as React.CSSProperties}
    >
      {/* --- HEADER: Logo & Search --- */}
      <SidebarHeader className="gap-3 pt-4 pb-3 bg-[#020119]">
        {/* Brand Logo Section */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="sm" asChild className="hover:bg-white/5">
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

        {/* Search Bar */}
        <div className="px-2 relative">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-3 -translate-y-1/2 select-none text-gray-400" />
            <SidebarInput 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-7 pr-8 bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-white/10 focus:border-[#F50057] transition-all h-8 rounded text-xs" 
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showResults && filteredStyles.length > 0 && (
            <div className="absolute top-full left-2 right-2 mt-1 bg-[#020119] rounded shadow-xl z-50 max-h-48 overflow-y-auto">
              {filteredStyles.map((style) => (
                <Link
                  key={style.id}
                  href={`#${style.id}`}
                  onClick={() => {
                    clearSearch()
                  }}
                  className="block p-2 hover:bg-white/5 transition-colors text-white hover:text-[#F50057]"
                >
                  <p className="text-xs font-medium truncate">
                    {style.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {style.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* No Results */}
          {showResults && filteredStyles.length === 0 && searchQuery.trim() && (
            <div className="absolute top-full left-2 right-2 mt-1 bg-[#020119] rounded shadow-xl z-50 p-3 text-center">
              <p className="text-xs text-gray-400">No styles found</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Separator between search and main content */}
      <div className="h-px bg-white mx-3" />

      {/* --- CONTENT: Navigation --- */}
      <SidebarContent className="bg-[#020119]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.url
                
                return (
                  <React.Fragment key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive ? true : false}
                        className={`h-8 text-xs font-medium rounded transition-all ${
                          isActive
                            ? '!text-[#F50057] hover:!text-[#F50057]/90 hover:bg-white/5' 
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <SmartLink href={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SmartLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {index < menuItems.length - 1 && (
                      <div className="h-px bg-white/30 mx-3 my-1" />
                    )}
                  </React.Fragment>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator between main nav and quick actions */}
        <div className="h-px bg-white mx-3 my-4" />

        {/* Quick Actions */}
        <SidebarGroup className="mt-2 bg-[#020119]">
          <div className="px-3 mb-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick
            </h4>
          </div>
          <SidebarGroupContent className="bg-[#020119]">
            <SidebarMenu className="px-2">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="h-7 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded transition-all"
                >
                  <Link href="/booking">
                    <Calendar className="size-3" />
                    <span>Book</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <div className="h-px bg-white/30 mx-3 my-1" />
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  className="h-7 text-xs font-medium text-gray-300 hover:bg-white/5 hover:text-white rounded transition-all"
                >
                  <Link href="https://wa.me/233247173819" target="_blank">
                    <Phone className="size-3" />
                    <span>Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* SidebarRail handles the drag-to-resize or collapse interaction - only on mobile */}
      {isMobile && <SidebarRail className="bg-white w-1 hover:bg-white/80" />}
    </Sidebar>
  )
}