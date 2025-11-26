"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Star, MapPin, DollarSign } from "lucide-react";
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

interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  location: string;
  condition: "Excellent" | "Good" | "Fair";
  mileage: number;
  rating: number;
  reviews: number;
  image?: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    title: "Tesla Model 3",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 45000,
    location: "San Francisco, CA",
    condition: "Excellent",
    mileage: 5000,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "2",
    title: "BMW X5",
    make: "BMW",
    model: "X5",
    year: 2022,
    price: 65000,
    location: "Los Angeles, CA",
    condition: "Excellent",
    mileage: 12000,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    title: "Mercedes-Benz C-Class",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2021,
    price: 38000,
    location: "New York, NY",
    condition: "Good",
    mileage: 25000,
    rating: 4.4,
    reviews: 67,
  },
];

export default function MarketplacePage() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Vehicle Marketplace</h1>
          <p className="text-gray-400 mt-1">Browse and manage vehicle listings</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          List Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Total Listings</p>
            <p className="text-2xl font-bold text-white">1,245</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Active Listings</p>
            <p className="text-2xl font-bold text-white">892</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Sold This Month</p>
            <p className="text-2xl font-bold text-white">234</p>
          </CardContent>
        </Card>
        <Card className="bg-[#252850] border-[#2a2d4a]">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-green-400">$2.3M</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-[#252850] border-[#2a2d4a]">
        <CardHeader>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vehicles..."
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
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-[#1a1d3a] border-[#2a2d4a] hover:border-green-500/30 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-lg">{vehicle.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{vehicle.year} • {vehicle.mileage.toLocaleString()} mi</p>
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
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:text-red-300 cursor-pointer">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-400" />
                      <span className="text-white font-semibold">${vehicle.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">{vehicle.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2a2d4a]">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm font-medium">{vehicle.rating}</span>
                      <span className="text-gray-400 text-xs">({vehicle.reviews})</span>
                    </div>
                    <Badge className={vehicle.condition === "Excellent" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}>
                      {vehicle.condition}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
