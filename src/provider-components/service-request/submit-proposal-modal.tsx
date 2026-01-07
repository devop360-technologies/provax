'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

interface SubmitProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
}

export const SubmitProposalModal = ({ isOpen, onClose, requestId }: SubmitProposalModalProps) => {
  const [proposedPrice, setProposedPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [warranty, setWarranty] = useState('');
  const [technicalNotes, setTechnicalNotes] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Handle proposal submission
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1D1D41] border-[#2a2f4a] max-w-4xl max-h-[97vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg font-semibold">
              Submit Proposal
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {/* <X className="w-5 h-5" /> */}
            </button>
          </div>
          <p className="text-gray-400 text-[11px] mt-1">For Request: {requestId}</p>
        </DialogHeader>

        <div className="space-y-3 mt-3">
          {/* Proposed Price and Delivery Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="proposal-price" className="text-white text-[12px] font-medium mb-2 block">
                Proposed Price ($)
              </label>
              <Input
                id="proposal-price"
                type="number"
                value={proposedPrice}
                onChange={(e) => setProposedPrice(e.target.value)}
                placeholder="Enter amount"
                className="bg-[#23234B] border-[#3a3f5a] text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <label htmlFor="proposal-delivery-time" className="text-white text-[12px] font-medium mb-2 block">
                Delivery Time (Days)
              </label>
              <Input
                id="proposal-delivery-time"
                type="number"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                placeholder="Enter days"
                className="bg-[#23234B] border-[#3a3f5a] text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Warranty Offered */}
          <div>
            <label htmlFor="proposal-warranty" className="text-white text-[12px] font-medium mb-2 block">
              Warranty Offered
            </label>
            <Select value={warranty} onValueChange={setWarranty}>
              <SelectTrigger id="proposal-warranty" className="bg-[#262656] border-[#3a3f5a] text-white">
                <SelectValue placeholder="Select warranty period" />
              </SelectTrigger>
              <SelectContent className="bg-[#262656] border-[#3a3f5a]">
                <SelectItem value="30-days" className="text-white">30 Days</SelectItem>
                <SelectItem value="60-days" className="text-white">60 Days</SelectItem>
                <SelectItem value="90-days" className="text-white">90 Days</SelectItem>
                <SelectItem value="6-months" className="text-white">6 Months</SelectItem>
                <SelectItem value="1-year" className="text-white">1 Year</SelectItem>
                <SelectItem value="2-years" className="text-white">2 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Technical Notes & Approach */}
          <div>
            <label htmlFor="proposal-technical-notes" className="text-white text-[12px] font-medium mb-2 block">
              Technical Notes & Approach
            </label>
            <Textarea
              id="proposal-technical-notes"
              value={technicalNotes}
              onChange={(e) => setTechnicalNotes(e.target.value)}
              placeholder="Describe your approach to the repair, parts you'll use, and any special considerations..."
              rows={5}
              className="bg-[#262656] border-[#3a3f5a] text-white placeholder:text-gray-500 resize-none"
            />
          </div>

          {/* Attachments */}
          <div>
            <label htmlFor="proposal-file-input" className="text-white text-[12px] font-medium mb-2 block">
              Attachments (Optional)
            </label>
            <label
              htmlFor="proposal-file-input"
              className="border-2 border-dashed border-[#3a3f5a] rounded-lg p-8 text-center bg-[#2C2C68] hover:border-[#4a4f6a] transition-colors cursor-pointer block"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#2C2C68] flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-[#00d9ff]" />
                </div>
                <p className="text-gray-400 text-[12px]">
                  Click to upload supporting documents, diagrams, or photos
                </p>
              </div>
              <input
                id="proposal-file-input"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-1 ">
                {attachments.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between bg-[#2a2f4a] rounded-lg p-3"
                  >
                    <span className="text-white text-sm truncate flex-1">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove attachment"
                      onClick={() => removeAttachment(index)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-1">
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 text-[12px] font-medium px-8"
          >
            Cancel
          </Button>
          <button
            onClick={handleSubmit}
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-8 py-2.5 rounded text-[12px] font-medium"
          >
            Submit Proposal
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
