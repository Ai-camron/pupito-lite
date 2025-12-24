export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-linear-to-r from-[#22d3ee] to-[#1E90FF] bg-clip-text text-transparent mb-4">
          PUPITO is Under Maintenance
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          We&apos;re making some awesome updates. Be back soon!
        </p>
        <div className="animate-pulse text-[#FFD700]">
          ⚡ Working on something epic ⚡
        </div>
      </div>
    </div>
  )
}