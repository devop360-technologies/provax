import { ProvidetStatCard } from "@/provider-components/provider-stat-card";
import { ActiveJobCard } from "@/provider-components/active-jobs/active-job-card";

export default function ProviderActiveJobsPage() {
  const activeJobs = [
    {
      id: '1',
      title: 'AC System Repair - 2017 Honda Accord',
      year: '2017 - Honda Accord',
      client: 'John Doe',
      deadline: 'June 15, 2023',
      jobValue: '$750',
      escrowStatus: 'Funded',
      fullDescription:
        'AC blowing warm air. Need diagnosis and repair. Will do replacement if needed, recharge the system with R134a, and test A/C performance. Includes cabin air filter replacement.',
      escrowInformation: {
        amount: '$750',
        text: 'Funds are held securely. Will be released to you upon client approval of completed work.',
      },
      status: 'In Progress' as const,
    },
    {
      id: '2',
      title: 'Brake Pad Replacement - 2020 Toyota Camry',
      year: '2020 - Toyota Camry',
      client: 'Sarah Johnson',
      deadline: 'June 12, 2023',
      jobValue: '$520',
      escrowStatus: 'Funded',
      fullDescription:
        'Front brakes are squeaking badly. Need brake pad replacement and rotor inspection. Payment will be released within 24 hours of approval.',
      escrowInformation: {
        amount: '$520',
        text: 'Funds are held securely. Will be released to you upon client approval of completed work.',
      },
      status: 'In Progress' as const,
    },
    {
      id: '3',
      title: 'AC System Repair - 2017 Honda Accord',
      year: '2017 - Honda Accord',
      client: 'Michael Chen',
      deadline: 'June 18, 2023',
      jobValue: '$750',
      escrowStatus: 'Funded',
      fullDescription:
        'AC system not cooling. Suspect compressor failure. Will inspect, diagnose, and replace if necessary with warranty guarantee.',
      escrowInformation: {
        amount: '$750',
        text: 'Funds are held securely. Will be released to you upon client approval of completed work.',
      },
      status: 'In Progress' as const,
    },
  ];

  return (
    <div className="mr-0 md:mr-10">
      {/* Stats Grid - 4 columns */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Active Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeJobs.map((job) => (
          <ActiveJobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
