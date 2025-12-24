'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SubmitProposalModal } from './submit-proposal-modal';

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
  id,
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
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-white text-sm font-semibold mb-1">Budget</p>
          <p className="text-gray-400 text-sm">{budget}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Location</p>
          <p className="text-gray-400 text-sm">{location}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Category</p>
          <p className="text-gray-400 text-sm">{category}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Posted</p>
          <p className="text-gray-400 text-sm">{posted}</p>
        </div>
      </div>

      {/* Client Description */}
      <div className="mb-6">
        <p className="text-white text-sm font-semibold mb-2">Client Description:</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          "{clientDescription}"
        </p>
      </div>

        {/* AI Diagnostic Report */}
        <div className="bg-[#23234B] border-l-4 border-[#00FF88] rounded-lg p-4 mb-6 flex-grow">
        <div className="mb-3">
          <h4 className="text-[#00FF88] text-sm font-semibold mb-1">
            AI Diagnostic Report
          </h4>
          <p className="text-gray-500 text-xs">
            The client uploaded an AI vehicle scan.
          </p>
        </div>
        <ul className="space-y-2">
          {diagnosticFindings.map((finding, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-400 text-xs">
              <span className="text-[#00d9ff] mt-1">•</span>
              <span>{finding}</span>
            </li>
          ))}
        </ul>
      </div>

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
