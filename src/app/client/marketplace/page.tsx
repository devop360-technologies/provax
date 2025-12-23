export default function ClientMarketplacePage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] pr-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 to-cyan-500/20 mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-gray-400 text-lg max-w-md">Marketplace feature is under development.</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm">In Development</span>
        </div>
      </div>
    </div>
  );
}
