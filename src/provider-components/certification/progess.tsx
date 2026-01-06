'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProgressProps {
  onBack: () => void;
  onViewResults: () => void;
}

interface AIModuleStatus {
  id: string;
  name: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'pending';
}

// Helper function to update module status at specific index
const updateModuleStatus = (
  modules: AIModuleStatus[],
  completedIndex: number | null,
  inProgressIndex: number | null
): AIModuleStatus[] => {
  return modules.map((m, i) => {
    if (completedIndex !== null && i === completedIndex) {
      return { ...m, status: 'completed' as const };
    }
    if (inProgressIndex !== null && i === inProgressIndex) {
      return { ...m, status: 'in-progress' as const };
    }
    return m;
  });
};

const Progress = ({ onBack, onViewResults }: ProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<AIModuleStatus[]>([
    {
      id: 'structure',
      name: 'Structure AI',
      icon: '/provider/certificates/strutureAI.png',
      status: 'pending',
    },
    {
      id: 'paint',
      name: 'Paint AI',
      icon: '/provider/certificates/paint.png',
      status: 'pending',
    },
    {
      id: 'glass',
      name: 'Glass AI',
      icon: '/provider/certificates/glass.png',
      status: 'pending',
    },
    {
      id: 'interior',
      name: 'Interior AI',
      icon: '/provider/certificates/enterior.png',
      status: 'pending',
    },
  ]);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Simulate module status updates
    const statusTimeouts = [
      setTimeout(() => {
        setModules(prev => updateModuleStatus(prev, null, 0));
      }, 500),
      setTimeout(() => {
        setModules(prev => updateModuleStatus(prev, 0, 1));
      }, 1500),
      setTimeout(() => {
        setModules(prev => updateModuleStatus(prev, 1, 2));
      }, 2500),
      setTimeout(() => {
        setModules(prev => updateModuleStatus(prev, 2, 3));
      }, 3000),
      setTimeout(() => {
        setModules(prev => updateModuleStatus(prev, 3, null));
      }, 3500),
    ];

    return () => {
      clearInterval(progressInterval);
      statusTimeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  const isComplete = progress === 100 && modules.every(m => m.status === 'completed');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        {/* Robot Icon */}
        <div className="w-24 h-24 mb-6 relative">
          <Image
            src="/provider/certificates/robot.png"
            alt="AI Robot"
            fill
            className="object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-white mb-2">AI Analysis in Progress</h1>
        <p className="text-gray-400 text-sm">
          Our AI is analyzing your vehicle media. This may take 2-3 minutes.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="w-full h-2 bg-[#1a1f3a] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00d9ff] to-[#0099ff] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* AI Modules Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-[#24244C] rounded-lg p-6 flex flex-col items-center text-center space-y-3 border-2 border-transparent transition-all"
            style={{
              borderColor: module.status === 'in-progress' ? '#00d9ff' : 'transparent',
            }}
          >
            <div className="w-16 h-16 relative">
              <Image
                src={module.icon}
                alt={module.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-white font-medium text-sm">{module.name}</h3>
            <div className="flex items-center gap-2">
              {module.status === 'completed' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-green-400 text-xs">Completed</span>
                </>
              )}
              {module.status === 'in-progress' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
                  <span className="text-[#00d9ff] text-xs">In Progress</span>
                </>
              )}
              {module.status === 'pending' && (
                <>
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                  <span className="text-gray-500 text-xs">Pending</span>
                </>
              )}
            </div>
          </div>
        ))}
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
        {isComplete && (
          <Button
            onClick={onViewResults}
            className="bg-[#00d9ff] hover:bg-[#00b8d9] text-white flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Preview Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default Progress;