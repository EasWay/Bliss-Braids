'use client';

import { useState, useCallback, useEffect } from 'react';
import { useBookingForm, useBookingConfig, useBookingNavigation } from '@/context/BookingProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { submitBooking } from '@/app/actions/submitBooking';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { CustomerInfo } from '@/types';

// Debounce hook to prevent excessive re-renders during typing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function OptimizedContactForm() {
  const { formState, updateCustomerInfo, setSubmitting, setErrors, clearErrors } = useBookingForm();
  const { config, getTotalPrice, getEstimatedDuration } = useBookingConfig();
  const { goToPreviousStep } = useBookingNavigation();
  const router = useRouter();
  const { showToast } = useToast();

  // Local form state for immediate UI updates
  const [localFormData, setLocalFormData] = useState({
    name: formState.customerInfo?.name || '',
    whatsapp: formState.customerInfo?.whatsapp || '',
    email: formState.customerInfo?.email || '',
    specialRequests: formState.customerInfo?.specialRequests || ''
  });

  // Debounce the form data updates to prevent context thrashing
  const debouncedFormData = useDebounce(localFormData, 300);

  // Update context only when debounced values change
  useEffect(() => {
    if (debouncedFormData.name || debouncedFormData.whatsapp || debouncedFormData.email) {
      updateCustomerInfo(debouncedFormData);
    }
  }, [debouncedFormData, updateCustomerInfo]);

  // Handle input changes (updates local state immediately for responsive UI)
  const handleInputChange = useCallback((field: keyof typeof localFormData, value: string) => {
    setLocalFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear field-specific errors immediately
    if (formState.errors[field]) {
      clearErrors();
    }
  }, [formState.errors, clearErrors]);

  // Validate form data
  const validateForm = useCallback((): CustomerInfo | null => {
    const errors: Record<string, string> = {};

    if (!localFormData.name.trim()) {
      errors.name = 'Name is required';
    } else if (localFormData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!localFormData.whatsapp.trim()) {
      errors.whatsapp = 'WhatsApp number is required';
    } else if (!/^233\d{9}$/.test(localFormData.whatsapp)) {
      errors.whatsapp = 'WhatsApp number must be in Ghana format (233XXXXXXXXX)';
    }

    if (!localFormData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localFormData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return null;
    }

    return {
      name: localFormData.name.trim(),
      whatsapp: localFormData.whatsapp.trim(),
      email: localFormData.email.trim().toLowerCase(),
      specialRequests: localFormData.specialRequests.trim(),
      phone: localFormData.whatsapp.trim() // Use WhatsApp as phone for now
    };
  }, [localFormData, setErrors]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validatedData = validateForm();
    if (!validatedData) return;

    if (!config.selectedService || !config.selectedSize || !config.selectedLength) {
      showToast({
        type: 'error',
        title: 'Incomplete Booking',
        message: 'Please complete all booking steps before submitting.'
      });
      return;
    }

    setSubmitting(true);
    clearErrors();

    try {
      // Prepare booking data for submission
      const bookingData = {
        serviceName: config.selectedService.name,
        serviceId: config.selectedService.id,
        size: config.selectedSize,
        length: config.selectedLength,
        addOns: config.selectedAddOns,
        selectedDate: config.selectedDate,
        selectedTime: config.selectedTime,
        totalPrice: getTotalPrice(),
        estimatedDuration: getEstimatedDuration(),
        customerInfo: validatedData
      };

      const result = await submitBooking(bookingData);

      if (result.success) {
        showToast({
          type: 'success',
          title: 'Booking Submitted!',
          message: 'We\'ll contact you via WhatsApp to confirm your appointment.'
        });
        
        // Redirect to success page
        router.push('/booking/success');
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        
        showToast({
          type: 'error',
          title: 'Submission Failed',
          message: result.error || 'Please check your details and try again.'
        });
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      showToast({
        type: 'error',
        title: 'Network Error',
        message: 'Please check your connection and try again.'
      });
    } finally {
      setSubmitting(false);
    }
  }, [validateForm, config, getTotalPrice, getEstimatedDuration, setSubmitting, clearErrors, setErrors, showToast, router]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            value={localFormData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter your full name"
            className={formState.errors.name ? 'border-red-500' : ''}
            disabled={formState.isSubmitting}
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="whatsapp">WhatsApp Number *</Label>
          <Input
            id="whatsapp"
            type="tel"
            value={localFormData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            placeholder="233XXXXXXXXX"
            className={formState.errors.whatsapp ? 'border-red-500' : ''}
            disabled={formState.isSubmitting}
          />
          {formState.errors.whatsapp && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.whatsapp}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            We'll use this to confirm your appointment and send location details
          </p>
        </div>

        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={localFormData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={formState.errors.email ? 'border-red-500' : ''}
            disabled={formState.isSubmitting}
          />
          {formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formState.errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <Textarea
            id="specialRequests"
            value={localFormData.specialRequests}
            onChange={(e) => handleInputChange('specialRequests', e.target.value)}
            placeholder="Any special requests or notes for your appointment..."
            rows={3}
            disabled={formState.isSubmitting}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          disabled={formState.isSubmitting}
          className="flex-1"
        >
          Back
        </Button>
        
        <Button
          type="submit"
          disabled={formState.isSubmitting}
          className="flex-1 bg-[#F50057] hover:bg-[#C51162]"
        >
          {formState.isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </Button>
      </div>
    </form>
  );
}