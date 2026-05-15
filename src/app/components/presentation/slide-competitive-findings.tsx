import { ExternalLink, Calendar, Target, Zap, BarChart3, Award, Brain, BookOpen, Network, Tag } from 'lucide-react';
import { useState } from 'react';
import {
  SlideContainer,
  SlideHeader,
  SlideFooter,
} from './design-system';

// Tab 1 – Calendar Landing Page Icon
import imgCalendarIcon from '../../../imports/image-7.png';

// Tab 2 – Company vs Competitors
import imgCompetitors1 from '../../../imports/tab-2_-_1-1.png';
import imgCompetitors2 from '../../../imports/tab_1_-_1-1.png';
import imgCompetitors3 from '../../../imports/tab3_-_1-1.png';
import imgCompetitors4 from '../../../imports/tab_4_-_1-1.png';

// Tab 3 – Quantum Transition Assessment
import imgQuantumTab3 from '../../../imports/main_tab_2-1.png';

// Tab 4 – Publishing of Cybersecurity Statistics Pages
import imgQuantumMain from '../../../imports/main_tab_3-2.png';

// Tab 5 – Reports & Validation Stick-ons
import imgValidationMain1 from '../../../imports/main_tab_4-2.png';

// Tab 6 – Agentic AI Positioning Gap
import imgAgenticAI1 from '../../../imports/main_tab_5.png';
import imgAgenticAI2 from '../../../imports/main_tab_5_.1.png';

// Tab 7 – Strategic Placement of Parent Glossary Pages
import imgGlossaryNav from '../../../imports/main_tab_7.png';

// Tab 8 – SEO-Driven Topic Clusters (ZTNA)
import imgZtna1 from '../../../imports/main_tab_8.png';
import imgZtna2 from '../../../imports/main_tab_8.1.png';

// Tab 9 – Keyword Classification Tags in CG Hub Pages
import imgKeywordTag1 from '../../../imports/last_tab_1.png';
import imgKeywordTag2 from '../../../imports/last_tab_2.png';

interface Finding {
  icon: any;
  color: string;
  bgColor: string;
  title: string;
  description: (string | { text: string; link: string; linkDisplay: string })[];
  competitor: string;
  url?: string;
  urlDisplay?: string;
  screenshot?: string;
  screenshot2?: string;
  screenshot3?: string;
  screenshot4?: string;
  screenshot5?: string;
  midText?: string;
  midTextUrl?: string;
}

const findings: Finding[] = [
  // ── Tab 1 ──────────────────────────────────────────────────────────────────
  {
    icon: Calendar,
    color: '#EF4444',
    bgColor: '#FEF2F2',
    title: 'Calendar Landing Page Icon',
    description: [
      'Users can interact with the icon to get a quick summary preview of the next 3 upcoming events without leaving the landing page.',
      'The icon\'s design will subtly animate to indicate a new notification or high-priority event.',
    ],
    competitor: 'UX Enhancement',
    url: '',
    urlDisplay: '',
    screenshot: imgCalendarIcon,
  },
  // ── Tab 2 ─────────────────────────────────────────────────────────────────
  {
    icon: Target,
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    title: 'Company vs Competitors',
    description: [
      'Many competitors are strategically using comparison content, such as listicles and direct brand-vs-brand pages, to target later-stage buyers (MOFU/BOFU) and gain citations in Large Language Models (LLMs) and AI Overviews.',
      'These comparison efforts typically fall into two categories: direct brand competition pages (considered BOFU, e.g., Fortinet vs. Palo Alto) and listicle comparison articles (used for LLM/MOFU visibility, e.g., "Best AI Security Companies").',
      {
        text: 'Examples: SentinelOne vs. Palo Alto Networks, Check Point Comparisons, Palo Alto SOAR Tools, MDR Solutions, CrowdStrike Competitors',
        link: 'https://www.sentinelone.com/vs/palo-alto-networks/',
        linkDisplay: 'sentinelone.com/vs/palo-alto-networks',
      },
    ],
    competitor: 'Multiple Competitors',
    url: 'https://www.checkpoint.com/comparison/',
    urlDisplay: 'checkpoint.com/comparison + paloaltonetworks.com/cyberpedia',
    screenshot: imgCompetitors1,
    screenshot2: imgCompetitors2,
    screenshot3: imgCompetitors3,
    screenshot4: imgCompetitors4,
  },
  // ── Tab 3 ──────────────────────────────────────────────────────────────────
  {
    icon: Zap,
    color: '#10B981',
    bgColor: '#D1FAE5',
    title: 'Quantum Transition Assessment',
    description: [
      'Palo Alto Networks has introduced an assessment to help organizations understand their cryptographic resilience for the quantum transition.',
      {
        text: 'A dedicated hub page is also available to provide further resources and context on the quantum transition.',
        link: 'https://www.paloaltonetworks.in/quantum-safe',
        linkDisplay: 'paloaltonetworks.in/quantum-safe',
      },
    ],
    competitor: 'Palo Alto Networks',
    url: 'https://www.paloaltonetworks.in/quantum-safe-digital-survey',
    urlDisplay: 'paloaltonetworks.in/quantum-safe-digital-survey',
    screenshot: imgQuantumTab3,
  },
  // ── Tab 4 ──────────────────────────────────────────────────────────────────
  {
    icon: BarChart3,
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    title: 'Publishing of Cybersecurity Statistics Pages',
    description: [
      'SentinelOne\'s "Cybersecurity 101," features updated statistics on 2026 cybersecurity trends, malware, and data breaches to establish authority.',
      'This data-centric approach is critical for addressing Expertise gaps and enhancing E-E-A-T scores by integrating current, dated statistics (e.g., from 2025/2026 reports).',
    ],
    competitor: 'SentinelOne',
    url: 'https://www.sentinelone.com/cybersecurity-101/',
    urlDisplay: 'sentinelone.com/cybersecurity-101',
    screenshot: imgQuantumMain,
  },
  // ── Tab 5 ──────────────────────────────────────────────────────────────────
  {
    icon: Award,
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    title: 'Reports & Validation Stick-ons',
    description: [
      'Implementing trust signals, such as review badges, security compliance stick-ons, or third-party validation reports, is essential for improving E-E-A-T on technical or high-value glossary pages.',
    ],
    competitor: 'Cato Networks',
    url: 'https://www.catonetworks.com/glossary/what-is-prompt-injection/',
    urlDisplay: 'catonetworks.com/glossary/what-is-prompt-injection',
    screenshot: imgValidationMain1,
  },
  // ── Tab 6 ──────────────────────────────────────────────────────────────────
  {
    icon: Brain,
    color: '#0EA5E9',
    bgColor: '#E0F2FE',
    title: 'Agentic AI Positioning Gap',
    description: [
      {
        text: 'Competitors are increasingly positioning Agentic AI prominently on their homepages to align with rising market interest and evolving enterprise search demand.',
        link: 'https://www.catonetworks.com/platform/agentic-ai-security/',
        linkDisplay: 'catonetworks.com/platform/agentic-ai-security',
      },
      {
        text: 'While Fortinet products are powered by Agentic AI capabilities (including FortiSIEM 7.5 and FortiAI-Assist), this messaging is not currently visible upfront, creating a positioning and perception gap against competitors.',
        link: 'https://www.fortinet.com/products/siem/fortisiem',
        linkDisplay: 'fortinet.com/products/siem/fortisiem',
      },
    ],
    competitor: 'Cato Networks',
    screenshot: imgAgenticAI1,
    screenshot2: imgAgenticAI2,
  },
  // ── Tab 7 ──────────────────────────────────────────────────────────────────
  {
    icon: BookOpen,
    color: '#F97316',
    bgColor: '#FFF7ED',
    title: 'Strategic Placement of Parent Glossary Pages Within Product Navigation',
    description: [
      {
        text: 'Competitors are prominently featuring high-value educational pages like "What is SASE?" and "What is ZTNA?" within primary navigation to increase visibility, strengthen internal linking, and capture high-intent non-branded search demand.',
        link: 'https://www.catonetworks.com/resources/',
        linkDisplay: 'catonetworks.com/resources',
      },
    ],
    competitor: 'Cato Networks',
    url: 'https://www.catonetworks.com/resources/',
    urlDisplay: 'catonetworks.com/resources',
    screenshot: imgGlossaryNav,
  },
  // ── Tab 8 ──────────────────────────────────────────────────────────────────
  {
    icon: Network,
    color: '#6366F1',
    bgColor: '#EEF2FF',
    title: 'SEO-Driven Topic Clusters (ZTNA)',
    description: [
      'Implement topic clusters where the primary ZTNA page links to related child pages to significantly improve internal linking authority.',
      'This strategy expands visibility across a wider range of high-intent search queries, including those adjacent to zero trust, by establishing strong topical authority for the ZTNA framework and related concepts like micro-segmentation.',
    ],
    competitor: 'Cato Networks',
    url: 'https://www.catonetworks.com/zero-trust-network-access/',
    urlDisplay: 'catonetworks.com/zero-trust-network-access',
    screenshot: imgZtna1,
    screenshot2: imgZtna2,
  },
  // ── Tab 9 ──────────────────────────────────────────────────────────────────
  {
    icon: Tag,
    color: '#059669',
    bgColor: '#ECFDF5',
    title: 'Keyword Classification Tags in CG Hub Pages',
    description: [
      'The phrases displayed above each glossary title (e.g., "Password Spraying," "Prompt Injection") function as topical category labels or keyword classification tags.',
      'These tags help reinforce semantic relevance and content grouping for both users and search engines.',
    ],
    competitor: 'UX Enhancement',
    screenshot: imgKeywordTag1,
    screenshot2: imgKeywordTag2,
  },
];

export function SlideCompetitiveFindings({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [selectedFinding, setSelectedFinding] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <SlideContainer slideNumber={23} onNavigateHome={onNavigateHome} source="">
      <SlideHeader
        title="Web Experience"
        subtitle="Strategic Observations from Competitor Websites"
      />

      <div className="flex-1 flex flex-col gap-4 pb-4 overflow-hidden">
        {/* Top Panel – Horizontal Tab Buttons */}
        <div className="flex-shrink-0 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:opacity-0 hover:[&::-webkit-scrollbar]:opacity-100 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 transition-all">
          <div className="flex gap-3 min-w-max">
            {findings.map((finding, idx) => {
              const Icon = finding.icon;
              const isSelected = selectedFinding === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFinding(idx)}
                  className={`w-[200px] flex-shrink-0 text-left bg-white border-2 rounded-xl p-3 transition-all duration-200 ${
                    isSelected
                      ? 'border-red-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: finding.bgColor }}
                    >
                      <Icon className="w-4 h-4" style={{ color: finding.color }} />
                    </div>
                    <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">{finding.title}</h3>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block truncate max-w-full"
                    style={{ backgroundColor: finding.bgColor, color: finding.color }}
                  >
                    {finding.competitor}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Panel – Detail + Screenshot */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex-shrink-0 flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
            {(() => {
              const Icon = findings[selectedFinding].icon;
              return (
                <>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: findings[selectedFinding].bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: findings[selectedFinding].color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900">{findings[selectedFinding].title}</h3>
                    {Array.isArray(findings[selectedFinding].description) ? (
                      <ul className="text-xs text-gray-600 mt-2 list-disc list-inside space-y-1">
                        {(findings[selectedFinding].description as (string | { text: string; link: string; linkDisplay: string })[]).map((bullet, i) => (
                          <li key={i}>
                            {typeof bullet === 'string' ? (
                              bullet
                            ) : (
                              <>
                                {bullet.text}{' '}
                                <a
                                  href={bullet.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="w-3 h-3 inline flex-shrink-0" />
                                  {bullet.linkDisplay}
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-600 mt-1">{findings[selectedFinding].description as string}</p>
                    )}
                    {findings[selectedFinding].url && (
                      <a
                        href={findings[selectedFinding].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors group mt-2"
                      >
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                        <span className="truncate max-w-full">{findings[selectedFinding].urlDisplay}</span>
                      </a>
                    )}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Screenshots */}
          <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-start justify-center overflow-y-auto">
            {findings[selectedFinding].screenshot ? (
              <div className="w-full space-y-3">
                {/* Primary Screenshot */}
                <div
                  className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
                  onClick={() => setLightboxImage(findings[selectedFinding].screenshot!)}
                >
                  <img
                    src={findings[selectedFinding].screenshot}
                    alt={findings[selectedFinding].title}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Secondary Screenshot */}
                {findings[selectedFinding].screenshot2 && (
                  <>
                    {findings[selectedFinding].midText ? (
                      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                        <a
                          href={findings[selectedFinding].midTextUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                          <span className="font-medium">{findings[selectedFinding].midText}</span>
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-px bg-gray-300" />
                        <div className="flex-1 h-px bg-gray-300" />
                      </div>
                    )}

                    <div
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setLightboxImage(findings[selectedFinding].screenshot2!)}
                    >
                      <img
                        src={findings[selectedFinding].screenshot2}
                        alt={`${findings[selectedFinding].title} 2`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                )}

                {/* Tertiary Screenshot */}
                {findings[selectedFinding].screenshot3 && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    <div
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setLightboxImage(findings[selectedFinding].screenshot3!)}
                    >
                      <img
                        src={findings[selectedFinding].screenshot3}
                        alt={`${findings[selectedFinding].title} 3`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                )}

                {/* Fourth Screenshot */}
                {findings[selectedFinding].screenshot4 && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    <div
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setLightboxImage(findings[selectedFinding].screenshot4!)}
                    >
                      <img
                        src={findings[selectedFinding].screenshot4}
                        alt={`${findings[selectedFinding].title} 4`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                )}

                {/* Fifth Screenshot */}
                {findings[selectedFinding].screenshot5 && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-gray-300" />
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    <div
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-zoom-in hover:shadow-md transition-shadow"
                      onClick={() => setLightboxImage(findings[selectedFinding].screenshot5!)}
                    >
                      <img
                        src={findings[selectedFinding].screenshot5}
                        alt={`${findings[selectedFinding].title} 5`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                  <ExternalLink className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 font-medium">No screenshot available</p>
                <p className="text-xs text-gray-400 mt-1">Visit the link to view the content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div className="max-w-7xl max-h-full overflow-auto">
            <img
              src={lightboxImage}
              alt="Enlarged view"
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <SlideFooter />
    </SlideContainer>
  );
}