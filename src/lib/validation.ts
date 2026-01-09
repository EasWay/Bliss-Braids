import { z } from 'zod';

/**
 * Zod validation schema for booking form submission
 * Used in Server Action to validate booking requests before email dispatch
 */

// Customer contact information schema
const CustomerInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  
  whatsapp: z
    .string()
    .regex(/^233\d{9}$/, 'WhatsApp number must be in Ghana format (233XXXXXXXXX)')
    .length(12, 'WhatsApp number must be exactly 12 digits (233XXXXXXXXX)'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional()
    .default('')
});

// Add-on item schema
const AddOnSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive('Add-on price must be positive'),
  description: z.string()
});

// Size options enum
const SizeEnum = z.enum(['small', 'medium', 'jumbo'], {
  message: 'Size must be small, medium, or jumbo'
});

// Length options enum
const LengthEnum = z.enum(['shoulder', 'midBack', 'waist', 'butt'], {
  message: 'Length must be shoulder, midBack, waist, or butt'
});

// Main booking schema
export const BookingSchema = z.object({
  // Service details
  serviceName: z
    .string()
    .min(1, 'Service name is required'),
  
  serviceId: z
    .string()
    .min(1, 'Service ID is required'),
  
  // Size and length selections
  size: SizeEnum,
  
  sizeLabel: z
    .string()
    .min(1, 'Size label is required'),
  
  length: LengthEnum,
  
  lengthLabel: z
    .string()
    .min(1, 'Length label is required'),
  
  // Add-ons (optional array)
  addOns: z
    .array(AddOnSchema)
    .default([]),
  
  // Date and time
  date: z
    .string()
    .min(1, 'Appointment date is required')
    .refine((dateStr) => {
      const date = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, 'Appointment date must be today or in the future'),
  
  time: z
    .string()
    .min(1, 'Appointment time is required')
    .regex(/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i, 'Time must be in format HH:MM AM/PM'),
  
  // Pricing
  totalPrice: z
    .number()
    .positive('Total price must be positive')
    .min(50, 'Total price must be at least 50 GHS'),
  
  estimatedDuration: z
    .number()
    .positive('Duration must be positive')
    .min(0.5, 'Duration must be at least 0.5 hours')
    .max(12, 'Duration cannot exceed 12 hours'),
  
  // Customer information
  customerInfo: CustomerInfoSchema
});

// Type inference for TypeScript
export type BookingFormData = z.infer<typeof BookingSchema>;
export type CustomerInfo = z.infer<typeof CustomerInfoSchema>;
export type AddOn = z.infer<typeof AddOnSchema>;
export type Size = z.infer<typeof SizeEnum>;
export type Length = z.infer<typeof LengthEnum>;

// Partial schema for step-by-step validation in the wizard
export const ServiceSelectionSchema = z.object({
  serviceName: z.string().min(1, 'Please select a service'),
  serviceId: z.string().min(1, 'Service ID is required')
});

export const SizeSelectionSchema = z.object({
  size: SizeEnum,
  sizeLabel: z.string().min(1, 'Size label is required')
});

export const LengthSelectionSchema = z.object({
  length: LengthEnum,
  lengthLabel: z.string().min(1, 'Length label is required')
});

export const DateTimeSelectionSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time')
});

export const ContactFormSchema = CustomerInfoSchema;

// Helper function to format validation errors for user display
export function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  error.issues.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
}

// Helper function to validate booking data and return typed result
export function validateBooking(data: unknown): {
  success: true;
  data: BookingFormData;
} | {
  success: false;
  errors: Record<string, string>;
} {
  const result = BookingSchema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data
    };
  }
  
  return {
    success: false,
    errors: formatValidationErrors(result.error)
  };
}
