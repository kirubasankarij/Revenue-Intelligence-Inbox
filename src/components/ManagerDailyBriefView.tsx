import React from 'react';
import {
  FileText,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  UserCheck,
  CheckCircle2,
  Download,
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { EnrichedRecord } from '../types';
import { generateDailyBriefMarkdown } from '../services/dailyBriefService';

interface ManagerDailyBriefViewProps {
  records: EnrichedRecord[];
  onSelectRecordByRef: (recordRef: string) => void;
  onExportBrief: () => void;
}

export function ManagerDailyBriefView({
  records,
  onSelectRecordByRef,
  onExportBrief,
}: ManagerDailyBriefViewProps) {
  const total = records.length;
  const withText = records.filter(r => r.hasUsableText).length;

  const handleDownloadMarkdown = () => {
    const md = generateDailyBriefMarkdown(records);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manager_brief_2026_08_21.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
          borderRadius: '16px',
          padding: '24px 32px',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(2, 132, 199, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.5px',
              }}
            >
              EXECUTIVE BRIEFING
            </span>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>Asia/Kolkata (IST)</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px' }}>
            Manager Brief: 21 August 2026
          </h2>
          <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, maxWidth: '700px' }}>
            Comprehensive synthesis of team activity, urgent conversation triage, practical coaching highlights, and explicit follow-up commitments.
          </p>
        </div>

        <button
          onClick={handleDownloadMarkdown}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: '#ffffff',
            color: '#0284c7',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Download size={16} />
          Export Brief (.MD)
        </button>
      </div>

      {/* Section 1: KPI Stats Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>TOTAL SELECTED RECORDS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>{total}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>30 Calls + 14 Meetings</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>TRANSCRIPT COVERAGE</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#16a34a' }}>{withText} / {total}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>10 Calls + 8 Meetings Covered</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>CALL REPS ACTIVE</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0284c7' }}>5 Reps</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Arun (15), Leela (8), Meera (5)...</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px 18px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>CRITICAL ATTENTION ITEMS</div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#e11d48' }}>3 Deals/Accounts</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Cedarwave, Willowfield, Asterloom</div>
        </div>
      </div>

      {/* Section 2: Top 3 Attention Priorities */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
          Top 3 High-Attention Priorities
        </h3>

        {/* Priority 1: Cedarwave M04 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #fda4af',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#ffe4e6', color: '#e11d48', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>
                M04 • CRITICAL CHURN RISK
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Cedarwave Distribution: Legacy Card Sunset & Bank Credit Conflict
              </h4>
            </div>
            <button
              onClick={() => onSelectRecordByRef('M04')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Inspect M04 <ArrowRight size={13} />
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 10px' }}>
            SpendNest is forced to sunset its legacy card programme due to acceptance failures. Cedarwave is being forced through re-KYC. Customer revealed an existing <strong>₹1.3 crore bank corporate credit line</strong> and bluntly stated: <em>"moving from prepaid to credit is the main issue for us"</em>. If we cannot integrate their bank cards, they will leave for the bank's portal.
          </p>
          <div style={{ fontSize: '12px', color: '#991b1b', background: '#fee2e2', padding: '8px 12px', borderRadius: '6px' }}>
            <strong>Action Required:</strong> AE to confirm whether bank credit cards can join the transaction-feed programme (Turn 23) and fix department mapping confusion (Turn 31).
          </div>
        </div>

        {/* Priority 2: Willowfield Trust M07 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #fdba74',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#ffedd5', color: '#c2410c', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>
                M07 • BUG ESCALATION
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Willowfield Trust: 4 Production Bugs Reproduced on Screen-Share
              </h4>
            </div>
            <button
              onClick={() => onSelectRecordByRef('M07')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Inspect M07 <ArrowRight size={13} />
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 10px' }}>
            Transcript delivered in revision 2 revealed 4 severe production defects: (1) Description edit failure on event payments (Turn 2-7). (2) Recreate payment upload broken; workaround identified via Bill Pay inbox (Turn 8-15). (3) Reimbursements stuck in "Processing" state (Turn 16-19). (4) "Mark as paid" form modal retains previous payment amount (₹18,200) onto next items (Turn 21-25).
          </p>
          <div style={{ fontSize: '12px', color: '#9a3412', background: '#ffedd5', padding: '8px 12px', borderRadius: '6px' }}>
            <strong>Action Required:</strong> Team member A to file 4 emergency engineering tickets and provide ETA on stuck reimbursements within 1-2 hours.
          </div>
        </div>

        {/* Priority 3: Asterloom Systems M03 */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            border: '2px solid #fde68a',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(202, 138, 4, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#fef9c3', color: '#a16207', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>
                M03 • PRICING FRICTION
              </span>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Asterloom Systems: Prepaid Misunderstanding & 50% Price Increase
              </h4>
            </div>
            <button
              onClick={() => onSelectRecordByRef('M03')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Inspect M03 <ArrowRight size={13} />
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 10px' }}>
            Prospect (~65 employees) expected corporate credit, surprised by prepaid model (Turn 6). Rep then quoted ₹39,000 without explaining it bundled an unannounced ₹13,000 setup fee over the ₹26,000 annual subscription (Turn 23-24). Customer halted talks to consult CFO.
          </p>
          <div style={{ fontSize: '12px', color: '#854d0e', background: '#fef9c3', padding: '8px 12px', borderRadius: '6px' }}>
            <strong>Action Required:</strong> Restate proposal itemizing recurring ₹26k vs one-time ₹13k setup before CFO review.
          </div>
        </div>
      </div>

      {/* Section 3: High-Value Partnerships */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
          Strategic Partnerships & Expansion
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>M01 • Harborpath Advisory</span>
              <button onClick={() => onSelectRecordByRef('M01')} style={{ fontSize: '11px', color: '#0284c7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Inspect M01</button>
            </div>
            <p style={{ fontSize: '12px', color: '#334155', margin: '0 0 6px' }}>
              Agreed on USD 260 activation commission. Partner demanded unique tracking link for web scalability (Turn 20-21).
            </p>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>Action: Send agreement memo & link; explore joint podcast.</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>C07 • Willowbank Advisory</span>
              <button onClick={() => onSelectRecordByRef('C07')} style={{ fontSize: '11px', color: '#0284c7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Inspect C07</button>
            </div>
            <p style={{ fontSize: '12px', color: '#334155', margin: '0 0 6px' }}>
              Advisory firm incorporates companies overseas and regularly refers clients to digital bank accounts (Turn 1).
            </p>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>Action: Send chat proposal; call Monday.</div>
          </div>

          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>M06 • Mapletrail Services</span>
              <button onClick={() => onSelectRecordByRef('M06')} style={{ fontSize: '11px', color: '#0284c7', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Inspect M06</button>
            </div>
            <p style={{ fontSize: '12px', color: '#334155', margin: '0 0 6px' }}>
              260–520 invoices/month with painful manual chasers. Branch finance manager requested security documentation.
            </p>
            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>Action: Dispatch compliance docs to facilitate central finance intro.</div>
          </div>
        </div>
      </div>

      {/* Section 4: Coaching Highlights */}
      <div style={{ background: '#f5f3ff', borderRadius: '12px', border: '1px solid #ddd6fe', padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#4c1d95', marginBottom: '12px' }}>
          Manager Coaching Highlights for Standup
        </h3>
        <ul style={{ margin: '0 0 0 20px', fontSize: '13px', color: '#4c1d95', lineHeight: 1.7 }}>
          <li>
            <strong>Praise Meera (C09):</strong> Meera asked permission before dropping Mr. Vedant's name when contacting Mr. Rishabh. When Vedant said <em>"No, please don't use my name"</em>, Meera respected the boundary. This conduct saved the account.
          </li>
          <li>
            <strong>Coaching Arun (C01):</strong> When prospect demands <em>"Why have you called me?"</em>, pivot immediately to peer value rather than debating professional networking sources.
          </li>
          <li>
            <strong>Coaching Team Member A (M03):</strong> Never bundle integration fees into subscription quotes without explicit line-item separation. Address credit vs prepaid in opening 2 minutes.
          </li>
        </ul>
      </div>
    </div>
  );
}
