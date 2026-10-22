import React, { useState } from 'react';
import {
  X,
  Download,
  FileText,
  FolderTree,
  FileSpreadsheet,
  CheckCircle2,
  Code,
  Archive,
  Layers,
} from 'lucide-react';
import { EnrichedRecord } from '../types';
import { buildExportBundle, downloadExportZip } from '../services/exportService';

interface ExportModalProps {
  records: EnrichedRecord[];
  onClose: () => void;
}

export function ExportModal({ records, onClose }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'manifest_json' | 'manifest_csv' | 'tree'>('manifest_json');
  const [isExporting, setIsExporting] = useState(false);

  const { files, manifestRows, manifestJson, manifestCsv } = buildExportBundle(records);

  const handleDownloadZip = async () => {
    setIsExporting(true);
    try {
      await downloadExportZip(records);
    } catch (err) {
      console.error('Failed to download zip', err);
      alert('Failed to generate export zip.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Group files by directory for the tree view
  const treeGroups: Record<string, string[]> = {};
  Object.keys(files).forEach(filePath => {
    const parts = filePath.split('/');
    if (parts.length === 1) {
      treeGroups['root'] = treeGroups['root'] || [];
      treeGroups['root'].push(parts[0]);
    } else {
      const folder = parts[0];
      treeGroups[folder] = treeGroups[folder] || [];
      treeGroups[folder].push(parts.slice(1).join('/'));
    }
  });

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
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
          border: '1px solid #bae6fd',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(135deg, #f8fbff 0%, #f0f7ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Archive size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Generated Export Hub & Manifest Architecture
              </h2>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                Machine-readable manifest (JSON/CSV) and organized markdown folder tree
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

        {/* Tab Controls & Direct Download Actions */}
        <div
          style={{
            padding: '12px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            background: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('manifest_json')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: activeTab === 'manifest_json' ? 700 : 500,
                background: activeTab === 'manifest_json' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'manifest_json' ? '#0284c7' : '#475569',
                border: activeTab === 'manifest_json' ? '1px solid #bae6fd' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Code size={14} />
              manifest.json
            </button>

            <button
              onClick={() => setActiveTab('manifest_csv')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: activeTab === 'manifest_csv' ? 700 : 500,
                background: activeTab === 'manifest_csv' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'manifest_csv' ? '#0284c7' : '#475569',
                border: activeTab === 'manifest_csv' ? '1px solid #bae6fd' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FileSpreadsheet size={14} />
              manifest.csv
            </button>

            <button
              onClick={() => setActiveTab('tree')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: activeTab === 'tree' ? 700 : 500,
                background: activeTab === 'tree' ? '#e0f2fe' : 'transparent',
                color: activeTab === 'tree' ? '#0284c7' : '#475569',
                border: activeTab === 'tree' ? '1px solid #bae6fd' : '1px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <FolderTree size={14} />
              Folder Directory Tree ({Object.keys(files).length} files)
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleDownloadZip}
              disabled={isExporting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.25)',
              }}
            >
              <Download size={14} />
              <span>{isExporting ? 'Packaging ZIP...' : 'Download Full ZIP Bundle'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: MANIFEST JSON */}
          {activeTab === 'manifest_json' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Machine-readable JSON manifest containing exact record identity <code>(source_type, source_id)</code>, applied revision, routes, and output paths.
                </span>
                <button
                  onClick={() => handleDownloadFile('manifest.json', manifestJson, 'application/json')}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#0284c7',
                  }}
                >
                  Download manifest.json
                </button>
              </div>
              <div
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  maxHeight: '440px',
                  overflowY: 'auto',
                }}
              >
                <pre style={{ margin: 0 }}>{manifestJson}</pre>
              </div>
            </div>
          )}

          {/* TAB 2: MANIFEST CSV */}
          {activeTab === 'manifest_csv' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>
                  Standard CSV manifest for spreadsheet inspection.
                </span>
                <button
                  onClick={() => handleDownloadFile('manifest.csv', manifestCsv, 'text/csv')}
                  style={{
                    fontSize: '11px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: '#0284c7',
                  }}
                >
                  Download manifest.csv
                </button>
              </div>
              <div
                style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '16px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  maxHeight: '440px',
                  overflowY: 'auto',
                  whiteSpace: 'pre',
                }}
              >
                {manifestCsv}
              </div>
            </div>
          )}

          {/* TAB 3: DIRECTORY FOLDER TREE */}
          {activeTab === 'tree' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '13px', color: '#334155', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <strong>Folder Architecture Principle:</strong> Each conversation with substantive content produces specialized markdown reports organized into functional directories (coaching, deal next steps, partnerships, support). Multi-routed conversations produce files across multiple directories without loss of context.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {Object.entries(treeGroups).map(([folder, fileList]) => (
                  <div
                    key={folder}
                    style={{
                      background: '#ffffff',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: '#0284c7', marginBottom: '8px' }}>
                      <FolderTree size={15} />
                      <span>{folder}/</span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>({fileList.length} files)</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
                      {fileList.map((f, i) => (
                        <li key={i} style={{ wordBreak: 'break-all' }}>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
