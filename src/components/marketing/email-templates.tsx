"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EmailTemplateCard } from "./email-template-card";
import { cn } from "@/lib/utils";

interface EmailTemplate {
  id: string;
  title: string;
  description: string;
  status: "Active" | "Draft";
}

interface EmailTemplatesProps {
  templates?: EmailTemplate[];
  onViewAll?: () => void;
  onEdit?: (id: string) => void;
  onTest?: (id: string) => void;
  onRestore?: (id: string) => void;
  className?: string;
}

export function EmailTemplates({
  templates = [
    {
      id: "1",
      title: "Welcome Email",
      description: "Sent to new users after registration",
      status: "Active",
    },
    {
      id: "2",
      title: "Password Reset",
      description: "Sent when users request password reset",
      status: "Active",
    },
    {
      id: "3",
      title: "Order Confirmation",
      description: "Sent after a successful purchase",
      status: "Draft",
    },
    {
      id: "4",
      title: "Payment Receipt",
      description: "Sent after successful payment",
      status: "Draft",
    },
  ],
  onViewAll,
  onEdit,
  onTest,
  onRestore,
  className,
}: EmailTemplatesProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-white">
          Transactional Email Templates
        </h2>
        <Button
          onClick={onViewAll}
          className="h-8 rounded-lg border border-[#3B82F6] bg-transparent px-4 text-xs font-medium text-[#3B82F6] hover:bg-[#3B82F6]/10"
        >
          View All Templates
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <EmailTemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            status={template.status}
            onEdit={() => onEdit?.(template.id)}
            onTest={() => onTest?.(template.id)}
            onRestore={() => onRestore?.(template.id)}
          />
        ))}
      </div>
    </div>
  );
}
