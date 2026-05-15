import { Search, AlertTriangle, Target, Users } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
} from './design-system';

// Missing Keywords Data (Apr 2026)
const missingKeywordsData = [
  { keyword: 'prompt injection',                               intent: 'Informational', volume: 2900,  kd: 54, cpc: 0,     cd: 0,    ft: 0, pa: 6,  cp: 56, cisco: 30, cs: 11 },
  { keyword: 'cybersecurity for small business',               intent: 'Informational', volume: 1600,  kd: 59, cpc: 0,     cd: 0,    ft: 0, pa: 5,  cp: 59, cisco: 47, cs: 4  },
  { keyword: 'cloud security solution',                        intent: 'Informational', volume: 1300,  kd: 64, cpc: 0,     cd: 0,    ft: 0, pa: 16, cp: 10, cisco: 9,  cs: 18 },
  { keyword: 'cybersecurity assessment',                       intent: 'Informational', volume: 1300,  kd: 32, cpc: 0,     cd: 0,    ft: 0, pa: 33, cp: 29, cisco: 17, cs: 7  },
  { keyword: 'siem vs soar',                                   intent: 'Commercial, Informational', volume: 1000,  kd: 15, cpc: 0, cd: 0, ft: 0, pa: 1,  cp: 12, cisco: 85, cs: 3  },
  { keyword: 'prompt injection attack',                        intent: 'Informational', volume: 880,   kd: 68, cpc: 0,     cd: 0,    ft: 0, pa: 2,  cp: 43, cisco: 77, cs: 5  },
  { keyword: 'generative ai security',                         intent: 'Informational', volume: 720,   kd: 27, cpc: 0,     cd: 0,    ft: 0, pa: 1,  cp: 12, cisco: 50, cs: 90 },
  { keyword: 'adversarial ai',                                 intent: 'Informational', volume: 590,   kd: 56, cpc: 0,     cd: 0,    ft: 0, pa: 1,  cp: 30, cisco: 88, cs: 14 },
  { keyword: 'cybersecurity automation',                       intent: 'Informational', volume: 590,   kd: 25, cpc: 0,     cd: 0,    ft: 0, pa: 1,  cp: 73, cisco: 85, cs: 71 },
  { keyword: 'ai prompt injection',                            intent: 'Informational', volume: 480,   kd: 46, cpc: 0,     cd: 0,    ft: 0, pa: 4,  cp: 41, cisco: 22, cs: 8  },
  { keyword: 'kubernetes security posture management',         intent: 'Informational', volume: 320,   kd: 25, cpc: 0,     cd: 0,    ft: 0, pa: 1,  cp: 28, cisco: 58, cs: 2  },
  { keyword: 'securing kubernetes',                            intent: 'Informational', volume: 260,   kd: 44, cpc: 0,     cd: 0,    ft: 0, pa: 7,  cp: 18, cisco: 91, cs: 45 },
];

// Untapped Keywords Data (Apr 2026)
const untappedKeywordsData = [
  { keyword: 'what is generative ai', intent: 'Informational', volume: 22200, kd: 86, cpc: 0, cd: 0, ft: 0, pa: 60, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'ai governance', intent: 'Commercial, Informational', volume: 5400, kd: 60, cpc: 0, cd: 0, ft: 0, pa: 5, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'ai governance framework', intent: 'Informational', volume: 2900, kd: 68, cpc: 0, cd: 0, ft: 0, pa: 6, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'ai risk management', intent: 'Informational', volume: 2400, kd: 70, cpc: 0, cd: 0, ft: 0, pa: 5, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'cloud security assessment', intent: 'Informational', volume: 1300, kd: 27, cpc: 0, cd: 0, ft: 0, pa: 5, cp: 86, cisco: 0, cs: 1 },
  { keyword: 'quantum computing and ai', intent: 'Informational', volume: 1300, kd: 71, cpc: 0, cd: 0, ft: 0, pa: 74, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'cloud security compliance', intent: 'Informational', volume: 1000, kd: 29, cpc: 0, cd: 0, ft: 0, pa: 14, cp: 0, cisco: 47, cs: 3 },
  { keyword: 'generative ai for business', intent: 'Informational', volume: 1000, kd: 37, cpc: 0, cd: 0, ft: 0, pa: 0, cp: 0, cisco: 0, cs: 0 },
  { keyword: 'quantum resistant cryptography', intent: 'Informational', volume: 1000, kd: 68, cpc: 0, cd: 0, ft: 0, pa: 17, cp: 0, cisco: 71, cs: 0 },
  { keyword: 'adversarial ai', intent: 'Informational', volume: 590, kd: 56, cpc: 0, cd: 0, ft: 0, pa: 1, cp: 30, cisco: 88, cs: 14 },
  { keyword: 'agentic ai security', intent: 'Informational', volume: 590, kd: 39, cpc: 0, cd: 0, ft: 0, pa: 1, cp: 96, cisco: 0, cs: 13 },
];

// Multi-Competitor Comparison Data / Weak Keywords (Apr 2026)
const multiCompetitorData = [
  { keyword: 'cyber security solution',           intent: 'Informational',             volume: 3600, kd: 60, ft: 68, pa: 35, cp: 25, cisco: 10, cs: 3  },
  { keyword: 'ai security solutions',             intent: 'Informational',             volume: 1000, kd: 23, ft: 52, pa: 16, cp: 1,  cisco: 7,  cs: 27 },
  { keyword: 'cloud siem',                        intent: 'Informational',             volume: 1000, kd: 28, ft: 81, pa: 5,  cp: 46, cisco: 66, cs: 8  },
  { keyword: 'threat management',                 intent: 'Informational',             volume: 1000, kd: 31, ft: 84, pa: 5,  cp: 37, cisco: 1,  cs: 11 },
  { keyword: 'cybersecurity threat intelligence', intent: 'Informational',             volume: 590,  kd: 49, ft: 66, pa: 3,  cp: 18, cisco: 4,  cs: 1  },
  { keyword: 'network security in cloud computing', intent: 'Informational',           volume: 590,  kd: 35, ft: 51, pa: 3,  cp: 5,  cisco: 14, cs: 24 },
  { keyword: 'cspm vs cnapp',                     intent: 'Commercial, Informational', volume: 260,  kd: 16, ft: 67, pa: 18, cp: 12, cisco: 15, cs: 2  },
  { keyword: 'network security trends',           intent: 'Informational',             volume: 170,  kd: 52, ft: 60, pa: 36, cp: 11, cisco: 7,  cs: 3  },
  { keyword: 'web application firewall solutions', intent: 'Informational',            volume: 90,   kd: 52, ft: 62, pa: 9,  cp: 12, cisco: 7,  cs: 34 },
  { keyword: 'zero trust assessment',             intent: 'Informational',             volume: 90,   kd: 24, ft: 51, pa: 29, cp: 13, cisco: 24, cs: 4  },
];

export function SlideKeywordGap({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [activeTab, setActiveTab] = useState<'missing' | 'untapped' | 'multiCompetitor'>('missing');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'missing': return missingKeywordsData;
      case 'untapped': return untappedKeywordsData;
      case 'multiCompetitor': return multiCompetitorData;
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case 'missing': return AlertTriangle;
      case 'untapped': return Target;
      case 'multiCompetitor': return Users;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'missing': return 'Missing Keywords';
      case 'untapped': return 'Untapped Keywords';
      case 'multiCompetitor': return 'Weak Keywords';
    }
  };

  const getTabDescription = () => {
    switch (activeTab) {
      case 'missing': return 'Critical gaps in Fortinet\'s content strategy';
      case 'untapped': return 'High-potential keywords with minimal competition';
      case 'multiCompetitor': return 'Competitive keyword comparison with ranking positions';
    }
  };

  const IconComponent = getTabIcon();

  return (
    <SlideContainer slideNumber={22} onNavigateHome={onNavigateHome}>
      <SlideHeader 
        title="Keyword Gap" 
      />
      
      <div className="flex-1 flex flex-col gap-4 pb-4">
        {/* Main Tab Navigation - Curved Folder Style */}
        <div className="flex items-start gap-1">
          <button
            onClick={() => setActiveTab('missing')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'missing'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'missing'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Missing Keywords
          </button>
          <button
            onClick={() => setActiveTab('untapped')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'untapped'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'untapped'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Untapped Keywords
          </button>
          <button
            onClick={() => setActiveTab('multiCompetitor')}
            className={`px-8 py-3 text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'multiCompetitor'
                ? 'bg-white text-red-600 z-10'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-800'
            }`}
            style={{
              borderRadius: '12px 12px 0 0',
              marginBottom: '-2px',
              boxShadow: activeTab === 'multiCompetitor'
                ? '0 -2px 8px rgba(0, 0, 0, 0.08), 0 2px 0 0 white'
                : '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            Weak Keywords
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                activeTab === 'untapped' ? 'bg-blue-50' : 'bg-red-50'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  activeTab === 'untapped' ? 'text-blue-500' : 'text-red-500'
                }`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{getTabTitle()}</h3>
                <p className="text-sm text-gray-600">{getTabDescription()}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-gray-50 rounded-lg overflow-hidden flex-1">
              <div className="overflow-x-auto h-full max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200 sticky top-0 z-20">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Keyword</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' ? 'Intent' : 'Intents'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">
                        {activeTab === 'multiCompetitor' ? 'Volume' : 'Volume'}
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">KD</th>
                      {(activeTab === 'missing' || activeTab === 'untapped') && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">FT</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">PA</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">CP</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">CISCO</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-gray-100">CS</th>
                        </>
                      )}
                      {(activeTab === 'multiCompetitor') && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-red-50">FT</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-orange-50">PA</th>
                        </>
                      )}
                      {activeTab === 'multiCompetitor' && (
                        <>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-purple-50">CP</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-blue-50">CISCO</th>
                          <th className="px-3 py-3 text-center font-semibold text-gray-900 bg-gray-100">CS</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {getCurrentData().map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{row.keyword}</td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{row.intent}</td>
                        <td className="px-4 py-3 text-center text-gray-900 font-medium">{row.volume.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{row.kd}</td>
                        {(activeTab === 'missing' || activeTab === 'untapped') && 'ft' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{(row as any).pa}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{(row as any).cp}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{(row as any).cisco}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-gray-50 text-gray-700">{(row as any).cs}</td>
                          </>
                        )}
                        {(activeTab === 'multiCompetitor') && 'ft' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-red-50 text-red-700">{row.ft}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-orange-50 text-orange-700">{row.pa}</td>
                          </>
                        )}
                        {activeTab === 'multiCompetitor' && 'cp' in row && (
                          <>
                            <td className="px-3 py-3 text-center font-semibold bg-purple-50 text-purple-700">{(row as any).cp}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-blue-50 text-blue-700">{(row as any).cisco}</td>
                            <td className="px-3 py-3 text-center font-semibold bg-gray-50 text-gray-700">{(row as any).cs}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SlideFooter source="Source: Semrush Keyword Gap Tool" />
    </SlideContainer>
  );
}