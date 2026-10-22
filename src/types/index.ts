// ============================================================================
// SPENDNEST REVENUE INTELLIGENCE INBOX - TYPE SYSTEM
// Strictly adhering to DATA_CONTRACT.md and DATA_DICTIONARY.md specifications
// ============================================================================

export type SourceType = 'call' | 'meeting';

export interface CallPayload {
  id: string;
  external_call_id: string;
  workspace_slug: string;
  rep_email: string | null;
  rep_name: string | null;
  rep_user_id: string | null;
  direction: string;
  direction_raw: string;
  from_number: string | null;
  to_number: string | null;
  started_at: string;
  duration_seconds: number;
  talk_time_seconds: number | null;
  speaker_count: number | null;
  segment_count: number | null;
  is_connected: boolean | null;
  is_conversation: boolean | null;
  observed_outcome: string | null;
  classification_reason: string | null;
  classification_status: string | null;
  is_campaign_call: boolean | null;
  first_dial_ever: boolean | null;
  first_connect_ever: boolean | null;
  prior_dials_ever: number | null;
  prior_connects_ever: number | null;
  summary: string | null;
  summary_status: string | null;
  transcript: string | null;
}

export interface MeetingTurn {
  speaker: string;
  starts_at_seconds: number;
  timecode: string;
  text: string;
}

export interface MeetingTranscriptPayload {
  meeting_id: string;
  turns: MeetingTurn[];
  unavailable_reason: string | null;
}

export interface MeetingPayload {
  id: string;
  title: string;
  starts_at: string;
  ends_at: string;
  duration_seconds: number;
  provider: string;
  join_url: string;
  organizer_email: string | null;
  attendee_count: number | null;
  recording_status: string;
  recording_detail: string | null;
  recording_id: string | null;
  has_transcript: boolean;
  has_video: boolean;
  summary: string | null;
  summary_status: string | null;
  redacted: boolean;
}

export interface RawRecordEnvelope {
  record_ref: string;
  source_type: SourceType;
  source_id: string;
  payload: CallPayload | MeetingPayload;
  transcript_payload: MeetingTranscriptPayload | null;
}

export interface RawBatchDelivery {
  batch_id: string;
  revision: number;
  exported_at: string;
  records: RawRecordEnvelope[];
}

// ----------------------------------------------------------------------------
// Routing Taxonomy & Categories
// ----------------------------------------------------------------------------
export type RouteCategory = 
  | 'Sales Coaching'
  | 'Deal Next Steps'
  | 'Partnerships & Channel'
  | 'Customer Support / Bugs'
  | 'Customer Retention'
  | 'Vendor Evaluation'
  | 'Internal Operations'
  | 'Voicemail / Gatekeeper'
  | 'Disqualified / Unqualified'
  | 'Awaiting Transcript / Triage';

export type ProcessingState = 
  | 'Awaiting Transcript'
  | 'Needs Review'
  | 'Reviewed'
  | 'Escalated'
  | 'Archived';

export type AnalysisFreshness = 
  | 'Initial (v1)'
  | 'Updated (v2)'
  | 'Pending Review'
  | 'No Usable Text';

export interface EvidenceCitation {
  citation: string; // e.g. "M03 Turn 6" or 'C01: "We have a fairly advanced setup..."'
  quote: string;
  speaker?: string;
  significance: string;
}

export interface StatedNextStep {
  task: string;
  owner: string;
  isExplicitlyStated: boolean;
  deadline?: string;
}

export interface ConversationAnalysis {
  headline: string;
  whatHappened: string;
  whyItMatters: string;
  supportingCitations: EvidenceCitation[];
  whatEvidenceDoesNotEstablish: string[]; // Strict honest uncertainty requirement!
  statedNextSteps: StatedNextStep[];
  coachingNotes?: string;
  commercialSignals?: {
    currenciesMentioned: string[];
    statedProducts: string[];
    statedBudgetOrSpend?: string;
    caution: string; // Explains why this is not confirmed pipeline
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  previousValue?: string;
  newValue?: string;
}

// ----------------------------------------------------------------------------
// Unified Enriched Record Representation
// ----------------------------------------------------------------------------
export interface EnrichedRecord {
  // Identity pair strictly per DATA_CONTRACT.md
  identityKey: string; // format: `${source_type}:${source_id}`
  source_type: SourceType;
  source_id: string;
  record_ref: string;
  applied_revision: number;

  // VERBATIM Source payloads
  payload: CallPayload | MeetingPayload;
  transcript_payload: MeetingTranscriptPayload | null;

  // Derived Properties
  hasUsableText: boolean;
  textWordCount: number;
  personName: string; // Rep name for calls, organizer for meetings
  personRole: 'Call Rep' | 'Meeting Organizer';
  localDate: string; // "2026-08-21" Asia/Kolkata
  localTime: string; // "HH:mm" Asia/Kolkata
  displayTitle: string;
  derivedAccount: string | null;

  // Routing & Review State
  suggestedRoutes: RouteCategory[];
  assignedRoutes: RouteCategory[];
  routeReason: string;
  isManualOverride: boolean;
  manualOverrideTimestamp: string | null;
  manualOverrideComment?: string;
  processingState: ProcessingState;
  analysisFreshness: AnalysisFreshness;
  urgencyLevel: 'Critical' | 'High' | 'Medium' | 'Low';

  // Analysis & Evidence
  analysis: ConversationAnalysis | null;
  history: AuditLogEntry[];
}

// ----------------------------------------------------------------------------
// Manager Dashboard Filters
// ----------------------------------------------------------------------------
export interface DashboardFilterState {
  searchQuery: string;
  sourceType: 'all' | 'call' | 'meeting';
  personFilter: 'all' | string; // Rep email/name or organizer email
  routeFilter: 'all' | RouteCategory;
  hasTextFilter: 'all' | 'has_text' | 'no_text';
  processingStateFilter: 'all' | ProcessingState;
  urgencyFilter: 'all' | 'Critical' | 'High' | 'Medium' | 'Low';
  sortBy: 'urgency' | 'time' | 'ref' | 'wordCount';
  sortOrder: 'asc' | 'desc';
}

// ----------------------------------------------------------------------------
// Replay Verification Suite States
// ----------------------------------------------------------------------------
export interface ReplayStepStatus {
  step: 1 | 2 | 3 | 4 | 5;
  title: string;
  description: string;
  completed: boolean;
  timestamp?: string;
  details?: string;
}
