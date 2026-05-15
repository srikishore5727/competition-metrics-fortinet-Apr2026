import {
  TrendingUp,
  Trophy,
  Sparkles,
  Link2,
  FileSearch,
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MinusCircle,
  Zap,
} from 'lucide-react';
import { SlideContainer, SlideHeader, SlideFooter } from './design-system';

// ─── Types ────────────────────────────────────────────────────────────────────

type PointType = 'win' | 'neutral' | 'watch' | 'critical';

// ─── Data ─────────────────────────────────────────────────────────────────────

const takeaways = [
  {
    id: 'traffic',
    icon: TrendingUp,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-l-blue-500',
    badgeBg: 'bg-blue-100 text-blue-700',
    label: 'Traffic & Reach',
    points: [
      {
        type: 'win' as PointType,
        text: 'US organic traffic surged 890K → 1.63M (+83.1%) Jul 2025–Apr 2026, 10-month momentum sustained.',
      },
      {
        type: 'win' as PointType,
        text: 'Non-branded traffic: 731K → 1.52M (+108%) — brand-independent search authority confirmed and accelerating.',
      },
      {
        type: 'neutral' as PointType,
        text: 'Cisco leads at 2.3M US traffic but shows extreme Nov–Dec spike volatility; Fortinet trend is most consistent.',
      },
    ],
  },
  {
    id: 'keywords',
    icon: FileSearch,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderColor: 'border-l-violet-500',
    badgeBg: 'bg-violet-100 text-violet-700',
    label: 'Keyword Power',
    points: [
      {
        type: 'win' as PointType,
        text: 'Page 1 keywords grew 39K → 50K (+28.2%) — 11,000 new first-page positions gained in 10 months.',
      },
      {
        type: 'win' as PointType,
        text: 'NGFW #1: 1,240 total keywords in Jul 2025, highest vs Cisco (1,132) and Palo Alto (1,129).',
      },
      {
        type: 'critical' as PointType,
        text: '12 missing + 11 untapped keywords — top miss: "what is generative ai" (22.2K/mo) still unaddressed.',
      },
    ],
  },
  {
    id: 'ai',
    icon: Sparkles,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
    borderColor: 'border-l-red-500',
    badgeBg: 'bg-red-100 text-red-700',
    label: 'AI & LLM Citability',
    points: [
      {
        type: 'win' as PointType,
        text: 'AIO keywords: 10,829 → 19,500 (+80%) | AIO traffic: 31.9K → 385K (+1,107%) Jul 2025–Apr 2026.',
      },
      {
        type: 'win' as PointType,
        text: 'Profound visibility 57.3% → 67.5% (+10.2pp); Share of Voice 10.8% → 14.4% — both leading all 9 rivals.',
      },
      {
        type: 'win' as PointType,
        text: 'LLM citation rate: 11.7% vs Palo Alto\'s 1.8% — cited 6.5× more often by AI models globally.',
      },
    ],
  },
  {
    id: 'category',
    icon: Trophy,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    borderColor: 'border-l-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    label: 'Category Leadership',
    points: [
      {
        type: 'win' as PointType,
        text: 'Leads 5 of 8 categories: Firewall 99.6%, SASE 97.1%, Quantum 88.0%, OT 89.0%, AI Cyber 76.8%.',
      },
      {
        type: 'win' as PointType,
        text: 'SASE overtook Palo Alto in Feb 2026 and climbed to 97.1% by Apr 2026 — competitor gap widening.',
      },
      {
        type: 'critical' as PointType,
        text: 'ZTNA −7.4pp (87.9% vs PA 95.3%) and Cloud Security −18.6pp (73.7% vs PA 92.3%) gaps unresolved.',
      },
    ],
  },
  {
    id: 'backlinks',
    icon: Link2,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-l-amber-500',
    badgeBg: 'bg-amber-100 text-amber-700',
    label: 'Backlink Authority',
    points: [
      {
        type: 'win' as PointType,
        text: 'Referring domains grew 54,366 → 56,100 (+1,734 net new domains) Jul 2025 – Apr 2026.',
      },
      {
        type: 'neutral' as PointType,
        text: 'Domain Authority stable at 85–87 throughout — steady quality vs volatile competitor link profiles.',
      },
      {
        type: 'watch' as PointType,
        text: 'Wiz grew +3,900 domains (+31%) — fastest-rising newcomer in the competitive set to monitor closely.',
      },
    ],
  },
  {
    id: 'content',
    icon: LayoutGrid,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    borderColor: 'border-l-orange-500',
    badgeBg: 'bg-orange-100 text-orange-700',
    label: 'Content & Competitive Gap',
    points: [
      {
        type: 'critical' as PointType,
        text: 'Palo Alto: 729 Cyberpedia + 52 AI pages; SentinelOne: 883 pages; CrowdStrike: 551 pages — content volume gap.',
      },
      {
        type: 'critical' as PointType,
        text: '"Browser agent security risk" (14.8K/mo), "generative ai security" (720/mo) — ranking at zero.',
      },
      {
        type: 'watch' as PointType,
        text: '13 competitor web-experience tactics identified: threat maps, interactive tours, audience segmentation.',
      },
    ],
  },
];

const priorities = [
  {
    icon: Zap,
    color: 'bg-red-500',
    label: 'Priority 1',
    action: 'Launch AI/LLM Glossary Hub',
    detail: 'Target "browser agent security risk" (14.8K/mo), "generative ai security" (720/mo), "prompt injection attack" (880/mo)',
  },
  {
    icon: TrendingUp,
    color: 'bg-amber-500',
    label: 'Priority 2',
    action: 'Close ZTNA & Cloud Security Gaps',
    detail: 'Narrow 7.4pp ZTNA gap and 18.6pp Cloud gap vs Palo Alto with dedicated long-form pillar content',
  },
  {
    icon: Link2,
    color: 'bg-blue-500',
    label: 'Priority 3',
    action: 'Accelerate Referring Domain Growth',
    detail: 'Match Wiz\'s +31% domain velocity via digital PR, analyst report mentions & guest contributions',
  },
];

// ─── Point type styles ─────────────────────────────────────────────────────────

function PointIcon({ type }: { type: PointType }) {
  if (type === 'win')
    return <CheckCircle2 className="flex-shrink-0 w-3.5 h-3.5 text-emerald-500 mt-0.5" />;
  if (type === 'critical')
    return <XCircle className="flex-shrink-0 w-3.5 h-3.5 text-red-500 mt-0.5" />;
  if (type === 'watch')
    return <AlertTriangle className="flex-shrink-0 w-3.5 h-3.5 text-amber-500 mt-0.5" />;
  return <MinusCircle className="flex-shrink-0 w-3.5 h-3.5 text-yellow-500 mt-0.5" />;
}

function pointTextClass(type: PointType): string {
  if (type === 'win') return 'text-emerald-800';
  if (type === 'critical') return 'text-red-700 font-medium';
  if (type === 'watch') return 'text-amber-800';
  return 'text-yellow-800';
}

function pointRowClass(type: PointType): string {
  if (type === 'critical') return 'bg-red-50 -mx-2 px-2 py-0.5 rounded-md';
  if (type === 'win') return 'bg-emerald-50/50 -mx-2 px-2 py-0.5 rounded-md';
  return '';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SlideKeyTakeaways({ onNavigateHome }: { onNavigateHome?: () => void }) {
  return (
    <SlideContainer slideNumber={24} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Key Takeaways"
        subtitle="Strategic Summary · Jul 2025 – Apr 2026 · US & WW"
      />

      {/* ── 6-card Grid ─────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-3 gap-4 pb-4">
        {takeaways.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`bg-white rounded-xl border border-gray-200 border-l-4 ${card.borderColor} p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                  <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} strokeWidth={2} />
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${card.badgeBg}`}>
                  {card.label}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Bullet Points */}
              <ul className="space-y-2 flex-1">
                {card.points.map((point, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2 ${pointRowClass(point.type)}`}
                  >
                    <PointIcon type={point.type} />
                    <span className={`text-[12px] leading-snug ${pointTextClass(point.type)}`}>
                      {point.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-center gap-6 mb-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span className="text-[9px] font-semibold text-emerald-700 uppercase tracking-wide">Positive</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MinusCircle className="w-3 h-3 text-yellow-500" />
          <span className="text-[9px] font-semibold text-yellow-700 uppercase tracking-wide">Neutral</span>
        </div>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span className="text-[9px] font-semibold text-amber-700 uppercase tracking-wide">Monitor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <XCircle className="w-3 h-3 text-red-500" />
          <span className="text-[9px] font-semibold text-red-700 uppercase tracking-wide">Critical Gap</span>
        </div>
      </div>

      {/* ── Priority Actions Strip ───────────────────────────────────────── */}
      <div className="flex-shrink-0 mt-1 mb-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">
            Top 3 Action Priorities
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {priorities.map((p, idx) => {
            const PIcon = p.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3"
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg ${p.color} flex items-center justify-center mt-0.5`}>
                  <PIcon className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{p.label}</span>
                    <ArrowRight className="w-3 h-3 text-gray-300" />
                    <span className="text-[12px] font-bold text-gray-900 truncate">{p.action}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-snug">{p.detail}</p>
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
