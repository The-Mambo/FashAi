import React from 'react';
import { ImageUpload } from './ImageUpload';
import { UploadedImage } from '../types';

interface UploadSectionProps {
  userPhoto?: UploadedImage;
  clothingPhoto?: UploadedImage;
  onUserPhotoUpload: (image: UploadedImage) => void;
  onClothingPhotoUpload: (image: UploadedImage) => void;
  onRemoveUserPhoto: () => void;
  onRemoveClothingPhoto: () => void;
}

export function UploadSection({
  userPhoto,
  clothingPhoto,
  onUserPhotoUpload,
  onClothingPhotoUpload,
  onRemoveUserPhoto,
  onRemoveClothingPhoto,
}: UploadSectionProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Your Images</h2>
        <p className="text-slate-400">Start by uploading a photo of yourself and the clothing item you want to try on</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Your Photo</h3>
          <ImageUpload
            type="user"
            onImageUpload={onUserPhotoUpload}
            uploadedImage={userPhoto}
            onRemoveImage={onRemoveUserPhoto}
          />
          <div className="mt-3 space-y-2">
            <p className="text-xs text-slate-500">Tips for best results:</p>
            <ul className="text-xs text-slate-400 space-y-1 ml-4">
              <li>• Face the camera directly</li>
              <li>• Good lighting, avoid shadows</li>
              <li>• Full body or upper body shots work best</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Clothing Item</h3>
          <ImageUpload
            type="clothing"
            onImageUpload={onClothingPhotoUpload}
            uploadedImage={clothingPhoto}
            onRemoveImage={onRemoveClothingPhoto}
          />
          <div className="mt-3 space-y-2">
            <p className="text-xs text-slate-500">Upload guidelines:</p>
            <ul className="text-xs text-slate-400 space-y-1 ml-4">
              <li>• Clear, well-lit clothing photos</li>
              <li>• Flat lay or modeled clothing</li>
              <li>• Avoid busy backgrounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
</parameter>