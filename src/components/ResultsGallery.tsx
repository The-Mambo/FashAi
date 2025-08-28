import React from 'react';
import { Download, Share2, Heart, RotateCcw, Trash2 } from 'lucide-react';
import { GenerationResult } from '../types';

interface ResultsGalleryProps {
  results: GenerationResult[];
  onRegeneerate?: (result: GenerationResult) => void;
  onDelete?: (result: GenerationResult) => void;
}

export function ResultsGallery({ results, onRegeneerate, onDelete }: ResultsGalleryProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-6 bg-slate-800 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
          <Heart className="h-8 w-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No generations yet</h3>
        <p className="text-slate-400">Upload your photos and select a style to get started!</p>
      </div>
    );
  }

  const handleDownload = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Your AI Generations</h2>
          <p className="text-slate-400">{results.length} generation{results.length !== 1 ? 's' : ''} created</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.id} className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={result.imageUrl}
                alt={`Generated in ${result.styleUsed} style`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDownload(result.imageUrl, `stylecraft-${result.id}.jpg`)}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                  >
                    <Download className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Share2 className="h-5 w-5 text-white" />
                  </button>
                  <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Result info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{result.styleUsed}</h3>
                  <p className="text-sm text-slate-400 capitalize">{result.model.replace('-', ' ')}</p>
                </div>
                <div className="text-xs text-slate-500">
                  {result.createdAt.toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  result.status === 'completed' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : result.status === 'processing'
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {result.status}
                </div>

                <div className="flex items-center space-x-2">
                  {onRegeneerate && (
                    <button
                      onClick={() => onRegeneerate(result)}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                      title="Regenerate"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(result)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}