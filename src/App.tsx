import React, { useState, useEffect } from 'react';
import {
  EnrichedRecord,
  DashboardFilterState,
  RouteCategory,
} from './types';
import {
  loadStoredRecords,
  saveStoredRecords,
  applyManualRouteOverride,
  getFinalDemoState,
} from './services/contractImportEngine';
import { Navbar } from './components/Navbar';
import { ReplayControlBanner } from './components/ReplayControlBanner';
import { MetricsOverview } from './components/MetricsOverview';
import { AttentionQueue } from './components/AttentionQueue';
import { ActivityAnalytics } from './components/ActivityAnalytics';
import { ManagerDailyBriefView } from './components/ManagerDailyBriefView';
import { FiveSlidesDeckView } from './components/FiveSlidesDeckView';
import { RecordDetailModal } from './components/RecordDetailModal';
import { ExportModal } from './components/ExportModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function App() {
  // Main Records State - loaded from localStorage, defaults to final post-update state
  const [records, setRecords] = useState<EnrichedRecord[]>(() => loadStoredRecords());

  // Active Navigation Tab
  const [currentTab, setCurrentTab] = useState<'inbox' | 'analytics' | 'daily_brief' | 'slides' | 'export'>('inbox');

  // Modal States
  const [selectedRecord, setSelectedRecord] = useState<EnrichedRecord | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Filter State
  const [filterState, setFilterState] = useState<DashboardFilterState>({
    searchQuery: '',
    sourceType: 'all',
    personFilter: 'all',
    routeFilter: 'all',
    hasTextFilter: 'all',
    processingStateFilter: 'all',
    urgencyFilter: 'all',
    sortBy: 'urgency',
    sortOrder: 'desc',
  });

  // Sync state to localStorage on every change
  useEffect(() => {
    saveStoredRecords(records);
  }, [records]);

  // Show Toast
  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Callback when replay banner or import actions change records
  const handleRecordsChange = (newRecords: EnrichedRecord[], message: string) => {
    setRecords(newRecords);
    showToast(message);
    if (selectedRecord) {
      const refreshed = newRecords.find(r => r.identityKey === selectedRecord.identityKey);
      if (refreshed) setSelectedRecord(refreshed);
    }
  };

  // Manual route override handler
  const handleSaveManualOverride = (
    sourceType: 'call' | 'meeting',
    sourceId: string,
    newRoutes: RouteCategory[],
    comment?: string
  ) => {
    const updated = applyManualRouteOverride(records, sourceType, sourceId, newRoutes, comment);
    setRecords(updated);
    showToast(`Manual route correction saved for ${sourceType} (${newRoutes.join(', ')})`);
    if (selectedRecord && selectedRecord.source_id === sourceId) {
      const refreshed = updated.find(r => r.identityKey === selectedRecord.identityKey);
      if (refreshed) setSelectedRecord(refreshed);
    }
  };

  // Reset to initial demo
  const handleResetData = () => {
    if (window.confirm('Reset all records to initial delivery state (17 texts, 44 records)?')) {
      const pristine = getFinalDemoState();
      setRecords(pristine);
      showToast('Loaded pristine demo dataset (44 records, 18 texts).', 'info');
    }
  };

  const criticalCount = records.filter(r => r.urgencyLevel === 'Critical').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fbff' }}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        filterState={filterState}
        setFilterState={setFilterState}
        records={records}
        onOpenExport={() => setIsExportModalOpen(true)}
        onResetData={handleResetData}
        criticalCount={criticalCount}
      />

      {/* Interactive Data Contract Replay Banner */}
      <ReplayControlBanner
        records={records}
        onRecordsChange={handleRecordsChange}
      />

      {/* Main Container */}
      <main
        style={{
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '24px',
          flex: 1,
        }}
      >
        {/* TAB 1: INBOX & ATTENTION COCKPIT */}
        {currentTab === 'inbox' && (
          <div>
            <MetricsOverview
              records={records}
              filterState={filterState}
              setFilterState={setFilterState}
            />

            <AttentionQueue
              records={records}
              filterState={filterState}
              setFilterState={setFilterState}
              onSelectRecord={record => setSelectedRecord(record)}
              onOpenQuickOverride={record => setSelectedRecord(record)}
            />
          </div>
        )}

        {/* TAB 2: ACTIVITY ANALYTICS */}
        {currentTab === 'analytics' && (
          <ActivityAnalytics
            records={records}
            onFilterByPerson={personName => {
              setFilterState(prev => ({ ...prev, personFilter: personName }));
              setCurrentTab('inbox');
            }}
            onFilterByRoute={route => {
              setFilterState(prev => ({ ...prev, routeFilter: route as any }));
              setCurrentTab('inbox');
            }}
          />
        )}

        {/* TAB 3: 21 AUG DAILY BRIEF */}
        {currentTab === 'daily_brief' && (
          <ManagerDailyBriefView
            records={records}
            onSelectRecordByRef={ref => {
              const rec = records.find(r => r.record_ref === ref);
              if (rec) setSelectedRecord(rec);
            }}
            onExportBrief={() => setIsExportModalOpen(true)}
          />
        )}

        {/* TAB 4: 5-SLIDE DECK & PITCH */}
        {currentTab === 'slides' && (
          <FiveSlidesDeckView />
        )}

        {/* TAB 5: EXPORT & MANIFEST HUB */}
        {currentTab === 'export' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #bae6fd', padding: '24px' }}>
            <ExportModal
              records={records}
              onClose={() => setCurrentTab('inbox')}
            />
          </div>
        )}
      </main>

      {/* Record Inspection & Route Override Modal */}
      {selectedRecord && (
        <RecordDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onSaveManualOverride={handleSaveManualOverride}
        />
      )}

      {/* Export Modal (when opened from navbar button) */}
      {isExportModalOpen && (
        <ExportModal
          records={records}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: toastMessage.type === 'success' ? '#0f172a' : '#0284c7',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 600,
            zIndex: 100,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 size={16} style={{ color: '#4ade80' }} />
          ) : (
            <AlertCircle size={16} style={{ color: '#bae6fd' }} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}

export default App;
