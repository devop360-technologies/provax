import { ProviderStatsGrid } from "@/provider-components/provider-stats-grid";
import { ServiceRequestCard } from "@/provider-components/service-request/service-request-card";
import { SERVICE_REQUESTS } from "@/data/provider-data";

export default function ProviderServiceRequestPage() {
  return (
    <div className="mr-0 md:mr-7">
      <ProviderStatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_REQUESTS.map((request) => (
          <ServiceRequestCard key={request.id} {...request} />
        ))}
      </div>
    </div>
  );
}
