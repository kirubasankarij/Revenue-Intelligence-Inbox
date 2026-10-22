import React from 'react';
import {
  Inbox,
  BarChart3,
  FileText,
  Presentation,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { DashboardFilterState, EnrichedRecord } from '../types';

interface NavbarProps {
  currentTab: 'inbox' | 'analytics' | 'daily_brief' | 'slides' | 'export';
  setCurrentTab: (tab: 'inbox' | 'analytics' | 'daily_brief' | 'slides' | 'export') => void;
  filterState: DashboardFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<DashboardFilterState>>;
  records: EnrichedRecord[];
  onOpenExport: () => void;
  onResetData: () => void;
  criticalCount: number;
}

export function Navbar({
  currentTab,
  setCurrentTab,
  filterState,
  setFilterState,
  records,
  onOpenExport,
  onResetData,
  criticalCount,
}: NavbarProps) {
  const withTextCount = records.filter(r => r.hasUsableText).length;

  return (
    <header
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
          gap: '16px',
        }}
      >
        {/* Brand Logo & Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '20px',
              boxShadow: '0 4px 10px rgba(2, 132, 199, 0.3)',
            }}
          >
            SN
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', margin: 0 }}>
                SpendNest Revenue Intelligence
              </h1>
              <span
                style={{
                  background: '#e0f2fe',
                  color: '#0284c7',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                Manager Inbox
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
              21 August 2026 (Asia/Kolkata) • {records.length} Records ({withTextCount} Transcripts)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setCurrentTab('inbox')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: currentTab === 'inbox' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'inbox' ? '#0284c7' : '#475569',
              border: currentTab === 'inbox' ? '1px solid #bae6fd' : '1px solid transparent',
              fontWeight: currentTab === 'inbox' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Inbox size={16} />
            <span>Attention Inbox</span>
            {criticalCount > 0 && (
              <span
                style={{
                  background: '#ffe4e6',
                  color: '#e11d48',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '999px',
                }}
              >
                {criticalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('analytics')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: currentTab === 'analytics' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'analytics' ? '#0284c7' : '#475569',
              border: currentTab === 'analytics' ? '1px solid #bae6fd' : '1px solid transparent',
              fontWeight: currentTab === 'analytics' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <BarChart3 size={16} />
            <span>Activity Analytics</span>
          </button>

          <button
            onClick={() => setCurrentTab('daily_brief')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: currentTab === 'daily_brief' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'daily_brief' ? '#0284c7' : '#475569',
              border: currentTab === 'daily_brief' ? '1px solid #bae6fd' : '1px solid transparent',
              fontWeight: currentTab === 'daily_brief' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileText size={16} />
            <span>21 Aug Daily Brief</span>
          </button>

          <button
            onClick={() => setCurrentTab('slides')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: currentTab === 'slides' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'slides' ? '#0284c7' : '#475569',
              border: currentTab === 'slides' ? '1px solid #bae6fd' : '1px solid transparent',
              fontWeight: currentTab === 'slides' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Presentation size={16} />
            <span>5-Slide Deck & Pitch</span>
          </button>

          <button
            onClick={() => setCurrentTab('export')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: currentTab === 'export' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'export' ? '#0284c7' : '#475569',
              border: currentTab === 'export' ? '1px solid #bae6fd' : '1px solid transparent',
              fontWeight: currentTab === 'export' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Download size={16} />
            <span>Export & Manifest</span>
          </button>
        </nav>

        {/* Global Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenExport}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
            }}
            title="Export files with manifest.json and manifest.csv"
          >
            <Download size={15} />
            Export Archive (.ZIP)
          </button>
        </div>
      </div>
    </header>
  );
}
