'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Plus } from 'lucide-react';

interface ServiceMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

interface Stage {
  id: string;
  name: string;
  photos: File[];
}

export const ServiceMediaModal = ({ isOpen, onClose, jobTitle }: ServiceMediaModalProps) => {
  const [beforePhotos, setBeforePhotos] = useState<File[]>([]);
  const [stages, setStages] = useState<Stage[]>([
    { id: '2', name: '', photos: [] }
  ]);
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);

  const handleBeforeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBeforePhotos(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleStageUpload = (stageId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStages(prev =>
        prev.map(stage =>
          stage.id === stageId
            ? { ...stage, photos: [...stage.photos, ...Array.from(e.target.files!)] }
            : stage
        )
      );
    }
  };

  const handleAfterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAfterPhotos(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const updateStageName = (stageId: string, name: string) => {
    setStages(prev =>
      prev.map(stage => (stage.id === stageId ? { ...stage, name } : stage))
    );
  };

  const addNewStage = () => {
    setStages(prev => [
      ...prev,
      { id: Date.now().toString(), name: '', photos: [] }
    ]);
  };

  const handleSubmit = () => {
    // TODO: Implement actual submission logic for service media
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D1D41] border-[#2a2f4a] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg font-semibold">
              Service Media
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {/* <X className="w-5 h-5" /> */}
            </button>
          </div>
        </DialogHeader>

        <div>
          <p className="text-gray-400 text-[12px] mb-2">
            Please upload the images with the completed work. Our support team will review your images and work towards a uploading them.
          </p>

          {/* Before Service Photos */}
          <div className="mb-8">
            <h3 className="text-white text-sm font-semibold mb-4">Before Service Photos</h3>
            <div
              className="border-2 border-dashed border-[#3a3f5a] rounded-lg p-8 text-center bg-[#1D1D41] hover:border-[#4a4f6a] transition-colors cursor-pointer"
              onClick={() => document.getElementById('before-upload')?.click()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#2a2f4a] flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-[#00d9ff]" />
                </div>
                <p className="text-white text-sm font-medium">Upload Photos</p>
              </div>
              <input
                id="before-upload"
                type="file"
                multiple
                onChange={handleBeforeUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            {beforePhotos.length > 0 && (
              <p className="text-gray-400 text-xs mt-2">{beforePhotos.length} photo(s) uploaded</p>
            )}
          </div>

          {/* Stages */}
          {stages.map((stage, index) => (
            <div key={stage.id} className="mb-8">
              <h3 className="text-white text-sm font-semibold mb-4">Stage {String(index + 1).padStart(2, '0')}</h3>
              
              <Input
                value={stage.name}
                onChange={(e) => updateStageName(stage.id, e.target.value)}
                placeholder="Name here"
                className="bg-[#262656] border-[#3a3f5a] text-white placeholder:text-gray-500 mb-4"
              />

              <div>
                <p className="text-white text-xs font-medium mb-3">Stage {String(index + 1).padStart(2, '0')} Photos</p>
                <div
                  className="border-2 border-dashed border-[#3a3f5a] rounded-lg p-8 text-center bg-[#1D1D41] hover:border-[#4a4f6a] transition-colors cursor-pointer"
                  onClick={() => document.getElementById(`stage-${stage.id}-upload`)?.click()}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#2a2f4a] flex items-center justify-center mb-3">
                      <Upload className="w-8 h-8 text-[#00d9ff]" />
                    </div>
                    <p className="text-white text-sm font-medium">Upload Photos</p>
                  </div>
                  <input
                    id={`stage-${stage.id}-upload`}
                    type="file"
                    multiple
                    onChange={(e) => handleStageUpload(stage.id, e)}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                {stage.photos.length > 0 && (
                  <p className="text-gray-400 text-xs mt-2">{stage.photos.length} photo(s) uploaded</p>
                )}
              </div>
            </div>
          ))}

          {/* Add New Stage Button */}
          <Button
            onClick={addNewStage}
            variant="outline"
            className="w-full bg-transparent border-[#3a3f5a] text-gray-300 hover:bg-gray-800 mb-8 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New
          </Button>

          {/* After Service Photos */}
          <div className="mb-8">
            <h3 className="text-white text-sm font-semibold mb-4">After Service Photos</h3>
            <div
              className="border-2 border-dashed border-[#3a3f5a] rounded-lg p-8 text-center bg-[#1D1D41] hover:border-[#4a4f6a] transition-colors cursor-pointer"
              onClick={() => document.getElementById('after-upload')?.click()}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#2a2f4a] flex items-center justify-center mb-3">
                  <Upload className="w-8 h-8 text-[#00d9ff]" />
                </div>
                <p className="text-white text-sm font-medium">Upload Photos</p>
              </div>
              <input
                id="after-upload"
                type="file"
                multiple
                onChange={handleAfterUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            {afterPhotos.length > 0 && (
              <p className="text-gray-400 text-xs mt-2">{afterPhotos.length} photo(s) uploaded</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-1">
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <button
            onClick={handleSubmit}
            className="bg-[#00d9ff] hover:bg-[#00b8d9] text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center"
          >
            Submit & Mark as Completed
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
