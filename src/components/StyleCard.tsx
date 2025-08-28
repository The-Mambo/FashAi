import React from 'react';
import { Crown, Sparkles } from 'lucide-react';
import { StyleTemplate } from '../types';

interface StyleCardProps {
  template: StyleTemplate;
  selected?: boolean;
  onSelect: (template: StyleTemplate) => void;
}

export function StyleCard({ template, selected, onSelect }: StyleCardProps) {
  return (
    <div
      onClick={() => onSelect(template)}
      className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
        selected 
          ? 'ring-2 ring-purple-500 shadow-lg shadow-purple-500/25' 
          : 'hover:shadow-xl hover:shadow-black/25'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-lg">{template.name}</h3>
            <p className="text-slate-300 text-sm">{template.description}</p>
          </div>
          {template.premium && (
            <div className="p-1 bg-amber-500 rounded-full">
              <Crown className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {selected && (
        <div className="absolute top-3 right-3 p-2 bg-purple-500 rounded-full">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}