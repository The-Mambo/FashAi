import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { StyleGrid } from './components/StyleGrid';
import { GenerationPanel } from './components/GenerationPanel';
import { ResultsGallery } from './components/ResultsGallery';
import { LoadingOverlay } from './components/LoadingOverlay';
import { useGeneration } from './hooks/useGeneration';
import { UploadedImage, StyleTemplate, GenerationRequest } from './types';

function App() {
  const [userPhoto, setUserPhoto] = useState<UploadedImage>();
  const [clothingPhoto, setClothingPhoto] = useState<UploadedImage>();
  const [selectedStyle, setSelectedStyle] = useState<StyleTemplate>();
  const [activeTab, setActiveTab] = useState<'upload' | 'styles' | 'results'>('upload');

  const { results, isGenerating, error, generateImage, deleteResult } = useGeneration();

  const handleGenerate = async (request: GenerationRequest) => {
    try {
      await generateImage(request);
      setActiveTab('results');
    } catch (err) {
      console.error('Generation failed:', err);
    }
  };

  const resetUploads = () => {
    setUserPhoto(undefined);
    setClothingPhoto(undefined);
    setSelectedStyle(undefined);
    setActiveTab('upload');
  };

  // Auto-advance tabs based on completion
  React.useEffect(() => {
    if (userPhoto && clothingPhoto && activeTab === 'upload') {
      setActiveTab('styles');
    }
  }, [userPhoto, clothingPhoto, activeTab]);

  const progress = {
    upload: userPhoto && clothingPhoto ? 100 : (userPhoto || clothingPhoto) ? 50 : 0,
    styles: selectedStyle ? 100 : 0,
    generate: results.length > 0 ? 100 : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <Header />
      <LoadingOverlay isVisible={isGenerating} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8 mb-8">
            {[
              { id: 'upload', label: 'Upload Photos', progress: progress.upload },
              { id: 'styles', label: 'Choose Style', progress: progress.styles },
              { id: 'results', label: 'Generate & View', progress: progress.generate },
            ].map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                    activeTab === step.id
                      ? 'bg-purple-500 border-purple-500 text-white'
                      : step.progress === 100
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-600 text-slate-400'
                  }`}
                  onClick={() => setActiveTab(step.id as any)}
                >
                  {step.progress === 100 && activeTab !== step.id ? '✓' : index + 1}
                </div>
                <span className={`ml-3 font-medium ${
                  activeTab === step.id ? 'text-white' : 'text-slate-400'
                }`}>
                  {step.label}
                </span>
                {index < 2 && (
                  <div className="w-16 h-0.5 bg-slate-700 mx-4 relative">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            <p className="font-medium">Generation Error</p>
            <p className="text-sm text-red-300 mt-1">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            {activeTab === 'upload' && (
              <UploadSection
                userPhoto={userPhoto}
                clothingPhoto={clothingPhoto}
                onUserPhotoUpload={setUserPhoto}
                onClothingPhotoUpload={setClothingPhoto}
                onRemoveUserPhoto={() => setUserPhoto(undefined)}
                onRemoveClothingPhoto={() => setClothingPhoto(undefined)}
              />
            )}

            {activeTab === 'styles' && (
              <StyleGrid
                selectedStyle={selectedStyle}
                onStyleSelect={setSelectedStyle}
              />
            )}

            {activeTab === 'results' && (
              <ResultsGallery
                results={results}
                onDelete={deleteResult}
              />
            )}
          </div>

          {/* Generation Panel Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              <GenerationPanel
                userPhoto={userPhoto}
                clothingPhoto={clothingPhoto}
                selectedStyle={selectedStyle}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
              />

              {/* Quick Actions */}
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h4 className="text-white font-medium mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
                  >
                    Change Photos
                  </button>
                  <button
                    onClick={() => setActiveTab('styles')}
                    className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
                  >
                    Browse Styles
                  </button>
                  <button
                    onClick={resetUploads}
                    className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm"
                  >
                    Start Over
                  </button>
                </div>
              </div>

              {/* Recent Styles */}
              {results.length > 0 && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-medium mb-4">Recent Styles</h4>
                  <div className="space-y-2">
                    {results.slice(0, 3).map((result) => (
                      <div key={result.id} className="flex items-center space-x-3">
                        <img
                          src={result.imageUrl}
                          alt="Recent generation"
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{result.styleUsed}</p>
                          <p className="text-xs text-slate-400">{result.createdAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;