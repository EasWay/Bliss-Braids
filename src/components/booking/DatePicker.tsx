'use client';

import { useBooking } from '@/context/BookingContext';
import { useValidation } from '@/context/ValidationContext';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  format, 
  isSameDay, 
  isBefore, 
  startOfDay,
  addMonths,
  subMonths,
  getDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import PriceSummary from './PriceSummary';

export default function DatePicker() {
  const { bookingState, updateDate, goToNextStep } = useBooking();
  const { setStepValidation, clearFieldError, setFieldError, getFieldError, isFieldTouched, setFieldTouched } = useValidation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const STEP_INDEX = 4;
  
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = getDay(monthStart);
  
  // Create empty cells for days before the month starts
  const emptyCells = Array(firstDayOfWeek).fill(null);
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  // Validate step whenever selection changes
  useEffect(() => {
    const isValid = !!bookingState.selectedDate;
    setStepValidation(STEP_INDEX, isValid);
    
    if (bookingState.selectedDate) {
      clearFieldError(STEP_INDEX, 'date');
    }
  }, [bookingState.selectedDate, setStepValidation, clearFieldError]);

  const handleDateSelect = (date: Date) => {
    if (!isBefore(date, today)) {
      updateDate(date);
      setFieldTouched(STEP_INDEX, 'date', true);
    }
  };

  const handleContinue = () => {
    setFieldTouched(STEP_INDEX, 'date', true);
    
    if (bookingState.selectedDate) {
      goToNextStep();
    } else {
      setFieldError(STEP_INDEX, 'date', 'Please select a date to continue');
    }
  };
  
  const isDateDisabled = (date: Date) => {
    return isBefore(date, today);
  };
  
  const isDateSelected = (date: Date) => {
    return bookingState.selectedDate ? isSameDay(date, bookingState.selectedDate) : false;
  };

  const dateError = getFieldError(STEP_INDEX, 'date');
  const showError = isFieldTouched(STEP_INDEX, 'date') && dateError;
  
  return (
    <div className="space-y-2">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10" role="application" aria-label="Date picker calendar">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handlePreviousMonth}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          
          <h3 className="text-xs font-semibold text-white" id="calendar-month-year" aria-live="polite">
            {format(currentMonth, 'MMM yyyy')}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-[10px] font-medium text-white/60 py-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1" role="grid" aria-labelledby="calendar-month-year">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" role="gridcell" />
          ))}
          
          {daysInMonth.map((date) => {
            const disabled = isDateDisabled(date);
            const selected = isDateSelected(date);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                disabled={disabled}
                role="gridcell"
                aria-selected={selected}
                className={`
                  aspect-square rounded-full flex items-center justify-center
                  text-[11px] font-medium transition-all
                  focus:outline-none focus:ring-1 focus:ring-primary
                  ${disabled ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/10 cursor-pointer'}
                  ${selected ? 'bg-primary text-white hover:bg-primary' : ''}
                `}
                aria-label={format(date, 'MMM d, yyyy')}
                aria-disabled={disabled}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      {showError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{dateError}</p>
        </div>
      )}
      
      <PriceSummary />
    </div>
  );
}
