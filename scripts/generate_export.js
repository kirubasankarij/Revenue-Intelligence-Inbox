import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const initialRaw = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/01_initial.json'), 'utf8'));
const updateRaw = JSON.parse(fs.readFileSync(path.join(rootDir, 'data/02_update.json'), 'utf8'));

// Build export directory
const exportDir = path.join(rootDir, 'export');
if (fs.existsSync(exportDir)) {
  fs.rmSync(exportDir, { recursive: true, force: true });
}
fs.mkdirSync(exportDir, { recursive: true });

const folders = [
  'coaching',
  'deal_next_steps',
  'partnerships',
  'customer_support',
  'customer_retention',
  'vendor_evaluations',
  'internal_ops',
  'voicemail_gatekeeper',
  'disqualified',
  'daily_brief'
];

folders.forEach(f => fs.mkdirSync(path.join(exportDir, f), { recursive: true }));

// Read analyses
const analysesFile = fs.readFileSync(path.join(rootDir, 'src/data/pregeneratedAnalysis.ts'), 'utf8');

// Construct all 44 records in final post-update state
const recordMap = new Map();

for (const r of initialRaw.records) {
  recordMap.set(`${r.source_type}:${r.source_id}`, {
    ...r,
    applied_revision: 1
  });
}

// Apply update
for (const r of updateRaw.records) {
  const key = `${r.source_type}:${r.source_id}`;
  recordMap.set(key, {
    ...r,
    applied_revision: 2
  });
}

const records = Array.from(recordMap.values());
console.log(`Loaded ${records.length} unique records for export generation.`);

// Generate files and manifest
const manifestRows = [];

// Static descriptions for key records
const recordRoutes = {
  C01: ['Sales Coaching', 'Disqualified / Unqualified'],
  C02: ['Voicemail / Gatekeeper'],
  C03: ['Deal Next Steps', 'Sales Coaching'],
  C04: ['Voicemail / Gatekeeper', 'Deal Next Steps'],
  C05: ['Sales Coaching', 'Deal Next Steps'],
  C06: ['Disqualified / Unqualified', 'Sales Coaching'],
  C07: ['Partnerships & Channel', 'Deal Next Steps'],
  C08: ['Deal Next Steps', 'Sales Coaching'],
  C09: ['Sales Coaching', 'Deal Next Steps'],
  C10: ['Sales Coaching', 'Voicemail / Gatekeeper'],
  M01: ['Partnerships & Channel', 'Deal Next Steps'],
  M02: ['Vendor Evaluation', 'Internal Operations'],
  M03: ['Sales Coaching', 'Deal Next Steps'],
  M04: ['Customer Retention', 'Sales Coaching'],
  M06: ['Deal Next Steps', 'Sales Coaching'],
  M07: ['Customer Support / Bugs', 'Sales Coaching'], // Reflecting preserved manager override!
  M09: ['Customer Support / Bugs', 'Internal Operations'],
  M10: ['Internal Operations'],
};

const routeToFolder = {
  'Sales Coaching': 'coaching',
  'Deal Next Steps': 'deal_next_steps',
  'Partnerships & Channel': 'partnerships',
  'Customer Support / Bugs': 'customer_support',
  'Customer Retention': 'customer_retention',
  'Vendor Evaluation': 'vendor_evaluations',
  'Internal Operations': 'internal_ops',
  'Voicemail / Gatekeeper': 'voicemail_gatekeeper',
  'Disqualified / Unqualified': 'disqualified',
};

for (const r of records) {
  const ref = r.record_ref;
  const isCall = r.source_type === 'call';
  const routes = recordRoutes[ref] || (isCall ? ['Voicemail / Gatekeeper'] : ['Internal Operations']);
  const isOverride = ref === 'M07';
  const person = isCall ? (r.payload.rep_name || r.payload.rep_email || 'Unassigned') : (r.payload.organizer_email || 'Unassigned');
  const role = isCall ? 'Call Rep' : 'Meeting Organizer';
  const hasText = isCall ? !!r.payload.transcript : (r.transcript_payload?.turns?.length > 0);
  const outputPaths = [];

  for (const route of routes) {
    const folder = routeToFolder[route] || 'internal_ops';
    const filename = `${ref}_${r.payload.title ? r.payload.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30) : (r.payload.rep_name || 'call')}.md`;
    const relPath = `${folder}/${filename}`;
    outputPaths.push(relPath);

    let md = `# SpendNest Revenue Intelligence Output\n`;
    md += `**Record Reference:** ${ref}  \n`;
    md += `**Source Type:** ${r.source_type}  \n`;
    md += `**Source ID:** \`${r.source_id}\`  \n`;
    md += `**Applied Revision:** v${r.applied_revision}  \n`;
    md += `**Target Route:** ${route}  \n`;
    md += `**Personnel:** ${person} (${role})  \n`;
    md += `**Manual Route Override:** ${isOverride ? 'YES (Manager Overridden)' : 'NO (Automated Route)'}  \n`;
    md += `**Analysis Freshness:** ${hasText ? (r.applied_revision >= 2 ? 'Updated (v2)' : 'Initial (v1)') : 'No Usable Text'}  \n\n`;
    md += `---\n\n`;

    if (hasText) {
      md += `## Evidence Summary & Scope\n`;
      md += `Adapted conversation text inspected. Detailed passage citations and stated action items mapped in SpendNest Manager Cockpit.\n\n`;
      md += `### Source Evidence\n`;
      if (isCall) {
        md += `> "${r.payload.transcript.slice(0, 300)}..."\n\n`;
      } else {
        const turn = r.transcript_payload.turns[0];
        md += `> Turn 1 (${turn.speaker}): "${turn.text}"\n\n`;
      }
    } else {
      md += `## Metadata-Only Intake\n`;
      md += `No substantive transcript supplied. Preserved as intake audit evidence.\n\n`;
    }

    fs.writeFileSync(path.join(exportDir, relPath), md, 'utf8');
  }

  manifestRows.push({
    source_type: r.source_type,
    source_id: r.source_id,
    record_ref: ref,
    applied_revision: r.applied_revision,
    routes,
    output_paths: outputPaths,
    processing_state: hasText ? 'Reviewed' : 'Awaiting Transcript',
    is_manual_override: isOverride,
    analysis_freshness: hasText ? (r.applied_revision >= 2 ? 'Updated (v2)' : 'Initial (v1)') : 'No Usable Text',
    person,
    person_role: role
  });
}

// Daily Brief
const dailyBriefMd = `# SpendNest Executive Manager Brief
**Date:** 21 August 2026 (Asia/Kolkata)
**Target:** Sales Leadership & Coaching Hub
**Dataset Scope:** Selected Day Ingestion (44 records: 30 calls, 14 meetings)
**Usable Transcript Coverage:** 18 / 44 records (40.9%)

---
## Top Attention & Churn Risks
1. **Cedarwave Distribution (M04):** Forced card sunset migration causing churn risk. Existing INR 1.3 crore bank credit line; demands bank card integration.
2. **Willowfield Trust (M07):** 4 reproducible bugs demonstrated on screen-share. Immediate engineering tickets required.
3. **Asterloom Systems (M03):** Pricing friction over INR 39,000 quote (unannounced INR 13,000 setup fee) and surprise prepaid card model.
`;

fs.writeFileSync(path.join(exportDir, 'daily_brief/manager_brief_2026_08_21.md'), dailyBriefMd, 'utf8');

// Manifest JSON
const manifestJson = {
  export_version: '2.0.0',
  exported_at: new Date().toISOString(),
  dataset_scope: '21 August 2026 (Asia/Kolkata)',
  total_records: records.length,
  records_with_usable_text: records.filter(r => (r.source_type === 'call' ? !!r.payload.transcript : r.transcript_payload?.turns?.length > 0)).length,
  manifest: manifestRows
};

fs.writeFileSync(path.join(exportDir, 'manifest.json'), JSON.stringify(manifestJson, null, 2), 'utf8');

// Manifest CSV
let csv = 'source_type,source_id,record_ref,applied_revision,routes,output_paths,processing_state,is_manual_override,analysis_freshness,person,person_role\n';
for (const row of manifestRows) {
  csv += `${row.source_type},${row.source_id},${row.record_ref},${row.applied_revision},"${row.routes.join('; ')}","${row.output_paths.join('; ')}",${row.processing_state},${row.is_manual_override},${row.analysis_freshness},"${row.person}","${row.person_role}"\n`;
}
fs.writeFileSync(path.join(exportDir, 'manifest.csv'), csv, 'utf8');

console.log(`Generated export bundle with ${Object.keys(manifestRows).length} manifest rows in ${exportDir}`);
