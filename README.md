# SpendNest Revenue Intelligence Inbox
**Sales Manager Attention & Coaching Hub**  
*Assessment Delivery Scope: 21 August 2026 (Asia/Kolkata)*

[![Live Deployment](https://img.shields.io/badge/Live%20Demo-revenue--intelligence--inbox.onrender.com-0284c7?style=for-the-badge&logo=render&logoColor=white)](https://revenue-intelligence-inbox.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-kirubasankarij%2FRevenue--Intelligence--Inbox-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kirubasankarij/Revenue-Intelligence-Inbox)
[![Contract Compliance](https://img.shields.io/badge/Data%20Contract-100%25%20Verified-16a34a?style=for-the-badge&logo=checkmarx&logoColor=white)](https://revenue-intelligence-inbox.onrender.com)

---

## 🌐 Quick Access Links

* 🚀 **Production Application:** [https://revenue-intelligence-inbox.onrender.com](https://revenue-intelligence-inbox.onrender.com)
* 💻 **Source Code Repository:** [https://github.com/kirubasankarij/Revenue-Intelligence-Inbox](https://github.com/kirubasankarij/Revenue-Intelligence-Inbox)
* 📦 **Export Directory:** [`export/`](export/) (includes `manifest.json`, `manifest.csv`, and organized folders)

---

## 1. Quick Start & Local Execution

```bash
# 1. Clone repository
git clone https://github.com/kirubasankarij/Revenue-Intelligence-Inbox.git
cd Revenue-Intelligence-Inbox

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# -> Opens http://localhost:5173/

# 4. Or build and test production bundle
npm run build
npm run preview
```

The application opens by default in the **final post-update state** (44 unique records, 18 transcripts covered) as recommended by the assessment brief.

---

## 2. Reproducing the Data Contract & Replay Checks

The application features an interactive **DATA CONTRACT REPLAY SUITE** banner permanently docked at the top of the workspace. You can execute each verification step with one click or sequentially:

| Step | Action | Expected & Verified Behaviour |
|---|---|---|
| **Step 1: Initial Import** | Click **"Execute Step 1"** (or *Reset (Step 1)*) | Ingests `data/01_initial.json`. Exactly **44 unique records** (30 calls, 14 meetings). Usable transcript coverage: **17 / 44** (38.6%). All records on revision 1. |
| **Step 2: Repeat Duplicate Check** | Click **"Execute Step 2"** | Re-imports `01_initial.json` with records shuffled. Contract Rule #2 triggers: **44 records ignored** because incoming rev 1 ≤ applied rev 1. Unique record count remains strictly **44** (0 duplicates created). |
| **Step 3: Manual Route Correction** | Click **"Execute Step 3 (M07)"** | Manually re-routes M07 (`4f304fff-fd40-5cfc-a366-0a134c445c2a`) to `[Customer Support / Bugs, Sales Coaching]`. A manager audit entry is logged and the record is badged with `[MANUAL OVERRIDE]`. |
| **Step 4: Update Delivery Batch** | Click **"Execute Step 4"** | Ingests `data/02_update.json`. Record M07 is upgraded from rev 1 to rev 2. Its late transcript (**27 turns**) is ingested without creating a 45th record. Usable transcript coverage increases to **18 / 44** (40.9%). |
| **Step 5: Preserved Judgment** | Click **"Verify Preservation"** (or refresh browser) | **Data Contract Rule #4 Verified:** M07's manual route `[Customer Support / Bugs, Sales Coaching]` survives rev 2 ingestion and page refresh intact. New transcript turns and 4-bug engineering escalation analysis remain inspectable. |

*You can also click **"Verify All 5 Replay Steps"** in the top bar to run the complete automated test suite in 1 second.*

---

## 3. Metric Definitions & Clear Denominators

Every headline metric displays its exact mathematical denominator:

1. **Selected-Record Activity (44 Records):**
   * **Scope:** 30 calls + 14 meetings.
   * **Timezone:** All timestamps fall on **21 August 2026** in **Asia/Kolkata (IST)**.
   * **Distinction:** Distinguishes **Call Reps** (5 callers: Arun: 15, Leela: 8, Meera: 5, Kiran: 1, Dev: 1) from **Meeting Organizers** (`team06` to `team14`, `arun@example.com`). An organizer email is a calendar booking token; it is not proof of attendance or a selling role.

2. **Usable Supplied Transcript Coverage (18 / 44 = 40.9% Post-Update):**
   * **Definition:** Nonblank call transcript or at least 1 nonblank meeting turn ÷ total records in filter scope (44).
   * **Initial State:** 17 / 44 (38.6%).
   * **Post-Update State:** 18 / 44 (40.9%).
   * **Silent Records:** Remaining 26 records are preserved as intake/metadata evidence with zero fabricated analysis.

3. **Source-Reported Call Connection Rate (11 / 30 = 36.7%):**
   * **Formula:** Calls with `is_connected === true` ÷ calls with non-null `is_connected` (30).
   * **Denominator:** 30 calls (11 connected, 19 false, 0 unknown).
   * **Contrast:** Stored connection metric (11/30 = 36.7%) vs Transcript-verified substantive conversation (10/30 = 33.3%).

4. **Active Route Assignments (Exceeds Unique Record Count):**
   * Labelled route assignments exceed the unique record count because high-impact conversations (such as M03, M04, and M07) are assigned to multiple functional destinations (e.g. Sales Coaching + Customer Retention) so no context is lost.

---

## 4. Export & Manifest Structure

Generated outputs are organised into a functional folder tree in `export/` and available via one-click client-side ZIP download:

```
export/
├── manifest.json              # Machine-readable JSON manifest
├── manifest.csv               # Machine-readable CSV manifest
├── coaching/                  # Sales Coaching markdown outputs (C01, C05, C09, C10, M03, M04...)
├── deal_next_steps/           # Deal Next Steps markdown outputs (C03, C07, C08, M01, M03, M06...)
├── partnerships/              # Channel & Referral Agreements (M01, C07...)
├── customer_support/          # Bug & Ticket Escalations (M07, M09...)
├── customer_retention/        # Churn Alerts & Migration Issues (M04...)
├── vendor_evaluations/        # Inbound Vendor/Supplier Evaluations (M02...)
├── internal_ops/              # Internal Training & Operational Notes (M10, M02...)
├── voicemail_gatekeeper/      # Gatekeeper & Voicemail touchpoints (C02, C04...)
├── disqualified/              # Unqualified accounts (C01, C06...)
└── daily_brief/
    └── manager_brief_2026_08_21.md   # Complete 21 August 2026 Executive Brief
```

**Manifest Schema:**
Includes `source_type`, `source_id`, `record_ref`, `applied_revision`, `routes`, `output_paths`, `processing_state`, `is_manual_override`, `analysis_freshness`, `person`, and `person_role`.

---

## 5. Three Most Important Findings

### Finding 1: Vendor Sourcing Inversion (M02 LedgerBridge)
* **Observation:** Standard CRMs automatically classify external meetings as sales pipeline. In M02 (`1a21c409-c050-5787-90af-2667e057e1b6`), SpendNest is the **BUYER** evaluating LedgerBridge for electronic invoicing compliance across SG, AU, and IN (€2,600–€6,500 setup).
* **Exact Passage:** M02 Turn 1: *"We serve businesses with cards and accounts payable, and we are developing accounts receivable. We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets."* And Turn 30: *"And the commercial relationship is between SpendNest and LedgerBridge? We are providing this to our customers through our product, rather than asking them to buy from you separately."*
* **Product Impact:** Routed to **Vendor Evaluation** and **Internal Operations**. Prevented false attribution of €2,600–€6,500 setup costs into AE sales quotas or prospect pipeline.

### Finding 2: Prepaid Shock & 50% Price Friction (M03 Asterloom Systems)
* **Observation:** Prospect (~65 employees) was blindsided by the domestic card prepaid model (they expected corporate credit) and experienced severe pricing friction when the rep quoted ₹39,000 without explaining it bundled an unannounced ₹13,000 setup fee over the ₹26,000 annual subscription.
* **Exact Passage:** M03 Turn 6: *"Wait, these are prepaid? I had thought about a corporate credit card... But you previously told me INR 26,000. Why has that become INR 39,000? I included the integration setup in that number... INR 26,000 plus tax is the recurring annual subscription, and INR 13,000 is the one-time accounting integration setup."*
* **Product Impact:** Dispatched to **Sales Coaching** and **Deal Next Steps**. Established coaching protocol: rep must separate recurring SaaS from one-time onboarding fees and address credit vs prepaid in the first 2 minutes.

### Finding 3: Four Production Bugs Masked in Calendar Meeting (M07 Willowfield Trust)
* **Observation:** Revision 2 of M07 (`4f304fff-fd40-5cfc-a366-0a134c445c2a`) revealed 4 severe production defects reproduced on screen-share: (1) Event-payment description edit fails to save. (2) Recreate payment upload fails; workaround via invoice inbox. (3) Reimbursement payments stuck in "Processing" state cannot be selected. (4) "Mark as paid" form modal retains previous payment amount (₹18,200) onto subsequent items.
* **Exact Passage:** M07 Turn 21-22: *"When I use Mark as paid, the first payment shows INR 18,200. I enter the amount I need and save that payment. Then I open the next payment and choose Mark as paid again. The amount from the previous item appears in the next one. Each time I have to cancel, leave it and open Mark as paid again before it shows the right information."*
* **Product Impact:** When M07 update arrives, state transitions from "Awaiting Transcript" to "Critical Support Escalation", creates 4 distinct bug tickets with workarounds, and preserves prior manager routing under Contract Rule #4.

---

## 6. One Deliberately Rejected Decision

* **Alternative Considered:** Aggregating all monetary amounts mentioned across conversation transcripts into a single headline "Total Pipeline Forecast" widget ($1.5M+ USD equivalent).
* **Why Rejected:** The brief and Data Dictionary explicitly warn: *"Monetary amounts within conversation text keep their stated units; no comparable opportunity-value table is supplied... If you show pipeline currency totals or cross-person performance rankings, you must explain what evidence supports them; missing inputs cannot be replaced by guesses."* In M04, ₹1.3 crore was the customer's *existing bank credit line*, not SpendNest revenue. In M02, €6,500 was a *cost SpendNest would pay* to LedgerBridge. Summing them into a pipeline number is misleading and destroys executive trust.
* **Trade-Off Accepted:** We present commercial signals strictly in their native currencies with explicit context tags and clear factual warnings, prioritizing data integrity over vanity summary charts.
* **Resulting Product Choice:** Replaced arbitrary pipeline dials with "Commercial Signals & Stated Figures" cards on conversation detail views, each accompanied by an explicit "Factual Boundary" disclaimer.

---

## 7. AI & Implementation Choices

* **Pre-Generated Analysis:** The 18 conversation analyses and 26 metadata intake profiles were pre-generated with structured AI assistance to guarantee deterministic evidence citations, zero latency, and zero dependency on paid API keys during grading.
* **Dynamic Client-Side Computation:** The application dynamically calculates all metric denominators, executes the revision ordering and duplicate filtering, manages manual overrides in `localStorage`, generates the export bundle, and packages ZIP downloads.
* **Approximate Time Spent:** ~7 hours.
* **Known Limitations:**
  - The extract represents a single date (21 August 2026); multi-week cohort trends cannot be derived without historical data.
  - No authoritative CRM opportunity stage directory was supplied, so opportunity stages are reported as conversational signals rather than verified CRM states.

---

## 8. Three-Minute Screen Recording Narration Script

Use this structured script when recording your 3-minute continuous demonstration:

| Timestamp | Segment | Spoken Narration Script |
|---|---|---|
| **0:00 - 0:45** | **Manager Workflow & Daily Attention Cockpit** | *"Welcome to the SpendNest Revenue Intelligence Inbox. As a sales manager starting my day on August 21st, 2026, my primary challenge is separating actionable attention items from background noise. On our dashboard, you immediately see our Headline Metrics with clear, stated denominators: exactly 44 selected records—30 calls and 14 meetings. We distinguish Call Reps like Arun, Leela, and Meera from Meeting Organizers, because an organizer email is not proof of a selling role or attendee attendance. Our usable transcript coverage currently stands at 18 out of 44 records (40.9%). In our Attention Queue, records are triaged by urgency: our top alerts include M04 Cedarwave Distribution, where a legacy card shutdown is causing a critical churn risk, and M03 Asterloom, where the rep surprised the prospect with a 50% price increase."* |
| **0:45 - 1:40** | **Difficult Routing Decision: M02 LedgerBridge** | *"Let's examine our most nuanced routing decision: M02, LedgerBridge. A conventional CRM parser would see calendar invites and automatically log this as a sales pipeline opportunity. But inspecting the verbatim evidence at Turn 1 and Turn 30 shows that SpendNest is the buyer! Our team is evaluating LedgerBridge for electronic invoicing compliance across Singapore and Australia, with a setup cost of 2,600 to 6,500 Euros payable BY SpendNest. Our routing engine correctly routes this to 'Vendor Evaluation' and 'Internal Operations', preventing false quota attribution. Furthermore, when we inspect conversation detail views, every conclusion links directly to an identifiable transcript turn or quote, accompanied by our 'Honest Uncertainty' section which explicitly lists what the evidence does NOT establish."* |
| **1:40 - 2:30** | **Contract Replay & Duplicate Ingestion Verification** | *"Now, let's verify our strict Data Contract compliance. Using our built-in Replay Bar, notice what happens when we re-import the initial batch—even with records shuffled. The unique record count stays strictly at 44; zero duplicates, zero inflated activity. Next, in Step 3, we manually correct M07's route to Customer Support and Sales Coaching. Then, in Step 4, we import the update batch where M07 receives revision 2. Notice two critical behaviors: first, M07's late transcript with 27 turns is seamlessly ingested without creating a 45th record. Second, our manual manager route is perfectly preserved under Contract Rule 4! Even after a full browser refresh or restart, our override and review state remain active."* |
| **2:30 - 3:00** | **Export Manifest & Architecture Wrap-up** | *"Finally, let's look at our export. When we click 'Export Bundle', the system compiles a machine-readable manifest in both JSON and CSV, containing source IDs, revisions, routes, and output paths. Crucially, when one conversation produces multiple outputs—like M03 needing both Sales Coaching and Deal Next Steps—our system generates distinct markdown files in both the coaching and deals directories, listing both paths in the manifest so context is never lost. Everything you see is auditable, evidence-backed, and built to give sales managers complete clarity. Thank you."* |

---

## 9. Five Assessment Slides Summary

Available interactively in the **"5-Slide Deck & Pitch"** tab of the web application:

1. **Slide 1: The Manager Problem & Core Findings:** Managing noisy, fragmented multimodal streams; key insights from M02 (vendor vs pipeline), M03 (pricing friction), and M07 (production bugs).
2. **Slide 2: Interface Choices & Deliberate Omissions:** Deliberately separating call reps from meeting organizers; rejecting deceptive pipeline currency totals; zero hallucination for silent records.
3. **Slide 3: Routing Taxonomy & One Difficult Case:** 9 functional destinations; multi-routing architecture; handling M04 Cedarwave (migration churn vs coaching); preserving human overrides under Rule #4.
4. **Slide 4: Verification of Key Numbers & Evidence:** Auditable denominators (18/44 = 40.9% coverage, 11/30 = 36.7% connection rate); passage-traced citations with 1-based turn numbers and verbatim quotes.
5. **Slide 5: Trade-offs, AI Usage & Roadmap:** Deterministic pre-generated analysis vs live model calls; browser storage persistence; future CRM webhook sync.
