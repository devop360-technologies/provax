'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Upload, Check, X } from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

interface UploadVehicleMediaProps {
  onBack: () => void;
  onStartProcessing: (files: MediaFile[]) => void;
}

const UploadVehicleMedia = ({ onBack, onStartProcessing }: UploadVehicleMediaProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const newFiles: MediaFile[] = files.map(file => {
      const isVideo = file.type.startsWith('video/');
      return {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: isVideo ? '/provider/certificates/video.png' : URL.createObjectURL(file),
        type: isVideo ? 'video' : 'image',
      };
    });
    
    setUploadedFiles(prev => [...prev, ...newFiles].slice(0, 6));
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const imageCount = uploadedFiles.filter(f => f.type === 'image').length;
  const canProceed = uploadedFiles.length >= 3; // Allow proceeding with at least 3 files

  const requirements = [
    { text: 'Side photos (left + right)', checked: imageCount >= 1 },
    { text: 'Front and rear photos', checked: uploadedFiles.length >= 2 },
    { text: 'Chassis and underbody photos', checked: uploadedFiles.length >= 3 },
    { text: 'Clear, well-lit images without shadows', checked: uploadedFiles.length >= 3 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Upload Vehicle Media</h1>
        <p className="text-gray-400 text-sm">
          Upload photos and videos required for the selected AI modules
        </p>
      </div>

      {/* Media Requirements */}
      <div className="bg-[#24244C] rounded-lg p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm mb-2">
              Media Requirements for Structure AI
            </h3>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  {req.checked ? (
                    <Check className="w-4 h-4 text-[#00d9ff]" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
                  )}
                  <span className={`text-sm ${req.checked ? 'text-[#00d9ff]' : 'text-gray-400'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 mb-6 transition-colors ${
          isDragging
            ? 'border-[#00d9ff] bg-[#00d9ff]/5'
            : 'border-[#2a2f4a] bg-[#1D1D41]'
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#2a2f4a] flex items-center justify-center mb-4">
            <Upload className="w-10 h-10 text-[#00d9ff]" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">
            Drag & Drop or Click to Upload
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Supported formats: JPG, PNG, MP4, MOV (Max 50MB each)
          </p>
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/jpeg,image/png,video/mp4,video/quicktime"
            onChange={handleFileSelect}
            className="hidden"
          />
          <label htmlFor="file-upload">
            <Button
              type="button"
              className="bg-[#00d9ff] hover:bg-[#00b8d9] text-white"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select Files
            </Button>
          </label>
        </div>
      </div>

      {/* Uploaded Files Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {Array.from({ length: 6 }).map((_, index) => {
          const file = uploadedFiles[index];
          return (
            <div
              key={index}
              className="aspect-square bg-[#24244C] rounded-lg border-2 border-[#2a2f4a] relative overflow-hidden group"
            >
              {file ? (
                <>
                  <Image
                    src={file.preview}
                    alt={`Vehicle ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <div className="w-6 h-6 bg-black/50 rounded flex items-center justify-center">
                      <Image
                        src={file.type === 'image' ? '/provider/certificates/image.png' : '/provider/certificates/video.png'}
                        alt={file.type}
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Vehicle {String(index + 1).padStart(2, '0')}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          Back
        </Button>
        <Button
          onClick={() => onStartProcessing(uploadedFiles)}
          disabled={!canProceed}
          className={`${
            canProceed
              ? 'bg-[#00d9ff] hover:bg-[#00b8d9] text-white'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start AI Processing
        </Button>
      </div>
    </div>
  );
};

export default UploadVehicleMedia;