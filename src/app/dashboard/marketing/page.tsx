"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ManagementTabs,
  ActionButtons,
  BannerCard,
  HomepageTexts,
  HighlightSections,
  CampaignBlocks,
  EmailManagement,
  ActivityLogs,
  VersionHistoryTable,
  AddBannerModal,
  AddHighlightSectionModal,
  CreateCampaignBlockModal,
  PreviewHomepageChangesModal,
} from "@/components/marketing";
import { StatCard } from "@/components/dashboard";
import { DashboardTitle } from "@/components/dashboard-title";

const managementTabs = [
  { id: "home", label: "Home Management" },
  { id: "email", label: "Email Management" },
  { id: "activity", label: "Activity Log" }
];

const banners = [
  {
    id: "1",
    title: "Summer sale Banner",
    status: "Active" as const,
    imageSrc: "/provax-dashboard/images/car1.png",
    scheduledFrom: "2023 - 10 16 to 2023 - 11 - 16"
  },
  {
    id: "2",
    title: "New Feature Announcement",
    status: "Scheduled" as const,
    imageSrc: "/provax-dashboard/images/car2.png",
    scheduledFrom: "2023 - 10 16 to 2023 - 11 - 15"
  },
  {
    id: "3",
    title: "Holiday Special Offer",
    status: "Draft" as const,
    imageSrc: "/provax-dashboard/images/car3.png",
    scheduledFrom: "2023 - 12 01 to 2023 - 12 - 31"
  }
];

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const [isAddHighlightSectionModalOpen, setIsAddHighlightSectionModalOpen] = useState(false);
  const [isCreateCampaignBlockModalOpen, setIsCreateCampaignBlockModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handlePreviewChanges = () => {
    setIsPreviewModalOpen(true);
  };

  const handlePublish = () => {
    // Publish functionality not implemented yet
    setIsPreviewModalOpen(false);
  };

  const handleSaveDraft = () => {
    // Save draft functionality not implemented yet
  };

  const handleEditBanner = (_bannerId: string) => {
    // Not implemented yet
  };

  const handleDeleteBanner = (_bannerId: string) => {
    // Not implemented yet
  };

  const handleAddBanner = (_bannerData: unknown) => {
    // Not implemented yet
  };

  const handleAddHighlightSection = (_sectionData: unknown) => {
    // Not implemented yet
  };

  const handleCreateCampaignBlock = (_campaignData: unknown) => {
    // Not implemented yet
  };

  return (
    <div>
      <div className="space-y-6">
        <DashboardTitle
          heading="Marketing & Content Management"
          text="Manage homepage content, email campaigns, and marketing materials with automotive AI platform"
        />

        {/* Stats Grid - 4 columns */}
        <div className="mr-0 mb-3 grid grid-cols-1 gap-4 md:mr-7 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Open Tickets"
            value="12,458"
            change="+2.5% from last month"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/Vector (41).png"
            iconBg="bg-[#64CFF6]"
          />
          <StatCard
            title="Open Tickets"
            value="3,742"
            change="+0.5% from last month"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/Vector (40).png"
            iconBg="bg-[#64CFF6]"
          />
          <StatCard
            title="Resolved Today"
            value="8,921"
            change="+12.4% from last month"
            changeType="positive"
            iconSrc="/provax-dashboard/icons/tw.png"
            iconBg="bg-[#64CFF6]"
          />
          <StatCard
            title="Avg. Response Time"
            value="1,245"
            change=""
            changeType="positive"
            iconSrc="/provax-dashboard/icons/clock.png"
            iconBg="bg-[#64CFF6]"
          />
        </div>
      </div>
      <div className="mr-0 space-y-0 md:mr-7">
        {/* Tabs Section */}
        <div className="mb-5 rounded-xl pb-1 border border-[#404254] bg-[#1D1D41]">
          <ManagementTabs tabs={managementTabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Action Buttons */}
        {activeTab === "home" && (
          <div className="mb-5 border-x rounded-xl border-[#404254] bg-[#1D1D41] p-6 ">
            <ActionButtons
              onPreviewChanges={handlePreviewChanges}
              onPublish={handlePublish}
              onSaveDraft={handleSaveDraft}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-6 rounded-xl bg-[#141332]">
          {/* Home Management Tab Content */}
          {activeTab === "home" && (
            <>
              {/* Homepage Banners Section */}
              <div className="space-y-2 bg-[#1D1D41]  p-6 border border-[#404254] rounded-2xl">
                <div className="flex items-center justify-between pb-3">
                  <h2 className="text-base font-medium text-white">
                    Homepage Banners
                  </h2>
                  <Button 
                    onClick={() => setIsAddBannerModalOpen(true)}
                    className="h-9 gap-2 rounded-lg bg-[#3083FF] px-4 text-sm font-medium text-white hover:bg-[#4338CA]"
                  >
                    <Plus className="size-4" />
                    Add Banner
                  </Button>
                </div>

                <div className="text-sm text-gray-400">
                  Banner Order (Drag to Reorder)
                </div>

                {/* Banner Cards */}
                <div className="space-y-4">
                  {banners.map((banner) => (
                    <BannerCard
                      key={banner.id}
                      title={banner.title}
                      status={banner.status}
                      imageSrc={banner.imageSrc}
                      imageAlt={banner.title}
                      scheduledFrom={banner.scheduledFrom}
                      onEdit={() => handleEditBanner(banner.id)}
                      onDelete={() => handleDeleteBanner(banner.id)}
                      draggable
                    />
                  ))}
                </div>
              </div>

              {/* Homepage Texts Section */}
              <div className="border-t border-[#404254] pt-6">
                <HomepageTexts
                  onSave={() => { /* Save homepage texts not implemented yet */ }}
                />
              </div>

              {/* Highlight Sections */}
              <div className="border-t border-[#404254] pt-6">
                <HighlightSections
                  onAdd={() => setIsAddHighlightSectionModalOpen(true)}
                  onEdit={() => { /* Edit section not implemented yet */ }}
                  onDelete={() => { /* Delete section not implemented yet */ }}
                />
              </div>

              {/* Campaign Blocks */}
              <div className="border-t border-[#404254] pt-6">
                <CampaignBlocks
                  onAdd={() => setIsCreateCampaignBlockModalOpen(true)}
                  onEdit={() => { /* Edit campaign not implemented yet */ }}
                  onDelete={() => { /* Delete campaign not implemented yet */ }}
                />
              </div>
            </>
          )}

          {/* Email Management Tab Content */}
          {activeTab === "email" && <EmailManagement />}

          {/* Activity Log Tab Content */}
          {activeTab === "activity" && (
            <div className="space-y-8">
              {/* Activity Logs */}
              <ActivityLogs
                onViewAll={() => { /* View all activities not implemented yet */ }}
              />

              {/* Version History */}
              <div className="border-t border-[#404254] pt-6">
                <VersionHistoryTable
                  onView={() => { /* View version not implemented yet */ }}
                  onDownload={() => { /* Download version not implemented yet */ }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Banner Modal */}
      <AddBannerModal
        isOpen={isAddBannerModalOpen}
        onClose={() => setIsAddBannerModalOpen(false)}
        onSave={handleAddBanner}
      />

      {/* Add Highlight Section Modal */}
      <AddHighlightSectionModal
        isOpen={isAddHighlightSectionModalOpen}
        onClose={() => setIsAddHighlightSectionModalOpen(false)}
        onSave={handleAddHighlightSection}
      />

      {/* Create Campaign Block Modal */}
      <CreateCampaignBlockModal
        isOpen={isCreateCampaignBlockModalOpen}
        onClose={() => setIsCreateCampaignBlockModalOpen(false)}
        onSave={handleCreateCampaignBlock}
      />

      {/* Preview Homepage Changes Modal */}
      <PreviewHomepageChangesModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  );
}
