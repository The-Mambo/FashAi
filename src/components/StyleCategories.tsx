import React from 'react';
import { Crown, Briefcase, Palette, Camera } from 'lucide-react';
import { StyleTemplate } from '../types';

interface StyleCategoriesProps {
  selectedCategory: StyleTemplate['category'] | 'all';
  onCategorySelect: (category: StyleTemplate['category'] | 'all') => void;
}

const categories = [
  { id: 'all' as const, name: 'All Styles', icon: Camera },
  { id: 'luxury' as const, name: 'Luxury', icon: Crown },
  { id: 'professional' as const, name: 'Professional', icon: Briefcase },
  { id: 'creative' as const, name: 'Creative', icon: Palette },
  { id: 'lifestyle' as const, name: 'Lifestyle', icon: Camera },
];

export function StyleCategories({ selectedCategory, onCategorySelect }: StyleCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}