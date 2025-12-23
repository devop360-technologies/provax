export default function ProviderProposalsPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] pr-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-400 text-lg max-w-md">Proposals feature is under development.</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm">In Development</span>
        </div>
      </div>
    </div>
  );
}
