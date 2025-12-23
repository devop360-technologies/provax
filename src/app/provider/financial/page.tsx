export default function ProviderFinancialPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] pr-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-400 text-lg max-w-md">Financial feature is under development.</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm">In Development</span>
        </div>
      </div>
    </div>
  );
}
