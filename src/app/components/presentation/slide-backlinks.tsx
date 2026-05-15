import { useState } from 'react';
import { TrendingUp, TrendingDown, Trophy, Target } from 'lucide-react';
import { formatNumber } from '@/app/utils/format';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  CompetitorFilter,
  CHART_CONFIG,
  TimeRangeFilter,
  TimeRange,
  getTimeRangeOffset,
} from './design-system';

// ─── Vendors (9 including Wiz) ────────────────────────────────────────────────
const VENDORS = [
  { id: 'fortinet',    name: 'Fortinet',      color: '#EF4444' },
  { id: 'paloalto',   name: 'Palo Alto',      color: '#FFB14A' },
  { id: 'checkpoint', name: 'Check Point',    color: '#6C9AFF' },
  { id: 'hpe',        name: 'HPE',            color: '#7ED957' },
  { id: 'cisco',      name: 'Cisco',          color: '#FF7AB6' },
  { id: 'crowdstrike',name: 'CrowdStrike',    color: '#1F2937' },
  { id: 'cato',       name: 'Cato Networks',  color: '#A78BFA' },
  { id: 'sentinelone',name: 'SentinelOne',    color: '#F59E0B' },
  { id: 'wiz',        name: 'Wiz',            color: '#06B6D4' },
];

// ─── Referring Domains — Jul 2025 → Apr 2026 (Source: SEMrush, Location: WW) ─
const REFERRING_DOMAINS_DATA_INITIAL: Record<string, number[]> = {
  fortinet:    [54366,  54824,  54764,  55753,  55664,  55539,  54676,  54800,  55722,  53881],
  paloalto:    [42176,  42110,  41804,  43395,  43492,  42913,  42607,  43274,  44892,  43551],
  checkpoint:  [59363,  59664,  59675,  60931,  61349,  60699,  60302,  60848,  62166,  60594],
  hpe:         [84611,  84164,  83241,  84928,  85049,  81908,  79383,  78234,  79355,  76354],
  cisco:       [238434, 239069, 238654, 240813, 238909, 234233, 231358, 234186, 239850, 230654],
  crowdstrike: [39155,  39201,  39187,  39829,  41063,  40497,  40061,  40158,  41103,  39867],
  cato:        [5142,   5337,   5440,   5740,   6034,   6142,   6337,   6341,   6466,   6245],
  sentinelone: [19295,  19329,  19424,  20013,  20742,  20604,  20452,  20615,  21187,  20525],
  wiz:         [12572,  12889,  13081,  13660,  14318,  14615,  14732,  15484,  16189,  15782],
};

// ─── Backlinks — Jul 2025 → Apr 2026 (Source: SEMrush, Location: WW) ─────────
const BACKLINKS_DATA_INITIAL: Record<string, number[]> = {
  fortinet:    [3170000,  2920000,  2990000,  2960000,  2780000,  2780000,  2800000,  2810000,  3060000,  2890000],
  paloalto:    [3350000,  3320000,  3150000,  3070000,  2980000,  2660000,  2580000,  2600000,  2640000,  2450000],
  checkpoint:  [5760000,  5880000,  6730000,  7200000,  6810000,  6500000,  5860000,  5660000,  5670000,  3910000],
  hpe:         [24370000, 23720000, 23100000, 27620000, 29960000, 29890000, 29640000, 29590000, 29570000, 27340000],
  cisco:       [43220000, 44410000, 43920000, 48290000, 49870000, 48050000, 46710000, 46300000, 48610000, 44270000],
  crowdstrike: [1690000,  1660000,  1620000,  1670000,  1690000,  1560000,  1400000,  1410000,  1440000,  1310000],
  cato:        [1080000,  714300,   362500,   166150,   108680,   105410,   119310,   137720,   163460,   156080],
  sentinelone: [1120000,  1116520,  1304790,  1458140,  1370330,  1224920,  1083970,  1057850,  1056520,  803170],
  wiz:         [3050000,  2950000,  2580000,  2250000,  2080000,  1820000,  1750000,  1670000,  1550000,  1320000],
};

// ─── Month helpers ────────────────────────────────────────────────────────────
const MONTH_KEYS = [
  '2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04',
];

const formatMonth = (key: string) => {
  const map: Record<string, string> = {
    '2025-07': 'Jul 2025', '2025-08': 'Aug 2025', '2025-09': 'Sep 2025',
    '2025-10': 'Oct 2025', '2025-11': 'Nov 2025', '2025-12': 'Dec 2025',
    '2026-01': 'Jan 2026', '2026-02': 'Feb 2026', '2026-03': 'Mar 2026',
    '2026-04': 'Apr 2026',
  };
  return map[key] ?? key;
};

type TabType = 'referringDomains' | 'backlinks';

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, isBacklinks }: any) => {
  if (!active || !payload?.length) return null;
  const validPayload = payload.filter((e: any) => e.value != null);
  if (!validPayload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs">
      <p className="text-xs font-semibold text-gray-900 mb-2">{formatMonth(label)}</p>
      {validPayload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs mb-1">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {isBacklinks ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ────────────────────────────────���──────────────────────────
export function SlideBacklinks({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('referringDomains');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );
  const [editableData] = useState<{
    referringDomains: Record<string, number[]>;
    backlinks: Record<string, number[]>;
  }>({
    referringDomains: JSON.parse(JSON.stringify(REFERRING_DOMAINS_DATA_INITIAL)),
    backlinks:        JSON.parse(JSON.stringify(BACKLINKS_DATA_INITIAL)),
  });

  const toggleVendor = (vendorId: string) => {
    setVisibleVendors((prev) => {
      const s = new Set(prev);
      if (s.has(vendorId)) s.delete(vendorId); else s.add(vendorId);
      return s;
    });
  };

  const tro = getTimeRangeOffset(timeRange);

  const referringDomainsChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dp: any = { month: monthKey };
    VENDORS.forEach((v) => {
      if (visibleVendors.has(v.id)) dp[v.id] = editableData.referringDomains[v.id]?.[i + tro] ?? null;
    });
    return dp;
  });

  const backlinksChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dp: any = { month: monthKey };
    VENDORS.forEach((v) => {
      if (visibleVendors.has(v.id)) dp[v.id] = editableData.backlinks[v.id]?.[i + tro] ?? null;
    });
    return dp;
  });

  const getYMax = (chartData: any[]) => {
    let max = 0;
    chartData.forEach((pt) =>
      VENDORS.forEach((v) => { if (visibleVendors.has(v.id) && pt[v.id] != null) max = Math.max(max, pt[v.id]); })
    );
    return Math.ceil(max * 1.15);
  };

  // ── Insights ─────────────────────────────────────────────────────────────
  const getInsights = () => {
    if (activeTab === 'referringDomains') {
      return (
        <InsightsSection>
          <InsightCard
            icon={TrendingDown}
            type="error"
            title="Fortinet"
            content="From Jul 2025 to Apr 2026, domains slipped 54.4K → 53.9K (−1%), Wiz grew 12.6K → 15.8K (+26%)."
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content="From Jul 2025 to Apr 2026, Cisco fell 238.4K → 230.7K (−3%), Checkpoint grew 59.4K → 60.6K (+2%)."
          />
        </InsightsSection>
      );
    }
    return (
      <InsightsSection>
        <InsightCard
          icon={TrendingDown}
          type="error"
          title="Fortinet"
          content="From Jul 2025 to Apr 2026, backlinks fell 3.2M → 2.9M (−9%), Wiz dropped 3.1M → 1.3M (−57%)."
        />
        <InsightCard
          icon={TrendingDown}
          type="error"
          title="Competitions"
          content="From Jul 2025 to Apr 2026, Palo Alto declined 3.4M → 2.5M (−27%), Checkpoint fell 5.8M → 3.9M (−32%)."
        />
      </InsightsSection>
    );
  };

  // ── Performance summary (Apr 2026, index 9) ──────────────────────────────
  const getPerformanceSummary = () => {
    const latestIndex = 9;
    const dataSource = activeTab === 'referringDomains'
      ? editableData.referringDomains
      : editableData.backlinks;
    const fmtV = (v: number) => formatNumber(v);
    const ordinal = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

    const rankings = VENDORS.map((v) => ({
      id: v.id, name: v.name, value: dataSource[v.id]?.[latestIndex] ?? 0,
    })).sort((a, b) => b.value - a.value);

    const ftRank = rankings.find((r) => r.id === 'fortinet')!;
    const ftPos  = rankings.findIndex((r) => r.id === 'fortinet') + 1;
    const first  = rankings[0];
    const second = rankings[1];

    if (ftPos === 1) {
      const gap = ftRank.value - second.value;
      const gapPct = ((gap / ftRank.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <Trophy className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Apr 2026 Standing</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-green-900">Top Performer — <span className="font-bold">Fortinet</span></span>
              <span className="text-sm text-green-900 font-semibold">{fmtV(ftRank.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-800">2nd — {second.name}</span>
              <span className="text-sm text-green-800 font-semibold">{fmtV(second.value)}</span>
            </div>
            <div>
              <span className="text-sm text-green-900">
                <span className="font-semibold">Lead:</span> +{fmtV(gap)} ({gapPct}% ahead)
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      const gap = first.value - ftRank.value;
      const gapPct = ((gap / first.value) * 100).toFixed(1);
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-1.5 mb-2">
            <Target className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wide">Apr 2026 Standing</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-orange-900">Top Performer — <span className="font-bold">{first.name}</span></span>
              <span className="text-sm text-orange-900 font-semibold">{fmtV(first.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-orange-800">{ordinal(ftPos)} — Fortinet</span>
              <span className="text-sm text-orange-800 font-semibold">{fmtV(ftRank.value)}</span>
            </div>
            <div>
              <span className="text-sm text-orange-900">
                <span className="font-semibold">Gap to #1:</span> {fmtV(gap)} ({gapPct}% behind)
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  const tabs = [
    { id: 'referringDomains' as TabType, label: 'Referring Domains' },
    { id: 'backlinks'        as TabType, label: 'Total Backlinks'   },
  ];

  const chartData  = activeTab === 'referringDomains' ? referringDomainsChartData : backlinksChartData;
  const isBacklinks = activeTab === 'backlinks';
  const vendorKey  = Array.from(visibleVendors).sort().join('-');

  return (
    <SlideContainer slideNumber={23} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="Competitions Backlink Performance"
        subtitle="(Jul 2025 – Apr 2026) • Location: WW"
      />

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">

        {/* ── Dataset Tabs ─────────────────────────────────────────────── */}
        <div className="flex items-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 z-10'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
              }`}
              style={{
                borderRadius: '12px 12px 0 0',
                marginBottom: '-2px',
                boxShadow: activeTab === tab.id
                  ? '0 -2px 8px rgba(0,0,0,0.08), 0 2px 0 0 white'
                  : '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Time Range ───────────────────────────────────────────────── */}
        <TimeRangeFilter value={timeRange} onChange={setTimeRange} />

        {/* ── Chart + Insights ─────────────────────────────────────────── */}
        <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
          {/* Chart — 8 cols */}
          <div className="col-span-8 flex flex-col gap-4">
            <ChartContainer title="" height={420}>
              <div className="h-full flex flex-col">
                <div className="pb-4 border-b border-gray-200 mb-4">
                  <CompetitorFilter
                    competitors={VENDORS}
                    visibleCompetitors={visibleVendors}
                    onToggle={toggleVendor}
                  />
                </div>
                <div className="flex-1">
                  <ResponsiveContainer key={`${activeTab}-${vendorKey}`} width="100%" height="100%">
                    <LineChart data={chartData} margin={CHART_CONFIG.margin}>
                      <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
                      <XAxis
                        dataKey="month"
                        {...CHART_CONFIG.xAxis}
                        tickFormatter={formatMonth}
                        interval={0}
                      />
                      <YAxis
                        {...CHART_CONFIG.yAxis}
                        domain={[0, getYMax(chartData)]}
                        tickFormatter={(v) => formatNumber(v)}
                      />
                      <Tooltip content={(props) => <CustomTooltip {...props} isBacklinks={isBacklinks} />} />
                      {VENDORS.filter((v) => visibleVendors.has(v.id)).map((vendor) => (
                        <Line
                          key={vendor.id}
                          name={vendor.name}
                          type="monotone"
                          dataKey={vendor.id}
                          stroke={vendor.color}
                          {...CHART_CONFIG.line}
                          dot={{ fill: vendor.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                          activeDot={{ r: 7, strokeWidth: 2 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ChartContainer>
          </div>

          {/* Insights — 4 cols */}
          <div className="col-span-4 flex flex-col gap-4">
            {getInsights()}
            {getPerformanceSummary()}
          </div>
        </div>
      </div>

      <SlideFooter source="Source: SEMrush" />
    </SlideContainer>
  );
}