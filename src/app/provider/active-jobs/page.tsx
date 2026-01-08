"use client";

import { ProviderStatsGrid } from "@/provider-components/provider-stats-grid";
import { ActiveJobCard } from "@/provider-components/active-jobs/active-job-card";
import { ACTIVE_JOBS } from "@/data/provider-data";

export default function ProviderActiveJobsPage() {
  return (
    <div className="mr-0 md:mr-10">
      <ProviderStatsGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVE_JOBS.map((job) => (
          <ActiveJobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
