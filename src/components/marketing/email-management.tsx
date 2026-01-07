"use client";

import { useState } from "react";
import { EmailFilters } from "./email-filters";
import { EmailPerformanceChart } from "./email-performance-chart";
import { EmailTemplates } from "./email-templates";
import { MarketingCampaignsTable } from "./marketing-campaigns-table";
import { CreateEmailTemplateModal } from "./create-email-template-modal";
import { CreateMarketingCampaignModal } from "./create-marketing-campaign-modal";
import { cn } from "@/lib/utils";

interface EmailManagementProps {
  className?: string;
}

export function EmailManagement({ className }: EmailManagementProps) {
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] =
    useState(false);
  const [isCreateCampaignModalOpen, setIsCreateCampaignModalOpen] =
    useState(false);

  const handleCreateTemplate = (_templateData: Record<string, unknown>) => {
    // Template creation implementation placeholder
  };

  const handleCreateCampaign = (_campaignData: Record<string, unknown>) => {
    // Campaign creation implementation placeholder
  };

  return (
    <>
      <div className={cn("space-y-6", className)}>
        {/* Filters Section */}
        <EmailFilters
          onApplyFilters={() => { /* Filter application placeholder */ }}
          onCreateTemplate={() => setIsCreateTemplateModalOpen(true)}
          onCreateCampaign={() => setIsCreateCampaignModalOpen(true)}
        />

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <EmailPerformanceChart
            title="Email Performance Over Time"
            metric="Open Rate"
            color="blue"
          />
          <EmailPerformanceChart
            title="Email Performance Over Time"
            metric="Click Rate"
            color="green"
          />
        </div>

        {/* Full Width Chart */}
        <div>
          <EmailPerformanceChart
            title="Email Performance Over Time"
            metric="Conversion Rate"
            color="red"
          />
        </div>

        {/* Transactional Email Templates */}
        <div className="border-t border-[#404254] pt-6">
          <EmailTemplates
            onViewAll={() => { /* View all templates placeholder */ }}
            onEdit={(_id) => { /* Edit template placeholder */ }}
            onTest={(_id) => { /* Test template placeholder */ }}
            onRestore={(_id) => { /* Restore template placeholder */ }}
          />
        </div>

        {/* Marketing Campaigns */}
        <div className="border-t border-[#404254] pt-6">
          <MarketingCampaignsTable
            onViewAll={() => { /* View all campaigns placeholder */ }}
            onView={(_id) => { /* View campaign placeholder */ }}
            onEdit={(_id) => { /* Edit campaign placeholder */ }}
            onDelete={(_id) => { /* Delete campaign placeholder */ }}
          />
        </div>
      </div>

      {/* Create Email Template Modal */}
      {isCreateTemplateModalOpen && (
        <CreateEmailTemplateModal
          isOpen={isCreateTemplateModalOpen}
          onClose={() => setIsCreateTemplateModalOpen(false)}
          onSave={handleCreateTemplate}
        />
      )}

      {/* Create Marketing Campaign Modal */}
      {isCreateCampaignModalOpen && (
        <CreateMarketingCampaignModal
          isOpen={isCreateCampaignModalOpen}
          onClose={() => setIsCreateCampaignModalOpen(false)}
          onSave={handleCreateCampaign}
        />
      )}
    </>
  );
}
