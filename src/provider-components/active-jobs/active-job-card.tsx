'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceMediaModal } from './service-media-modal';
import { InfoGrid, HighlightedSection, CardDescription } from '@/components/ui/card-components';

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

  const infoItems = [
    { label: "Client", value: client },
    { label: "Deadline", value: deadline },
    { label: "Job Value", value: jobValue },
    { label: "Escrow Status", value: escrowStatus },
  ];

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
        <InfoGrid items={infoItems} className="mb-4" />

        {/* Full Description */}
        <CardDescription 
          title="Full Description:" 
          description={fullDescription} 
          className="mb-6" 
        />

        {/* Escrow Information */}
        <HighlightedSection title="Escrow Information" className="mb-6 flex-grow">
          <p className="text-[#5ecc99] text-lg font-bold mb-1">{escrowInformation.amount}</p>
          <p className="text-gray-400 text-xs">{escrowInformation.text}</p>
        </HighlightedSection>

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
