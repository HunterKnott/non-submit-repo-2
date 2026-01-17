'use client';

import { FilterType } from '@/lib/types';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  const filters: { label: string; value: FilterType }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="flex justify-center space-x-4">
        {filters.map(({ label, value }) => (
            <button
                key={value}
                onClick={() => onFilterChange(value)}
                className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                    currentFilter === value
                    ? 'text-primary-blue'
                    : 'text-light-grayish-blue-dark dark:text-dark-grayish-blue-dark hover:text-black dark:hover:text-white'
                }`}
            >
                {label}
            </button>
        ))}
    </div>
  );
}