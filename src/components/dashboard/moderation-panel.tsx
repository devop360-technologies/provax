import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

interface ModerationSubTab {
  id: string;
  name: string;
}

const moderationSubTabs: ModerationSubTab[] = [
  { id: "reviews", name: "Reviews & Comments" },
  { id: "listings", name: "Marketplace Listings" },
  { id: "media", name: "Service Media" }
];

interface ReviewItem {
  id: string;
  type: "review" | "comment";
  serviceId?: string;
  listingId?: string;
  author: {
    name: string;
    avatar: string;
    rating?: number;
  };
  content: string;
  date: string;
  flaggedBy?: number;
}

interface ListingItem {
  listingId: string;
  title: string;
  provider: string;
  category: string;
  status: string;
  created: string;
}

interface MediaItem {
  id: string;
  type: "image" | "video" | "document";
  title: string;
  uploadedBy: string;
  serviceId: string;
  created: string;
  thumbnailUrl?: string;
}

const moderationItems: ReviewItem[] = [
  {
    id: "1",
    type: "review",
    serviceId: "#SRV-4582",
    author: {
      name: "John Smith",
      avatar: "👤",
      rating: 4
    },
    content: "The service was generally good, but there were some communication issues. The provider was sometimes slow to respond to messages, which caused delays in the project timeline. However, the final deliverable was of high quality and met my expectations.",
    date: "2023-10-15"
  },
  {
    id: "2",
    type: "comment",
    listingId: "#LST-7845",
    author: {
      name: "Sarah Johnson",
      avatar: "👤"
    },
    content: "This listing seems to violate the platform's terms of service. The images appear to be stolen from another website, and the description contains misleading information about the product capabilities.",
    date: "2023-10-14",
    flaggedBy: 3
  }
];

const marketplaceListings: ListingItem[] = [
  {
    listingId: "#TX-7845",
    title: "Professional AutoFix Pro Service",
    provider: "Tech Solutions Inc.",
    category: "Services",
    status: "Pending Review",
    created: "2023-10-15"
  },
  {
    listingId: "#TX-7844",
    title: "Advanced AI Marketplace Certification",
    provider: "Global Certifications",
    category: "Certifications",
    status: "Under Review",
    created: "2023-10-15"
  },
  {
    listingId: "#TX-7843",
    title: "AI - Platform Automotive",
    provider: "AI Master",
    category: "Marketplace",
    status: "Flagged",
    created: "2023-10-15"
  }
];

const serviceMedia: MediaItem[] = [
  {
    id: "1",
    type: "image",
    title: "Service Portfolio Image",
    uploadedBy: "Tech Solutions Inc.",
    serviceId: "#SRV-4582",
    created: "2023-10-15"
  },
  {
    id: "2",
    type: "video",
    title: "Service Demonstration Video",
    uploadedBy: "AI Automotive Masters",
    serviceId: "#SRV-4583",
    created: "2023-10-15"
  },
  {
    id: "3",
    type: "document",
    title: "Certification Document",
    uploadedBy: "Global Certifications",
    serviceId: "#SRV-4584",
    created: "2023-10-15"
  }
];

export default function ModerationPanel() {
  const [activeSubTab, setActiveSubTab] = useState("reviews");

  const renderStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-yellow-400" : "text-gray-500"}>
        ★
      </span>
    ));
  };

  const getListingStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium";
    
    switch (status) {
      case "Pending Review":
        return `${baseClasses} bg-yellow-500 text-white`;
      case "Under Review":
        return `${baseClasses} bg-orange-500 text-white`;
      case "Flagged":
        return `${baseClasses} bg-red-500 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white`;
    }
  };

  const renderMediaThumbnail = (mediaItem: MediaItem) => {
    if (mediaItem.type === "image") {
      return (
        <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="w-20 h-20 bg-red-600 rounded transform rotate-45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      );
    } else if (mediaItem.type === "video") {
      return (
        <div className="w-full h-48 bg-black rounded-lg flex items-center justify-center relative">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/30 rounded">
            <div className="h-full w-1/3 bg-white rounded"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-48 bg-gradient-to-br from-blue-800 to-blue-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-blue-400">📄</div>
            <div className="text-blue-300 text-sm mt-2">PDF</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {moderationSubTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSubTab === tab.id
                  ? "border-cyan-400 text-cyan-400"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeSubTab === "reviews" && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Reviews & Comments Pending Moderation</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {moderationItems.map((item) => (
              <div key={item.id} className="bg-[#252850] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">
                    {item.type === "review" ? `Review for Service ${item.serviceId}` : `Comment on Listing ${item.listingId}`}
                  </h4>
                  <span className="text-gray-400 text-sm">{item.date}</span>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{item.author.avatar}</span>
                  <div>
                    <p className="text-white font-medium">{item.author.name}</p>
                    {item.author.rating && (
                      <div className="flex items-center space-x-1">
                        {renderStarRating(item.author.rating)}
                      </div>
                    )}
                    {item.type === "comment" && (
                      <p className="text-gray-400 text-sm">User</p>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">{item.content}</p>

                {item.flaggedBy && (
                  <div className="bg-yellow-900/30 border border-yellow-500/50 rounded p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">🚩</span>
                      <span className="text-yellow-300 text-sm">Flagged by {item.flaggedBy} users</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
                    <span>✓</span>
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors">
                    <span>👁</span>
                    <span>Hide</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors">
                    <span>↩</span>
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                    <span>📄</span>
                    <span>Request Evidence</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === "listings" && (
        <div>
          {/* Table */}
          <div className="bg-[#1D1D41] rounded-lg border border-[#2a2d4a] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#252850]">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Listing ID</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Title</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Provider</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Category</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Created</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {marketplaceListings.map((listing, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-[#252850] transition-colors">
                      <td className="py-4 px-4">
                        <span className="text-white font-medium">{listing.listingId}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white">{listing.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{listing.provider}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{listing.category}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={getListingStatusBadge(listing.status)}>
                          {listing.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-300">{listing.created}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                            <Eye className="h-4 w-4 text-cyan-400" />
                          </button>
                          <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "media" && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">Uploaded Photos</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceMedia.map((media) => (
              <div key={media.id} className="bg-[#252850] rounded-lg p-4 border border-gray-700">
                {/* Media Thumbnail */}
                {renderMediaThumbnail(media)}
                
                {/* Media Info */}
                <div className="mt-4">
                  <h4 className="text-white font-medium text-sm mb-2">{media.title}</h4>
                  <p className="text-gray-400 text-xs mb-1">Uploaded by: {media.uploadedBy}</p>
                  <p className="text-gray-400 text-xs">Service: {media.serviceId}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors">
                    <span>✓</span>
                    <span>Approve</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors">
                    <span>✗</span>
                    <span>Reject</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors">
                    <span>👁</span>
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}