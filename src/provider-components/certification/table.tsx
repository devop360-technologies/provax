import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Certification {
  id: string;
  vehicleImage: string;
  vehicleName: string;
  certificationType: string;
  deliveryDate: string;
  status: 'Active' | 'Expired';
}

const certifications: Certification[] = [
  {
    id: '1',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2020 Toyota Camry',
    certificationType: 'Premium Total',
    deliveryDate: 'Oct 12, 2023',
    status: 'Active',
  },
  {
    id: '2',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2018 Honda Civic',
    certificationType: 'Exterior Combo',
    deliveryDate: 'Sep 28, 2023',
    status: 'Active',
  },
  {
    id: '3',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2015 Ford Focus',
    certificationType: 'Safety & Function',
    deliveryDate: 'Aug 15, 2023',
    status: 'Expired',
  },
  {
    id: '4',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2023 Tesla Model 3',
    certificationType: 'Premium Total',
    deliveryDate: 'Sep 28, 2023',
    status: 'Active',
  },
  {
    id: '5',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2022 BMW X5',
    certificationType: 'Safety & Function',
    deliveryDate: 'Oct 12, 2023',
    status: 'Expired',
  },
  {
    id: '6',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2021 Audi Q7',
    certificationType: 'Exterior Combo',
    deliveryDate: 'Oct 12, 2023',
    status: 'Active',
  },
  {
    id: '7',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2020 Toyota Camry',
    certificationType: 'Premium Total',
    deliveryDate: 'Oct 12, 2023',
    status: 'Expired',
  },
  {
    id: '8',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2018 Honda Civic',
    certificationType: 'Exterior Combo',
    deliveryDate: 'Sep 28, 2023',
    status: 'Active',
  },
  {
    id: '9',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2015 Ford Focus',
    certificationType: 'Safety & Function',
    deliveryDate: 'Aug 15, 2023',
    status: 'Expired',
  },
  {
    id: '10',
    vehicleImage: '/placeholder-300x200.png',
    vehicleName: '2023 Tesla Model 3',
    certificationType: 'Premium Total',
    deliveryDate: 'Sep 28, 2023',
    status: 'Active',
  },
];

const Table = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Assigned Certifications
        </h1>
        <Link 
          href="/provider/certification/all" 
          className="text-[#00d9ff] hover:text-[#00b8d9] transition-colors text-sm font-medium"
        >
          View All
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#1D1D41] border border-[#2a2f4a] rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr_1fr] gap-4 px-6 py-4 border-b border-[#2a2f4a]">
          <div className="text-sm font-medium text-gray-400">Vehicle</div>
          <div className="text-sm font-medium text-gray-400">Certification Type</div>
          <div className="text-sm font-medium text-gray-400">Delivery Date</div>
          <div className="text-sm font-medium text-gray-400">Status</div>
          <div className="text-sm font-medium text-gray-400">Actions</div>
        </div>

        {/* Table Body */}
        <div>
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`grid grid-cols-[2fr_1.5fr_1fr_0.8fr_1fr] gap-4 px-6 py-4 items-center ${
                index !== certifications.length - 1 ? 'border-b border-[#2a2f4a]' : ''
              } hover:bg-[#1f2442] transition-colors`}
            >
              {/* Vehicle */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-700">
                  <Image
                    src={cert.vehicleImage}
                    alt={cert.vehicleName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {cert.vehicleName}
                </span>
              </div>

              {/* Certification Type */}
              <div className="text-gray-300 text-sm">
                {cert.certificationType}
              </div>

              {/* Delivery Date */}
              <div className="text-gray-300 text-sm">
                {cert.deliveryDate}
              </div>

              {/* Status */}
              <div>
                <Badge
                  className={`${
                    cert.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                      : 'bg-red-500/20 text-red-400 hover:bg-red-500/20'
                  } border-0 px-3 py-1 text-xs font-medium`}
                >
                  {cert.status}
                </Badge>
              </div>

              {/* Actions */}
              <div>
                <Link href="/provider/certification/upload">
                  <Button
                    size="sm"
                    className="bg-transparent border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff]/10 text-xs px-4 py-2 h-auto font-medium"
                  >
                    Upload Media
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;