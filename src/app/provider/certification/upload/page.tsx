'use client';

import React, { useState } from 'react';
import { MediaUpload } from '@/provider-components/certification/media-upload';
import UploadVehicleMedia from '@/provider-components/certification/Upload-Vehicle-Media';
import Progress from '@/provider-components/certification/progess';
import Report from '@/provider-components/certification/report';

type Step = 'module-selection' | 'media-upload' | 'processing' | 'report';

interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

export default function CertificationUploadPage() {
  const [currentStep, setCurrentStep] = useState<Step>('module-selection');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<MediaFile[]>([]);

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleNextFromModules = () => {
    if (selectedModules.length > 0) {
      setCurrentStep('media-upload');
    }
  };

  const handleBackToModules = () => {
    setCurrentStep('module-selection');
  };

  const handleStartProcessing = (files: MediaFile[]) => {
    setUploadedFiles(files);
    setCurrentStep('processing');
  };

  const handleBackToUpload = () => {
    setCurrentStep('media-upload');
  };

  const handleViewResults = () => {
    setCurrentStep('report');
  };

  const handleBackToProcessing = () => {
    setCurrentStep('processing');
  };

  return (
    <div className="min-h-[70vh] bg-[#1D1D41] rounded-2xl mr-0 md:mr-7 p-6 md:p-8">
      {currentStep === 'module-selection' && (
        <div className="space-y-8">
          <MediaUpload
            selectedModules={selectedModules}
            onModuleToggle={handleModuleToggle}
            onNext={handleNextFromModules}
          />
          {selectedModules.length > 0 && (
            <div className="flex justify-end max-w-6xl mx-auto">
              <button
                onClick={handleNextFromModules}
                className="px-6 py-2 bg-[#00d9ff] hover:bg-[#00b8d9] text-white rounded-md font-medium transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {currentStep === 'media-upload' && (
        <UploadVehicleMedia
          onBack={handleBackToModules}
          onStartProcessing={handleStartProcessing}
        />
      )}

      {currentStep === 'processing' && (
        <Progress
          onBack={handleBackToUpload}
          onViewResults={handleViewResults}
        />
      )}

      {currentStep === 'report' && (
        <Report onBack={handleBackToProcessing} />
      )}
    </div>
  );
}
