import Replicate from 'replicate';
import { GenerationRequest, GenerationResult } from '../types';

// Note: In production, this should be handled server-side to keep API keys secure
const replicate = new Replicate({
  auth: import.meta.env.VITE_REPLICATE_API_TOKEN || '',
});

export class ReplicateService {
  static async generateImage(request: GenerationRequest): Promise<GenerationResult> {
    try {
      const { userPhoto, clothingPhoto, styleTemplate, model } = request;
      
      // Convert files to base64 for API
      const userImageData = await this.fileToBase64(userPhoto.file);
      const clothingImageData = await this.fileToBase64(clothingPhoto.file);
      
      let modelName: string;
      let input: any;

      if (model === 'flux-kontext') {
        // Flux model for initial generation
        modelName = 'black-forest-labs/flux-dev';
        input = {
          prompt: `${styleTemplate.prompt}, person wearing clothes, high quality, detailed, realistic`,
          image: userImageData,
          clothing_image: clothingImageData,
          num_inference_steps: 30,
          guidance_scale: 7.5,
        };
      } else {
        // Nano Banana for precision edits
        modelName = 'nateraw/stable-diffusion-2-1';
        input = {
          prompt: `${styleTemplate.prompt}, detailed clothing fit, precise generation`,
          init_image: userImageData,
          clothing_image: clothingImageData,
          strength: 0.8,
          guidance_scale: 7.5,
        };
      }

      const output = await replicate.run(modelName, { input });
      
      // Generate a result object
      const result: GenerationResult = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: Array.isArray(output) ? output[0] : output as string,
        status: 'completed',
        model: model,
        styleUsed: styleTemplate.name,
        createdAt: new Date(),
      };

      return result;
    } catch (error) {
      console.error('Generation failed:', error);
      throw new Error('Failed to generate image. Please try again.');
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Mock function for demo purposes - replace with actual Replicate API calls
  static async mockGeneration(request: GenerationRequest): Promise<GenerationResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
      status: 'completed',
      model: request.model,
      styleUsed: request.styleTemplate.name,
      createdAt: new Date(),
    };
  }
}