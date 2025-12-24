import { ProposalCard } from '@/provider-components/proposals/proposal-card';
import { ProvidetStatCard } from '@/provider-components/provider-stat-card';

export default function ProviderProposalsPage() {
  const proposals = [
    {
      id: '1',
      title: 'Electrical System Diagnosis',
      requestId: '#REQ-2023-005',
      proposalId: '#PRO-001',
      imageSrc: '/placeholder-300x200.png',
      deliveryTime: '5 days',
      yourQuote: 'Budget: $950 ($300-$1.1k)',
      warranty: '90 days parts and labor',
      submitted: 'June 6, 2023',
      technicalNotes:
        'Based on the symptoms described, I suspect an alternator issue or battery connection problem. Will perform full electrical system diagnostic including voltage tests, alternator output check, and battery load test.',
      status: 'Pending' as const,
    },
    {
      id: '2',
      title: 'AC System Repair',
      requestId: '#REQ-2023-004',
      proposalId: '#PRO-002',
      imageSrc: '/placeholder-300x200.png',
      deliveryTime: '3 days',
      yourQuote: 'Quote budget: $800-$900M',
      warranty: 'Has a 30 day compressor, 90 days on labor',
      submitted: 'June 5, 2023',
      technicalNotes:
        'Will perform leak test, replace compressor if needed, recharge system with R134a, and test A/C performance. Includes cabin air filter replacement.',
      status: 'Accepted' as const,
      clientFeedback:
        "Your proposal was detailed and reasonably priced compared to others. Liked that it was warranty on the compressor. Let's proceed!",
    },
    {
      id: '3',
      title: 'Suspension Overhaul',
      requestId: '#REQ-2023-006',
      proposalId: '#PRO-003',
      imageSrc: '/placeholder-300x200.png',
      deliveryTime: '2 days',
      yourQuote: 'Quote budget: $800-$1.1k',
      warranty: '60 days parts and labor',
      submitted: 'June 4, 2023',
      technicalNotes:
        'Complete front suspension rebuild including struts, control arms, ball joints, and alignment. Will use OEM quality parts.',
      status: 'Rejected' as const,
      clientFeedback:
        'Your quote was higher than my budget. Another provider offered to do it for $650 with similar warranty. Thank you for your proposal!',
    },
  ];

  return (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} {...proposal} />
        ))}
      </div>
    </div>
  );
}
