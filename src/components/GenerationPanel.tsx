import React, { useState } from 'react';
import { Wand2, Settings, Loader2 } from 'lucide-react';
import { GenerationRequest, UploadedImage, StyleTemplate } from '../types';

interface GenerationPanelProps {
  userPhoto?: UploadedImage;
  clothingPhoto?: UploadedImage;
  selectedStyle?: StyleTemplate;
  onGenerate: (request: GenerationRequest) => void;
  isGenerating: boolean;
}

export function GenerationPanel({ 
  userPhoto, 
  clothingPhoto, 
  selectedStyle, 
  onGenerate, 
  isGenerating 
}: GenerationPanelProps) {
  const [selectedModel, setSelectedModel] = useState<'flux-kontext' | 'nano-banana'>('flux-kontext');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const canGenerate = userPhoto && clothingPhoto && selectedStyle;

  const handleGenerate = () => {
    if (!canGenerate) return;
    
    onGenerate({
      userPhoto,
      clothingPhoto,
      styleTemplate: selectedStyle,
      model: selectedModel
    });
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Generate Your Look</h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Advanced</span>
        </button>
      </div>

      {showAdvanced && (
        <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
          <h4 className="text-sm font-medium text-white mb-3">AI Model Selection</h4>
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="model"
                value="flux-kontext"
                checked={selectedModel === 'flux-kontext'}
                onChange={(e) => setSelectedModel(e.target.value as 'flux-kontext')}
                className="mt-1"
              />
              <div>
                <div className="text-white font-medium">Flux Kontext</div>
                <div className="text-slate-400 text-xs">Fast generation with good quality</div>
              </div>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="model"
                value="nano-banana"
                checked={selectedModel === 'nano-banana'}
                onChange={(e) => setSelectedModel(e.target.value as 'nano-banana')}
                className="mt-1"
              />
              <div>
                <div className="text-white font-medium">Nano Banana</div>
                <div className="text-slate-400 text-xs">High-precision edits and refinements</div>
              </div>
            </label>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${userPhoto ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          <span className={`text-sm ${userPhoto ? 'text-emerald-400' : 'text-slate-400'}`}>
            Your Photo {userPhoto ? '✓' : ''}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${clothingPhoto ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          <span className={`text-sm ${clothingPhoto ? 'text-emerald-400' : 'text-slate-400'}`}>
            Clothing Item {clothingPhoto ? '✓' : ''}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${selectedStyle ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          <span className={`text-sm ${selectedStyle ? 'text-emerald-400' : 'text-slate-400'}`}>
            Style Template {selectedStyle ? `(${selectedStyle.name})` : ''}
          </span>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!canGenerate || isGenerating}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
          canGenerate && !isGenerating
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
        }`}
      >
        {isGenerating ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Wand2 className="h-5 w-5" />
            <span>Generate Look</span>
          </div>
        )}
      </button>

      {selectedStyle?.premium && (
        <p className="text-xs text-amber-400 mt-2 text-center">
          Premium style - 3 credits per generation
        </p>
      )}
    </div>
  );
}