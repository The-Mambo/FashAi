import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { UploadedImage } from '../types';

interface ImageUploadProps {
  type: 'user' | 'clothing';
  onImageUpload: (image: UploadedImage) => void;
  uploadedImage?: UploadedImage;
  onRemoveImage?: () => void;
}

export function ImageUpload({ type, onImageUpload, uploadedImage, onRemoveImage }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const preview = URL.createObjectURL(imageFile);
      onImageUpload({
        id: Math.random().toString(36),
        file: imageFile,
        preview,
        type
      });
    }
  }, [onImageUpload, type]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      onImageUpload({
        id: Math.random().toString(36),
        file,
        preview,
        type
      });
    }
  }, [onImageUpload, type]);

  const title = type === 'user' ? 'Upload Your Photo' : 'Upload Clothing Item';
  const description = type === 'user' 
    ? 'Clear photo of yourself facing forward' 
    : 'Photo of the clothing item you want to try on';

  if (uploadedImage) {
    return (
      <div className="relative group">
        <img
          src={uploadedImage.preview}
          alt="Uploaded"
          className="w-full h-64 object-cover rounded-xl border border-slate-700"
        />
        <button
          onClick={onRemoveImage}
          className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
          {uploadedImage.file.name}
        </div>
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer hover:border-purple-400 ${
        isDragging ? 'border-purple-400 bg-purple-50/5' : 'border-slate-600'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-slate-800 rounded-full">
          <ImageIcon className="h-8 w-8 text-purple-400" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm mb-4">{description}</p>
          
          <div className="flex items-center justify-center space-x-2 text-purple-400">
            <Upload className="h-4 w-4" />
            <span className="text-sm">Drop your image here or click to browse</span>
          </div>
        </div>
      </div>
    </div>
  );
}