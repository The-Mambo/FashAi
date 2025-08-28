export interface StyleTemplate {
  id: string;
  name: string;
  category: 'luxury' | 'professional' | 'creative' | 'lifestyle';
  description: string;
  thumbnail: string;
  prompt: string;
  tags: string[];
  premium?: boolean;
}

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  type: 'user' | 'clothing';
}

export interface GenerationRequest {
  userPhoto: UploadedImage;
  clothingPhoto: UploadedImage;
  styleTemplate: StyleTemplate;
  model: 'flux-kontext' | 'nano-banana';
}

export interface GenerationResult {
  id: string;
  imageUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  model: string;
  styleUsed: string;
  createdAt: Date;
}