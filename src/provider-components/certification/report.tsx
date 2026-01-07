'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';

interface ReportProps {
  onBack: () => void;
}

/** Status of a processing step in the certification workflow */
type StepStatus = 'completed' | 'in-progress' | 'pending';

/** Severity level for certification findings */
type Severity = 'pass' | 'fail' | 'warning';

interface ProcessingStep {
  id: string;
  title: string;
  status: StepStatus;
  timestamp?: string;
  icon: string;
}

interface Finding {
  id: string;
  title: string;
  severity: Severity;
}

// Helper functions for styling
const getStepStatusColor = (status: StepStatus) => {
  switch (status) {
    case 'completed': return 'text-[#00d9ff]';
    case 'in-progress': return 'text-[#00d9ff]';
    default: return 'text-gray-500';
  }
};

const getSeverityBorderColor = (severity: Severity) => {
  switch (severity) {
    case 'pass': return '#10b981';
    case 'fail': return '#ef4444';
    default: return '#f59e0b';
  }
};

const getSeverityBadgeClass = (severity: Severity) => {
  switch (severity) {
    case 'pass': return 'bg-green-500/20 text-green-400';
    case 'fail': return 'bg-red-500/20 text-red-400';
    default: return 'bg-yellow-500/20 text-yellow-400';
  }
};

const getSeverityLabel = (severity: Severity) => {
  switch (severity) {
    case 'pass': return 'Pass';
    case 'fail': return 'Fail';
    default: return 'Warning';
  }
};

const Report = ({ onBack }: ReportProps) => {
  const processingSteps: ProcessingStep[] = [
    {
      id: '1',
      title: 'Media Uploaded',
      status: 'completed',
      timestamp: 'June 7, 2023 08:15',
      icon: '/provider/certificates/image.png',
    },
    {
      id: '2',
      title: 'Structure AI Analysis',
      status: 'completed',
      timestamp: 'Completed June 7, 2023 08:45',
      icon: '/provider/certificates/strutureAI.png',
    },
    {
      id: '3',
      title: 'Paint AI Analysis',
      status: 'completed',
      timestamp: 'Completed June 7, 2023 10:20',
      icon: '/provider/certificates/paint.png',
    },
    {
      id: '4',
      title: 'Glass AI Analysis',
      status: 'in-progress',
      timestamp: 'In progress (80% complete)',
      icon: '/provider/certificates/glass.png',
    },
    {
      id: '5',
      title: 'Interior & Functionality AI',
      status: 'pending',
      icon: '/provider/certificates/enterior.png',
    },
    {
      id: '6',
      title: 'Final Report Generation',
      status: 'pending',
      icon: '/provider/certificates/robot.png',
    },
  ];

  const structureFindings: Finding[] = [
    {
      id: '1',
      title: 'Chassis integrity: No structural damage detected',
      severity: 'pass',
    },
    {
      id: '2',
      title: 'Front right frame: Minor bending detected (2-3cm deviation)',
      severity: 'fail',
    },
    {
      id: '3',
      title: 'Underbody: No corrosion or significant damage',
      severity: 'pass',
    },
  ];

  const paintFindings: Finding[] = [
    {
      id: '1',
      title: 'Paint matching: Front bumper shows 8% color variance',
      severity: 'warning',
    },
    {
      id: '2',
      title: 'Door panels: Paint thickness consistent, no overspray',
      severity: 'pass',
    },
  ];

  const adminRequest = {
    date: 'June 7, 2023 11:30',
    message:
      'Please provide additional close-up photos of the front right frame area where bending was detected. We need clear images at angles 45° and 90° to complete the structural assessment.',
  };

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      {/* Left Sidebar - Processing Status */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-[#23234B] rounded-lg p-6 sticky top-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Processing Status</h2>
            <Badge className="bg-[#00d9ff]/20 text-[#00d9ff] hover:bg-[#00d9ff]/20 border-0">
              In Progress
            </Badge>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm">AI analysis is 80% complete</p>
          </div>

          <div className="space-y-4">
            {processingSteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-3 bg-[#23234B] p-2 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-[#2a2f4a] flex items-center justify-center flex-shrink-0 relative">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm font-medium mb-1 ${getStepStatusColor(step.status)}`}
                  >
                    {step.title}
                  </h3>
                  {step.timestamp && (
                    <p className="text-xs text-gray-500">{step.timestamp}</p>
                  )}
                  {step.status === 'pending' && (
                    <p className="text-xs text-gray-600">Pending</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content - Final AI Report */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white mb-2">Final AI report</h1>
        </div>

        <div className="space-y-8">
          {/* Structure AI Findings */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Structure AI Findings
            </h2>
            <div className="space-y-3">
              {structureFindings.map((finding) => (
                <div
                  key={finding.id}
                  className="bg-[#23234B] rounded-lg p-4 border-l-4"
                  style={{
                    borderLeftColor: getSeverityBorderColor(finding.severity),
                  }}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-300 text-sm flex-1">{finding.title}</p>
                    <Badge
                      className={`ml-3 border-0 ${getSeverityBadgeClass(finding.severity)}`}
                    >
                      {getSeverityLabel(finding.severity)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paint AI Findings */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Paint AI Findings</h2>
            <div className="space-y-3">
              {paintFindings.map((finding) => (
                <div
                  key={finding.id}
                  className="bg-[#23234B] rounded-lg p-4 border-l-4"
                  style={{
                    borderLeftColor: getSeverityBorderColor(finding.severity),
                  }}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-gray-300 text-sm flex-1">{finding.title}</p>
                    <Badge
                      className={`ml-3 border-0 ${getSeverityBadgeClass(finding.severity)}`}
                    >
                      {getSeverityLabel(finding.severity)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Request for Corrections */}
          <div className="bg-[#23234B] rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <span className="text-green-400">Admin Request for Corrections</span>
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-gray-500">Request Date: {adminRequest.date}</p>
              <p className="text-sm text-gray-300">{adminRequest.message}</p>
            </div>
            <Button className="bg-transparent border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff]/10">
              Contact Admin
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-12">
          <Link href="/provider/certification">
            <Button
              variant="outline"
              className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Back
            </Button>
          </Link>
          <Button className="bg-[#00d9ff] hover:bg-[#00b8d9] text-white flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Report;