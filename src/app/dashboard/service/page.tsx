"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Bid {
  id: string;
  service: string;
  description: string;
  bidder: string;
  amount: number;
  status: "pending" | "accepted" | "in-progress" | "completed";
  postedDate: string;
  deadline: string;
  bidsCount: number;
}

const mockBids: Bid[] = [
  {
    id: "1",
    service: "Engine Diagnostics",
    description: "Full vehicle engine diagnostic and maintenance report",
    bidder: "AutoTech Services",
    amount: 150,
    status: "accepted",
    postedDate: "2024-11-20",
    deadline: "2024-11-30",
    bidsCount: 5,
  },
  {
    id: "2",
    service: "Brake System Service",
    description: "Complete brake system inspection and repair",
    bidder: "Professional Mechanics",
    amount: 280,
    status: "pending",
    postedDate: "2024-11-22",
    deadline: "2024-12-01",
    bidsCount: 8,
  },
  {
    id: "3",
    service: "Transmission Rebuild",
    description: "Full transmission rebuild with new parts",
    bidder: "Expert Transmission",
    amount: 1200,
    status: "in-progress",
    postedDate: "2024-11-18",
    deadline: "2024-12-10",
    bidsCount: 3,
  },
  {
    id: "4",
    service: "Tire Replacement",
    description: "Replace all 4 tires with new ones",
    bidder: "Tire Master",
    amount: 400,
    status: "completed",
    postedDate: "2024-11-15",
    deadline: "2024-11-25",
    bidsCount: 12,
  },
];

export default function ServiceBiddingPage() {
  const [bids] = useState<Bid[]>(mockBids);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBids = bids.filter(
    (bid) =>
      bid.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.bidder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: Bid["status"]) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-400" />;
      case "completed":
        return <TrendingUp className="h-4 w-4 text-purple-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: Bid["status"]) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Service Bidding</h1>
          <p className="text-gray-400 mt-1">Manage service requests and bids</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Service Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Services</p>
                <p className="text-2xl font-bold text-white">156</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Bids</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">89</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-white">Service Bids</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[#1a1d3a] border-[#2a2d4a] text-white placeholder-gray-500"
                />
              </div>
              <Button variant="outline" className="border-[#2a2d4a] text-gray-400">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {filteredBids.map((bid) => (
              <div key={bid.id} className="bg-[#1a1d3a] border border-[#2a2d4a] rounded-lg p-4 hover:border-green-500/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(bid.status)}
                      <h3 className="text-white font-semibold">{bid.service}</h3>
                      <Badge className={getStatusColor(bid.status)}>
                        {bid.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{bid.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Bidder:</span>
                        <p className="text-white font-medium">{bid.bidder}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Amount:</span>
                        <p className="text-green-400 font-semibold">${bid.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Posted:</span>
                        <p className="text-white">{bid.postedDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Bids:</span>
                        <p className="text-white font-medium">{bid.bidsCount} bids</p>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#252850] border-[#2a2d4a]">
                      <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:text-red-300 cursor-pointer">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}