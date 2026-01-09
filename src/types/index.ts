// Core type definitions for Bliss Braids booking system

export type BraidSize = 'small' | 'medium' | 'jumbo';
export type HairLength = 'shoulder' | 'midBack' | 'waist' | 'butt';
export type ServiceCategory = 'box-braids' | 'cornrows' | 'knotless' | 'twists' | 'locs';
export type BookingStatus = 'draft' | 'pending_deposit' | 'confirmed' | 'completed' | 'cancelled';

export interface SizeVariant {
  priceMultiplier: number;
  timeMultiplier: number;
  label: string;
}

export interface LengthVariant {
  priceAdd: number;
  label: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  baseDuration: number; // Base duration in hours (for medium size, shoulder length)
  basePrice: number; // Base price for shoulder length, medium size
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
    shoulder: LengthVariant;
    midBack: LengthVariant;
    waist: LengthVariant;
    butt: LengthVariant;
  };
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  specialRequests?: string;
}

export interface BookingState {
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

export interface PortfolioImage {
  id: string;
  url: string;
  styleName: string;
  basePrice: number;
  category: ServiceCategory;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}
