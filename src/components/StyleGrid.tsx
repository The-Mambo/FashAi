import React from 'react';
import { StyleCard } from './StyleCard';
import { StyleCategories } from './StyleCategories';
import { styleTemplates } from '../data/styleTemplates';
import { StyleTemplate } from '../types';

interface StyleGridProps {
  selectedStyle?: StyleTemplate;
  onStyleSelect: (style: StyleTemplate) => void;
}

export function StyleGrid({ selectedStyle, onStyleSelect }: StyleGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<StyleTemplate['category'] | 'all'>('all');

  const filteredTemplates = selectedCategory === 'all' 
    ? styleTemplates 
    : styleTemplates.filter(template => template.category === selectedCategory);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Choose Your Style</h2>
        <p className="text-slate-400">Select a location and vibe for your AI-generated photos</p>
      </div>

      <StyleCategories
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => (
          <StyleCard
            key={template.id}
            template={template}
            selected={selectedStyle?.id === template.id}
            onSelect={onStyleSelect}
          />
        ))}
      </div>
    </div>
  );
}