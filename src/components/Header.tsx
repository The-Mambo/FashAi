import React from 'react';
import { Camera, Sparkles, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">StyleCraft AI</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Gallery</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Templates</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-slate-800 rounded-full">
              <Camera className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-slate-300">12 Credits</span>
            </div>
            <button className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
              <User className="h-5 w-5 text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}