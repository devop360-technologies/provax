'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface AIModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  selected: boolean;
}

interface MediaUploadProps {
  selectedModules: string[];
  onModuleToggle: (moduleId: string) => void;
  onNext: () => void;
}

export const MediaUpload = ({ selectedModules, onModuleToggle, onNext }: MediaUploadProps) => {
  const modules: AIModule[] = [
    {
      id: 'structure',
      name: 'Structure AI',
      description: 'Structural integrity analysis',
      icon: '/provider/certificates/strutureAI.png',
      selected: selectedModules.includes('structure'),
    },
    {
      id: 'paint',
      name: 'Paint AI',
      description: 'Paint quality and damage detection',
      icon: '/provider/certificates/paint.png',
      selected: selectedModules.includes('paint'),
    },
    {
      id: 'glass',
      name: 'Glass AI',
      description: 'Window and windshield inspection',
      icon: '/provider/certificates/glass.png',
      selected: selectedModules.includes('glass'),
    },
    {
      id: 'interior',
      name: 'Interior & Functionality AI',
      description: 'Interior condition and functions check',
      icon: '/provider/certificates/enterior.png',
      selected: selectedModules.includes('interior'),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Media Upload</h1>
        <p className="text-gray-400 text-sm">
          Enter vehicle details and select AI modules for analysis
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-white mb-4">Certification Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => (
            <Card
              key={module.id}
              onClick={() => onModuleToggle(module.id)}
              className={`bg-[#24244C] border-2 border-[#37373e] transition-all cursor-pointer hover:border-[#00d9ff] p-6 ${
                module.selected ? 'border-[#00d9ff]' : 'border-transparent'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 relative">
                  <Image
                    src={module.icon}
                    alt={module.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-white font-medium text-sm">{module.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {module.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
