'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { useToast } from '@/components/ui/Toast';
import { submitBooking } from '@/app/actions/submitBooking';
import { Mail, Phone, User, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ContactForm() {
  const router = useRouter();
  const { bookingState, updateCustomerInfo, getTotalPrice, getEstimatedDuration } = useBooking();
  const { setStepValidation, setFieldTouched } = useValidation();
  const { showToast } = useToast();
  
  const STEP_INDEX = 6;
  
  const [formData, setFormData] = useState({
    name: bookingState.customerInfo?.name || '',
    whatsapp: bookingState.customerInfo?.whatsapp || '',
    email: bookingState.customerInfo?.email || '',
    specialRequests: bookingState.customerInfo?.specialRequests || ''
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
    if (!bookingState.selectedService || !bookingState.selectedSize || 
        !bookingState.selectedLength || !bookingState.selectedDate || 
        !bookingState.selectedTime) {
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
      serviceName: bookingState.selectedService.name,
      serviceId: bookingState.selectedService.id,
      size: bookingState.selectedSize,
      sizeLabel: bookingState.selectedService.sizeVariants[bookingState.selectedSize].label,
      length: bookingState.selectedLength,
      lengthLabel: bookingState.selectedService.lengthVariants[bookingState.selectedLength].label,
      addOns: bookingState.selectedAddOns,
      date: format(bookingState.selectedDate, 'MMMM d, yyyy'),
      time: bookingState.selectedTime,
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

  // Retry submission after failure
  const handleRetry = async () => {
    if (retryCount >= MAX_RETRIES) {
      setSubmitError('Maximum retry attempts reached. Please contact us via WhatsApp.');
      return;
    }

    setRetryCount(prev => prev + 1);
    setSubmitError(null);
    
    // Re-submit the form
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-2">
          Contact Information
        </h2>
        <p className="text-slate">
          We'll use these details to confirm your appointment via WhatsApp
        </p>
      </div>

      {/* Submission Error Alert */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">{submitError}</p>
            {retryCount < MAX_RETRIES && (
              <button
                type="button"
                onClick={handleRetry}
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            )}
            {retryCount >= MAX_RETRIES && (
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_WHATSAPP || '233000000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-medium text-red-600 hover:text-red-700 underline"
              >
                Contact us on WhatsApp
              </a>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/40" />
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
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
              className={`block w-full pl-10 pr-3 py-3 border bg-white/5 text-white placeholder:text-white/40 ${
                touched.name && errors.name 
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                  : 'border-white/20 focus:ring-primary focus:border-primary'
              } rounded-2xl focus:outline-none focus:ring-2 transition-colors`}
              placeholder="Enter your full name"
            />
          </div>
          {touched.name && errors.name && (
            <p className="mt-1 text-sm text-red-300" id="name-error" role="alert">{errors.name}</p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-white mb-2">
            WhatsApp Number <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-white/40" />
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
              aria-describedby={touched.whatsapp && errors.whatsapp ? "whatsapp-error whatsapp-hint" : "whatsapp-hint"}
              className={`block w-full pl-10 pr-3 py-3 border bg-white/5 text-white placeholder:text-white/40 ${
                touched.whatsapp && errors.whatsapp 
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                  : 'border-white/20 focus:ring-primary focus:border-primary'
              } rounded-2xl focus:outline-none focus:ring-2 transition-colors`}
              placeholder="233XXXXXXXXX"
            />
          </div>
          {touched.whatsapp && errors.whatsapp && (
            <p className="mt-1 text-sm text-red-300" id="whatsapp-error" role="alert">{errors.whatsapp}</p>
          )}
          <p className="mt-1 text-xs text-white/60" id="whatsapp-hint">
            Format: 233 followed by 9 digits (e.g., 233501234567)
          </p>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
            Email Address <span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/40" />
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
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
              className={`block w-full pl-10 pr-3 py-3 border bg-white/5 text-white placeholder:text-white/40 ${
                touched.email && errors.email 
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500' 
                  : 'border-white/20 focus:ring-primary focus:border-primary'
              } rounded-2xl focus:outline-none focus:ring-2 transition-colors`}
              placeholder="your.email@example.com"
            />
          </div>
          {touched.email && errors.email && (
            <p className="mt-1 text-sm text-red-300" id="email-error" role="alert">{errors.email}</p>
          )}
        </div>

        {/* Special Requests (Optional) */}
        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-white mb-2">
            Special Requests <span className="text-white/60 text-xs">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-white/40" />
            </div>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={4}
              aria-label="Special requests or preferences"
              className="block w-full pl-10 pr-3 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
              placeholder="Any specific requests or preferences? (e.g., hair color, style variations)"
            />
          </div>
        </div>

        {/* Submit Button - Touch-friendly */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 
                      flex items-center justify-center gap-2 min-h-[44px] touch-manipulation ${
            isFormValid && !isSubmitting
              ? 'bg-primary hover:bg-primary/90 active:bg-primary/80 hover:shadow-lg transform hover:-translate-y-0.5'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Sending Request...</span>
            </>
          ) : (
            'Request Appointment'
          )}
        </button>

        <p className="text-xs text-center text-white/60 mt-3">
          By submitting, you agree to be contacted via WhatsApp to arrange your deposit
        </p>
      </form>
    </div>
  );
}
