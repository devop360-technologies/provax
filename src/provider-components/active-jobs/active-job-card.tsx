'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceMediaModal } from './service-media-modal';

interface ActiveJobCardProps {
  id: string;
  title: string;
  year: string;
  client: string;
  deadline: string;
  jobValue: string;
  escrowStatus: string;
  fullDescription: string;
  escrowInformation: {
    amount: string;
    text: string;
  };
  status: 'In Progress';
}

export const ActiveJobCard = ({
  id,
  title,
  year,
  client,
  deadline,
  jobValue,
  escrowStatus,
  fullDescription,
  escrowInformation,
  status,
}: ActiveJobCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#202047] rounded-2xl p-6 flex flex-col h-full">
        {/* Header with Status */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <Badge className="bg-transparent border-0 text-[#00d9ff] hover:bg-transparent text-sm font-medium">
            {status}
          </Badge>
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-4">{year}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">Client</p>
            <p className="text-gray-400 text-sm">{client}</p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-1">Deadline</p>
            <p className="text-gray-400 text-sm">{deadline}</p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-1">Job Value</p>
            <p className="text-gray-400 text-sm">{jobValue}</p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-1">Escrow Status</p>
            <p className="text-gray-400 text-sm">{escrowStatus}</p>
          </div>
        </div>

        {/* Full Description */}
        <div className="mb-6">
          <p className="text-white text-sm font-semibold mb-2">Full Description:</p>
          <p className="text-gray-400 text-[12px] leading-relaxed">
            {fullDescription}
          </p>
        </div>

        {/* Escrow Information */}
        <div className="bg-[#23234B] border-l-4 border-[#00FF88] rounded-lg p-4 mb-6 flex-grow">
          <h4 className="text-[#00FF88] text-sm font-semibold mb-2">
            Escrow Information
          </h4>
          <p className="text-[#5ecc99] text-lg font-bold mb-1">{escrowInformation.amount}</p>
          <p className="text-gray-400 text-xs">{escrowInformation.text}</p>
        </div>

        {/* Upload Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-1/3 bg-[#3083FF] hover:bg-[#1865d9] text-white font-medium py-3 rounded-lg"
        >
          Upload Media
        </Button>
      </div>

      <ServiceMediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={title}
      />
    </>
  );
};
