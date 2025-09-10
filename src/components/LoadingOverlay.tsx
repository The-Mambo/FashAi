import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({ isVisible, message = 'Generating your AI look...' }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md mx-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <Loader2 className="absolute inset-0 h-16 w-16 text-purple-400 animate-spin" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">AI Magic in Progress</h3>
        <p className="text-slate-400 mb-4">{message}</p>
        
        <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
        
        <p className="text-xs text-slate-500">This usually takes 30-60 seconds</p>
      </div>
    </div>
  );
}