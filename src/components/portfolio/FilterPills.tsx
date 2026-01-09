'use client';

import { ServiceCategory } from '@/types';

interface FilterPillsProps {
  activeFilter: 'all' | ServiceCategory;
  onFilterChange: (filter: 'all' | ServiceCategory) => void;
}

const filters: { value: 'all' | ServiceCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'box-braids', label: 'Box Braids' },
  { value: 'knotless', label: 'Knotless' },
  { value: 'cornrows', label: 'Cornrows' },
  { value: 'locs', label: 'Locs' },
  { value: 'twists', label: 'Twists' }
];

export default function FilterPills({ activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8" role="tablist" aria-label="Portfolio category filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          role="tab"
          aria-selected={activeFilter === filter.value}
          aria-label={`Filter by ${filter.label}`}
          className={`
            px-4 sm:px-6 py-2.5 rounded-full font-medium transition-all duration-200 
            min-h-[44px] touch-manipulation text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              activeFilter === filter.value
                ? 'text-white shadow-lg shadow-primary/30 focus:ring-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20 active:bg-white/30 focus:ring-white/50 backdrop-blur-sm'
            }
          `}
          style={activeFilter === filter.value ? { backgroundColor: '#F50057' } : {}}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
