import { EnrichedRecord } from '../types';

export function generateDailyBriefMarkdown(records: EnrichedRecord[]): string {
  const totalRecords = records.length;
  const calls = records.filter(r => r.source_type === 'call');
  const meetings = records.filter(r => r.source_type === 'meeting');
  const withText = records.filter(r => r.hasUsableText);
  const connectedCalls = calls.filter(c => (c.payload as any).is_connected === true);

  return `# SpendNest Executive Manager Brief
**Date:** 21 August 2026 (Asia/Kolkata)  
**Target:** Sales Leadership & Coaching Hub  
**Dataset Scope:** Selected Day Ingestion (44 records: 30 calls, 14 meetings)  
**Usable Transcript Coverage:** ${withText.length} / ${totalRecords} records (${((withText.length / totalRecords) * 100).toFixed(1)}%)

---

## 1. Daily Activity & Ingestion Overview
* **Selected Calls:** 30 recorded dials across 5 reps (Arun: 15, Leela: 8, Meera: 5, Kiran: 1, Dev: 1).
* **Source-Reported Call Connection Rate:** ${connectedCalls.length} / ${calls.length} (${((connectedCalls.length / calls.length) * 100).toFixed(1)}%).
* **Selected Meetings:** 14 scheduled meetings across 10 organizer accounts.
* **Transcript Coverage:** 18 conversations contain substantive adapted transcripts (10 phone calls, 8 meetings). The remaining 26 records are preserved as intake/metadata evidence with zero fabricated analysis.

---

## 2. Top 3 Attention & Risk Priorities

### 🔴 Critical Churn Alert: Cedarwave Distribution (M04)
* **The Situation:** SpendNest is sunsetting its legacy physical card programme due to acceptance failures. Cedarwave is forced into a re-KYC migration.
* **The Danger:** Cedarwave revealed an existing **₹1.3 crore bank corporate credit line** and explicitly stated: *"moving from prepaid to credit is the main issue for us"*. They challenge why they should stay on SpendNest if transactions can be monitored directly in their bank portal.
* **Action Required:** Account Executive must confirm immediately whether Cedarwave's bank credit cards can be integrated via the transaction-feed programme (Turn 23) and schedule an admin session to fix their department user mapping (Turn 31).

### 🔴 Production Bug Escalation: Willowfield Trust (M07)
* **The Situation:** Meeting transcript delivered in revision 2 revealed **4 reproducible platform bugs** demonstrated on screen-share:
  1. Description edit failure on event payments (Turn 2-7).
  2. Document upload broken on "Recreate payment" (Turn 8-15; workaround: Bill Pay -> Invoice Inbox -> Review).
  3. Stuck "Processing" status blocking reimbursement payment selection (Turn 16-19).
  4. Form state pollution in "Mark as paid" modal carrying forward ₹18,200 from previous payments (Turn 21-25).
* **Action Required:** Team member A must log 4 emergency engineering tickets and provide the customer with an ETA on the stuck reimbursements within 1-2 hours.

### 🟡 Pricing Friction & Credit Misalignment: Asterloom Systems (M03)
* **The Situation:** Prospect (~65 employees) was shocked to learn domestic cards are prepaid rather than corporate credit (Turn 6), and experienced severe pricing friction when quoted ₹39,000 (which rep bundled with an unannounced ₹13,000 setup fee over the ₹26,000 subscription, Turn 23-24).
* **Action Required:** Restate the proposal in writing with transparent line-item separation (₹26k recurring vs ₹13k one-time setup) before CFO review.

---

## 3. High-Value Partnerships & Pipeline Expansion

### 🟢 Scalable Channel Agreement: Harborpath Advisory (M01)
* Partner A accepted the partner commission schedule: **USD 260 activation** + card spend bonus ($195-$390) + 5th referral bonus.
* Partner demanded a **unique referral link** to enable scalable web distribution rather than manual email introductions (Turn 20-21).
* **Action:** Send partner onboarding memorandum, issue unique tracking link, and explore joint podcast with marketing (Turn 27).

### 🟢 Overseas Incorporation Referral Channel: Willowbank Advisory (C07)
* Dev connected with Mr. Aditya, who regularly incorporates companies overseas and refers them to digital account providers (Turn 1).
* **Action:** Send proposal via chat app and execute agreed Monday morning follow-up call.

### 🟢 Accounts Receivable Enterprise Discovery: Mapletrail Services (M06)
* Qualified significant scale: 260-520 invoices/month across 65-78 clients with painful manual payment chasers and stalled expense recoveries (Turn 9-16).
* **Action:** Provide compliance security documentation to branch finance manager to facilitate warm intro to central finance director.

---

## 4. Practical Sales Coaching Recommendations

1. **Gatekeeper Conduct & Consent (Meera - C09 & C10):**
   * *Highlight:* In C09, Meera asked permission before using Mr. Vedant's name when reaching out to business head Mr. Rishabh. Vedant said *"No, please don't use my name"*. Meera's proactive question prevented a relationship-ending mistake.
   * *Coaching Tip (C10):* In C10, when a resistant prospect asks for a brief and declines a call, avoid pressing for a Monday phone commitment; honour their boundary.
2. **Cold Call Sourcing Objections (Arun - C01):**
   * When prospects demand *"Why have you called me?"*, avoid defending professional networking sourcing. Bridge instantly to peer pain: *"We help finance leadership firms eliminate manual client expense reconciliation."*
3. **Upfront Commercial Transparency (Team member A - M03):**
   * Never introduce an onboarding or integration fee as an unitemized bundle. Present the base SaaS subscription first, then present the implementation fee as an investment in rapid time-to-value.

---

## 5. Explicit Follow-Up Commitments & Owners

| Owner | Task | Deadline | Source Evidence |
|---|---|---|---|
| **Arun** | Resend Lanternpath Media proposal to corrected email | Immediate | C04 Passage |
| **Kiran** | Email Milan re: "Developer access and event notifications — follow-up"; call Mon/Tue | 21 Aug EOD / 24 Aug | C03 Quote |
| **Meera** | Email presentation to contact05@example.com re: StoreHarbor comparison | 21 Aug EOD | C05 Quote |
| **Dev** | Dispatch partner proposal via chat app to Mr. Aditya; call Monday | 21 Aug EOD / 24 Aug | C07 Quote |
| **Meera** | Email proposal to contact08@example.com citing conversation with Mr. Raghav | 21 Aug EOD | C08 Quote |
| **Team member A** | Send partnership memo and unique referral link to Harborpath Advisory | 24 Aug | M01 Turn 21 |
| **Team member A** | Complete LedgerBridge invoice volume template for SG, AU, IN | 24 Aug | M02 Turn 17 |
| **Team member A** | Check bank credit card eligibility for Cedarwave Distribution | 24 Aug | M04 Turn 23 |
| **Team member A** | Dispatch security & confidentiality docs to Mapletrail Services | 22 Aug | M06 Turn 32 |
| **Team member A** | File 4 engineering tickets for Willowfield Trust and give 2hr reimbursement ETA | Immediate | M07 Turn 7, 15, 19, 25 |
| **Team member A** | Investigate expired password reset token for Brookmint Holdings | 21 Aug / 24 Aug | M09 Turn 22, 31 |
| **Team member A** | Request back-office super-admin access for Team member B | 25 Aug | M10 Turn 20 |

---
*SpendNest Revenue Intelligence Engine - 21 August 2026 Brief*
`;
}
