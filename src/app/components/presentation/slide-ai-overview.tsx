import { useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, Trophy, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/app/utils/format';
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
  { id: 'cisco',       name: 'Cisco',         color: '#FF7AB6' },
  { id: 'hpe',         name: 'HPE',           color: '#7ED957' },
  { id: 'paloalto',    name: 'Palo Alto',     color: '#FFB14A' },
  { id: 'checkpoint',  name: 'Check Point',   color: '#6C9AFF' },
  { id: 'crowdstrike', name: 'CrowdStrike',   color: '#1F2937' },
  { id: 'cato',        name: 'Cato Networks', color: '#A78BFA' },
  { id: 'sentinelone', name: 'SentinelOne',   color: '#F59E0B' },
  { id: 'wiz',         name: 'Wiz',           color: '#06B6D4' },
];

// ─── AIO Keywords — Jul 2025 → Apr 2026 (10 months, Source: SEMrush) ──────────
const AIO_KEYWORDS_DATA_INITIAL: Record<string, number[]> = {
  fortinet:    [10829, 12194, 12482, 12365, 11938, 13887, 16395, 16503, 18900, 24298],
  cisco:       [13691, 14468, 14574, 14365, 13811, 15752, 17923, 18245, 21308, 27867],
  hpe:         [2702,  2774,  2844,  2784,  3257,  5159,  6049,  5872,  7008,  7706],
  paloalto:    [4322,  4274,  4466,  4506,  4653,  6092,  7536,  7897,  9564,  11924],
  checkpoint:  [2409,  2213,  2161,  2132,  2013,  1878,  1762,  1573,  2263,  3140],
  crowdstrike: [4247,  4729,  5123,  5051,  4623,  4456,  4992,  5279,  5689,  7563],
  cato:        [231,   301,   277,   270,   231,   263,   296,   315,   540,   674],
  sentinelone: [3268,  3155,  3209,  3274,  3411,  4247,  4936,  5516,  7510,  8334],
  wiz:         [890,   939,   1030,  1051,  1091,  1562,  1948,  2202,  2883,  2939],
};

// ─── AIO Traffic — Jul 2025 → Apr 2026 (10 months, Source: SEMrush) ───────────
const AIO_TRAFFIC_DATA_INITIAL: Record<string, number[]> = {
  fortinet:    [31927,  97533,  83220,  89387,  111533, 269736, 190645, 207640, 367278, 352079],
  cisco:       [37628,  103811, 110409, 105848, 221685, 192321, 96999,  260919, 355774, 279737],
  hpe:         [4553,   20403,  17052,  15630,  29985,  62162,  34054,  42252,  54271,  41126],
  paloalto:    [6363,   20685,  59321,  114814, 40224,  66468,  49190,  50299,  80268,  91191],
  checkpoint:  [3645,   9501,   9504,   10203,  10252,  10514,  6144,   8835,   12423,  12407],
  crowdstrike: [70372,  42889,  33742,  44539,  169073, 54807,  33199,  177583, 52186,  66843],
  cato:        [140,    1154,   1198,   1157,   1406,   1342,   993,    1490,   3534,   2969],
  sentinelone: [5430,   10839,  15126,  13414,  16130,  22651,  19999,  91883,  46728,  32092],
  wiz:         [897,    5718,   6418,   12359,  86440,  148096, 7178,   11528,  162533, 13429],
};

const MONTH_KEYS = [
  '2025-07','2025-08','2025-09','2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04',
];

const MONTHS_LABELS = [
  'Jul 2025','Aug 2025','Sep 2025','Oct 2025','Nov 2025','Dec 2025','Jan 2026','Feb 2026','Mar 2026','Apr 2026',
];

const formatMonth = (key: string) => {
  const map: Record<string, string> = {
    '2025-07': 'Jul 2025',
    '2025-08': 'Aug 2025',
    '2025-09': 'Sep 2025',
    '2025-10': 'Oct 2025',
    '2025-11': 'Nov 2025',
    '2025-12': 'Dec 2025',
    '2026-01': 'Jan 2026',
    '2026-02': 'Feb 2026',
    '2026-03': 'Mar 2026',
    '2026-04': 'Apr 2026',
  };
  return map[key] ?? key;
};

type TabType = 'keywords' | 'traffic';

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, isTraffic }: any) => {
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
            {isTraffic ? formatNumber(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Raw Data Table ───────────────────────────────────────────────────────────
function RawDataTable({
  data,
  label,
  isTraffic,
}: {
  data: Record<string, number[]>;
  label: string;
  isTraffic: boolean;
}) {
  // Per column: find max value to highlight
  const maxPerCol = MONTHS_LABELS.map((_, ci) =>
    Math.max(...VENDORS.map((v) => data[v.id]?.[ci] ?? 0))
  );
  const minPerCol = MONTHS_LABELS.map((_, ci) =>
    Math.min(...VENDORS.map((v) => data[v.id]?.[ci] ?? Infinity))
  );

  const fmt = (v: number) =>
    isTraffic ? v.toLocaleString() : v.toLocaleString();

  return (
    <div className="overflow-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse" style={{ fontSize: '11px', tableLayout: 'auto' }}>
        <thead>
          <tr style={{ backgroundColor: '#1565C0' }}>
            <th className="py-2 px-3 text-left text-white font-bold whitespace-nowrap border-r border-blue-400" style={{ minWidth: 110 }}>
              {label}
            </th>
            {MONTHS_LABELS.map((m) => (
              <th key={m} className="py-2 px-2 text-center text-white font-bold whitespace-nowrap border-r border-blue-400 last:border-r-0">
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VENDORS.map((vendor, vi) => {
            const isFortinetRow = vendor.id === 'fortinet';
            return (
              <tr
                key={vendor.id}
                className={vi % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                style={isFortinetRow ? { backgroundColor: '#FFF7F7' } : {}}
              >
                <td
                  className="py-1.5 px-3 border-r border-gray-200 font-semibold whitespace-nowrap"
                  style={{ color: vendor.color, borderLeft: `3px solid ${vendor.color}` }}
                >
                  {vendor.name}
                </td>
                {(data[vendor.id] ?? []).map((val, ci) => {
                  const isMax = val === maxPerCol[ci];
                  const isMin = val === minPerCol[ci] && VENDORS.length > 1;
                  const isFortinetCell = vendor.id === 'fortinet';
                  let bgColor = '';
                  let textColor = '#111827';
                  if (isMax) { bgColor = '#4CAF50'; textColor = '#fff'; }
                  return (
                    <td
                      key={ci}
                      className="py-1.5 px-2 text-center border-r border-gray-100 last:border-r-0 font-medium tabular-nums"
                      style={{
                        backgroundColor: bgColor || (isFortinetCell ? '#FFF0F0' : ''),
                        color: isMax ? textColor : isFortinetCell ? '#B91C1C' : '#374151',
                        fontWeight: isFortinetCell || isMax ? 700 : 400,
                      }}
                    >
                      {fmt(val)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SlideAIOverview({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [editedData, setEditedData] = useState({
    keywords: JSON.parse(JSON.stringify(AIO_KEYWORDS_DATA_INITIAL)),
    traffic: JSON.parse(JSON.stringify(AIO_TRAFFIC_DATA_INITIAL)),
  });
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );

  const handleValueChange = (
    dataset: 'keywords' | 'traffic',
    vendorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    setEditedData((prev) => ({
      ...prev,
      [dataset]: {
        ...prev[dataset],
        [vendorId]: prev[dataset][vendorId].map((v: number, i: number) => (i === index ? numValue : v)),
      },
    }));
  };

  const toggleVendor = (vendorId: string) => {
    setVisibleVendors((prev) => {
      const s = new Set(prev);
      if (s.has(vendorId)) s.delete(vendorId); else s.add(vendorId);
      return s;
    });
  };

  const tro = getTimeRangeOffset(timeRange);

  const keywordsChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dp: any = { month: monthKey };
    VENDORS.forEach((v) => { if (visibleVendors.has(v.id)) dp[v.id] = editedData.keywords[v.id][i + tro]; });
    return dp;
  });

  const trafficChartData = MONTH_KEYS.slice(tro).map((monthKey, i) => {
    const dp: any = { month: monthKey };
    VENDORS.forEach((v) => { if (visibleVendors.has(v.id)) dp[v.id] = editedData.traffic[v.id][i + tro]; });
    return dp;
  });

  const getTrafficYMax = () => {
    let max = 0;
    trafficChartData.forEach((pt) =>
      VENDORS.forEach((v) => { if (visibleVendors.has(v.id) && pt[v.id] != null) max = Math.max(max, pt[v.id]); })
    );
    return Math.ceil(max * 1.15);
  };

  // ── Performance summary (latest = Apr 2026, index 9) ─────────────────────
  const getPerformanceSummary = () => {
    const latestIndex = 9; // Apr 2026
    const dataSource = activeTab === 'keywords' ? editedData.keywords : editedData.traffic;
    const fmtV = (v: number) => formatNumber(v);
    const ordinal = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;

    const rankings = VENDORS.map((v) => ({
      id: v.id, name: v.name, value: dataSource[v.id]?.[latestIndex] ?? 0,
    })).sort((a, b) => b.value - a.value);

    const ftRank = rankings.find((r) => r.id === 'fortinet')!;
    const ftPos = rankings.findIndex((r) => r.id === 'fortinet') + 1;
    const isLeader = ftPos === 1;
    const second = rankings[1];
    const first = rankings[0];

    if (isLeader) {
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

  // ── Insights ─────────────────────────────────────────────────────────────
  const getInsights = () => {
    if (activeTab === 'keywords') {
      return (
        <InsightsSection>
          <InsightCard
            icon={Sparkles}
            type="success"
            title="Fortinet"
            content="From Jul 2025 to Apr 2026, AIO keywords grew 10.8K → 24.3K (+124%), Cisco 13.7K → 27.9K (+104%)."
          />
          <InsightCard
            icon={TrendingUp}
            type="success"
            title="Competitions"
            content="From Jul 2025 to Apr 2026, Palo Alto surged 4.3K → 11.9K (+176%), SentinelOne 3.3K → 8.3K (+155%)."
          />
        </InsightsSection>
      );
    }
    return (
      <InsightsSection>
        <InsightCard
          icon={TrendingUp}
          type="success"
          title="Fortinet"
          content="From Jul 2025 to Apr 2026, AIO traffic surged 31.9K → 352.1K (+1,003%), peaking at 367.3K in Mar."
          />
        <InsightCard
          icon={TrendingUp}
          type="success"
          title="Competitions"
          content="From Jul 2025 to Apr 2026, Cisco grew 37.6K → 279.7K (+644%), Palo Alto 6.4K → 91.2K (+1,325%)."
        />
      </InsightsSection>
    );
  };

  // ── Chart renderer ────────────────────────────────────────────────────────
  const vendorKey = Array.from(visibleVendors).sort().join('-');

  const renderChart = () => {
    if (activeTab === 'traffic') {
      return (
        <ResponsiveContainer key={`traffic-${vendorKey}`} width="100%" height="100%">
          <LineChart data={trafficChartData} margin={CHART_CONFIG.margin}>
            <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
            <XAxis dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} interval={0} />
            <YAxis domain={[0, getTrafficYMax()]} {...CHART_CONFIG.yAxis} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={true} />} />
            {VENDORS.filter((v) => visibleVendors.has(v.id)).map((vendor) => (
              <Line
                key={vendor.id}
                name={vendor.name}
                type="monotone"
                dataKey={vendor.id}
                stroke={vendor.color}
                {...CHART_CONFIG.line}
                dot={{ fill: vendor.color, r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return (
      <ResponsiveContainer key={`keywords-${vendorKey}`} width="100%" height="100%">
        <BarChart data={keywordsChartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid {...CHART_CONFIG.cartesianGrid} />
          <XAxis dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} interval={0} />
          <YAxis {...CHART_CONFIG.yAxis} tickFormatter={(v) => formatNumber(v)} />
          <Tooltip content={(props) => <CustomTooltip {...props} isTraffic={false} />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          {VENDORS.filter((v) => visibleVendors.has(v.id)).map((vendor) => (
            <Bar key={vendor.id} name={vendor.name} dataKey={vendor.id} fill={vendor.color} radius={CHART_CONFIG.bar.radius} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const tabs = [
    { id: 'keywords' as TabType, label: 'AIO Keywords' },
    { id: 'traffic'  as TabType, label: 'AIO Traffic'   },
  ];

  return (
    <SlideContainer slideNumber={21} onNavigateHome={onNavigateHome}>
      <SlideHeader
        title="AI Overview Metrics"
        subtitle="(Jul 2025 – Apr 2026)"
      />

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">

        {/* ── Dataset Tabs ─────────────────────────────────────────────── */}
        <div className="flex items-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 text-sm font-semibold transition-all duration-200 relative ${
                activeTab === tab.id
                  ? 'bg-white text-red-600 z-10'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:text-gray-800'
              }`}
              style={{
                borderRadius: '10px 10px 0 0',
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
          <div className="col-span-8 flex flex-col gap-3">
            <ChartContainer title="" height={390}>
              <div className="h-full flex flex-col">
                <div className="pb-3 border-b border-gray-200 mb-3">
                  <CompetitorFilter competitors={VENDORS} visibleCompetitors={visibleVendors} onToggle={toggleVendor} />
                </div>
                <div className="flex-1">{renderChart()}</div>
              </div>
            </ChartContainer>
          </div>

          {/* Insights — 4 cols */}
          <div className="col-span-4 flex flex-col gap-4">
            {getInsights()}
            {getPerformanceSummary()}

            {/* Source badge */}
            
          </div>
        </div>
      </div>

      <SlideFooter source="Source: SEMrush" />
    </SlideContainer>
  );
}