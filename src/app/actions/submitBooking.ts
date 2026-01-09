'use server';

import { Resend } from 'resend';
import { BookingSchema, validateBooking, type BookingFormData } from '@/lib/validation';
import { generateBookingEmailHTML, generateBookingEmailText } from '@/lib/email-templates';

/**
 * Server Action for submitting booking requests
 * Validates form data, generates email, and sends notification to owner
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

// Response types for type safety
export type SubmitBookingResponse = 
  | { success: true; bookingId: string; message: string }
  | { success: false; error: string; errors?: Record<string, string> };

/**
 * Submit a booking request
 * Validates data, sends email to owner via Resend API
 */
export async function submitBooking(formData: unknown): Promise<SubmitBookingResponse> {
  try {
    // Step 1: Validate form data using Zod schema (Requirement 6.2)
    const validationResult = validateBooking(formData);
    
    if (!validationResult.success) {
      console.error('Booking validation failed:', validationResult.errors);
      return {
        success: false,
        error: 'Please check your booking details and try again',
        errors: validationResult.errors
      };
    }

    const bookingData: BookingFormData = validationResult.data;

    // Step 2: Initialize Resend with API key from environment (Requirement 6.1)
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not set');
      return {
        success: false,
        error: 'Email service is not configured. Please contact support.'
      };
    }

    const resend = new Resend(resendApiKey);

    // Step 3: Get owner email from environment (Requirement 6.3)
    const ownerEmail = process.env.OWNER_EMAIL;
    
    if (!ownerEmail) {
      console.error('OWNER_EMAIL environment variable is not set');
      return {
        success: false,
        error: 'Booking recipient is not configured. Please contact support.'
      };
    }

    // Step 4: Generate email HTML and text using template function (Requirement 6.4)
    const emailHTML = generateBookingEmailHTML(bookingData);
    const emailText = generateBookingEmailText(bookingData);

    // Generate unique booking ID for tracking
    const bookingId = `${bookingData.serviceId}-${Date.now()}`;

    // Step 5: Send email to owner via Resend API (Requirement 6.3, 6.4)
    // Sanitize customer name for tags (only ASCII letters, numbers, underscores, dashes)
    const sanitizedCustomerName = bookingData.customerInfo.name
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 50); // Limit length
    
    // Use Resend's onboarding domain for testing, or custom domain if FROM_EMAIL is set
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: `💅 New Booking: ${bookingData.serviceName} - ${bookingData.customerInfo.name}`,
      html: emailHTML,
      text: emailText,
      reply_to: bookingData.customerInfo.email,
      tags: [
        { name: 'type', value: 'booking-request' },
        { name: 'service', value: bookingData.serviceId },
        { name: 'customer', value: sanitizedCustomerName }
      ]
    });

    // Step 6: Handle email send errors
    if (error) {
      console.error('Resend API error:', error);
      
      // Provide specific error messages based on error type
      let userMessage = 'Failed to send booking request. Please try again or contact us via WhatsApp.';
      
      if (error.message?.includes('rate limit')) {
        userMessage = 'Too many requests. Please wait a moment and try again.';
      } else if (error.message?.includes('invalid')) {
        userMessage = 'Invalid email configuration. Please contact us directly via WhatsApp.';
      } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
        userMessage = 'Network error. Please check your connection and try again.';
      }
      
      return {
        success: false,
        error: userMessage
      };
    }

    // Step 7: Return success response
    console.log('Booking email sent successfully:', {
      bookingId,
      emailId: data?.id,
      customer: bookingData.customerInfo.name,
      service: bookingData.serviceName
    });

    return {
      success: true,
      bookingId,
      message: 'Booking request sent successfully! Check your WhatsApp for confirmation.'
    };

  } catch (error) {
    // Catch any unexpected errors
    console.error('Unexpected error in submitBooking:', error);
    
    // Provide different error messages based on error type
    let userMessage = 'An unexpected error occurred. Please try again or contact us directly.';
    
    if (error instanceof TypeError) {
      userMessage = 'Configuration error. Please contact us via WhatsApp.';
    } else if (error instanceof Error && error.message?.includes('fetch')) {
      userMessage = 'Network connection error. Please check your internet and try again.';
    }
    
    return {
      success: false,
      error: userMessage
    };
  }
}

/**
 * Helper function to test email configuration
 * Can be used in development to verify Resend setup
 */
export async function testEmailConfiguration(): Promise<{
  configured: boolean;
  message: string;
}> {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const hasOwnerEmail = !!process.env.OWNER_EMAIL;

  if (!hasApiKey) {
    return {
      configured: false,
      message: 'RESEND_API_KEY is not configured'
    };
  }

  if (!hasOwnerEmail) {
    return {
      configured: false,
      message: 'OWNER_EMAIL is not configured'
    };
  }

  return {
    configured: true,
    message: 'Email configuration is valid'
  };
}
