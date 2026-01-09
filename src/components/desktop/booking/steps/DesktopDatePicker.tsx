'use client';

import { useBookingConfig } from '@/context/BookingProvider';
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

export default function DesktopDatePicker() {
  const { config, updateDate } = useBookingConfig();
  const { setStepValidation, clearFieldError, isFieldTouched, setFieldTouched, getFieldError } = useValidation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const STEP_INDEX = 4;
  
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const firstDayOfWeek = getDay(monthStart);
  const emptyCells = Array(firstDayOfWeek).fill(null);
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  useEffect(() => {
    const isValid = !!config.selectedDate;
    setStepValidation(STEP_INDEX, isValid);
    
    if (config.selectedDate) {
      clearFieldError(STEP_INDEX, 'date');
    }
  }, [config.selectedDate, setStepValidation, clearFieldError]);

  const handleDateSelect = (date: Date) => {
    if (!isBefore(date, today)) {
      updateDate(date);
      setFieldTouched(STEP_INDEX, 'date', true);
    }
  };
  
  const isDateDisabled = (date: Date) => {
    return isBefore(date, today);
  };
  
  const isDateSelected = (date: Date) => {
    return config.selectedDate ? isSameDay(date, config.selectedDate) : false;
  };

  const dateError = getFieldError(STEP_INDEX, 'date');
  const showError = isFieldTouched(STEP_INDEX, 'date') && dateError;
  
  return (
    <div className="space-y-3">
      <div className="bg-transparent border border-gray-600 rounded-lg p-6" role="application" aria-label="Date picker calendar">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePreviousMonth}
            className="p-3 hover:bg-white/5 border border-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-white/70" />
          </button>
          
          <h3 className="text-base font-semibold text-white" id="calendar-month-year" aria-live="polite">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          
          <button
            onClick={handleNextMonth}
            className="p-3 hover:bg-white/5 border border-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119]"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-white/70" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={i} className="text-center text-sm font-medium text-gray-400 py-3 border-b border-gray-600">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2" role="grid" aria-labelledby="calendar-month-year">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="w-10 h-10" role="gridcell" />
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
                // Updated Logic:
                // Default: border-gray-600 (subtle grey)
                // Hover: border-gray-500 (slightly lighter on hover)
                // Disabled: border-transparent (invisible border to reduce clutter)
                className={`w-10 h-10 rounded-md flex items-center justify-center border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#F50057] focus:ring-offset-1 focus:ring-offset-[#020119] ${
                  disabled 
                    ? 'text-gray-700 border-transparent cursor-not-allowed bg-transparent' 
                    : selected 
                      ? 'bg-[#F50057] text-white border-[#F50057] hover:bg-[#F50057]/90' 
                      : 'text-white border-gray-600 hover:border-gray-500 hover:bg-white/5 cursor-pointer bg-transparent'
                }`}
                aria-label={format(date, 'MMMM d, yyyy')}
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
          <AlertCircle className="h-3 w-3 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-red-300">{dateError}</p>
        </div>
      )}
    </div>
  );
}