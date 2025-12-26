import { ProvidetStatCard } from "@/provider-components/provider-stat-card";
import { ServiceRequestCard } from "@/provider-components/service-request/service-request-card";

export default function ProviderServiceRequestPage() {
  const serviceRequests = [
    {
      id: '1',
      title: 'Engine Overhaul & Tune-up',
      requestId: '#REQ-2023-001',
      budget: '$800 - $1,200',
      location: 'Downtown, within 10 miles',
      category: 'Engine Repair',
      posted: 'June 8, 2023',
      clientDescription: 'My 2018 Toyota Camry is experiencing rough idling and reduced fuel efficiency. The check engine light came on last week.',
      imageSrc: '/placeholder-300x200.png',
      diagnosticFindings: [
        'No major engine component failures detected',
        'Misfire detected in cylinder #3',
        'Oxygen sensor readings abnormal',
        'Fuel injectors may need cleaning',
      ],
      status: 'Open' as const,
    },
    {
      id: '2',
      title: 'Transmission Repair',
      requestId: '#REQ-2023-002',
      budget: '$1,500 - $2,500',
      location: 'Suburbs, within 15 miles',
      category: 'Transmission',
      posted: 'June 7, 2023',
      clientDescription: '2016 Ford F-150 with automatic transmission. Vehicle not shifting gears, especially from 2nd to 3rd. Transmission fluid was changed 6 months ago but persists.',
      imageSrc: '/placeholder-300x200.png',
      diagnosticFindings: [
        'No major engine component failures detected',
        'Misfire detected in cylinder #3',
        'Oxygen sensor readings abnormal',
        'Fuel injectors may need cleaning',
      ],
      status: 'Open' as const,
    },
    {
      id: '3',
      title: 'Complete Brake System Replacement',
      requestId: '#REQ-2023-003',
      budget: '$600 - $900',
      location: 'City Center, within 5 miles',
      category: 'Brakes',
      posted: 'June 9, 2023',
      clientDescription: '2019 Honda Civic with 45,000 miles. Brakes are squeaking loudly and pedal feels soft. Looking for complete brake inspection and replacement of pads, rotors, and fluid flush if needed.',
      imageSrc: '/placeholder-300x200.png',
      diagnosticFindings: [
        'No major engine component failures detected',
        'Misfire detected in cylinder #3',
        'Oxygen sensor readings abnormal',
        'Fuel injectors may need cleaning',
      ],
      status: 'Open' as const,
    },
  ];

  return (
<div>
  <div className=" mr-0 md:mr-7">
     {/* Stats Grid - 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <ProvidetStatCard
                title="Open Requests"
                value="12"
                change=""
                changeType="positive"
                iconSrc="/provax-dashboard/icons/users.png"
                iconBg="bg-[#64CFF6]"
              />
              <ProvidetStatCard
                title="Active Proposals"
                value="8"
                change=""
                changeType="positive"
                iconSrc="/provax-dashboard/icons/vehicle.png"
                iconBg="bg-[#64CFF6]"
              />
              <ProvidetStatCard
                title="Active Jobs"
                value="5"
                change=""
                changeType="positive"
                iconSrc="/provax-dashboard/icons/list.png"
                iconBg="bg-[#64CFF6]"
              />
              <ProvidetStatCard
                title="Escrow Value"
                value="7"
                change=""
                changeType="positive"
                iconSrc="/provax-dashboard/icons/services.png"
                iconBg="bg-[#64CFF6]"
              />
            </div>
 
 {/* Service Request Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   {serviceRequests.map((request) => (
     <ServiceRequestCard key={request.id} {...request} />
   ))}
 </div>
  </div>
</div>
  );
}
