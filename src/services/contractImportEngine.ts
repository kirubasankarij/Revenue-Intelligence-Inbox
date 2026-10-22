import {
  RawBatchDelivery,
  RawRecordEnvelope,
  EnrichedRecord,
  CallPayload,
  MeetingPayload,
  SourceType,
  RouteCategory,
  ProcessingState,
  AnalysisFreshness,
  AuditLogEntry,
} from '../types';
import initialBatchRaw from '../../data/01_initial.json';
import updateBatchRaw from '../../data/02_update.json';
import { PREGENERATED_ANALYSES } from '../data/pregeneratedAnalysis';

const STORAGE_KEYS = {
  RECORDS: 'spendnest_revenue_records_v2',
  REPLAY_HISTORY: 'spendnest_replay_history_v2',
  LAST_BATCH: 'spendnest_last_batch_v2',
};

// Helper: Convert UTC timestamp to Asia/Kolkata display time and date
export function formatKolkataTime(isoString: string): { date: string; time: string; full: string } {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) {
      return { date: '2026-08-21', time: '12:00', full: '21 Aug 2026, 12:00 IST' };
    }
    // Asia/Kolkata is UTC+5:30
    const kolkataDate = new Date(d.getTime() + 5.5 * 3600000);
    const yyyy = kolkataDate.getUTCFullYear();
    const mm = String(kolkataDate.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(kolkataDate.getUTCDate()).padStart(2, '0');
    const hh = String(kolkataDate.getUTCHours()).padStart(2, '0');
    const min = String(kolkataDate.getUTCMinutes()).padStart(2, '0');

    return {
      date: `${yyyy}-${mm}-${dd}`,
      time: `${hh}:${min}`,
      full: `${dd} Aug ${yyyy}, ${hh}:${min} IST`,
    };
  } catch {
    return { date: '2026-08-21', time: '12:00', full: '21 Aug 2026, 12:00 IST' };
  }
}

// Build Enriched Record from raw envelope and existing state
export function enrichRawRecord(
  raw: RawRecordEnvelope,
  revision: number,
  existingRecord?: EnrichedRecord
): EnrichedRecord {
  const isCall = raw.source_type === 'call';
  const callPayload = isCall ? (raw.payload as CallPayload) : null;
  const meetingPayload = !isCall ? (raw.payload as MeetingPayload) : null;

  // Determine person & role (strictly distinguish rep from organizer per prompt!)
  let personName = 'Unknown';
  let personRole: 'Call Rep' | 'Meeting Organizer' = isCall ? 'Call Rep' : 'Meeting Organizer';

  if (isCall && callPayload) {
    personName = callPayload.rep_name || callPayload.rep_email || 'Unassigned Rep';
  } else if (meetingPayload) {
    personName = meetingPayload.organizer_email || 'Unassigned Organizer';
  }

  // Determine text presence
  let hasUsableText = false;
  let textWordCount = 0;

  if (isCall && callPayload?.transcript) {
    const trimmed = callPayload.transcript.trim();
    if (trimmed.length > 0) {
      hasUsableText = true;
      textWordCount = trimmed.split(/\s+/).length;
    }
  } else if (!isCall && raw.transcript_payload?.turns) {
    const turns = raw.transcript_payload.turns;
    if (turns.length > 0) {
      hasUsableText = true;
      textWordCount = turns.reduce((acc, t) => acc + (t.text ? t.text.split(/\s+/).length : 0), 0);
    }
  }

  // Timestamps
  const timestampIso = isCall
    ? callPayload?.started_at || '2026-08-21T12:00:00Z'
    : meetingPayload?.starts_at || '2026-08-21T12:00:00Z';
  const kolkata = formatKolkataTime(timestampIso);

  // Check pregenerated analysis metadata
  const meta = PREGENERATED_ANALYSES[raw.record_ref];

  // Title / Derived Account
  let displayTitle = '';
  let derivedAccount: string | null = null;

  if (isCall && callPayload) {
    derivedAccount = meta?.derivedAccount || `Call with ${callPayload.to_number || 'External Contact'}`;
    displayTitle = `Call (${callPayload.direction}): ${derivedAccount}`;
  } else if (meetingPayload) {
    displayTitle = meetingPayload.title || 'SpendNest Discussion';
    derivedAccount = meta?.derivedAccount || displayTitle.replace(/[\/\-].*$/, '').trim();
  }

  // Default suggested routes
  let suggestedRoutes: RouteCategory[] = [];
  let routeReason = 'Automated Intake';
  let urgencyLevel: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';

  if (meta) {
    suggestedRoutes = [...meta.suggestedRoutes];
    routeReason = meta.routeReason;
    urgencyLevel = meta.urgencyLevel;
  } else if (!hasUsableText) {
    if (isCall) {
      suggestedRoutes = ['Voicemail / Gatekeeper'];
      routeReason = 'Background call logged with no transcript supplied; connection false/unattended.';
      urgencyLevel = 'Low';
    } else {
      suggestedRoutes = ['Awaiting Transcript / Triage'];
      routeReason = 'Meeting captured or cancelled without usable transcript turns.';
      urgencyLevel = 'Low';
    }
  } else {
    suggestedRoutes = ['Deal Next Steps'];
    routeReason = 'Standard conversation intake awaiting review.';
    urgencyLevel = 'Medium';
  }

  // Processing state & Freshness
  let processingState: ProcessingState = hasUsableText ? 'Needs Review' : 'Awaiting Transcript';
  let analysisFreshness: AnalysisFreshness = hasUsableText
    ? (revision >= 2 ? 'Updated (v2)' : 'Initial (v1)')
    : 'No Usable Text';

  // Analysis object
  let analysisObj = null;
  if (meta) {
    if (revision >= 2 && meta.analysisV2) {
      analysisObj = meta.analysisV2;
      analysisFreshness = 'Updated (v2)';
      processingState = 'Needs Review';
    } else {
      analysisObj = meta.analysisV1;
      analysisFreshness = revision >= 2 ? 'Updated (v2)' : 'Initial (v1)';
    }
  }

  // CRITICAL CONTRACT RULE: Preserve manual route override if exists!
  let assignedRoutes = [...suggestedRoutes];
  let isManualOverride = false;
  let manualOverrideTimestamp = null;
  let manualOverrideComment = undefined;
  const history: AuditLogEntry[] = existingRecord ? [...existingRecord.history] : [];

  if (existingRecord && existingRecord.isManualOverride) {
    // PRESERVE JUDGMENT!
    assignedRoutes = [...existingRecord.assignedRoutes];
    isManualOverride = true;
    manualOverrideTimestamp = existingRecord.manualOverrideTimestamp;
    manualOverrideComment = existingRecord.manualOverrideComment;
    processingState = existingRecord.processingState; // Preserve manager review state

    history.push({
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor: 'Import Engine (Data Contract Rule #4)',
      action: 'Preserved Manual Route Override',
      details: `Incoming revision ${revision} updated payload, but preserved manual route [${assignedRoutes.join(', ')}].`,
    });
  } else {
    history.push({
      id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      actor: 'Import Engine',
      action: existingRecord ? `Updated to Revision ${revision}` : `Ingested Revision ${revision}`,
      details: hasUsableText 
        ? `Usable conversation text present (${textWordCount} words). Auto-routed to [${suggestedRoutes.join(', ')}].`
        : `Ingested metadata record (no usable text). State: ${processingState}.`,
    });
  }

  return {
    identityKey: `${raw.source_type}:${raw.source_id}`,
    source_type: raw.source_type,
    source_id: raw.source_id,
    record_ref: raw.record_ref,
    applied_revision: revision,
    payload: raw.payload,
    transcript_payload: raw.transcript_payload,
    hasUsableText,
    textWordCount,
    personName,
    personRole,
    localDate: kolkata.date,
    localTime: kolkata.time,
    displayTitle,
    derivedAccount,
    suggestedRoutes,
    assignedRoutes,
    routeReason,
    isManualOverride,
    manualOverrideTimestamp,
    manualOverrideComment,
    processingState,
    analysisFreshness,
    urgencyLevel,
    analysis: analysisObj,
    history,
  };
}

export interface IngestBatchResult {
  updatedRecords: EnrichedRecord[];
  batchId: string;
  revision: number;
  totalInPayload: number;
  appliedCount: number;
  ignoredCount: number; // older or equal revisions
  uniqueRecordCount: number;
  usableTranscriptCount: number;
  notes: string[];
}

// Ingest a batch strictly enforcing (source_type, source_id) and revision rules
export function ingestBatch(
  delivery: RawBatchDelivery,
  currentRecords: EnrichedRecord[]
): IngestBatchResult {
  const currentMap = new Map<string, EnrichedRecord>();
  currentRecords.forEach(r => currentMap.set(r.identityKey, r));

  let appliedCount = 0;
  let ignoredCount = 0;
  const notes: string[] = [];

  for (const raw of delivery.records) {
    const key = `${raw.source_type}:${raw.source_id}`;
    const existing = currentMap.get(key);

    if (existing) {
      // Contract Rule 2: Store last applied revision per record. Same or older revisions are IGNORED.
      if (delivery.revision <= existing.applied_revision) {
        ignoredCount++;
        notes.push(
          `Record ${raw.record_ref} (${key}) ignored: incoming revision ${delivery.revision} <= applied revision ${existing.applied_revision}.`
        );
        continue;
      }

      // Higher revision arrives! Replace source payload & transcript payload, but preserve manual override!
      const updated = enrichRawRecord(raw, delivery.revision, existing);
      currentMap.set(key, updated);
      appliedCount++;
      notes.push(
        `Record ${raw.record_ref} (${key}) upgraded from rev ${existing.applied_revision} -> rev ${delivery.revision}.`
      );
    } else {
      // New record
      const enriched = enrichRawRecord(raw, delivery.revision);
      currentMap.set(key, enriched);
      appliedCount++;
    }
  }

  const updatedRecords = Array.from(currentMap.values());
  const usableTranscriptCount = updatedRecords.filter(r => r.hasUsableText).length;

  return {
    updatedRecords,
    batchId: delivery.batch_id,
    revision: delivery.revision,
    totalInPayload: delivery.records.length,
    appliedCount,
    ignoredCount,
    uniqueRecordCount: updatedRecords.length,
    usableTranscriptCount,
    notes,
  };
}

// Storage helpers
export function loadStoredRecords(): EnrichedRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load records from localStorage', e);
  }
  // Default to final post-update state as recommended in ASSIGNMENT.md
  return getFinalDemoState();
}

export function saveStoredRecords(records: EnrichedRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save records to localStorage', e);
  }
}

// Reset data to Step 1 (Initial Import Only)
export function getInitialDemoState(): EnrichedRecord[] {
  const result = ingestBatch(initialBatchRaw as unknown as RawBatchDelivery, []);
  saveStoredRecords(result.updatedRecords);
  return result.updatedRecords;
}

// Get Final Demo State (Initial + Update batch applied, total 44 records, 18 with text)
export function getFinalDemoState(): EnrichedRecord[] {
  const step1 = ingestBatch(initialBatchRaw as unknown as RawBatchDelivery, []);
  const step2 = ingestBatch(updateBatchRaw as unknown as RawBatchDelivery, step1.updatedRecords);
  saveStoredRecords(step2.updatedRecords);
  return step2.updatedRecords;
}

// Apply manual override to a conversation's route
export function applyManualRouteOverride(
  records: EnrichedRecord[],
  sourceType: SourceType,
  sourceId: string,
  newRoutes: RouteCategory[],
  comment?: string
): EnrichedRecord[] {
  const key = `${sourceType}:${sourceId}`;
  return records.map(record => {
    if (record.identityKey === key) {
      const prevRoutes = record.assignedRoutes;
      const historyEntry: AuditLogEntry = {
        id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        actor: 'Sales Manager (Manual Route Override)',
        action: 'Manual Route Correction',
        details: comment || `Manager changed route from [${prevRoutes.join(', ')}] to [${newRoutes.join(', ')}].`,
        previousValue: prevRoutes.join(', '),
        newValue: newRoutes.join(', '),
      };

      return {
        ...record,
        assignedRoutes: newRoutes,
        isManualOverride: true,
        manualOverrideTimestamp: new Date().toISOString(),
        manualOverrideComment: comment,
        processingState: 'Reviewed',
        history: [...record.history, historyEntry],
      };
    }
    return record;
  });
}

// Replay Demonstration Steps
export function replayStep1_InitialImport(current: EnrichedRecord[]): IngestBatchResult {
  // Fresh import of initial batch
  return ingestBatch(initialBatchRaw as unknown as RawBatchDelivery, []);
}

export function replayStep2_RepeatInitialImportShuffled(current: EnrichedRecord[]): IngestBatchResult {
  // Shuffle records array to test order independence
  const rawData = JSON.parse(JSON.stringify(initialBatchRaw)) as RawBatchDelivery;
  rawData.records.sort(() => Math.random() - 0.5);
  return ingestBatch(rawData, current);
}

export function replayStep3_ManualCorrectionM07(current: EnrichedRecord[]): EnrichedRecord[] {
  // Manually override M07's route to e.g. ['Customer Support / Bugs', 'Sales Coaching']
  const m07 = current.find(r => r.record_ref === 'M07');
  if (!m07) return current;

  return applyManualRouteOverride(
    current,
    m07.source_type,
    m07.source_id,
    ['Customer Support / Bugs', 'Sales Coaching'],
    'Manager review override: Flagged for high-priority support escalation and rep coaching.'
  );
}

export function replayStep4_UpdateBatch(current: EnrichedRecord[]): IngestBatchResult {
  return ingestBatch(updateBatchRaw as unknown as RawBatchDelivery, current);
}
