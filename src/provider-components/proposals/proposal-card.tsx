'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProposalCardProps {
  id: string;
  title: string;
  requestId: string;
  proposalId: string;
  imageSrc: string;
  deliveryTime: string;
  yourQuote: string;
  warranty: string;
  submitted: string;
  technicalNotes: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  clientFeedback?: string;
}

export const ProposalCard = ({
  id,
  title,
  requestId,
  proposalId,
  imageSrc,
  deliveryTime,
  yourQuote,
  warranty,
  submitted,
  technicalNotes,
  status,
  clientFeedback,
}: ProposalCardProps) => {
  return (
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
        <Badge
          className={`border-0 text-sm font-medium ${
            status === 'Accepted'
              ? 'bg-transparent text-[#00FF88]'
              : status === 'Rejected'
              ? 'bg-transparent text-[#FF6B6B]'
              : 'bg-transparent text-[#00d9ff]'
          }`}
        >
          {status}
        </Badge>
      </div>

      {/* Title and IDs */}
      <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">
        {requestId} • Proposal {proposalId}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-white text-sm font-semibold mb-1">Delivery Time</p>
          <p className="text-gray-400 text-sm">{deliveryTime}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Your Quote</p>
          <p className="text-gray-400 text-sm">{yourQuote}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Delivery Time</p>
          <p className="text-gray-400 text-sm">{deliveryTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-white text-sm font-semibold mb-1">Warranty</p>
          <p className="text-gray-400 text-sm">{warranty}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-1">Submitted</p>
          <p className="text-gray-400 text-sm">{submitted}</p>
        </div>
      </div>

      {/* Technical Notes */}
      <div className="mb-6">
        <p className="text-white text-sm font-semibold mb-2">Your Technical Notes:</p>
        <p className="text-gray-400 text-sm leading-relaxed">
          "{technicalNotes}"
        </p>
      </div>

      {/* Client Feedback - Only for Accepted/Rejected */}
      {clientFeedback && (
        <div
          className={`border-l-4 rounded-lg p-4 mb-6 ${
            status === 'Accepted'
              ? 'bg-[#23234B] border-[#00FF88]'
              : 'bg-[#23234B] border-[#FF6B6B]'
          }`}
        >
          <h4
            className={`text-sm font-semibold mb-2 ${
              status === 'Accepted' ? 'text-[#00FF88]' : 'text-[#FF6B6B]'
            }`}
          >
            Client Feedback
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            "{clientFeedback}"
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto">
        {status === 'Pending' && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Edit Proposal
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Withdraw
            </Button>
          </div>
        )}

        {status === 'Accepted' && (
          <Button className="w-full bg-[#00d9ff] hover:bg-[#00b8d9] text-white font-medium py-3 rounded-lg">
            Start Job
          </Button>
        )}

        {status === 'Rejected' && (
          <Button
            variant="outline"
            className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 py-3"
          >
            Resubmit with New Quote
          </Button>
        )}
      </div>
    </div>
  );
};
