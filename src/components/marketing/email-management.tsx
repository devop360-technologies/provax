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

  const handleCreateTemplate = (templateData: any) => {
    console.log("Create template:", templateData);
  };

  const handleCreateCampaign = (campaignData: any) => {
    console.log("Create campaign:", campaignData);
  };

  return (
    <>
      <div className={cn("space-y-6", className)}>
        {/* Filters Section */}
        <EmailFilters
          onApplyFilters={() => console.log("Filters applied")}
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
            onViewAll={() => console.log("View all templates")}
            onEdit={(id) => console.log("Edit template:", id)}
            onTest={(id) => console.log("Test template:", id)}
            onRestore={(id) => console.log("Restore template:", id)}
          />
        </div>

        {/* Marketing Campaigns */}
        <div className="border-t border-[#404254] pt-6">
          <MarketingCampaignsTable
            onViewAll={() => console.log("View all campaigns")}
            onView={(id) => console.log("View campaign:", id)}
            onEdit={(id) => console.log("Edit campaign:", id)}
            onDelete={(id) => console.log("Delete campaign:", id)}
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
