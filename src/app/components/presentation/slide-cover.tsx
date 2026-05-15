interface SlideCoverProps {
  onNavigateHome?: () => void;
}

export function SlideCover({ onNavigateHome }: SlideCoverProps) {
  return (
    <div className="w-full h-full bg-white flex flex-col relative">
      {/* Main content — centred across the full slide height */}
      <div className="w-full h-full flex items-center justify-center px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6">
            <div className="inline-block px-8 py-3 bg-blue-600 text-white text-2xl font-bold rounded-xl mb-8">
              SEO &amp; AI VISIBILITY
            </div>
            <h1 className="text-[44px] font-bold text-black leading-tight tracking-tight mb-4 uppercase">
              Competitive Analysis - Apr 2026
            </h1>
          </div>

          {/* Competitors List */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'Fortinet',      color: '#EF4444' },
              { name: 'Cisco',         color: '#FF7AB6' },
              { name: 'HPE',           color: '#7ED957' },
              { name: 'Palo Alto',     color: '#FFB14A' },
              { name: 'Check Point',   color: '#6C9AFF' },
              { name: 'Crowdstrike',   color: '#1F2937' },
              { name: 'Cato Networks', color: '#8B5CF6' },
              { name: 'SentinelOne',   color: '#EC4899' },
              { name: 'Wiz',           color: '#06B6D4' },
            ].map((comp) => (
              <div
                key={comp.name}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: comp.color }}
                />
                <span className="text-sm font-medium text-gray-700">{comp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
