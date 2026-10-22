import React, { useState } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  AlertTriangle,
  Video,
  FileText,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';
import {
  FIVE_SLIDES,
  THREE_KEY_FINDINGS,
  REJECTED_DECISION,
  THREE_MINUTE_DEMO_SCRIPT,
} from '../data/slidesContent';

export function FiveSlidesDeckView() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'slides' | 'findings' | 'rejected' | 'video'>('slides');

  const slide = FIVE_SLIDES[currentSlideIndex];

  const handleDownloadDeckMarkdown = () => {
    let md = `# SpendNest Revenue Intelligence - Executive Assessment Deck\n\n`;

    FIVE_SLIDES.forEach(s => {
      md += `## Slide ${s.number}: ${s.title}\n`;
      md += `*${s.subtitle}*\n\n`;
      md += `### Key Highlights:\n`;
      s.highlights.forEach(h => (md += `- ${h}\n`));
      md += `\n### Detailed Analysis:\n`;
      s.mainPoints.forEach(p => {
        md += `**${p.heading}:** ${p.description}\n`;
        if (p.evidence) md += `> Citation: ${p.evidence}\n`;
        md += `\n`;
      });
      md += `**Takeaway:** ${s.keyTakeaway}\n\n---\n\n`;
    });

    md += `## Three Most Important Findings\n\n`;
    THREE_KEY_FINDINGS.forEach(f => {
      md += `### Finding ${f.number}: ${f.title} (${f.recordRef})\n`;
      md += `* **Source ID:** \`${f.sourceId}\`\n`;
      md += `* **Citation:** ${f.citation}\n`;
      md += `* **Exact Quote:** "${f.exactQuote}"\n`;
      md += `* **Product Impact:** ${f.productImpact}\n\n`;
    });

    md += `## Deliberately Rejected Decision\n\n`;
    md += `### ${REJECTED_DECISION.title}\n`;
    md += `* **Considered Alternative:** ${REJECTED_DECISION.consideredAlternative}\n`;
    md += `* **Why Rejected:** ${REJECTED_DECISION.whyRejected}\n`;
    md += `* **Trade-Off Accepted:** ${REJECTED_DECISION.tradeOffAccepted}\n`;
    md += `* **Resulting Product Choice:** ${REJECTED_DECISION.resultingProductChoice}\n\n---\n\n`;

    md += `## 3-Minute Screen Recording Narration Script\n\n`;
    THREE_MINUTE_DEMO_SCRIPT.forEach(seg => {
      md += `### [${seg.timestamp}] ${seg.segment}\n`;
      md += `${seg.spokenNarration}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `spendnest_5_slides_and_submission_notes.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Controls & Navigation */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSection('slides')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeSection === 'slides' ? '1px solid #0284c7' : '1px solid #e2e8f0',
              background: activeSection === 'slides' ? '#e0f2fe' : '#ffffff',
              color: activeSection === 'slides' ? '#0369a1' : '#475569',
              fontWeight: activeSection === 'slides' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Presentation size={15} />
            <span>Five Assessment Slides</span>
          </button>

          <button
            onClick={() => setActiveSection('findings')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeSection === 'findings' ? '1px solid #0284c7' : '1px solid #e2e8f0',
              background: activeSection === 'findings' ? '#e0f2fe' : '#ffffff',
              color: activeSection === 'findings' ? '#0369a1' : '#475569',
              fontWeight: activeSection === 'findings' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={15} />
            <span>3 Key Findings</span>
          </button>

          <button
            onClick={() => setActiveSection('rejected')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeSection === 'rejected' ? '1px solid #0284c7' : '1px solid #e2e8f0',
              background: activeSection === 'rejected' ? '#e0f2fe' : '#ffffff',
              color: activeSection === 'rejected' ? '#0369a1' : '#475569',
              fontWeight: activeSection === 'rejected' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <AlertTriangle size={15} />
            <span>1 Rejected Decision</span>
          </button>

          <button
            onClick={() => setActiveSection('video')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeSection === 'video' ? '1px solid #0284c7' : '1px solid #e2e8f0',
              background: activeSection === 'video' ? '#e0f2fe' : '#ffffff',
              color: activeSection === 'video' ? '#0369a1' : '#475569',
              fontWeight: activeSection === 'video' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Video size={15} />
            <span>3-Min Video Script</span>
          </button>
        </div>

        <button
          onClick={handleDownloadDeckMarkdown}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '8px',
            background: '#0284c7',
            color: '#ffffff',
            border: 'none',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Download size={14} />
          Export All Submission Notes (.MD)
        </button>
      </div>

      {/* SECTION 1: INTERACTIVE 5 SLIDES */}
      {activeSection === 'slides' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main Slide Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #bae6fd',
              padding: '36px 44px',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.06)',
              minHeight: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* Slide Header */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    letterSpacing: '0.5px',
                  }}
                >
                  SLIDE {slide.number} OF 5
                </span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>
                  SpendNest Revenue Intelligence Submission Deck
                </span>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
                {slide.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#0284c7', fontWeight: 600, margin: '0 0 24px' }}>
                {slide.subtitle}
              </p>

              {/* Highlights Pill Strip */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {slide.highlights.map((h, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      color: '#334155',
                      fontWeight: 500,
                    }}
                  >
                    • {h}
                  </span>
                ))}
              </div>

              {/* Main Content Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {slide.mainPoints.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      padding: '16px',
                    }}
                  >
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                      {point.heading}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {point.description}
                    </p>
                    {point.evidence && (
                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '11px',
                          color: '#0284c7',
                          fontStyle: 'italic',
                          borderLeft: '2px solid #38bdf8',
                          paddingLeft: '8px',
                        }}
                      >
                        {point.evidence}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Footer / Key Takeaway */}
            <div
              style={{
                marginTop: '32px',
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '13px', color: '#0369a1', fontWeight: 600 }}>
                💡 <strong>Key Takeaway:</strong> {slide.keyTakeaway}
              </div>

              {/* Carousel Arrows */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: currentSlideIndex === 0 ? '#f1f5f9' : '#0284c7',
                    color: currentSlideIndex === 0 ? '#94a3b8' : '#ffffff',
                    border: 'none',
                    cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => setCurrentSlideIndex(prev => Math.min(FIVE_SLIDES.length - 1, prev + 1))}
                  disabled={currentSlideIndex === FIVE_SLIDES.length - 1}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: currentSlideIndex === FIVE_SLIDES.length - 1 ? '#f1f5f9' : '#0284c7',
                    color: currentSlideIndex === FIVE_SLIDES.length - 1 ? '#94a3b8' : '#ffffff',
                    border: 'none',
                    cursor: currentSlideIndex === FIVE_SLIDES.length - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 3 KEY FINDINGS */}
      {activeSection === 'findings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Three Most Important Findings (Required Submission Component)
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Each finding states what was observed, cites the exact source passage (meeting turn number or call exact quote), and specifies where it directly affected the product.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {THREE_KEY_FINDINGS.map(f => (
              <div
                key={f.number}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ background: '#0284c7', color: '#ffffff', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    Finding #{f.number}
                  </span>
                  <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {f.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>({f.recordRef})</span>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0', marginBottom: '12px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0284c7', marginBottom: '4px' }}>
                    EXACT SOURCE CITATION: {f.citation} (ID: <code>{f.sourceId}</code>)
                  </div>
                  <blockquote style={{ fontSize: '13px', color: '#1e293b', fontStyle: 'italic', margin: 0 }}>
                    "{f.exactQuote}"
                  </blockquote>
                </div>

                <div style={{ fontSize: '13px', color: '#334155' }}>
                  <strong style={{ color: '#0f766e' }}>Exact Product Impact:</strong> {f.productImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: REJECTED DECISION */}
      {activeSection === 'rejected' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ background: '#fee2e2', color: '#dc2626', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', fontSize: '12px' }}>
                DELIBERATELY REJECTED DECISION
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {REJECTED_DECISION.title}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#0f172a' }}>1. Alternative Considered:</strong>
                <p style={{ margin: '4px 0 0', color: '#475569' }}>{REJECTED_DECISION.consideredAlternative}</p>
              </div>

              <div style={{ background: '#fef2f2', padding: '14px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <strong style={{ color: '#991b1b' }}>2. Why Rejected:</strong>
                <p style={{ margin: '4px 0 0', color: '#7f1d1d' }}>{REJECTED_DECISION.whyRejected}</p>
              </div>

              <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <strong style={{ color: '#1e40af' }}>3. Trade-Off Accepted:</strong>
                <p style={{ margin: '4px 0 0', color: '#1e3a8a' }}>{REJECTED_DECISION.tradeOffAccepted}</p>
              </div>

              <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <strong style={{ color: '#166534' }}>4. Resulting Choice in Finished Product:</strong>
                <p style={{ margin: '4px 0 0', color: '#14532d' }}>{REJECTED_DECISION.resultingProductChoice}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 3-MINUTE VIDEO SCRIPT */}
      {activeSection === 'video' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Three-Minute Screen Recording Narration Guide
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Use this structured narration guide when recording your continuous 3-minute demonstration. It walks through one manager workflow, one difficult routing decision, and the duplicate/update test.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {THREE_MINUTE_DEMO_SCRIPT.map((seg, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '18px',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                    {seg.timestamp}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                    {seg.segment}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                  "{seg.spokenNarration}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
