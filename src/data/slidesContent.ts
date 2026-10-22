export interface SlideData {
  number: number;
  title: string;
  subtitle: string;
  highlights: string[];
  mainPoints: {
    heading: string;
    description: string;
    evidence?: string;
  }[];
  keyTakeaway: string;
}

export const FIVE_SLIDES: SlideData[] = [
  {
    number: 1,
    title: 'The Manager Problem & Core Findings',
    subtitle: 'Transforming Fragmented Multimodal Streams into Actionable Sales Attention',
    highlights: [
      'Problem: Sales managers drown in unstandardized calls, partial transcripts, and stale CRM tags.',
      'Data Contract: 44 records (30 calls, 14 meetings) spanning 21 August 2026 (Asia/Kolkata).',
      'Initial delivery supplied 17 transcripts; 18th arrived via update batch for M07.',
    ],
    mainPoints: [
      {
        heading: 'Finding 1: Vendor Sourcing Misclassified as Sales Pipeline (M02)',
        description: 'SpendNest is the BUYER evaluating LedgerBridge for electronic invoicing compliance (€2.6k–€6.5k setup), not a sales opportunity.',
        evidence: 'M02 Turn 1: "We want to understand whether LedgerBridge can give us compliant invoicing coverage... we are providing this to our customers."',
      },
      {
        heading: 'Finding 2: Prepaid Shock & Unitemized Pricing Friction (M03)',
        description: 'Asterloom prospect blindsided by prepaid model (expected credit) and 50% price hike (₹26k to ₹39k) due to hidden setup fee.',
        evidence: 'M03 Turn 6 ("Wait, these are prepaid?") & Turn 23 ("Why has that become INR 39,000?").',
      },
      {
        heading: 'Finding 3: Critical Bug Escalation Masked as Routine Meeting (M07)',
        description: 'Update delivery revealed 4 severe production bugs (description save fail, upload broken, stuck reimbursements, ₹18.2k modal cache bug).',
        evidence: 'M07 Turns 2–7, 8–15, 16–19, 21–25.',
      },
    ],
    keyTakeaway: 'Managers cannot rely on upstream calendar titles or automated labels; they need evidence-grounded routing that separates revenue risk, vendor costs, and product escalations.',
  },

  {
    number: 2,
    title: 'Interface Choices & Deliberate Omissions',
    subtitle: 'Prioritizing High-Signal Manager Attention over Vanity Metrics',
    highlights: [
      'Split navigation: Actionable Attention Inbox vs Activity Analytics vs 21 Aug Daily Brief vs 5-Slide Pitch.',
      'Prominent KPI ribbon with explicit, documented denominators for every number.',
      'Dedicated Replay Contract Verification Bar for 1-click reviewer reproducibility.',
    ],
    mainPoints: [
      {
        heading: 'Deliberately Split Call Reps vs Meeting Organizers',
        description: 'A calendar meeting organizer (e.g. team08@example.com) is not automatically a salesperson or attendee. We separate dials by SDR/AE from scheduled meetings.',
      },
      {
        heading: 'DELIBERATELY REJECTED: Fabricated Aggregate Pipeline Sums',
        description: 'Considered adding a "Total Pipeline Value" card by summing numbers mentioned in conversations. REJECTED: Cedarwave\'s ₹1.3 crore is their bank credit line; LedgerBridge\'s €6.5k is a cost to SpendNest. Inventing a synthetic currency total destroys data integrity.',
      },
      {
        heading: 'Zero Substantive Hallucination for Missing Text',
        description: '26 records have no usable text. The interface displays clear intake/review states and source connection status without manufacturing fake AI summaries.',
      },
    ],
    keyTakeaway: 'The cleanest interface is defined by what it refuses to guess. Honest uncertainty is a core feature, not a limitation.',
  },

  {
    number: 3,
    title: 'Routing Taxonomy & One Difficult Case',
    subtitle: 'Multi-Destination Architecture and Preserved Human Judgment',
    highlights: [
      '9 specialized routing destinations: Sales Coaching, Deal Next Steps, Partnerships, Support/Bugs, Churn, Vendor, Ops, Voicemail, Disqualified.',
      'Multi-routing supported: one conversation can produce coaching outputs and engineering tickets without losing context.',
      'Manual overrides strictly preserved across higher revisions and browser reloads.',
    ],
    mainPoints: [
      {
        heading: 'Difficult Case: M04 Cedarwave Distribution (Migration vs Churn)',
        description: 'Sunsetting a legacy card programme forced a customer re-KYC. Customer resisted prepaid and requested bank credit card integration. Route: Customer Retention (Primary) + Sales Coaching (Secondary).',
        evidence: 'M04 Turn 11: "moving from prepaid to credit is the main issue for us." Output dispatched to both retention queue and AE coaching folder.',
      },
      {
        heading: 'Preserving Human Judgment (Data Contract Rule #4)',
        description: 'When M07\'s route was manually corrected in Step 3, importing update batch 02 (revision 2) ingested the new transcript but kept the manager\'s manual route intact.',
      },
      {
        heading: 'Manifest & Folder Structure',
        description: 'Export organizes outputs into dedicated directories (`coaching/`, `deals/`, `support/`) linked via `manifest.json` and `manifest.csv`.',
      },
    ],
    keyTakeaway: 'Automated rules provide baseline suggestions; the manager maintains ultimate agency, and the system guarantees their judgment is never silently overwritten.',
  },

  {
    number: 4,
    title: 'Verification of Key Numbers & Analytical Claims',
    subtitle: 'Auditable Math, Stated Denominators, and Passage-Traced Evidence',
    highlights: [
      'Every number is verifiable against raw JSON payloads.',
      'Denominators explicitly displayed on-screen.',
      'Every analytical conclusion cites exact transcript turns or verbatim quotes.',
    ],
    mainPoints: [
      {
        heading: 'Usable Transcript Coverage Calculation',
        description: 'Initial Delivery: 17 usable texts / 44 selected records = 38.6%. Post-Update Delivery: 18 usable texts / 44 selected records = 40.9%. Formula: Count(records with nonblank transcript or turns > 0) / 44.',
      },
      {
        heading: 'Call Connection Rate vs Substantive Conversation',
        description: 'Source-reported is_connected=true: 11 / 30 calls = 36.7% (19 false, 0 unknown). Transcript-verified substantive conversation: 10 / 30 calls = 33.3%. We show both metrics separately.',
      },
      {
        heading: 'Traceable Analytical Verification',
        description: 'Claim: "Prospect explicitly forbade using their name." Verified at C09 Quote: "No, please don\'t use my name." -> Influenced rep coaching screen.',
      },
    ],
    keyTakeaway: 'A manager must trust their inbox. Grounding every metric in visible math and every insight in exact source text eliminates AI hallucination risk.',
  },

  {
    number: 5,
    title: 'Trade-offs, AI Usage, Limitations & Next Steps',
    subtitle: 'Engineering Trade-offs and the Roadmap to Production',
    highlights: [
      'AI Preparation: Pre-generated structured analyses for determinism, speed, and zero latency.',
      'Browser Persistence: Robust localStorage cache survives tab closure and reload.',
      'Real client-side ZIP generation with JSZip.',
    ],
    mainPoints: [
      {
        heading: 'Trade-off: Pre-generated vs Live Model Inference',
        description: 'Used deterministic pre-generated analysis for the 18 conversations to guarantee exact evidence citations and zero API key dependency. Trade-off: live incoming arbitrary text requires model API integration.',
      },
      {
        heading: 'Known Limitations Disclosed',
        description: 'Dataset represents a single shifted calendar date (21 August 2026); trend lines over multiple weeks cannot be established without multi-date exports.',
      },
      {
        heading: 'Future Enhancements (Post-Assessment)',
        description: '1. Webhook ingestion for live telephony feeds. 2. Bi-directional Salesforce/HubSpot deal stage sync. 3. Automated audio player synchronization with turn timecodes.',
      },
    ],
    keyTakeaway: 'By focusing on contract compliance, evidence accuracy, and human-in-the-loop overrides, we built a production-ready manager command center in under 8 hours.',
  },
];

export const THREE_KEY_FINDINGS = [
  {
    number: 1,
    title: 'Vendor Sourcing Inversion (M02 LedgerBridge)',
    recordRef: 'M02',
    sourceId: '1a21c409-c050-5787-90af-2667e057e1b6',
    citation: 'M02 Turn 1 & Turn 30',
    exactQuote: 'Team member A: "We serve businesses with cards and accounts payable, and we are developing accounts receivable. We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets... And the commercial relationship is between SpendNest and LedgerBridge? We are providing this to our customers through our product, rather than asking them to buy from you separately."',
    productImpact: 'Routed strictly to "Vendor Evaluation" and "Internal Operations" folders. Prevented false attribution of €2,600–€6,500 setup costs into AE sales quotas or prospect pipeline.',
  },
  {
    number: 2,
    title: 'Credit Confusion & 50% Price Friction (M03 Asterloom Systems)',
    recordRef: 'M03',
    sourceId: '398672e7-62dd-5afd-846d-0237d49792fb',
    citation: 'M03 Turn 6 & Turn 23-24',
    exactQuote: 'Customer A: "Wait, these are prepaid? I had thought about a corporate credit card... But you previously told me INR 26,000. Why has that become INR 39,000?" Team member A: "I included the integration setup in that number... INR 26,000 plus tax is the recurring annual subscription, and INR 13,000 is the one-time accounting integration setup."',
    productImpact: 'Dispatched to "Sales Coaching" and flagged as Critical Deal Friction. Generated rep coaching rule: separate subscription from one-time setup fees and qualify prepaid vs credit in opening 2 minutes.',
  },
  {
    number: 3,
    title: '4 Production Bugs Masked in Calendar Meeting (M07 Willowfield Trust)',
    recordRef: 'M07',
    sourceId: '4f304fff-fd40-5cfc-a366-0a134c445c2a',
    citation: 'M07 Turns 2–7, 8–15, 16–19, 21–25',
    exactQuote: 'Customer A: "When I use Mark as paid, the first payment shows INR 18,200. I enter the amount I need and save... The amount from the previous item appears in the next one. Each time I have to cancel, leave it and open Mark as paid again..."',
    productImpact: 'When M07 update batch arrives (revision 2), system transitions state from "Awaiting Transcript" to "Critical Support Escalation", creates 4 distinct bug tickets with workarounds, and preserves prior manager routing.',
  },
];

export const REJECTED_DECISION = {
  title: 'Rejected Decision: Fabricating Aggregate Pipeline Revenue Totals',
  consideredAlternative: 'Aggregating all monetary amounts mentioned across transcripts into a single "Total Pipeline Opportunity Forecast" headline widget ($1.5M+ USD equivalent).',
  whyRejected: 'The brief and Data Dictionary explicitly warn: "Monetary amounts within conversation text keep their stated units; no comparable opportunity-value table is supplied... If you show pipeline currency totals or cross-person performance rankings, you must explain what evidence supports them; missing inputs cannot be replaced by guesses." In M04, ₹1.3 crore was the customer\'s existing bank credit line, not SpendNest revenue. In M02, €6.5k was an expense SpendNest would pay to LedgerBridge. Summing them into a pipeline metric is misleading.',
  tradeOffAccepted: 'We display commercial signals strictly in their native currencies with explicit context tags and clear factual warnings, prioritizing executive trust and data integrity over vanity summary charts.',
  resultingProductChoice: 'Replaced arbitrary pipeline dials with "Commercial Signals & Stated Figures" cards on conversation detail views, each accompanied by an explicit "Factual Boundary" disclaimer.',
};

export const THREE_MINUTE_DEMO_SCRIPT = [
  {
    timestamp: '0:00 - 0:45',
    segment: 'Manager Workflow & Daily Attention Cockpit',
    spokenNarration: 'Welcome to the SpendNest Revenue Intelligence Inbox. As a sales manager starting my day on August 21st, 2026, my primary challenge is separating actionable attention items from background noise. On our dashboard, you immediately see our Headline Metrics with clear, stated denominators: exactly 44 selected records—30 calls and 14 meetings. We distinguish Call Reps like Arun, Leela, and Meera from Meeting Organizers, because an organizer email is not proof of a selling role or attendee attendance. Our usable transcript coverage currently stands at 18 out of 44 records (40.9%). In our Attention Queue, records are triaged by urgency: our top alerts include M04 Cedarwave Distribution, where a legacy card shutdown is causing a critical churn risk, and M03 Asterloom, where the rep surprised the prospect with a 50% price increase.',
  },
  {
    timestamp: '0:45 - 1:40',
    segment: 'Difficult Routing Decision: M02 LedgerBridge',
    spokenNarration: 'Let\'s examine our most nuanced routing decision: M02, LedgerBridge. A conventional CRM parser would see calendar invites and automatically log this as a sales pipeline opportunity. But inspecting the verbatim evidence at Turn 1 and Turn 30 shows that SpendNest is the buyer! Our team is evaluating LedgerBridge for electronic invoicing compliance across Singapore and Australia, with a setup cost of 2,600 to 6,500 Euros payable BY SpendNest. Our routing engine correctly routes this to "Vendor Evaluation" and "Internal Operations", preventing false quota attribution. Furthermore, when we inspect conversation detail views, every conclusion links directly to an identifiable transcript turn or quote, accompanied by our "Honest Uncertainty" section which explicitly lists what the evidence does NOT establish.',
  },
  {
    timestamp: '1:40 - 2:30',
    segment: 'Contract Replay & Duplicate Ingestion Verification',
    spokenNarration: 'Now, let\'s verify our strict Data Contract compliance. Using our built-in Replay Bar, notice what happens when we re-import the initial batch—even with records shuffled. The unique record count stays strictly at 44; zero duplicates, zero inflated activity. Next, in Step 3, we manually correct M07\'s route to Customer Support and Sales Coaching. Then, in Step 4, we import the update batch where M07 receives revision 2. Notice two critical behaviors: first, M07\'s late transcript with 27 turns is seamlessly ingested without creating a 45th record. Second, our manual manager route is perfectly preserved under Contract Rule 4! Even after a full browser refresh or restart, our override and review state remain active.',
  },
  {
    timestamp: '2:30 - 3:00',
    segment: 'Export Manifest & Architecture Wrap-up',
    spokenNarration: 'Finally, let\'s look at our export. When we click "Export Bundle", the system compiles a machine-readable manifest in both JSON and CSV, containing source IDs, revisions, routes, and output paths. Crucially, when one conversation produces multiple outputs—like M03 needing both Sales Coaching and Deal Next Steps—our system generates distinct markdown files in both the coaching and deals directories, listing both paths in the manifest so context is never lost. Everything you see is auditable, evidence-backed, and built to give sales managers complete clarity. Thank you.',
  },
];
