'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubmitProposalModal } from './submit-proposal-modal';
import { InfoGrid, HighlightedSection, CardDescription } from '@/components/ui/card-components';

interface ServiceRequestCardProps {
  id: string;
  title: string;
  requestId: string;
  budget: string;
  location: string;
  category: string;
  posted: string;
  clientDescription: string;
  imageSrc: string;
  diagnosticFindings: string[];
  status: 'Open' | 'Closed';
}

export const ServiceRequestCard = ({
  title,
  requestId,
  budget,
  location,
  category,
  posted,
  clientDescription,
  imageSrc,
  diagnosticFindings,
  status,
}: ServiceRequestCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const infoItems = [
    { label: "Budget", value: budget },
    { label: "Location", value: location },
    { label: "Category", value: category },
    { label: "Posted", value: posted },
  ];

  return (
    <>
    <div className="bg-[#202047] rounded-2xl p-6 flex flex-col h-full">
      {/* Header with Image and Status */}
      <div className="flex items-start justify-between mb-6">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-800 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={title}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <Badge className="bg-transparent border-0 text-[#00d9ff] hover:bg-transparent text-sm font-medium">
          {status}
        </Badge>
      </div>

      {/* Title and Request ID */}
      <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{requestId}</p>

      {/* Info Grid */}
      <InfoGrid items={infoItems} className="mb-6" />

      {/* Client Description */}
      <CardDescription 
        title="Client Description:" 
        description={clientDescription} 
        quoted 
        className="mb-6" 
      />

        {/* AI Diagnostic Report */}
        <HighlightedSection 
          title="AI Diagnostic Report" 
          subtitle="The client uploaded an AI vehicle scan."
          className="mb-6 flex-grow"
        >
          <ul className="space-y-2">
            {diagnosticFindings.map((finding) => (
              <li key={finding} className="flex items-start gap-2 text-gray-400 text-xs">
                <span className="text-[#00d9ff] mt-1">•</span>
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </HighlightedSection>

      {/* Submit Button */}
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-[#3083FF] hover:bg-[#007ACC] text-white font-medium py-3 rounded-lg"
      >
        Submit Proposal
      </Button>
    </div>

    <SubmitProposalModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      requestId={requestId}
    />
    </>
  );
};
