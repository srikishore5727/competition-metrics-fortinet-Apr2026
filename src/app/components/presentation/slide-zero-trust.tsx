import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Shield, TrendingUp, TrendingDown, AlertTriangle, Sparkles, Zap } from 'lucide-react';
import { formatChartAxisNumber } from '@/app/utils/format';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
  ChartContainer,
  InsightCard,
  InsightsSection,
  EditButton,
  CompetitorFilter,
  CHART_CONFIG,
  TimeRangeFilter,
  TimeRange,
  getTimeRangeOffset,
} from './design-system';

// Vendors with design system colors
const VENDORS = [
  { id: 'fortinet',     name: 'Fortinet',      color: '#EF4444' },
  { id: 'cisco',        name: 'Cisco',         color: '#FF7AB6' },
  { id: 'hpe',          name: 'HPE',           color: '#7ED957' },
  { id: 'paloalto',     name: 'Palo Alto',     color: '#FFB14A' },
  { id: 'checkpoint',   name: 'Check Point',   color: '#6C9AFF' },
  { id: 'crowdstrike',  name: 'CrowdStrike',   color: '#1F2937' },
  { id: 'catonetworks', name: 'Cato Networks', color: '#A78BFA' },
  { id: 'sentinelone',  name: 'SentinelOne',   color: '#34D399' },
  { id: 'wiz',          name: 'Wiz',           color: '#06B6D4' },
];

// Full data - Jul 2025 to Apr 2026 (10 months)
const TOTAL_KEYWORDS_DATA_INITIAL = {
  fortinet:    [301, 307, 218, 179, 210, 218, 226, 222, 227, 207],
  cisco:       [310, 312, 163, 104, 126, 141, 135, 139, 138, 104],
  hpe:         [ 71,  80,  20,  12,  22,  23,  22,  30,  23,  17],
  paloalto:    [325, 348, 246, 225, 224, 232, 228, 237, 236, 215],
  checkpoint:  [242, 250,  99,  46,  96, 115, 104, 105,  87,  58],
  crowdstrike: [0, 0, 0, 0, 204, 217, 215, 220, 208, 160],
  catonetworks:[0, 0, 0, 0, 0, 71, 72, 73, 49, 17],
  sentinelone: [0, 0, 0, 0, 0, 101, 106, 93, 90, 62],
  wiz:         [null, null, null, null, null, null, null, null, 16, 6], // Mar 2026 only
};

const CUMULATIVE_TRAFFIC_DATA_INITIAL = {
  fortinet:    [4565, 7238, 5353, 5994, 5370, 5926, 6208, 5688, 7125, 6489],
  cisco:       [1983, 2275, 1776, 1854, 1442, 1352, 1462, 1955, 1667, 1906],
  hpe:         [  49,   84,   39,   19,   75,   81,   55,   53,   67,  110],
  paloalto:    [7219, 6300, 6434, 6942, 6334, 7388, 7193, 9993, 9513, 9469],
  checkpoint:  [ 215,  287,  176,  357,  408,  558,  352, 1096,  687,  859],
  crowdstrike: [0, 0, 0, 0, 8230, 10344, 11093, 9760, 8538, 5952],
  catonetworks:[0, 0, 0, 0, 0, 200, 241, 234, 248, 87],
  sentinelone: [0, 0, 0, 0, 0, 1774, 1841, 1851, 2162, 2145],
  wiz:         [null, null, null, null, null, null, null, null, 66, 9], // Mar 2026 only
};

const PAGE_ONE_KEYWORDS_DATA_INITIAL = {
  fortinet:    [113, 120, 134, 143, 174, 180, 192, 182, 199, 185],
  cisco:       [ 73,  89,  70,  64,  69,  53,  58,  60,  73,  73],
  hpe:         [  3,   6,   5,   3,   7,   8,   5,   9,   6,   8],
  paloalto:    [146, 187, 177, 194, 193, 179, 172, 179, 195, 189],
  checkpoint:  [ 15,  21,  21,  16,  29,  29,  20,  20,  22,  26],
  crowdstrike: [0, 0, 0, 0, 176, 170, 170, 170, 167, 144],
  catonetworks:[0, 0, 0, 0, 0, 17, 19, 19, 20, 9],
  sentinelone: [0, 0, 0, 0, 0, 57, 54, 47, 61, 52],
  wiz:         [null, null, null, null, null, null, null, null, 8, 4], // Mar 2026 only
};

const AIO_DATA_INITIAL = {
  fortinet:    [165, 176, 120, 120, 151, 163, 175, 174, 181, 161],
  cisco:       [152, 175,  89,  58,  91, 102, 102,  97,  99,  75],
  hpe:         [ 42,  52,   6,  10,  22,  22,  20,  28,  20,  16],
  paloalto:    [160, 190, 136, 140, 157, 157, 165, 163, 174, 158],
  checkpoint:  [139, 163,  48,  30,  82,  98,  92,  90,  71,  46],
  crowdstrike: [0, 0, 0, 0, 158, 163, 164, 160, 156, 130],
  catonetworks:[0, 0, 0, 0, 0, 62, 62, 62, 42, 14],
  sentinelone: [0, 0, 0, 0, 0, 77, 81, 71, 66, 45],
  wiz:         [null, null, null, null, null, null, null, null, 13, 4], // Mar 2026 only
};

const MONTHS = ['2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'];

// Format function for month display
const formatMonth = (monthKey: string) => {
  const [year, month] = monthKey.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

type TabType = 'keywords' | 'page-one' | 'traffic' | 'aio';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;
  const validPayload = payload.filter((entry: any) => entry.value !== null && entry.value !== undefined);
  if (!validPayload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
      <p className="text-xs font-semibold text-gray-900 mb-2">{formatMonth(label)}</p>
      {validPayload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs mb-1">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700">{entry.name}:</span>
          <span className="font-semibold text-gray-900">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export function SlideZeroTrust({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('keywords');
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [visibleVendors, setVisibleVendors] = useState<Set<string>>(
    new Set(VENDORS.map((v) => v.id))
  );
  
  // State for editable data
  const [editableData, setEditableData] = useState<{
    keywords: Record<string, number[]>;
    traffic: Record<string, number[]>;
    pageOne: Record<string, number[]>;
    aio: Record<string, number[]>;
  }>(() => ({
    keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_DATA_INITIAL)),
    traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_DATA_INITIAL)),
    pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KEYWORDS_DATA_INITIAL)),
    aio: JSON.parse(JSON.stringify(AIO_DATA_INITIAL)),
  }));

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableData({
      keywords: JSON.parse(JSON.stringify(TOTAL_KEYWORDS_DATA_INITIAL)),
      traffic: JSON.parse(JSON.stringify(CUMULATIVE_TRAFFIC_DATA_INITIAL)),
      pageOne: JSON.parse(JSON.stringify(PAGE_ONE_KEYWORDS_DATA_INITIAL)),
      aio: JSON.parse(JSON.stringify(AIO_DATA_INITIAL)),
    });
    setIsEditing(false);
  };

  const handleValueChange = (
    dataset: 'keywords' | 'traffic' | 'pageOne' | 'aio',
    vendorId: string,
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    
    setEditableData((prev) => ({
      ...prev,
      [dataset]: {
        ...prev[dataset],
        [vendorId]: prev[dataset][vendorId].map((v, i) => (i === index ? numValue : v)),
      },
    }));
  };

  const toggleVendor = (vendorId: string) => {
    setVisibleVendors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(vendorId)) {
        newSet.delete(vendorId);
      } else {
        newSet.add(vendorId);
      }
      return newSet;
    });
  };

  const tro = getTimeRangeOffset(timeRange);
  const totalKeywordsChartData = MONTHS.slice(tro).map((month, i) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editableData.keywords[vendor.id][i + tro] ?? null;
      }
    });
    return dataPoint;
  });

  const cumulativeTrafficChartData = MONTHS.slice(tro).map((month, i) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editableData.traffic[vendor.id][i + tro] ?? null;
      }
    });
    return dataPoint;
  });

  const getTrafficYMax = () => {
    let max = 0;
    cumulativeTrafficChartData.forEach((point) => {
      VENDORS.forEach((vendor) => {
        if (visibleVendors.has(vendor.id) && point[vendor.id] != null) {
          max = Math.max(max, point[vendor.id]);
        }
      });
    });
    return Math.ceil(max * 1.15);
  };

  const trafficYMax = getTrafficYMax();

  const pageOneKeywordsChartData = MONTHS.slice(tro).map((month, i) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editableData.pageOne[vendor.id][i + tro] ?? null;
      }
    });
    return dataPoint;
  });

  const aioChartData = MONTHS.slice(tro).map((month, i) => {
    const dataPoint: any = { month };
    VENDORS.forEach((vendor) => {
      if (visibleVendors.has(vendor.id)) {
        dataPoint[vendor.id] = editableData.aio[vendor.id][i + tro] ?? 0;
      }
    });
    return dataPoint;
  });

  const tabs = [
    { id: 'keywords' as TabType, label: 'Total Keywords' },
    { id: 'page-one' as TabType, label: 'Page 1 Keywords' },
    { id: 'traffic' as TabType, label: 'Cumulative Traffic' },
    { id: 'aio' as TabType, label: 'AIO (AI Overview)' },
  ];

  const getChartData = () => {
    switch (activeTab) {
      case 'keywords': return totalKeywordsChartData;
      case 'page-one': return pageOneKeywordsChartData;
      case 'traffic': return cumulativeTrafficChartData;
      case 'aio': return aioChartData;
      default: return [];
    }
  };

  const getInsights = () => {
    switch (activeTab) {
      case 'keywords':
        return (
          <InsightsSection>
            <InsightCard
              icon={TrendingDown}
              type="error"
              title="Fortinet"
              content="From Jul 2025 to Apr 2026, keywords declined 301 → 207 (−31.2%), matching Palo Alto 215."
            />
            <InsightCard
              icon={TrendingDown}
              type="error"
              title="Competitions"
              content="From Jul 2025 to Apr 2026, Palo Alto declined 325 → 215 (−33.8%), Cisco declined 310 → 104 (−66.5%)."
            />
          </InsightsSection>
        );
      case 'page-one':
        return (
          <InsightsSection>
            <InsightCard
              icon={TrendingUp}
              type="success"
              title="Fortinet"
              content="From Jul 2025 to Apr 2026, rankings grew 113 → 185 (+63.7%), closely trailing Palo Alto 189."
            />
            <InsightCard
              icon={TrendingUp}
              type="success"
              title="Competitions"
              content="From Jul 2025 to Apr 2026, Palo Alto grew 146 → 189 (+29.5%), Crowdstrike grew 0 → 144."
            />
          </InsightsSection>
        );
      case 'traffic':
        return (
          <InsightsSection>
            <InsightCard
              icon={TrendingUp}
              type="success"
              title="Fortinet"
              content="From Jul 2025 to Apr 2026, traffic grew 4,565 → 6,489 (+42.1%), trailing Palo Alto 9,469."
            />
            <InsightCard
              icon={TrendingUp}
              type="success"
              title="Competitions"
              content="From Jul 2025 to Apr 2026, Palo Alto grew 7,219 → 9,469 (+31.2%), leading all competitors."
            />
          </InsightsSection>
        );
      case 'aio':
        return (
          <InsightsSection>
            <InsightCard
              icon={TrendingDown}
              type="error"
              title="Fortinet"
              content="From Jul 2025 to Apr 2026, AIO slightly declined 165 → 161 (−2.4%), leading Palo Alto 158."
            />
            <InsightCard
              icon={TrendingDown}
              type="error"
              title="Competitions"
              content="From Jul 2025 to Apr 2026, Palo Alto declined 160 → 158 (−1.3%), Crowdstrike declined to 130."
            />
          </InsightsSection>
        );
      default:
        return null;
    }
  };

  const getPerformanceSummary = () => {
    const latestIndex = 9; // Apr 2026
    let dataSource: Record<string, number[]>;
    let formatValue: (val: number) => string;

    switch (activeTab) {
      case 'keywords':
        dataSource = editableData.keywords;
        formatValue = (val) => val.toLocaleString();
        break;
      case 'page-one':
        dataSource = editableData.pageOne;
        formatValue = (val) => val.toLocaleString();
        break;
      case 'traffic':
        dataSource = editableData.traffic;
        formatValue = (val) => `${(val / 1000).toFixed(1)}K`;
        break;
      case 'aio':
        dataSource = editableData.aio;
        formatValue = (val) => val.toLocaleString();
        break;
      default:
        return null;
    }

    // Get latest values for all vendors
    const rankings = VENDORS.map(vendor => ({
      id: vendor.id,
      name: vendor.name,
      value: dataSource[vendor.id]?.[latestIndex] ?? 0,
      color: vendor.color,
    })).sort((a, b) => b.value - a.value);

    const fortinetRanking = rankings.find(r => r.id === 'fortinet');
    if (!fortinetRanking) return null;

    const fortinetPosition = rankings.findIndex(r => r.id === 'fortinet') + 1;
    const isLeader = fortinetPosition === 1;
    const secondPlace = rankings[1];
    const firstPlace = rankings[0];

    if (isLeader) {
      // Fortinet is #1, show who's in second
      const gap = fortinetRanking.value - secondPlace.value;
      const gapPercent = ((gap / fortinetRanking.value) * 100).toFixed(1);
      
      return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-green-900">Top Performer - <span className="font-bold">Fortinet</span></span>
              <span className="text-sm text-green-900 font-semibold">{formatValue(fortinetRanking.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-green-800">2nd position - {secondPlace.name}</span>
              <span className="text-sm text-green-800 font-semibold">{formatValue(secondPlace.value)}</span>
            </div>
            <div>
              <span className="text-sm text-green-900"><span className="font-semibold">Lead:</span> +{formatValue(gap)} ({gapPercent}% ahead)</span>
            </div>
          </div>
        </div>
      );
    } else {
      const gap = firstPlace.value - fortinetRanking.value;
      const gapPercent = ((gap / firstPlace.value) * 100).toFixed(1);
      const ordinal = (n: number) => n === 2 ? '2nd' : n === 3 ? '3rd' : `${n}th`;
      return (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-orange-300 rounded-xl p-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sm text-orange-900">Top Performer - <span className="font-bold">{firstPlace.name}</span></span>
              <span className="text-sm text-orange-900 font-semibold">{formatValue(firstPlace.value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-orange-800">{ordinal(fortinetPosition)} position - Fortinet</span>
              <span className="text-sm text-orange-800 font-semibold">{formatValue(fortinetRanking.value)}</span>
            </div>
            <div>
              <span className="text-sm text-orange-900"><span className="font-semibold">Gap to #1:</span> {formatValue(gap)} ({gapPercent}% behind)</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderChart = () => {
    const chartData = getChartData();
    const visibleVendorsList = VENDORS.filter(v => visibleVendors.has(v.id));
    
    if (activeTab === 'traffic') {
      return (
        <ResponsiveContainer key={`${activeTab}-${Array.from(visibleVendors).sort().join('-')}`} width="100%" height="100%">
          <LineChart id={`ztna-line-${activeTab}`} data={chartData} margin={CHART_CONFIG.margin}>
            <CartesianGrid id={`ztna-grid-${activeTab}`} {...CHART_CONFIG.cartesianGrid} />
            <XAxis id={`ztna-xaxis-${activeTab}`} dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} />
            <YAxis id={`ztna-yaxis-${activeTab}`} domain={[0, trafficYMax]} {...CHART_CONFIG.yAxis} tickFormatter={formatChartAxisNumber} />
            <Tooltip id={`ztna-tooltip-${activeTab}`} content={<CustomTooltip />} />
            {visibleVendorsList.map((vendor) => (
              <Line
                key={vendor.id}
                type="monotone"
                dataKey={vendor.id}
                name={vendor.name}
                stroke={vendor.color}
                {...CHART_CONFIG.line}
                dot={{ fill: vendor.color, r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Bar chart for all other tabs
    return (
      <ResponsiveContainer key={`${activeTab}-${Array.from(visibleVendors).sort().join('-')}`} width="100%" height="100%">
        <BarChart id={`ztna-bar-${activeTab}`} data={chartData} margin={CHART_CONFIG.margin}>
          <CartesianGrid id={`ztna-bar-grid-${activeTab}`} {...CHART_CONFIG.cartesianGrid} />
          <XAxis id={`ztna-bar-xaxis-${activeTab}`} dataKey="month" {...CHART_CONFIG.xAxis} tickFormatter={formatMonth} />
          <YAxis id={`ztna-bar-yaxis-${activeTab}`} {...CHART_CONFIG.yAxis} />
          <Tooltip id={`ztna-bar-tooltip-${activeTab}`} content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          {visibleVendorsList.map((vendor) => (
            <Bar key={vendor.id} name={vendor.name} dataKey={vendor.id} fill={vendor.color} radius={CHART_CONFIG.bar.radius} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <SlideContainer slideNumber={12} onNavigateHome={onNavigateHome} source="Ahrefs">
      <SlideHeader 
        title="Zero Trust Security" 
        subtitle="(Jul 2025 - Apr 2026)"
      />
      
      {!isEditing ? (
        <div className="flex-1 flex flex-col gap-6">
          {/* Tabs */}
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
                    ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                    : '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <TimeRangeFilter value={timeRange} onChange={setTimeRange} />

          {/* Content Area */}
          <div className="flex-1 grid grid-cols-12 gap-6">
            {/* Chart Section - 8 columns */}
            <div className="col-span-8 flex flex-col gap-4">
              <ChartContainer
                title=""
                actions={<EditButton isEditing={isEditing} onEdit={handleEdit} onSave={handleSave} onCancel={handleCancel} />}
                height={420}
              >
                <div className="h-full flex flex-col">
                  <div className="pb-4 border-b border-gray-200 mb-4">
                    <CompetitorFilter
                      competitors={VENDORS}
                      visibleCompetitors={visibleVendors}
                      onToggle={toggleVendor}
                    />
                  </div>
                  <div className="flex-1">
                    {renderChart()}
                  </div>
                </div>
              </ChartContainer>
            </div>

            {/* Insights Section - 4 columns */}
            <div className="col-span-4 flex flex-col gap-4">
              {getInsights()}
              {getPerformanceSummary()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Edit Zero Trust Metrics Data</h3>
            <div className="space-y-6">
              {VENDORS.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: vendor.color }} />
                    <h4 className="text-sm font-bold text-gray-900">{vendor.name}</h4>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Total Keywords:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.keywords[vendor.id][idx]}
                            onChange={(e) => handleValueChange('keywords', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Traffic:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.traffic[vendor.id][idx]}
                            onChange={(e) => handleValueChange('traffic', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">Page 1 KWs:</div>
                      {['Oct', 'Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.pageOne[vendor.id][idx]}
                            onChange={(e) => handleValueChange('pageOne', vendor.id, idx, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">AIO:</div>
                      {['Nov', 'Dec', 'Jan'].map((month, idx) => (
                        <div key={month} className="mb-2">
                          <label className="text-xs text-gray-600 block mb-1">{month}:</label>
                          <input
                            type="number"
                            value={editableData.aio[vendor.id][idx + 1]}
                            onChange={(e) => handleValueChange('aio', vendor.id, idx + 1, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <SlideFooter source="Source: Ahrefs" />
    </SlideContainer>
  );
}