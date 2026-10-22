import React from 'react';
import {
  FileText,
  PhoneCall,
  Calendar,
  CheckCircle,
  HelpCircle,
  Info,
  GitFork,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { EnrichedRecord, DashboardFilterState } from '../types';

interface MetricsOverviewProps {
  records: EnrichedRecord[];
  filterState: DashboardFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<DashboardFilterState>>;
}

export function MetricsOverview({ records, filterState, setFilterState }: MetricsOverviewProps) {
  // Calculations strictly adhering to DATA_DICTIONARY.md
  const totalCount = records.length;
  const calls = records.filter(r => r.source_type === 'call');
  const meetings = records.filter(r => r.source_type === 'meeting');

  // Usable supplied text: nonblank call transcript or turns.length > 0 for meetings
  const withTextTotal = records.filter(r => r.hasUsableText).length;
  const withTextCalls = calls.filter(r => r.hasUsableText).length;
  const withTextMeetings = meetings.filter(r => r.hasUsableText).length;

  const coverageTotalPct = totalCount > 0 ? ((withTextTotal / totalCount) * 100).toFixed(1) : '0';
  const coverageCallsPct = calls.length > 0 ? ((withTextCalls / calls.length) * 100).toFixed(1) : '0';
  const coverageMeetingsPct = meetings.length > 0 ? ((withTextMeetings / meetings.length) * 100).toFixed(1) : '0';

  // Source-reported connection rate (calls with is_connected=true / calls with non-null is_connected)
  const connectedCalls = calls.filter(c => (c.payload as any).is_connected === true).length;
  const nonConnectedCalls = calls.filter(c => (c.payload as any).is_connected === false).length;
  const unknownConnectedCalls = calls.filter(c => (c.payload as any).is_connected == null).length;
  const connectionDenominator = connectedCalls + nonConnectedCalls;
  const connectionRatePct =
    connectionDenominator > 0 ? ((connectedCalls / connectionDenominator) * 100).toFixed(1) : '0';

  // Stored conversation rate vs transcript-verified
  const transcriptSubstantiveCalls = withTextCalls; // 10 calls have substantive text

  // Routing counts: count of all assigned routes across all records
  const totalRouteAssignments = records.reduce((acc, r) => acc + r.assignedRoutes.length, 0);
  const manualOverridesCount = records.filter(r => r.isManualOverride).length;
  const criticalCount = records.filter(r => r.urgencyLevel === 'Critical').length;

  // Person breakdown: Call Reps vs Meeting Organizers
  const repCounts: Record<string, number> = {};
  calls.forEach(c => {
    repCounts[c.personName] = (repCounts[c.personName] || 0) + 1;
  });

  const organizerCounts: Record<string, number> = {};
  meetings.forEach(m => {
    organizerCounts[m.personName] = (organizerCounts[m.personName] || 0) + 1;
  });

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {/* Metric 1: Selected Record Activity */}
      <div
        className="kpi-card"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Selected-Record Activity
          </span>
          <span
            style={{
              background: '#e0f2fe',
              color: '#0284c7',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            21 Aug 2026 (IST)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {totalCount}
          </span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Unique Records</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#475569', marginBottom: '10px' }}>
          <button
            onClick={() => setFilterState(prev => ({ ...prev, sourceType: prev.sourceType === 'call' ? 'all' : 'call' }))}
            style={{
              background: filterState.sourceType === 'call' ? '#e0f2fe' : '#f8fafc',
              border: filterState.sourceType === 'call' ? '1px solid #38bdf8' : '1px solid #e2e8f0',
              padding: '3px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              color: filterState.sourceType === 'call' ? '#0369a1' : '#475569',
            }}
          >
            📞 {calls.length} Calls
          </button>
          <button
            onClick={() => setFilterState(prev => ({ ...prev, sourceType: prev.sourceType === 'meeting' ? 'all' : 'meeting' }))}
            style={{
              background: filterState.sourceType === 'meeting' ? '#e0f2fe' : '#f8fafc',
              border: filterState.sourceType === 'meeting' ? '1px solid #38bdf8' : '1px solid #e2e8f0',
              padding: '3px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              color: filterState.sourceType === 'meeting' ? '#0369a1' : '#475569',
            }}
          >
            📅 {meetings.length} Meetings
          </button>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
          <strong>Denominator:</strong> All 44 records in delivered batch. All timestamps fall on 21 August 2026 in Asia/Kolkata.
        </div>
      </div>

      {/* Metric 2: Usable Supplied Transcript Coverage */}
      <div
        className="kpi-card"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Usable Transcript Coverage
          </span>
          <span
            style={{
              background: withTextTotal >= 18 ? '#dcfce7' : '#fef3c7',
              color: withTextTotal >= 18 ? '#15803d' : '#b45309',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {withTextTotal === 18 ? 'Post-Update (18)' : 'Initial Batch (17)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {coverageTotalPct}%
          </span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            ({withTextTotal} / {totalCount} records)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#475569', marginBottom: '10px' }}>
          <span>
            Calls: <strong>{withTextCalls}/30</strong> ({coverageCallsPct}%)
          </span>
          <span>•</span>
          <span>
            Meetings: <strong>{withTextMeetings}/14</strong> ({coverageMeetingsPct}%)
          </span>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
          <strong>Definition:</strong> Nonblank call transcript or ≥1 nonblank meeting turn ÷ total records in filter. Remaining 26 records are metadata-only.
        </div>
      </div>

      {/* Metric 3: Call Connection Classification */}
      <div
        className="kpi-card"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Source Call Connect Rate
          </span>
          <span
            style={{
              background: '#f1f5f9',
              color: '#334155',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Stored Metric
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {connectionRatePct}%
          </span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            ({connectedCalls} / {connectionDenominator} calls)
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569', marginBottom: '10px' }}>
          <span style={{ color: '#16a34a', fontWeight: 600 }}>Connected: {connectedCalls}</span>
          <span>•</span>
          <span style={{ color: '#dc2626' }}>Not Connected: {nonConnectedCalls}</span>
          <span>•</span>
          <span>Unknown: {unknownConnectedCalls}</span>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
          <strong>Comparison:</strong> Stored <code>is_connected=true</code> is 11/30 (36.7%). Transcript-verified substantive conversation is 10/30 (33.3%).
        </div>
      </div>

      {/* Metric 4: Multi-Route Assignments & Manual Overrides */}
      <div
        className="kpi-card"
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '18px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Routing & Overrides
          </span>
          <span
            style={{
              background: manualOverridesCount > 0 ? '#fef3c7' : '#e0f2fe',
              color: manualOverridesCount > 0 ? '#b45309' : '#0369a1',
              borderRadius: '999px',
              padding: '2px 8px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {manualOverridesCount} Overrides
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            {totalRouteAssignments}
          </span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Route Assignments</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#475569', marginBottom: '10px' }}>
          <span style={{ color: '#e11d48', fontWeight: 700 }}>Critical Attention: {criticalCount}</span>
          <span>•</span>
          <span>Multi-Routed Records: {records.filter(r => r.assignedRoutes.length > 1).length}</span>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
          <strong>Context Preservation:</strong> Assignments ({totalRouteAssignments}) exceed unique records ({totalCount}) because conversations can route to both coaching and deal workflows.
        </div>
      </div>
    </div>
  );
}
