'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingConfig, useBookingForm } from '@/context/BookingProvider';
import { useValidation } from '@/context/ValidationContext';
import { useToast } from '@/components/ui/Toast';
import { submitBooking } from '@/app/actions/submitBooking';
import { Mail, Phone, User, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function DesktopContactForm() {
  const router = useRouter();
  const { config, getTotalPrice, getEstimatedDuration } = useBookingConfig();
  const { formState, updateCustomerInfo } = useBookingForm();
  const { setStepValidation, setFieldTouched } = useValidation();
  const { showToast } = useToast();
  
  const STEP_INDEX = 6;
  
  const [formData, setFormData] = useState({
    name: formState.customerInfo?.name || '',
    whatsapp: formState.customerInfo?.whatsapp || '',
    email: formState.customerInfo?.email || '',
    specialRequests: formState.customerInfo?.specialRequests || ''
  });

  const [errors, setErrors] = useState({
    name: '',
    whatsapp: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    whatsapp: false,
    email: false
  });

  // Loading and error states for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  // Validation functions
  const validateName = (name: string): string => {
    if (!name.trim()) {
      return 'Full name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const validateWhatsApp = (whatsapp: string): string => {
    if (!whatsapp.trim()) {
      return 'WhatsApp number is required';
    }
    // Ghana WhatsApp format: 233XXXXXXXXX (233 + 9 digits)
    const ghanaWhatsAppRegex = /^233\d{9}$/;
    if (!ghanaWhatsAppRegex.test(whatsapp.trim())) {
      return 'Invalid Ghana WhatsApp format (233XXXXXXXXX)';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email address is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Invalid email address';
    }
    return '';
  };

  // Update step validation whenever form data changes
  React.useEffect(() => {
    const nameError = validateName(formData.name);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const emailError = validateEmail(formData.email);
    
    const isValid = !nameError && !whatsappError && !emailError && 
                   formData.name.trim() !== '' && 
                   formData.whatsapp.trim() !== '' && 
                   formData.email.trim() !== '';
    
    setStepValidation(STEP_INDEX, isValid, {
      name: nameError,
      whatsapp: whatsappError,
      email: emailError
    });
  }, [formData.name, formData.whatsapp, formData.email, setStepValidation]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change if field has been touched
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  // Handle blur events
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setFieldTouched(STEP_INDEX, name, true);
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'whatsapp':
        error = validateWhatsApp(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const nameError = validateName(formData.name);
    const whatsappError = validateWhatsApp(formData.whatsapp);
    const emailError = validateEmail(formData.email);

    setErrors({
      name: nameError,
      whatsapp: whatsappError,
      email: emailError
    });

    setTouched({
      name: true,
      whatsapp: true,
      email: true
    });

    return !nameError && !whatsappError && !emailError;
  };

  // Handle form submission with Server Action
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setSubmitError(null);

    // Validate all fields
    if (!validateAll()) {
      return;
    }

    // Validate booking state completeness
    if (!config.selectedService || !config.selectedSize || 
        !config.selectedLength || !config.selectedDate || 
        !config.selectedTime) {
      setSubmitError('Please complete all booking steps before submitting');
      return;
    }

    // Update booking context with customer info
    updateCustomerInfo({
      name: formData.name.trim(),
      phone: formData.whatsapp.trim(),
      whatsapp: formData.whatsapp.trim(),
      email: formData.email.trim(),
      specialRequests: formData.specialRequests.trim() || undefined
    });

    // Prepare booking data for submission
    const bookingData = {
      serviceName: config.selectedService.name,
      serviceId: config.selectedService.id,
      size: config.selectedSize,
      sizeLabel: config.selectedService.sizeVariants[config.selectedSize].label,
      length: config.selectedLength,
      lengthLabel: config.selectedService.lengthVariants[config.selectedLength].label,
      addOns: config.selectedAddOns,
      date: format(config.selectedDate, 'MMMM d, yyyy'),
      time: config.selectedTime,
      totalPrice: getTotalPrice(),
      estimatedDuration: getEstimatedDuration(),
      customerInfo: {
        name: formData.name.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim(),
        specialRequests: formData.specialRequests.trim() || undefined
      }
    };

    // Submit booking with loading state
    setIsSubmitting(true);

    try {
      const result = await submitBooking(bookingData);

      if (result.success) {
        // Success! Show success toast and redirect
        showToast({
          type: 'success',
          title: 'Booking Request Sent!',
          message: 'Check your WhatsApp for confirmation details.',
          duration: 3000
        });
        
        router.push('/booking/success');
      } else {
        // Handle validation or submission errors
        if (result.errors) {
          // Map server validation errors to form fields
          const serverErrors = result.errors;
          setErrors(prev => ({
            ...prev,
            name: serverErrors['customerInfo.name'] || prev.name,
            whatsapp: serverErrors['customerInfo.whatsapp'] || prev.whatsapp,
            email: serverErrors['customerInfo.email'] || prev.email
          }));
        }
        
        setSubmitError(result.error);
        
        // Show error toast
        showToast({
          type: 'error',
          title: 'Booking Failed',
          message: result.error || 'Please check your details and try again.',
          action: result.error?.includes('WhatsApp') ? {
            label: 'Contact WhatsApp',
            onClick: () => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233000000000'}`, '_blank')
          } : undefined
        });
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
      
      // Show system error toast
      showToast({
        type: 'error',
        title: 'System Error',
        message: errorMessage,
        action: {
          label: 'Contact Support',
          onClick: () => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233000000000'}`, '_blank')
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = 
    formData.name.trim() !== '' &&
    formData.whatsapp.trim() !== '' &&
    formData.email.trim() !== '' &&
    !errors.name &&
    !errors.whatsapp &&
    !errors.email;

  return (
    <div className="space-y-4">
      {/* Submission Error Alert */}
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs font-medium text-red-300">{submitError}</p>
            {retryCount < MAX_RETRIES && (
              <button
                type="button"
                onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                className="mt-1 text-xs font-medium text-red-400 hover:text-red-300 underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-white mb-1">
            Full Name <span className="text-[#F50057]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-white/70" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={touched.name && !!errors.name}
              className={`block w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/50 text-sm ${
                touched.name && errors.name 
                  ? 'bg-red-500/10 focus:ring-red-500/50' 
                  : 'focus:ring-[#F50057] focus:bg-white/10'
              } focus:outline-none focus:ring-1 transition-colors`}
              placeholder="Enter your full name"
            />
          </div>
          {touched.name && errors.name && (
            <p className="mt-0.5 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label htmlFor="whatsapp" className="block text-xs font-medium text-white mb-1">
            WhatsApp Number <span className="text-[#F50057]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-white/70" />
            </div>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={touched.whatsapp && !!errors.whatsapp}
              className={`block w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/50 text-sm ${
                touched.whatsapp && errors.whatsapp 
                  ? 'bg-red-500/10 focus:ring-red-500/50' 
                  : 'focus:ring-[#F50057] focus:bg-white/10'
              } focus:outline-none focus:ring-1 transition-colors`}
              placeholder="233XXXXXXXXX"
            />
          </div>
          {touched.whatsapp && errors.whatsapp && (
            <p className="mt-0.5 text-xs text-red-400">{errors.whatsapp}</p>
          )}
          <p className="mt-0.5 text-xs text-white/80">
            Format: 233 followed by 9 digits (e.g., 233501234567)
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-white mb-1">
            Email Address <span className="text-[#F50057]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-white/70" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={touched.email && !!errors.email}
              className={`block w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/50 text-sm ${
                touched.email && errors.email 
                  ? 'bg-red-500/10 focus:ring-red-500/50' 
                  : 'focus:ring-[#F50057] focus:bg-white/10'
              } focus:outline-none focus:ring-1 transition-colors`}
              placeholder="your.email@example.com"
            />
          </div>
          {touched.email && errors.email && (
            <p className="mt-0.5 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Special Requests (Optional) */}
        <div>
          <label htmlFor="specialRequests" className="block text-xs font-medium text-white mb-1">
            Special Requests <span className="text-white/80 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-4 w-4 text-white/70" />
            </div>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              className="block w-full pl-10 pr-3 py-2 rounded-lg bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-[#F50057] focus:bg-white/10 transition-colors resize-none text-sm"
              placeholder="Any specific requests or preferences? (e.g., hair color, style variations)"
            />
          </div>
        </div>

        {/* Note about submission */}
        <div className="bg-[#F50057]/10 border border-[#F50057]/30 rounded-lg p-2">
          <p className="text-xs text-white/90">
            <strong>Note:</strong> This is a booking request. We'll contact you via WhatsApp to confirm your appointment and arrange the 50 GHS deposit.
          </p>
        </div>

        <p className="text-xs text-center text-white/80">
          By submitting, you agree to be contacted via WhatsApp to arrange your deposit
        </p>
      </form>
    </div>
  );
}