import {
  TrendingUp,
  Trophy,
  Sparkles,
  Link2,
  Brain,
  Globe,
  BarChart3,
  Shield,
  AlertTriangle,
  XCircle,
  MinusCircle,
  Zap,
  Target,
} from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';

// ─── Category Scorecard Data (Profound – Apr 2026 latest snapshot) ──────────
const CATEGORIES = [
  {
    id: 'firewall',
    name: 'Firewall',
    ft: 99.6,
    rivalName: 'Cisco',
    rivalPct: 38.0,
    status: 'leader' as const,
    delta: '+61.6pp vs Cisco',
  },
  {
    id: 'sase',
    name: 'SASE',
    ft: 97.1,
    rivalName: 'Palo Alto',
    rivalPct: 85.5,
    status: 'leader' as const,
    delta: '+11.6pp vs Palo Alto',
  },
  {
    id: 'quantum',
    name: 'Quantum Security',
    ft: 88.0,
    rivalName: 'Palo Alto',
    rivalPct: 10.7,
    status: 'leader' as const,
    delta: '+77.3pp vs Palo Alto',
  },
  {
    id: 'ot',
    name: 'OT Security',
    ft: 89.0,
    rivalName: null,
    rivalPct: null,
    status: 'leader' as const,
    delta: 'Unchallenged 10 months',
  },
  {
    id: 'ai',
    name: 'AI Cybersecurity',
    ft: 76.8,
    rivalName: 'CrowdStrike',
    rivalPct: 20.5,
    status: 'leader' as const,
    delta: '+56.3pp vs CrowdStrike',
  },
  {
    id: 'ztna',
    name: 'ZTNA',
    ft: 87.9,
    rivalName: 'Palo Alto',
    rivalPct: 95.3,
    status: 'gap' as const,
    delta: '−7.4pp vs Palo Alto',
  },
  {
    id: 'cloud',
    name: 'Cloud Security',
    ft: 73.7,
    rivalName: 'Palo Alto',
    rivalPct: 92.3,
    status: 'gap' as const,
    delta: '−18.6pp vs Palo Alto',
  },
  {
    id: 'secops',
    name: 'SecOps',
    ft: 20.1,
    rivalName: 'CrowdStrike',
    rivalPct: 74.7,
    status: 'critical' as const,
    delta: '−54.6pp vs CrowdStrike',
  },
];

// ─── Hero KPI Data ─────────────────────────────────────────────────────────────
const KPIS = [
  {
    id: 'traffic',
    value: '+83.1%',
    label: 'US Traffic Growth',
    sub: '890K → 1.63M · Jul 2025–Apr 2026',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: TrendingUp,
  },
  {
    id: 'llm',
    value: '11.7%',
    label: 'LLM Citation Rate',
    sub: '#1 globally · Palo Alto only 1.8%',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: Sparkles,
  },
  {
    id: 'aio',
    value: '+1,107%',
    label: 'AIO Traffic Growth',
    sub: '31.9K → 385K · Jul 2025–Apr 2026',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    icon: Brain,
  },
  {
    id: 'sov',
    value: '+10.2pp',
    label: 'Profound Visibility',
    sub: '57.3% → 67.5% · leading all rivals',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: Trophy,
  },
];

// ─── Priority Gaps with severity-based coloring ────────────────────────────────
const PRIORITY_GAPS = [
  {
    cat: 'SecOps',
    ft: 20.1,
    rival: 'CrowdStrike',
    rval: 74.7,
    gap: 54.6,
    severity: 'critical' as const,
  },
  {
    cat: 'Cloud Security',
    ft: 73.7,
    rival: 'Palo Alto',
    rval: 92.3,
    gap: 18.6,
    severity: 'gap' as const,
  },
  {
    cat: 'ZTNA',
    ft: 87.9,
    rival: 'Palo Alto',
    rval: 95.3,
    gap: 7.4,
    severity: 'watch' as const,
  },
];

const GAP_SEVERITY = {
  critical: {
    icon: <XCircle size={10} className="text-red-500 flex-shrink-0 mt-0.5" />,
    bar: 'bg-red-400',
    gapText: 'text-red-600',
    catText: 'text-red-800',
  },
  gap: {
    icon: <AlertTriangle size={10} className="text-amber-500 flex-shrink-0 mt-0.5" />,
    bar: 'bg-amber-400',
    gapText: 'text-amber-700',
    catText: 'text-amber-900',
  },
  watch: {
    icon: <MinusCircle size={10} className="text-yellow-500 flex-shrink-0 mt-0.5" />,
    bar: 'bg-yellow-400',
    gapText: 'text-yellow-700',
    catText: 'text-yellow-900',
  },
};

// ─── Roadmap Data ──────────────────────────────────────────────────────────────
const ROADMAP = [
  {
    id: 'r1',
    quarter: 'NOW — Q2 2026',
    icon: Brain,
    title: 'Launch AI/LLM Content Hub',
    detail: '"browser agent security risk" 14.8K/mo · "generative ai security" 720/mo · "prompt injection attack" 880/mo',
    tagColor: 'bg-red-100 text-red-700 border-red-200',
    barColor: 'bg-red-500',
    impact: 'HIGH',
  },
  {
    id: 'r2',
    quarter: 'Q2–Q3 2026',
    icon: Shield,
    title: 'ZTNA & Cloud Security Sprint',
    detail: 'Close 7.4pp ZTNA gap and 18.6pp Cloud Security gap vs Palo Alto with dedicated long-form pillar pages',
    tagColor: 'bg-amber-100 text-amber-700 border-amber-200',
    barColor: 'bg-amber-500',
    impact: 'HIGH',
  },
  {
    id: 'r3',
    quarter: 'Q3 2026',
    icon: Globe,
    title: 'Referring Domain Campaign',
    detail: 'Match Wiz\'s +31% domain velocity via digital PR, Gartner/Forrester mentions & guest security publications',
    tagColor: 'bg-blue-100 text-blue-700 border-blue-200',
    barColor: 'bg-blue-500',
    impact: 'MED',
  },
  {
    id: 'r4',
    quarter: 'Q3–Q4 2026',
    icon: BarChart3,
    title: 'Statistics & Validation Series',
    detail: 'Publish annual statistics hub + Quantum assessment tool to match SentinelOne 883 pages & PA 729+52 AI pages',
    tagColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    barColor: 'bg-emerald-500',
    impact: 'MED',
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  leader:   { label: 'LEADING',  badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  gap:      { label: 'GAP',      badge: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500' },
  critical: { label: 'CRITICAL', badge: 'bg-red-100 text-red-700',       dot: 'bg-red-500' },
};

// ─── Category Row ──────────────────────────────────────────────────────────────
function CategoryRow({ cat }: { cat: typeof CATEGORIES[0] }) {
  const st = STATUS[cat.status];
  const isLeader = cat.status === 'leader';
  const isCritical = cat.status === 'critical';
  const rivalPct = cat.rivalPct ?? 0;

  return (
    <div className={`flex items-center gap-3 py-1.5 ${isCritical ? 'bg-red-50/60 -mx-4 px-4 rounded' : ''}`}>
      {/* Name */}
      <div className="w-32 flex-shrink-0">
        <span className={`text-[11px] font-semibold leading-tight ${isCritical ? 'text-red-800' : 'text-gray-700'}`}>
          {cat.name}
        </span>
      </div>

      {/* Bar track */}
      <div className="flex-1 h-4 bg-gray-100 rounded-full relative overflow-hidden">
        {/* Rival bar (behind) */}
        {cat.rivalPct !== null && (
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gray-300 opacity-60"
            style={{ width: `${rivalPct}%` }}
          />
        )}
        {/* Fortinet bar */}
        <div
          className={`absolute top-0 left-0 h-full rounded-full ${
            isLeader ? 'bg-emerald-500' : isCritical ? 'bg-red-500' : 'bg-amber-500'
          }`}
          style={{ width: `${cat.ft}%`, opacity: isCritical ? 0.8 : 1 }}
        />
      </div>

      {/* FT % */}
      <div className="w-11 flex-shrink-0 text-right">
        <span className={`text-[11px] font-bold ${
          isLeader ? 'text-emerald-600' : isCritical ? 'text-red-600' : 'text-amber-600'
        }`}>
          {cat.ft}%
        </span>
      </div>

      {/* Status badge */}
      <div
        className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wide ${st.badge}`}
        style={{ borderColor: 'transparent' }}
      >
        <div className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
        {st.label}
      </div>

      {/* Delta */}
      <div className="w-36 flex-shrink-0">
        <span className={`text-[10px] font-medium ${
          isLeader ? 'text-emerald-600' : isCritical ? 'text-red-600' : 'text-amber-600'
        }`}>
          {isLeader ? '✓' : '▲'} {cat.delta}
        </span>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function SlideStrategicBrief({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <SlideContainer slideNumber={29} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Executive Strategy Brief"
        subtitle="SEO Competitive Summary · Jul 2025 – Apr 2026 · US & WW · Source: Semrush · Profound · LeadWalnut Analysis"
      />

      {/* ── Verdict Banner ─────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 mb-4 rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-black text-[13px] leading-tight">
                Fortinet leads 5 of 8 Profound categories · holds #1 AI citation rate globally (11.7% vs PA 1.8%) · US traffic +83.1% in 10 months
              </p>
              <p className="text-red-100 text-[10px] mt-0.5">
                Three strategic gaps remain: ZTNA −7.4pp, Cloud Security −18.6pp vs Palo Alto · SecOps −54.6pp vs CrowdStrike
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right pl-4">
            <div className="text-white font-black text-[28px] leading-none">5/8</div>
            <div className="text-red-200 text-[9px] font-bold tracking-wide uppercase">Categories Led</div>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Layout ────────────────────────────────────────────── */}
      <div className="flex-1 flex gap-4 mb-4 min-h-0">

        {/* Left: Category Scorecard */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Category Visibility Scorecard
            </span>
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[9px] text-gray-400">Source: Profound · Nov 2025 – Apr 2026</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded bg-emerald-500" />
              <span className="text-[9px] text-gray-500">Fortinet (Leading)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded bg-amber-500" />
              <span className="text-[9px] text-gray-500">Fortinet (Gap)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded bg-red-500" />
              <span className="text-[9px] text-gray-500">Fortinet (Critical)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded bg-gray-300" />
              <span className="text-[9px] text-gray-500">Top Competitor</span>
            </div>
          </div>

          {/* Rows */}
          <div className="flex-1 flex flex-col justify-around bg-white rounded-xl border border-gray-200 px-4 py-2 shadow-sm">
            {CATEGORIES.map((cat, idx) => (
              <div key={cat.id}>
                <CategoryRow cat={cat} />
                {idx < CATEGORIES.length - 1 && (
                  <div className="h-px bg-gray-100" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: KPIs + Priority Gaps */}
        <div className="w-[280px] flex-shrink-0 flex flex-col gap-3">

          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Performance Metrics</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* 4 KPI cards in 2x2 grid */}
          <div className="grid grid-cols-2 gap-2">
            {KPIS.map((kpi) => {
              const KpiIcon = kpi.icon;
              return (
                <div
                  key={kpi.id}
                  className={`rounded-xl border ${kpi.border} ${kpi.bg} p-3 flex flex-col gap-1`}
                >
                  <div className="flex items-center justify-between">
                    <KpiIcon size={12} className={kpi.color} strokeWidth={2.5} />
                  </div>
                  <div className={`text-[20px] font-black leading-none ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[9.5px] font-bold text-gray-700 leading-tight">{kpi.label}</div>
                  <div className="text-[9px] text-gray-500 leading-tight">{kpi.sub}</div>
                </div>
              );
            })}
          </div>

          {/* Priority Gaps */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority Gaps</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-3 space-y-2.5 shadow-sm">
              {PRIORITY_GAPS.map((g) => {
                const sev = GAP_SEVERITY[g.severity];
                return (
                  <div key={g.cat} className="flex items-start gap-2">
                    {sev.icon}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold ${sev.catText}`}>{g.cat}</span>
                        <span className={`text-[9px] font-bold ${sev.gapText}`}>−{g.gap}pp</span>
                      </div>
                      <div className="text-[9px] text-gray-500">
                        {g.ft}% vs {g.rival} {g.rval}%
                      </div>
                      {/* Severity-tinted gap bar */}
                      <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${sev.bar} rounded-full`}
                          style={{ width: `${(g.ft / g.rval) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content gap note */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Target size={10} className="text-red-600" />
              <span className="text-[9.5px] font-bold text-red-700 uppercase tracking-wide">Content Volume Gap</span>
            </div>
            <div className="space-y-0.5">
              {[
                { brand: 'SentinelOne', count: '883 pages' },
                { brand: 'Palo Alto', count: '729 + 52 AI pages' },
                { brand: 'CrowdStrike', count: '551 pages' },
              ].map((c) => (
                <div key={c.brand} className="flex justify-between items-center">
                  <span className="text-[9px] text-gray-600">{c.brand}</span>
                  <span className="text-[9px] font-semibold text-red-700">{c.count}</span>
                </div>
              ))}
            </div>
            <p className="text-[8.5px] text-red-400 mt-1.5 leading-tight">
              Fortinet content depth significantly trails on AI & threat intelligence topics
            </p>
          </div>
        </div>
      </div>

      {/* ── Strategic Roadmap Strip ──────────────────────────────────────────── */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px w-4 bg-gray-200" />
          <Zap size={10} className="text-amber-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Strategic Roadmap · Q2 – Q4 2026
          </span>
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-[9px] text-gray-400">4 Priority Actions</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {ROADMAP.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                {/* Colored top strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${item.barColor}`} />

                <div className="pt-1">
                  {/* Quarter + impact */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                      {item.quarter}
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      item.impact === 'HIGH'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {item.impact}
                    </span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-start gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ItemIcon size={12} className="text-gray-600" strokeWidth={2} />
                    </div>
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">{item.title}</p>
                  </div>

                  {/* Detail */}
                  <p className="text-[9.5px] text-gray-500 leading-relaxed">{item.detail}</p>
                </div>

                {/* Step number */}
                <div className="absolute bottom-2.5 right-3 text-[18px] font-black text-gray-100 leading-none pointer-events-none">
                  {idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideFooter source="Source: Semrush · Profound · LeadWalnut Analysis" />
    </SlideContainer>
  );
}
