import React, { useState } from 'react';
import {
  Search,
  Filter,
  PhoneCall,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles,
  UserCheck,
  ChevronRight,
  HelpCircle,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { EnrichedRecord, DashboardFilterState, RouteCategory } from '../types';

interface AttentionQueueProps {
  records: EnrichedRecord[];
  filterState: DashboardFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<DashboardFilterState>>;
  onSelectRecord: (record: EnrichedRecord) => void;
  onOpenQuickOverride: (record: EnrichedRecord) => void;
}

export function AttentionQueue({
  records,
  filterState,
  setFilterState,
  onSelectRecord,
  onOpenQuickOverride,
}: AttentionQueueProps) {
  // Extract distinct reps and organizers
  const reps = Array.from(
    new Set(records.filter(r => r.source_type === 'call').map(r => r.personName))
  ).sort();

  const organizers = Array.from(
    new Set(records.filter(r => r.source_type === 'meeting').map(r => r.personName))
  ).sort();

  // Filter application
  const filteredRecords = records.filter(record => {
    // Search query
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      const matchRef = record.record_ref.toLowerCase().includes(q);
      const matchAcc = (record.derivedAccount || '').toLowerCase().includes(q);
      const matchTitle = record.displayTitle.toLowerCase().includes(q);
      const matchPerson = record.personName.toLowerCase().includes(q);
      const matchHeadline = (record.analysis?.headline || '').toLowerCase().includes(q);
      const matchRoutes = record.assignedRoutes.some(r => r.toLowerCase().includes(q));

      if (!matchRef && !matchAcc && !matchTitle && !matchPerson && !matchHeadline && !matchRoutes) {
        return false;
      }
    }

    // Source Type
    if (filterState.sourceType !== 'all' && record.source_type !== filterState.sourceType) {
      return false;
    }

    // Person
    if (filterState.personFilter !== 'all' && record.personName !== filterState.personFilter) {
      return false;
    }

    // Route
    if (filterState.routeFilter !== 'all' && !record.assignedRoutes.includes(filterState.routeFilter)) {
      return false;
    }

    // Has Text
    if (filterState.hasTextFilter === 'has_text' && !record.hasUsableText) return false;
    if (filterState.hasTextFilter === 'no_text' && record.hasUsableText) return false;

    // Urgency
    if (filterState.urgencyFilter !== 'all' && record.urgencyLevel !== filterState.urgencyFilter) {
      return false;
    }

    return true;
  });

  // Sort
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (filterState.sortBy === 'urgency') {
      const weight: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
      return (weight[b.urgencyLevel] || 0) - (weight[a.urgencyLevel] || 0);
    }
    if (filterState.sortBy === 'ref') {
      return a.record_ref.localeCompare(b.record_ref);
    }
    if (filterState.sortBy === 'wordCount') {
      return b.textWordCount - a.textWordCount;
    }
    // Time
    return b.localTime.localeCompare(a.localTime);
  });

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return { bg: '#ffe4e6', text: '#e11d48', border: '#fecdd3' };
      case 'High':
        return { bg: '#fef3c7', text: '#b45309', border: '#fde68a' };
      case 'Medium':
        return { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' };
      default:
        return { bg: '#f1f5f9', text: '#64748b', border: '#e2e8f0' };
    }
  };

  const getRouteBadgeColor = (route: string) => {
    switch (route) {
      case 'Customer Retention':
        return { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' };
      case 'Customer Support / Bugs':
        return { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' };
      case 'Sales Coaching':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      case 'Deal Next Steps':
        return { bg: '#dcfce7', text: '#166534', border: '#86efac' };
      case 'Partnerships & Channel':
        return { bg: '#e0e7ff', text: '#3730a3', border: '#c7d2fe' };
      case 'Vendor Evaluation':
        return { bg: '#fae8ff', text: '#86198f', border: '#f0abfc' };
      case 'Internal Operations':
        return { bg: '#f1f5f9', text: '#334155', border: '#cbd5e1' };
      default:
        return { bg: '#f8fafc', text: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Search & Filter Toolbar */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            />
            <input
              type="text"
              placeholder="Search by account, title, citation quote, ref (e.g. M07, Cedarwave, StoreHarbor)..."
              value={filterState.searchQuery}
              onChange={e => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>

          {/* Source Type Filter */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['all', 'call', 'meeting'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterState(prev => ({ ...prev, sourceType: type }))}
                style={{
                  padding: '7px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: filterState.sourceType === type ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  background: filterState.sourceType === type ? '#e0f2fe' : '#ffffff',
                  color: filterState.sourceType === type ? '#0369a1' : '#475569',
                }}
              >
                {type === 'all' ? 'All Types (44)' : type === 'call' ? 'Calls (30)' : 'Meetings (14)'}
              </button>
            ))}
          </div>

          {/* Transcript Coverage Filter */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, hasTextFilter: prev.hasTextFilter === 'has_text' ? 'all' : 'has_text' }))}
              style={{
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filterState.hasTextFilter === 'has_text' ? '1px solid #16a34a' : '1px solid #e2e8f0',
                background: filterState.hasTextFilter === 'has_text' ? '#dcfce7' : '#ffffff',
                color: filterState.hasTextFilter === 'has_text' ? '#15803d' : '#475569',
              }}
            >
              📄 Has Transcript ({records.filter(r => r.hasUsableText).length})
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, hasTextFilter: prev.hasTextFilter === 'no_text' ? 'all' : 'no_text' }))}
              style={{
                padding: '7px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                border: filterState.hasTextFilter === 'no_text' ? '1px solid #64748b' : '1px solid #e2e8f0',
                background: filterState.hasTextFilter === 'no_text' ? '#f1f5f9' : '#ffffff',
                color: filterState.hasTextFilter === 'no_text' ? '#0f172a' : '#475569',
              }}
            >
              🔒 Silent Metadata ({records.filter(r => !r.hasUsableText).length})
            </button>
          </div>
        </div>

        {/* Secondary Filters Row: Split Personnel & Routes */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
          {/* Person Filter with explicit groupings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Person Filter:</span>
            <select
              value={filterState.personFilter}
              onChange={e => setFilterState(prev => ({ ...prev, personFilter: e.target.value }))}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                background: '#ffffff',
                color: '#1e293b',
              }}
            >
              <option value="all">All Personnel ({reps.length + organizers.length})</option>
              <optgroup label="📞 Call Reps (SDR / AE)">
                {reps.map(rep => (
                  <option key={rep} value={rep}>
                    {rep} ({records.filter(r => r.personName === rep).length} calls)
                  </option>
                ))}
              </optgroup>
              <optgroup label="📅 Meeting Organizers (Calendar Accounts)">
                {organizers.map(org => (
                  <option key={org} value={org}>
                    {org} ({records.filter(r => r.personName === org).length} meetings)
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Route Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Assigned Route:</span>
            <select
              value={filterState.routeFilter}
              onChange={e => setFilterState(prev => ({ ...prev, routeFilter: e.target.value as any }))}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                background: '#ffffff',
                color: '#1e293b',
              }}
            >
              <option value="all">All Routes</option>
              <option value="Sales Coaching">Sales Coaching</option>
              <option value="Deal Next Steps">Deal Next Steps</option>
              <option value="Partnerships & Channel">Partnerships & Channel</option>
              <option value="Customer Support / Bugs">Customer Support / Bugs</option>
              <option value="Customer Retention">Customer Retention</option>
              <option value="Vendor Evaluation">Vendor Evaluation</option>
              <option value="Internal Operations">Internal Operations</option>
              <option value="Voicemail / Gatekeeper">Voicemail / Gatekeeper</option>
              <option value="Disqualified / Unqualified">Disqualified / Unqualified</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }}>Urgency:</span>
            <select
              value={filterState.urgencyFilter}
              onChange={e => setFilterState(prev => ({ ...prev, urgencyFilter: e.target.value as any }))}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                outline: 'none',
                background: '#ffffff',
                color: '#1e293b',
              }}
            >
              <option value="all">All Urgencies</option>
              <option value="Critical">🔴 Critical Attention</option>
              <option value="High">🟡 High Priority</option>
              <option value="Medium">🔵 Medium</option>
              <option value="Low">⚪ Low</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(filterState.searchQuery ||
            filterState.sourceType !== 'all' ||
            filterState.personFilter !== 'all' ||
            filterState.routeFilter !== 'all' ||
            filterState.hasTextFilter !== 'all' ||
            filterState.urgencyFilter !== 'all') && (
            <button
              onClick={() =>
                setFilterState({
                  searchQuery: '',
                  sourceType: 'all',
                  personFilter: 'all',
                  routeFilter: 'all',
                  hasTextFilter: 'all',
                  processingStateFilter: 'all',
                  urgencyFilter: 'all',
                  sortBy: 'urgency',
                  sortOrder: 'desc',
                })
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                borderRadius: '6px',
                background: '#f1f5f9',
                color: '#475569',
                border: 'none',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              Reset Filters
            </button>
          )}

          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b' }}>
            Showing <strong>{sortedRecords.length}</strong> of <strong>{records.length}</strong> records
          </div>
        </div>
      </div>

      {/* Record Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sortedRecords.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '48px',
              textAlign: 'center',
              border: '1px dashed #cbd5e1',
            }}
          >
            <HelpCircle size={32} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '16px', color: '#1e293b', marginBottom: '6px' }}>No records match your active filters</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              Try clearing your search query or broadening the personnel/route filters.
            </p>
            <button
              onClick={() =>
                setFilterState({
                  searchQuery: '',
                  sourceType: 'all',
                  personFilter: 'all',
                  routeFilter: 'all',
                  hasTextFilter: 'all',
                  processingStateFilter: 'all',
                  urgencyFilter: 'all',
                  sortBy: 'urgency',
                  sortOrder: 'desc',
                })
              }
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          sortedRecords.map(record => {
            const isCall = record.source_type === 'call';
            const urgency = getUrgencyBadge(record.urgencyLevel);
            const a = record.analysis;

            return (
              <div
                key={record.identityKey}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: record.urgencyLevel === 'Critical' ? '2px solid #fda4af' : '1px solid #e2e8f0',
                  padding: '18px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                {/* Header Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Record Ref Badge */}
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 800,
                        fontFamily: 'var(--font-mono)',
                        background: isCall ? '#e0f2fe' : '#f0fdf4',
                        color: isCall ? '#0369a1' : '#15803d',
                        border: isCall ? '1px solid #bae6fd' : '1px solid #bbf7d0',
                      }}
                    >
                      {record.record_ref}
                    </span>

                    {/* Source Type & Identity */}
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {isCall ? <PhoneCall size={13} /> : <Calendar size={13} />}
                      <span>{record.source_type}</span>
                      <code style={{ fontSize: '11px', background: '#f1f5f9', padding: '1px 5px', borderRadius: '4px', color: '#475569' }}>
                        id: {record.source_id.slice(0, 8)}...
                      </code>
                    </span>

                    {/* Revision Badge */}
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 700,
                        background: record.applied_revision >= 2 ? '#e0f2fe' : '#f1f5f9',
                        color: record.applied_revision >= 2 ? '#0369a1' : '#64748b',
                        border: '1px solid #cbd5e1',
                      }}
                    >
                      rev {record.applied_revision}
                    </span>

                    {/* Manual Override Tag */}
                    {record.isManualOverride && (
                      <span
                        style={{
                          background: '#fef3c7',
                          color: '#b45309',
                          border: '1px solid #fde68a',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          fontSize: '10px',
                          fontWeight: 800,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                        title={record.manualOverrideComment || 'Manager manual route correction'}
                      >
                        <ShieldCheck size={12} />
                        MANUAL OVERRIDE
                      </span>
                    )}
                  </div>

                  {/* Urgency Pill & Time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: urgency.bg,
                        color: urgency.text,
                        border: `1px solid ${urgency.border}`,
                      }}
                    >
                      {record.urgencyLevel} Attention
                    </span>
                    <span style={{ fontSize: '12px', color: '#64748b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      {record.localTime} IST
                    </span>
                  </div>
                </div>

                {/* Account / Title & Person */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <h3
                      onClick={() => onSelectRecord(record)}
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#0f172a',
                        cursor: 'pointer',
                        marginBottom: '4px',
                      }}
                    >
                      {record.derivedAccount || record.displayTitle}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <UserCheck size={14} style={{ color: '#0284c7' }} />
                        {record.personName}
                      </span>
                      <span
                        style={{
                          background: record.personRole === 'Call Rep' ? '#e0f2fe' : '#f1f5f9',
                          color: record.personRole === 'Call Rep' ? '#0369a1' : '#475569',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 600,
                        }}
                      >
                        {record.personRole}
                      </span>
                      <span>•</span>
                      <span>{record.displayTitle}</span>
                    </div>
                  </div>

                  {/* Transcript Status Badge */}
                  <div>
                    {record.hasUsableText ? (
                      <span
                        style={{
                          background: '#f0fdf4',
                          color: '#166534',
                          border: '1px solid #bbf7d0',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        ✓ {record.textWordCount} words text
                      </span>
                    ) : (
                      <span
                        style={{
                          background: '#f8fafc',
                          color: '#64748b',
                          border: '1px solid #e2e8f0',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                        }}
                      >
                        Silent metadata intake
                      </span>
                    )}
                  </div>
                </div>

                {/* Analysis or Intake Summary Preview */}
                {a ? (
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid #f1f5f9',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                      {a.headline}
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                      {a.whatHappened.length > 220 ? `${a.whatHappened.slice(0, 220)}...` : a.whatHappened}
                    </p>

                    {/* Passage Citation Pill */}
                    {a.supportingCitations && a.supportingCitations[0] && (
                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '11px',
                          color: '#0369a1',
                          background: '#e0f2fe',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <strong>Passage ({a.supportingCitations[0].citation}):</strong>
                        <span>"{a.supportingCitations[0].quote.slice(0, 90)}..."</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      border: '1px solid #f1f5f9',
                      fontSize: '12px',
                      color: '#64748b',
                    }}
                  >
                    <em>No usable conversation text supplied. Preserved as intake evidence. Status: {record.processingState}.</em>
                  </div>
                )}

                {/* Footer: Route Badges and Inspection Button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>Routes:</span>
                    {record.assignedRoutes.map(route => {
                      const c = getRouteBadgeColor(route);
                      return (
                        <span
                          key={route}
                          style={{
                            background: c.bg,
                            color: c.text,
                            border: `1px solid ${c.border}`,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 600,
                          }}
                        >
                          {route}
                        </span>
                      );
                    })}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => onOpenQuickOverride(record)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '6px',
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#475569',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      title="Manually correct routing destination"
                    >
                      Override Route
                    </button>

                    <button
                      onClick={() => onSelectRecord(record)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#0284c7',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <span>Inspect Evidence</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
