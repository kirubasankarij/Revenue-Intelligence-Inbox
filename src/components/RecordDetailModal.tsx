import React, { useState } from 'react';
import {
  X,
  FileText,
  PhoneCall,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  UserCheck,
  Tag,
  History,
  Code,
  Save,
  MessageSquare,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { EnrichedRecord, RouteCategory, ProcessingState } from '../types';

interface RecordDetailModalProps {
  record: EnrichedRecord | null;
  onClose: () => void;
  onSaveManualOverride: (sourceType: 'call' | 'meeting', sourceId: string, routes: RouteCategory[], comment?: string) => void;
}

export function RecordDetailModal({
  record,
  onClose,
  onSaveManualOverride,
}: RecordDetailModalProps) {
  if (!record) return null;

  const [activeTab, setActiveTab] = useState<'analysis' | 'transcript' | 'payload' | 'routing'>('analysis');
  const [selectedRoutes, setSelectedRoutes] = useState<RouteCategory[]>([...record.assignedRoutes]);
  const [overrideComment, setOverrideComment] = useState<string>(record.manualOverrideComment || '');
  const [isSaving, setIsSaving] = useState(false);

  const isCall = record.source_type === 'call';
  const a = record.analysis;
  const turns = record.transcript_payload?.turns || [];

  const allAvailableRoutes: RouteCategory[] = [
    'Sales Coaching',
    'Deal Next Steps',
    'Partnerships & Channel',
    'Customer Support / Bugs',
    'Customer Retention',
    'Vendor Evaluation',
    'Internal Operations',
    'Voicemail / Gatekeeper',
    'Disqualified / Unqualified',
  ];

  const handleToggleRoute = (route: RouteCategory) => {
    setSelectedRoutes(prev =>
      prev.includes(route) ? prev.filter(r => r !== route) : [...prev, route]
    );
  };

  const handleSaveRoute = () => {
    if (selectedRoutes.length === 0) {
      alert('Please select at least one target route.');
      return;
    }
    setIsSaving(true);
    onSaveManualOverride(record.source_type, record.source_id, selectedRoutes, overrideComment);
    setTimeout(() => {
      setIsSaving(false);
      alert(`Manual route correction saved for ${record.record_ref}!`);
    }, 200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          border: '1px solid #bae6fd',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                background: isCall ? '#e0f2fe' : '#f0fdf4',
                color: isCall ? '#0369a1' : '#15803d',
                border: isCall ? '1px solid #bae6fd' : '1px solid #bbf7d0',
              }}
            >
              {record.record_ref}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {record.derivedAccount || record.displayTitle}
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: record.applied_revision >= 2 ? '#e0f2fe' : '#f1f5f9',
                    color: record.applied_revision >= 2 ? '#0369a1' : '#64748b',
                    border: '1px solid #cbd5e1',
                  }}
                >
                  rev {record.applied_revision}
                </span>
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
                    }}
                  >
                    MANUAL OVERRIDE
                  </span>
                )}
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                Strict Identity: <code>({record.source_type}, {record.source_id})</code> • {record.localDate} at {record.localTime} IST
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              cursor: 'pointer',
              color: '#64748b',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '10px 24px',
            borderBottom: '1px solid #e2e8f0',
            background: '#ffffff',
          }}
        >
          <button
            onClick={() => setActiveTab('analysis')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'analysis' ? 700 : 500,
              background: activeTab === 'analysis' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'analysis' ? '#0284c7' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={15} />
            <span>Analysis & Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('transcript')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'transcript' ? 700 : 500,
              background: activeTab === 'transcript' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'transcript' ? '#0284c7' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MessageSquare size={15} />
            <span>Verbatim Source Transcript ({record.hasUsableText ? `${record.textWordCount} words` : 'None'})</span>
          </button>

          <button
            onClick={() => setActiveTab('payload')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'payload' ? 700 : 500,
              background: activeTab === 'payload' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'payload' ? '#0284c7' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Code size={15} />
            <span>Source Metadata (Verbatim Payload)</span>
          </button>

          <button
            onClick={() => setActiveTab('routing')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'routing' ? 700 : 500,
              background: activeTab === 'routing' ? '#e0f2fe' : 'transparent',
              color: activeTab === 'routing' ? '#0284c7' : '#475569',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Tag size={15} />
            <span>Routing & Manual Override</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: ANALYSIS & EVIDENCE */}
          {activeTab === 'analysis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {a ? (
                <>
                  {/* Headline & What Happened */}
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Factual Summary
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '4px 0 10px' }}>
                      {a.headline}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                      {a.whatHappened}
                    </p>
                  </div>

                  {/* Why It Matters */}
                  <div style={{ background: '#f0f9ff', padding: '16px', borderRadius: '10px', border: '1px solid #bae6fd' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Why It Matters to Sales Leadership
                    </div>
                    <p style={{ fontSize: '13px', color: '#0c4a6e', lineHeight: 1.6, margin: '6px 0 0' }}>
                      {a.whyItMatters}
                    </p>
                  </div>

                  {/* Supporting Passages */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                      Supporting Transcript Evidence & Citations
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {a.supportingCitations.map((cit, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            borderLeft: '4px solid #0284c7',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
                              📍 {cit.citation} {cit.speaker ? `(${cit.speaker})` : ''}
                            </span>
                          </div>
                          <blockquote style={{ fontSize: '13px', color: '#1e293b', fontStyle: 'italic', margin: '4px 0 6px' }}>
                            "{cit.quote}"
                          </blockquote>
                          <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
                            <strong>Significance:</strong> {cit.significance}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Honest Uncertainty: What Evidence Does NOT Establish */}
                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>
                      <AlertTriangle size={15} />
                      <span>Honest Uncertainty: What the Evidence Does NOT Establish</span>
                    </div>
                    <ul style={{ margin: '8px 0 0 20px', fontSize: '13px', color: '#78350f', lineHeight: 1.6 }}>
                      {a.whatEvidenceDoesNotEstablish.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stated Action Items */}
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                      Stated Action Items & Ownership
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {a.statedNextSteps.map((ns, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <CheckCircle2 size={16} style={{ color: '#16a34a' }} />
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{ns.task}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>
                                Owner: <strong>{ns.owner}</strong> • {ns.isExplicitlyStated ? 'Stated in conversation' : 'Manager recommendation'}
                              </div>
                            </div>
                          </div>
                          {ns.deadline && (
                            <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                              Due: {ns.deadline}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coaching Notes */}
                  {a.coachingNotes && (
                    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '16px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Manager Practical Coaching
                      </div>
                      <p style={{ fontSize: '13px', color: '#4c1d95', margin: '6px 0 0', lineHeight: 1.6 }}>
                        {a.coachingNotes}
                      </p>
                    </div>
                  )}

                  {/* Commercial Signals Disclaimer */}
                  {a.commercialSignals && (
                    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                        Stated Commercial References & Boundaries
                      </div>
                      <div style={{ fontSize: '12px', color: '#334155', margin: '4px 0' }}>
                        <strong>Currencies & Amounts:</strong> {a.commercialSignals.currenciesMentioned.join(', ') || 'None'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        <strong>Factual Caveat:</strong> {a.commercialSignals.caution}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  <HelpCircle size={32} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                    Metadata Intake Record (No Usable Conversation Text)
                  </h3>
                  <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '600px', margin: '0 auto 16px' }}>
                    As specified in the assessment instructions, substantive analysis is not fabricated for silent or background records. This record represents an upstream telephony dial or uncaptured calendar bot.
                  </p>
                  <div style={{ display: 'inline-block', textAlign: 'left', background: '#ffffff', padding: '12px 18px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}>
                    <div><strong>Source Type:</strong> {record.source_type}</div>
                    <div><strong>Processing State:</strong> {record.processingState}</div>
                    {isCall && <div><strong>Upstream Connection:</strong> {String((record.payload as any).is_connected)}</div>}
                    {!isCall && <div><strong>Recording Status:</strong> {(record.payload as any).recording_status}</div>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VERBATIM SOURCE TRANSCRIPT */}
          {activeTab === 'transcript' && (
            <div>
              {isCall ? (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    Adapted Phone Call Transcript ({record.textWordCount} words)
                  </h4>
                  {record.payload && (record.payload as any).transcript ? (
                    <div
                      style={{
                        background: '#f8fafc',
                        padding: '16px',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        lineHeight: 1.7,
                        color: '#1e293b',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'system-ui, sans-serif',
                      }}
                    >
                      {(record.payload as any).transcript}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '8px', color: '#64748b', textAlign: 'center' }}>
                      No transcript text supplied for background call {record.record_ref}.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      Meeting Speaker Turns ({turns.length} turns)
                    </h4>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Passage citations use 1-based Turn number per contract.
                    </span>
                  </div>

                  {turns.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {turns.map((turn, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: '#f8fafc',
                            borderRadius: '8px',
                            padding: '10px 14px',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7' }}>
                              Turn {idx + 1} • {turn.speaker}
                            </span>
                            <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                              {turn.timecode}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                            {turn.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '8px', color: '#64748b', textAlign: 'center' }}>
                      Transcript withheld or unavailable in this delivery revision.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SOURCE METADATA (VERBATIM PAYLOAD) */}
          {activeTab === 'payload' && (
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Verbatim Payload Fields (Upstream Source JSON)
              </h4>
              <div
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(
                    {
                      record_ref: record.record_ref,
                      source_type: record.source_type,
                      source_id: record.source_id,
                      applied_revision: record.applied_revision,
                      payload: record.payload,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: ROUTING & MANUAL OVERRIDE */}
          {activeTab === 'routing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Manual Routing Destination Override (Data Contract Rule #4)
                </h4>
                <p style={{ fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                  A conversation may need one destination, multiple destinations (e.g. Sales Coaching + Customer Support), or human escalation. Manual corrections are permanently saved and will NOT be erased if newer source revisions arrive.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                  {allAvailableRoutes.map(route => {
                    const isChecked = selectedRoutes.includes(route);
                    return (
                      <label
                        key={route}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: isChecked ? '#e0f2fe' : '#ffffff',
                          border: isChecked ? '1px solid #0284c7' : '1px solid #cbd5e1',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: isChecked ? 700 : 500,
                          color: isChecked ? '#0369a1' : '#334155',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRoute(route)}
                          style={{ accentColor: '#0284c7' }}
                        />
                        <span>{route}</span>
                      </label>
                    );
                  })}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                    Manager Reason / Explanation:
                  </label>
                  <input
                    type="text"
                    value={overrideComment}
                    onChange={e => setOverrideComment(e.target.value)}
                    placeholder="e.g. Re-routed to Bug Escalation following screen-share defect reproduction..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  onClick={handleSaveRoute}
                  disabled={isSaving}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <Save size={15} />
                  <span>{isSaving ? 'Saving...' : 'Save Manual Route Correction'}</span>
                </button>
              </div>

              {/* Audit History */}
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  Record Lifecycle & Audit Trail
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {record.history.map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        background: '#f8fafc',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{h.action}</span>
                        <span style={{ color: '#64748b', fontSize: '11px' }}>{new Date(h.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div style={{ color: '#475569' }}>{h.details}</div>
                      <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>Actor: {h.actor}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
