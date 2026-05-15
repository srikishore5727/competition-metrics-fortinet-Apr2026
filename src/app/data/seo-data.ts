// SEO Competitive Analysis Sample Data
// Timeframe: Jul 2025 → Apr 2026

export const MONTHS = ['2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04'];
export const MONTH_LABELS = ['Jul 2025', 'Aug 2025', 'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'];

export const COMPETITORS = [
  { id: 'fortinet',     name: 'Fortinet',      color: '#EF4444' },
  { id: 'cisco',        name: 'Cisco',         color: '#FF7AB6' },
  { id: 'hpe',          name: 'HPE',           color: '#7ED957' },
  { id: 'paloalto',     name: 'Palo Alto',     color: '#FFB14A' },
  { id: 'checkpoint',   name: 'Check Point',   color: '#6C9AFF' },
  { id: 'crowdstrike',  name: 'Crowdstrike',   color: '#1F2937' },
  { id: 'catonetworks', name: 'Cato Networks', color: '#8B5CF6' },
  { id: 'sentinelone',  name: 'SentinelOne',   color: '#EC4899' },
  { id: 'wiz',          name: 'Wiz',           color: '#06B6D4' },
];

// Organic Traffic (in thousands)
export const ORGANIC_TRAFFIC = {
  fortinet:     [890185,  987459,  848534,  861429,  1014918, 1216565, 1238062, 1220873, 1581344, 1533871],
  cisco:        [1851119, 1926033, 1796711, 1597868, 2013042, 2062966, 1793605, 1824021, 2209106, 2033472],
  hpe:          [365056,  413677,  371077,  347469,  363898,  418122,  357392,  325543,  346671,  321834],
  paloalto:     [295767,  412493,  546710,  824929,  588517,  573648,  549652,  635255,  480797,  621794],
  checkpoint:   [179617,  193486,  242600,  316209,  173380,  148047,  136099,  123392,  140642,  130482],
  crowdstrike:  [351558,  1027015, 292017,  277997,  494958,  326721,  304393,  445930,  292824,  289604],
  catonetworks: [16993,   20452,   19024,   19607,   18712,   18833,   19371,   20085,   23361,   21839],
  sentinelone:  [147647,  156874,  161404,  193143,  314785,  176178,  205344,  278278,  218340,  280406],
  wiz:          [123301,  133788,  158697,  208969,  256702,  275225,  135028,  144920,  291935,  129293],
};

// Branded Traffic (in thousands)
export const BRANDED_TRAFFIC = {
  fortinet:     [158453, 121457, 161221, 161949, 114686, 93676,  118854, 92786,  102787, 110439],
  cisco:        [973689, 986129, 977411, 859653, 897817, 808683, 733584, 729608, 724587, 723916],
  hpe:          [132150, 134445, 139896, 141420, 133187, 140489, 119012, 98965,  101228, 102665],
  paloalto:     [70688,  129110, 231805, 164161, 112407, 153738, 124221, 130863, 116353, 162288],
  checkpoint:   [51550,  59787,  51674,  50277,  53228,  51816,  48179,  29737,  36708,  23095],
  crowdstrike:  [180701, 785666, 87605,  86457,  105426, 65344,  52356,  101672, 61493,  75297],
  catonetworks: [6831,   7383,   7686,   7804,   7466,   6629,   7361,   7371,   7078,   8998],
  sentinelone:  [60978,  60240,  60204,  56784,  57291,  55320,  60371,  60386,  33406,  62250],
  wiz:          [91243,  89638,  76175,  75229,  71877,  71559,  74265,  74199,  72400,  76283],
};

// Non-Branded Traffic (in thousands)
export const NON_BRANDED_TRAFFIC = {
  fortinet:     [731732, 866002, 687313, 699480,  900232,  1122889, 1119208, 1128087, 1478557, 1423432],
  cisco:        [877430, 939904, 819300, 738215,  1115225, 1254283, 1060021, 1094413, 1484519, 1309556],
  hpe:          [232906, 279232, 231181, 206049,  230711,  277633,  238380,  226578,  245443,  219169],
  paloalto:     [225079, 283383, 314905, 660768,  476110,  419910,  425431,  504392,  364444,  459506],
  checkpoint:   [128067, 133699, 190926, 265932,  120152,  96231,   87920,   93655,   103934,  107387],
  crowdstrike:  [170857, 241349, 204412, 191540,  389532,  261377,  252037,  344258,  231331,  214307],
  catonetworks: [10162,  13069,  11338,  11803,   11246,   12204,   12010,   12714,   16283,   12841],
  sentinelone:  [86669,  96634,  101200, 136359,  257494,  120858,  144973,  217892,  184934,  218156],
  wiz:          [32058,  44150,  82522,  133740,  184825,  203667,  60763,   70721,   219535,  53010],
};

// Organic Keywords Overall (in thousands)
export const ORGANIC_KEYWORDS = {
  fortinet:     [309000,  284000,  297000,  296000,  296000,  300000,  337000,  362000,  327000,  318000],
  cisco:        [833000,  743000,  760000,  744000,  724000,  724000,  734000,  860000,  848000,  780000],
  hpe:          [200000,  189000,  200000,  197000,  202000,  225000,  231000,  262000,  263000,  267000],
  paloalto:     [169000,  160000,  165000,  163000,  166000,  183000,  189000,  224000,  224000,  243000],
  checkpoint:   [117000,  105000,  110000,  108000,  106000,  108000,  124000,  139000,  126000,  115000],
  crowdstrike:  [104000,   99000,  106000,  103000,   96000,   93000,   90000,  126000,  137000,  143000],
  catonetworks: [ 14951,   13416,   13552,   12993,   12261,   12712,   16067,   17902,   16409,   14716],
  sentinelone:  [ 83123,   73369,   78807,   79425,   79013,   79037,   89337,   98450,   98650,  102380],
  wiz:          [ 41381,   39164,   41328,   40769,   39565,   44617,   54105,   57028,   51452,   40564],
};

// Keywords Ranking on Page 1 (in thousands)
export const PAGE_ONE_KEYWORDS = {
  fortinet:     [39000, 40000, 42000, 42000, 41000, 42000, 45000, 47000, 49000, 48000],
  cisco:        [87000, 87000, 91000, 90000, 86000, 83000, 89000, 93000, 99000, 98000],
  hpe:          [23000, 24000, 25000, 25000, 25000, 25000, 26000, 26000, 27000, 27000],
  paloalto:     [19000, 19000, 20000, 20000, 20000, 20000, 24000, 26000, 27000, 28000],
  checkpoint:   [ 9000,  9000,  9000,  9000,  9000,  8000,  8000,  8000,  9000,  9000],
  crowdstrike:  [16000, 16000, 17000, 17000, 16000, 15000, 15000, 17000, 18000, 18000],
  catonetworks: [ 1270,  1189,  1238,  1236,  1225,  1341,  1660,  1661,  1591,  1576],
  sentinelone:  [ 9803,  9156,  9976,  9994, 10009, 10513, 12708, 14081, 16006, 18063],
  wiz:          [ 4902,  4957,  5362,  5413,  5341,  5757,  7093,  7862,  8030,  6725],
};

// Mock Domain Authority & Referring Domains
export const DOMAIN_AUTHORITY = {
  fortinet:     [85, 85, 85, 86, 86, 87, 87, 87, 87],
  cisco:        [92, 92, 92, 92, 93, 93, 93, 93, 93],
  hpe:          [88, 88, 88, 88, 89, 89, 89, 89, 89],
  paloalto:     [82, 82, 82, 83, 83, 84, 84, 84, 85],
  checkpoint:   [79, 79, 79, 79, 80, 80, 81, 81, 81],
  crowdstrike:  [86, 86, 86, 87, 87, 88, 88, 88, 88],
  catonetworks: [72, 72, 72, 73, 73, 74, 74, 74, 74],
  sentinelone:  [78, 78, 78, 79, 80, 80, 81, 81, 81],
  wiz:          [76, 76, 77, 77, 78, 78, 79, 79, 80],
};

export const REFERRING_DOMAINS = {
  fortinet:     [43800, 44500, 45000, 46200, 47100, 48300, 49200, 50100, 51200],
  cisco:        [126000, 127200, 128000, 129500, 131000, 132800, 134200, 135600, 137000],
  hpe:          [96500,  97200,  98000,  99100, 100200, 101500, 102800, 104100, 105500],
  paloalto:     [36800,  37400,  38000,  39200,  40100,  41000,  42100,  43200,  44300],
  checkpoint:   [31200,  31600,  32000,  32800,  33600,  34200,  35000,  35800,  36500],
  crowdstrike:  [50000,  51000,  52000,  54100,  56300,  58200,  60100,  62000,  63500],
  catonetworks: [ 8100,   8300,   8500,   8700,   8900,   9100,   9300,   9500,   9700],
  sentinelone:  [26500,  27200,  28000,  29200,  30500,  31800,  33100,  34400,  35500],
  wiz:          [18000,  18500,  19200,  20500,  22000,  23500,  20000,  20800,  24500],
};

// Mock Top 20 Keywords
export const TOP_KEYWORDS = [
  { keyword: 'cybersecurity solutions', position: 2, trafficShare: 12.5, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network firewall', position: 1, trafficShare: 18.3, aiPresence: 'Medium', competitor: 'fortinet' },
  { keyword: 'endpoint security', position: 3, trafficShare: 9.7, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'cloud security platform', position: 4, trafficShare: 15.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'enterprise networking', position: 1, trafficShare: 22.1, aiPresence: 'Low', competitor: 'cisco' },
  { keyword: 'threat intelligence', position: 5, trafficShare: 8.4, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'zero trust security', position: 2, trafficShare: 11.9, aiPresence: 'High', competitor: 'paloalto' },
  { keyword: 'vpn gateway', position: 3, trafficShare: 10.2, aiPresence: 'Low', competitor: 'checkpoint' },
  { keyword: 'edge computing', position: 6, trafficShare: 7.8, aiPresence: 'Medium', competitor: 'hpe' },
  { keyword: 'network monitoring', position: 2, trafficShare: 13.6, aiPresence: 'Medium', competitor: 'cisco' },
  { keyword: 'malware protection', position: 4, trafficShare: 9.1, aiPresence: 'High', competitor: 'fortinet' },
  { keyword: 'siem solutions', position: 7, trafficShare: 6.3, aiPresence: 'Medium', competitor: 'crowdstrike' },
  { keyword: 'firewall software', position: 1, trafficShare: 16.7, aiPresence: 'Low', competitor: 'fortinet' },
  { keyword: 'hybrid cloud security', position: 5, trafficShare: 8.9, aiPresence: 'High', competitor: 'hpe' },
  { keyword: 'intrusion prevention', position: 3, trafficShare: 10.8, aiPresence: 'Medium', competitor: 'checkpoint' },
  { keyword: 'data center solutions', position: 4, trafficShare: 9.5, aiPresence: 'Low', competitor: 'hpe' },
  { keyword: 'next-gen firewall', position: 2, trafficShare: 14.2, aiPresence: 'Medium', competitor: 'paloalto' },
  { keyword: 'threat detection', position: 6, trafficShare: 7.1, aiPresence: 'High', competitor: 'crowdstrike' },
  { keyword: 'security analytics', position: 8, trafficShare: 5.9, aiPresence: 'High', competitor: 'cisco' },
  { keyword: 'network security', position: 1, trafficShare: 19.4, aiPresence: 'Medium', competitor: 'fortinet' },
];

// Quick Wins & Content Gap Insights
export const QUICK_WINS = [
  {
    title: 'Cisco: Major Organic Spike Investigation',
    description: 'Cisco shows massive traffic spike Oct-Nov (19.7M → 33.5M). Investigate content strategy, possible cannibalization, or data anomalies.',
    priority: 'high',
    impact: 'High',
  },
  {
    title: 'HPE: Consistent Performance',
    description: 'HPE maintains steady organic traffic (1.6-1.9M). Opportunity to amplify winning content and expand keyword coverage.',
    priority: 'medium',
    impact: 'Medium',
  },
  {
    title: 'Crowdstrike: Volatile Traffic Pattern',
    description: 'Crowdstrike shows inconsistent traffic (946k → 569k). Analyze seasonal trends and content freshness for stabilization.',
    priority: 'medium',
    impact: 'Medium',
  },
];

// LLM/AI Visibility Mock Data
export const AI_METRICS = {
  aiReadinessScore: 73,
  aiTriggeringQueries: 284,
  llmCitations: 156,
  topAIKeywords: ['cybersecurity solutions', 'zero trust security', 'threat intelligence', 'endpoint security'],
};

// Anomalies & Callouts
export const ANOMALIES = [
  { type: 'warning', message: 'Cisco: major organic spike Oct–Nov (19.7M → 33.5M)', competitor: 'cisco' },
  { type: 'alert', message: 'Cisco Non-Branded: large volume — confirm data source', competitor: 'cisco' },
  { type: 'info', message: 'Data note: null = no data reported for month', competitor: null },
  { type: 'warning', message: 'Multiple competitors missing Jan 2026 branded data', competitor: null },
];