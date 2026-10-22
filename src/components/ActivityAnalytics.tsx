import React from 'react';
import {
  Users,
  PhoneCall,
  Calendar,
  Clock,
  PieChart,
  BarChart,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { EnrichedRecord } from '../types';

interface ActivityAnalyticsProps {
  records: EnrichedRecord[];
  onFilterByPerson: (personName: string) => void;
  onFilterByRoute: (route: string) => void;
}

export function ActivityAnalytics({
  records,
  onFilterByPerson,
  onFilterByRoute,
}: ActivityAnalyticsProps) {
  const calls = records.filter(r => r.source_type === 'call');
  const meetings = records.filter(r => r.source_type === 'meeting');

  // Reps stats
  const repStats: Record<
    string,
    { total: number; connected: number; withText: number; durationSec: number }
  > = {};

  calls.forEach(c => {
    const p = c.personName;
    if (!repStats[p]) {
      repStats[p] = { total: 0, connected: 0, withText: 0, durationSec: 0 };
    }
    repStats[p].total++;
    if ((c.payload as any).is_connected === true) {
      repStats[p].connected++;
    }
    if (c.hasUsableText) {
      repStats[p].withText++;
    }
    repStats[p].durationSec += (c.payload as any).duration_seconds || 0;
  });

  // Organizers stats
  const orgStats: Record<
    string,
    { total: number; withText: number; recorded: number; cancelled: number }
  > = {};

  meetings.forEach(m => {
    const o = m.personName;
    if (!orgStats[o]) {
      orgStats[o] = { total: 0, withText: 0, recorded: 0, cancelled: 0 };
    }
    orgStats[o].total++;
    if (m.hasUsableText) {
      orgStats[o].withText++;
    }
    const status = (m.payload as any).recording_status;
    if (status === 'recorded') orgStats[o].recorded++;
    else if (status === 'cancelled') orgStats[o].cancelled++;
  });

  // Route breakdown
  const routeCounts: Record<string, number> = {};
  records.forEach(r => {
    r.assignedRoutes.forEach(route => {
      routeCounts[route] = (routeCounts[route] || 0) + 1;
    });
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner explaining personnel distinction */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #bae6fd',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Info size={24} style={{ color: '#0284c7', flexShrink: 0 }} />
        <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
          <strong>Personnel Separation Protocol:</strong> As specified in the brief, we strictly distinguish <strong>Call Reps (SDR / AE callers)</strong> from <strong>Meeting Organizers</strong>. A meeting organizer email (e.g. <code>team08@example.com</code>) represents a calendar booking account and is not automatically a salesperson, attendee, or call participant.
        </div>
      </div>

      {/* Grid: Call Reps vs Meeting Organizers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Call Reps Table */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <PhoneCall size={18} style={{ color: '#0284c7' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Call Reps Activity (30 Dials on 21 Aug)
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>Rep Name</th>
                  <th style={{ padding: '8px 10px' }}>Total Dials</th>
                  <th style={{ padding: '8px 10px' }}>Connected</th>
                  <th style={{ padding: '8px 10px' }}>Transcripts</th>
                  <th style={{ padding: '8px 10px' }}>Total Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(repStats).map(([rep, st]) => (
                  <tr
                    key={rep}
                    onClick={() => onFilterByPerson(rep)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0f9ff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0284c7' }}>
                      {rep}
                    </td>
                    <td style={{ padding: '10px', color: '#1e293b' }}>{st.total}</td>
                    <td style={{ padding: '10px', color: '#16a34a', fontWeight: 600 }}>
                      {st.connected} ({((st.connected / st.total) * 100).toFixed(0)}%)
                    </td>
                    <td style={{ padding: '10px', color: '#0f766e' }}>{st.withText}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>
                      {Math.floor(st.durationSec / 60)}m {st.durationSec % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px' }}>
            Click any rep to filter Attention Inbox to their calls.
          </div>
        </div>

        {/* Meeting Organizers Table */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Calendar size={18} style={{ color: '#15803d' }} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Meeting Organizers (14 Calendar Events)
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                  <th style={{ padding: '8px 10px' }}>Organizer Email</th>
                  <th style={{ padding: '8px 10px' }}>Events</th>
                  <th style={{ padding: '8px 10px' }}>Transcripts</th>
                  <th style={{ padding: '8px 10px' }}>Bot Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(orgStats).map(([org, st]) => (
                  <tr
                    key={org}
                    onClick={() => onFilterByPerson(org)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      transition: 'background 0.1s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f0fdf4')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '10px', fontWeight: 600, color: '#15803d' }}>
                      {org}
                    </td>
                    <td style={{ padding: '10px', color: '#1e293b' }}>{st.total}</td>
                    <td style={{ padding: '10px', color: '#0f766e', fontWeight: 600 }}>{st.withText}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>
                      {st.recorded > 0 && <span style={{ color: '#16a34a' }}>{st.recorded} rec</span>}
                      {st.cancelled > 0 && <span style={{ color: '#dc2626', marginLeft: '6px' }}>{st.cancelled} canc</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '10px' }}>
            Click any organizer to filter Attention Inbox to their scheduled meetings.
          </div>
        </div>
      </div>

      {/* Section 2: Routing Distribution */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
          Active Routing Taxonomy Distribution
        </h3>
        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
          Notice total route assignments exceed 44 because high-value conversations (e.g. M03, M04, M07) are assigned to multiple functional destinations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {Object.entries(routeCounts).map(([route, count]) => (
            <div
              key={route}
              onClick={() => onFilterByRoute(route)}
              style={{
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '12px 14px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#0284c7')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e2e8f0')}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{route}</span>
              <span
                style={{
                  background: '#e0f2fe',
                  color: '#0369a1',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
