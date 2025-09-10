import { useState } from 'react';
import { GenerationRequest, GenerationResult } from '../types';
import { ReplicateService } from '../utils/replicate';

export function useGeneration() {
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async (request: GenerationRequest) => {
    setIsGenerating(true);
    setError(null);

    try {
      // For demo purposes, using mock generation
      // Replace with ReplicateService.generateImage(request) when API keys are configured
      const result = await ReplicateService.mockGeneration(request);
      setResults(prev => [result, ...prev]);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Generation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteResult = (result: GenerationResult) => {
    setResults(prev => prev.filter(r => r.id !== result.id));
  };

  const regenerateImage = async (result: GenerationResult) => {
    // This would need the original request data stored with the result
    // For now, we'll just create a placeholder
    console.log('Regenerate:', result.id);
  };

  return {
    results,
    isGenerating,
    error,
    generateImage,
    deleteResult,
    regenerateImage,
  };
}