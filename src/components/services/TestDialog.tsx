'use client';

import { useState } from 'react';
import { Service } from '@/types';

interface TestDialogProps {
  children: React.ReactNode;
  service: Service;
}

export function TestDialog({ children, service }: TestDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {children}
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: '#020119', color: 'white' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{service.name}</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <p className="text-white mb-2">Price: GHS {service.basePrice}</p>
            <p className="text-white/80 mb-4">{service.description}</p>
            
            <button 
              className="w-full bg-[#F50057] text-white py-2 px-4 rounded hover:bg-[#F50057]/90"
              onClick={() => {
                setIsOpen(false);
                window.location.href = `/booking?style=${service.id}`;
              }}
            >
              Book This Style
            </button>
          </div>
        </div>
      )}
    </>
  );
}