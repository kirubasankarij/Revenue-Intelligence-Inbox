import { ConversationAnalysis, RouteCategory } from '../types';

export interface RecordAnalysisMetadata {
  recordRef: string;
  sourceType: 'call' | 'meeting';
  sourceId: string;
  derivedAccount: string;
  suggestedRoutes: RouteCategory[];
  routeReason: string;
  urgencyLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  analysisV1: ConversationAnalysis;
  analysisV2?: ConversationAnalysis; // For M07 when update arrives
}

export const PREGENERATED_ANALYSES: Record<string, RecordAnalysisMetadata> = {
  // --------------------------------------------------------------------------
  // CALLS WITH TRANSCRIPTS (C01 - C10)
  // --------------------------------------------------------------------------
  C01: {
    recordRef: 'C01',
    sourceType: 'call',
    sourceId: '2ec4404c-beee-5377-a63c-aab701da08ed',
    derivedAccount: 'Harborlight Advisory',
    suggestedRoutes: ['Sales Coaching', 'Disqualified / Unqualified'],
    routeReason: 'Cold outbound call met with immediate friction and rejection; prospect claims high existing automation.',
    urgencyLevel: 'Low',
    analysisV1: {
      headline: 'Cold Outbound Rejection; High Existing Automation Claimed',
      whatHappened: 'Arun cold-called Pranav at Harborlight Advisory regarding finance automation partnerships. Pranav expressed immediate annoyance at being cold-called on his work line. Arun clarified outreach origin (networking program) and pitched finance ops automation. Pranav stated their operations are already highly automated and terminated the call.',
      whyItMatters: 'Demonstrates rep vulnerability when challenged on sourcing and contact justification. Highlights prospect resistance to unsolicited outreach without contextual pre-warming.',
      supportingCitations: [
        {
          citation: 'C01 Passage',
          quote: 'Our processes are already very automated. We have a fairly advanced setup, so I don\'t think this is something we need. Thanks anyway.',
          speaker: 'Pranav',
          significance: 'Direct disqualification based on entrenched existing tooling and process maturity.'
        },
        {
          citation: 'C01 Sourcing Pushback',
          quote: 'I didn\'t ask for this call, and I\'m not interested. This number is for my work, not for people to sell things to me... Then where did you find my details?',
          speaker: 'Pranav',
          significance: 'Rep spent majority of call defending call legitimacy rather than delivering value hypothesis.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Does not identify specific competitor tools currently used at Harborlight Advisory.',
        'Does not establish whether Pranav is the sole decision-maker for finance technology.',
        'No opportunity value or CRM deal was ever opened or discussed.'
      ],
      statedNextSteps: [
        {
          task: 'Mark Harborlight Advisory as disqualified / unresponsive to cold phone outreach in CRM.',
          owner: 'Arun (Call Rep)',
          isExplicitlyStated: false
        }
      ],
      coachingNotes: 'Coaching Opportunity for Arun: When prospect asks "Why have you called me?", bridge immediately to peer relevance ("We noticed firms offering part-time CFO services struggle with manual client billing") rather than admitting "Right, I wanted to understand whether a partnership might be relevant". Avoid debating contact sourcing.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Finance Operations Automation'],
        caution: 'No commercial opportunity exists. Outreach closed.'
      }
    }
  },

  C02: {
    recordRef: 'C02',
    sourceType: 'call',
    sourceId: '4b870624-8aad-5315-a60e-0db95981cf99',
    derivedAccount: 'Fernhaven Group',
    suggestedRoutes: ['Voicemail / Gatekeeper'],
    routeReason: 'Gatekeeper receptionist interaction transferred to target contact mailbox.',
    urgencyLevel: 'Low',
    analysisV1: {
      headline: 'Reception Gatekeeper Transfer to Voicemail',
      whatHappened: 'Caller reached Fernhaven Group receptionist (Kavya) requesting to speak with Leela. Kavya confirmed Leela was not in the office and transferred the call to Leela\'s voicemail mailbox.',
      whyItMatters: 'Standard operational touchpoint; confirms target employee identity and company presence but produced no substantive dialogue.',
      supportingCitations: [
        {
          citation: 'C02 Transfer Quote',
          quote: 'It looks as though she isn\'t in the office today. Would you like to leave a message with me, or would you prefer her voicemail? Her voicemail would be fine, thank you.',
          speaker: 'Kavya / Rep',
          significance: 'Confirms call routed to unattended mailbox.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'No pitch, product discussion, or commercial topic occurred.',
        'Does not confirm Leela\'s buying role, interest, or project timeline.'
      ],
      statedNextSteps: [
        {
          task: 'Log touchpoint in sequence; attempt follow-up email or call on alternate day.',
          owner: 'Unspecified Rep',
          isExplicitlyStated: false
        }
      ],
      coachingNotes: 'Gatekeeper navigation was polite and concise. Consider asking gatekeeper for the best day/time to catch Leela live.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: [],
        caution: 'Zero commercial signals.'
      }
    }
  },

  C03: {
    recordRef: 'C03',
    sourceType: 'call',
    sourceId: '20d509ba-d589-5334-9aef-ea4ce6105b1a',
    derivedAccount: 'API Developer Prospect (Milan)',
    suggestedRoutes: ['Deal Next Steps', 'Sales Coaching'],
    routeReason: 'Pricing friction on developer API access; agreed to email proposal and follow-up call Monday/Tuesday.',
    urgencyLevel: 'High',
    analysisV1: {
      headline: 'Developer API Follow-up; Price Sensitivity & Audio Connection Constraints',
      whatHappened: 'Kiran called Milan regarding developer API access previously discussed five weeks earlier. Milan was traveling on roaming with faint audio. Milan remembered the requirement but noted price sensitivity ("it isn\'t essential enough for us to spend much on it"). Kiran agreed to send a tailored email with specific subject line and reconnect Monday or Tuesday.',
      whyItMatters: 'Active deal requirement with explicit next steps agreed. Deal is stalled on budget and requires flexible pricing tier or ROI framing.',
      supportingCitations: [
        {
          citation: 'C03 Budget Objection',
          quote: 'We did ask about some developer functionality, but it isn\'t essential enough for us to spend much on it. I would need to check with the team.',
          speaker: 'Milan',
          significance: 'Core deal barrier: perceived value vs price threshold.'
        },
        {
          citation: 'C03 Agreed Action Item & Subject Line',
          quote: 'What subject should I look for? Something like "Developer access and event notifications — follow-up". Right, let\'s do that... Send the email and we can speak Monday or Tuesday.',
          speaker: 'Milan / Kiran',
          significance: 'Concrete agreed follow-up protocol with explicit email header.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Specific dollar/currency budget figure was not stated ("price was a concern" remains qualitative).',
        'Company legal name is not explicitly mentioned in transcript.',
        'Technical specs of developer requirement are unspecified.'
      ],
      statedNextSteps: [
        {
          task: 'Send email titled "Developer access and event notifications — follow-up" with budget options.',
          owner: 'Kiran (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-21 EOD'
        },
        {
          task: 'Follow up by phone early Monday or Tuesday when Milan is back indoors.',
          owner: 'Kiran (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        }
      ],
      coachingNotes: 'Kiran handled audio disruption patiently. Coaching: In the follow-up email, anchor pricing directly against the cost of engineering workarounds (building custom webhooks vs using SpendNest endpoints).',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['API Access', 'Developer Functionality', 'Event Notifications'],
        caution: 'Prospect stated feature is non-essential; deal at high risk of stalling without budget accommodation.'
      }
    }
  },

  C04: {
    recordRef: 'C04',
    sourceType: 'call',
    sourceId: 'bcdcbf56-d338-5c78-9a97-42c2fc1c9931',
    derivedAccount: 'Lanternpath Media',
    suggestedRoutes: ['Voicemail / Gatekeeper', 'Deal Next Steps'],
    routeReason: 'Voicemail left for Ritesh following up on email delivery correction for expense software.',
    urgencyLevel: 'Medium',
    analysisV1: {
      headline: 'Expense Platform Follow-up Voicemail after Email Resend',
      whatHappened: 'Arun called Ritesh at Lanternpath Media regarding expense management software. Call passed screening to voicemail. Arun explained information had initially been dispatched to an erroneous email address, was resent to the corrected address, and requested a callback with questions.',
      whyItMatters: 'Demonstrates pipeline maintenance and lead reactivation following operational data error.',
      supportingCitations: [
        {
          citation: 'C04 Resend Confirmation',
          quote: 'My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us, and I hope you have now had a chance to see it.',
          speaker: 'Arun',
          significance: 'Documents process breakdown and remediation touchpoint.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Whether Ritesh actually opened or received the resent documentation.',
        'Lanternpath Media\'s current stage of vendor consideration or timeline.'
      ],
      statedNextSteps: [
        {
          task: 'Wait for callback; check email tracking for proposal engagement.',
          owner: 'Arun (Call Rep)',
          isExplicitlyStated: false
        }
      ],
      coachingNotes: 'Voicemail was clear and professional. Tip: Suggest leaving a specific calendar link for low-friction booking rather than relying on a telephone callback.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Expense Management Platform'],
        caution: 'No live prospect confirmation.'
      }
    }
  },

  C05: {
    recordRef: 'C05',
    sourceType: 'call',
    sourceId: '75a6b94f-7717-5cfb-9e41-0acc94415e17',
    derivedAccount: 'Multi-Store Retail Prospect',
    suggestedRoutes: ['Sales Coaching', 'Deal Next Steps'],
    routeReason: 'Outbound pitch countered by incumbent provider (StoreHarbor); prospect requested slide presentation via email.',
    urgencyLevel: 'Medium',
    analysisV1: {
      headline: 'Multi-Store Expense Pitch; Incumbent StoreHarbor Entrenched; Presentation Requested',
      whatHappened: 'Meera pitched store expense management, corporate cards, and vendor approval workflows to a retail operator. The prospect repeatedly noted they already have software covering expense approvals, payments, and store instant payments, citing StoreHarbor and others. Prospect suggested sending a presentation to contact05@example.com for future consideration.',
      whyItMatters: 'Confirms StoreHarbor as active market competitor in multi-store retail. Lead requested collateral, providing a warm nurture entry point.',
      supportingCitations: [
        {
          citation: 'C05 Incumbent Confirmation',
          quote: 'It sounds as though your existing setup covers a lot. May I ask which platform you\'re using? There are several. One is StoreHarbor, and we use others too.',
          speaker: 'Meera / Prospect',
          significance: 'Identifies incumbent vendor StoreHarbor in retail multi-location vertical.'
        },
        {
          citation: 'C05 Next Step Request',
          quote: 'What I suggest is that you send me your presentation. If we ever decide to change the providers we already have, we could consider it then. Certainly. I have an email address noted down; may I confirm contact05@example.com?',
          speaker: 'Prospect / Meera',
          significance: 'Concrete collateral dispatch request.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Does not prove prospect has active intent to switch from StoreHarbor.',
        'Contract renewal dates and pricing with StoreHarbor remain unstated.'
      ],
      statedNextSteps: [
        {
          task: 'Dispatch product presentation to contact05@example.com highlighting SpendNest differentiators vs StoreHarbor.',
          owner: 'Meera (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-21 EOD'
        }
      ],
      coachingNotes: 'Coaching for Meera: When a prospect repeatedly says "We already have that", stop asking feature checklists. Pivot to dissatisfaction probes: "What is the one thing your store managers or finance team complain about most when using StoreHarbor?"',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Store Expenses', 'Controlled Cards', 'Instant-Payment Accounts', 'Vendor Management'],
        caution: 'Prospect is satisfied with incumbent; low short-term conversion probability.'
      }
    }
  },

  C06: {
    recordRef: 'C06',
    sourceType: 'call',
    sourceId: '12216d5c-e254-52c6-b344-47de4c6e1ae5',
    derivedAccount: '120+ Store Distribution Group (Mr. Nikhil)',
    suggestedRoutes: ['Disqualified / Unqualified', 'Sales Coaching'],
    routeReason: 'Enterprise multi-store retail prospect entrenched in centralized ERP/BMS; declined external software.',
    urgencyLevel: 'Low',
    analysisV1: {
      headline: 'Cold Call on 120+ Store Retailer; Entrenched Head-Office Business System',
      whatHappened: 'Ravi pitched SpendNest store expense automation to Mr. Nikhil. Nikhil stated essential arrangements are already automated and connected through their central business management system with head office visibility. Ravi probed whether >120 store managers use cards or cash advances; Nikhil confirmed a mixed automated model monitored by a dedicated department and declined outreach.',
      whyItMatters: 'Enterprise retail qualification insight. Shows central head-office finance control over store disbursements.',
      supportingCitations: [
        {
          citation: 'C06 Centralized System Statement',
          quote: 'We have quite a lot of automation, with a mixed model where needed. The essential processes are automated and connected through our business management system. Head office manages it, and we have full visibility.',
          speaker: 'Mr. Nikhil',
          significance: 'Validates internal ERP control and resistance to standalone point solutions.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Specific BMS/ERP software brand was not revealed.',
        'Whether store managers experience friction with cash advances was not disclosed.'
      ],
      statedNextSteps: [
        {
          task: 'Archive record as qualified enterprise account with incumbent internal system; revisit in 6 months.',
          owner: 'Ravi (Call Rep)',
          isExplicitlyStated: false
        }
      ],
      coachingNotes: 'Ravi executed an effective objection probe: asking specifically about cash advances across 120 stores. When prospect shut down the dialogue, Ravi exited politely without burning rapport.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Store Cards', 'Instant Payments', 'Invoice Management'],
        caution: 'No pipeline opportunity established.'
      }
    }
  },

  C07: {
    recordRef: 'C07',
    sourceType: 'call',
    sourceId: '428817fa-7e9e-5418-a7d4-bb396d28dfbf',
    derivedAccount: 'Willowbank Advisory',
    suggestedRoutes: ['Partnerships & Channel', 'Deal Next Steps'],
    routeReason: 'High-value channel partnership opportunity; advisory firm refers overseas incorporation clients to bank accounts.',
    urgencyLevel: 'High',
    analysisV1: {
      headline: 'Channel Partnership for Virtual Accounts with Overseas Incorporation Advisory',
      whatHappened: 'Dev cold-called Mr. Aditya at Willowbank Advisory. Willowbank assists clients with overseas company incorporation and regularly refers incorporated businesses to digital business account providers (comparable to CloudLedger / Clearport Money). Aditya requested Dev message proposal details via chat app and agreed to a follow-up discussion on Monday.',
      whyItMatters: 'Strategic referral channel! Advisory firms incorporating overseas entities represent high-volume recurring pipeline for virtual accounts and corporate cards.',
      supportingCitations: [
        {
          citation: 'C07 Active Referral Validation',
          quote: 'Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... Sorry, could you message me on our chat app and send whatever proposal you have?',
          speaker: 'Mr. Aditya',
          significance: 'Validates existing referral workflow and immediate interest in proposal.'
        },
        {
          citation: 'C07 Agreed Follow-up Call',
          quote: 'Once you\'ve received them, could I call on Monday to see whether you\'d like to discuss it further? Yes, that\'s fine. Thank you for your time.',
          speaker: 'Dev / Mr. Aditya',
          significance: 'Explicit permission for Monday follow-up call.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Monthly incorporation volume handled by Willowbank was not quantified.',
        'Commercial revenue-share terms or referral fee expectations were not discussed.'
      ],
      statedNextSteps: [
        {
          task: 'Send SpendNest virtual account partner overview and proposal to Aditya via chat app.',
          owner: 'Dev (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-21 EOD'
        },
        {
          task: 'Place scheduled follow-up call to Mr. Aditya on Monday.',
          owner: 'Dev (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        }
      ],
      coachingNotes: 'Strong qualification by Dev. Ensure Monday discussion introduces the partner onboarding memo, revenue-share tiers, and unique referral links as demonstrated in M01.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Virtual Business Accounts', 'Digital Accounts for Overseas Entities'],
        caution: 'High potential channel partner, but no client deal committed yet.'
      }
    }
  },

  C08: {
    recordRef: 'C08',
    sourceType: 'call',
    sourceId: '129497b2-8e1d-5e01-919c-e8a852b5ff68',
    derivedAccount: 'Multi-Location Frontline Operations (Mr. Raghav)',
    suggestedRoutes: ['Deal Next Steps', 'Sales Coaching'],
    routeReason: 'Warm internal referral secured; prospect provided direct email for People Operations leader evaluating solutions.',
    urgencyLevel: 'High',
    analysisV1: {
      headline: 'Warm Internal Referral Secured to People Operations Buyer',
      whatHappened: 'Meera called Mr. Raghav to pitch SpendNest expense and payables integration. Raghav understood the positioning alongside ERPs. He shared that their People Operations colleague handles frontline location processes and is currently looking into a solution. Raghav gave permission to email contact08@example.com referencing his name.',
      whyItMatters: 'Excellent outbound sales outcome: secured warm internal referral directly to the operational problem owner with explicit permission to use Raghav\'s name.',
      supportingCitations: [
        {
          citation: 'C08 Warm Referral Quote',
          quote: 'The colleague handling our people operations also deals with frontline processes and the locations. I think we may have been looking at a solution, but I don\'t know the details. There have been some discussions. If you send him a proposal and say you spoke with me, he can take a look.',
          speaker: 'Mr. Raghav',
          significance: 'High-probability sales entry point via internal sponsorship.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'The name, job title, and exact phone number of the People Operations colleague.',
        'Timeline, approved budget, or incumbent systems under review.'
      ],
      statedNextSteps: [
        {
          task: 'Send proposal to contact08@example.com opening with: "Mr. Raghav suggested I reach out regarding your frontline location expense processes".',
          owner: 'Meera (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-21 EOD'
        }
      ],
      coachingNotes: 'Top-tier cold call execution by Meera. The read-back of contact08@example.com ensured accurate contact logging.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Expense Management', 'Frontline Location Limits', 'Invoice Processing'],
        caution: 'Opportunity is at early discovery/referral stage.'
      }
    }
  },

  C09: {
    recordRef: 'C09',
    sourceType: 'call',
    sourceId: '4a1de681-f884-55e8-b1ad-de22d17cd959',
    derivedAccount: '130-Store Chain (Mr. Vedant)',
    suggestedRoutes: ['Sales Coaching', 'Deal Next Steps'],
    routeReason: 'Referral with strict gatekeeper constraint: rep directed to Business Head but explicitly forbidden from using prospect name.',
    urgencyLevel: 'Medium',
    analysisV1: {
      headline: '130-Store Chain; Proprietary Tool; Lead Referral with Name-Use Prohibition',
      whatHappened: 'Meera cold-called Mr. Vedant regarding store expense management for ~130 locations. Vedant stated they built proprietary software internally. When probed on payment execution vs accounting, Vedant directed Meera to search for their business head, Mr. Rishabh, on LinkedIn. Crucially, when Meera asked if she could mention Vedant\'s name, Vedant strictly responded: "No, please don\'t use my name."',
      whyItMatters: 'CRITICAL SALES CONDUCT TEST: Violating the prospect\'s explicit prohibition ("don\'t use my name") would burn the account and create reputational damage.',
      supportingCitations: [
        {
          citation: 'C09 Name-Use Prohibition (Crucial Finding)',
          quote: 'Would it be all right if I mentioned your name when contacting him? No, please don\'t use my name. Of course, no problem. That is why I wanted to ask first. Thank you for pointing me in the right direction.',
          speaker: 'Meera / Mr. Vedant',
          significance: 'Mandatory behavioral constraint: Rep must approach Mr. Rishabh via cold outbound without referencing Mr. Vedant.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Full corporate name of the retail chain is not given.',
        'Whether Mr. Rishabh has budget or appetite to augment their proprietary tool is unknown.'
      ],
      statedNextSteps: [
        {
          task: 'Locate Business Head Mr. Rishabh on professional networking site; initiate outreach WITHOUT referencing Mr. Vedant.',
          owner: 'Meera (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        }
      ],
      coachingNotes: 'Exemplary conduct by Meera: asking permission BEFORE dropping an employee\'s name prevented a catastrophic cold call blunder. Praise Meera in team standup for respecting gatekeeper boundaries.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Store Expenses', 'Petty Cash', 'Payment Execution API'],
        caution: 'Proprietary software in place; must demonstrate payment rail limitations to create dissatisfaction.'
      }
    }
  },

  C10: {
    recordRef: 'C10',
    sourceType: 'call',
    sourceId: 'b747f592-810e-583c-9b81-8db5ab035806',
    derivedAccount: 'Manufacturing Contact (Mr. Aniket)',
    suggestedRoutes: ['Sales Coaching', 'Voicemail / Gatekeeper'],
    routeReason: 'Prospect changed employers; requested brief via messaging app and explicitly refused follow-up phone call.',
    urgencyLevel: 'Low',
    analysisV1: {
      headline: 'Contact Departed Target Account; Moved to Manufacturing; Explicit Follow-up Refusal',
      whatHappened: 'Meera called Mr. Aniket regarding Meadowbrick. Aniket stated he no longer works at Meadowbrick and has moved to a manufacturing firm. Meera attempted to pitch AP workflows for manufacturing. Aniket tersely requested a brief on the messaging app. When Meera pressed for a Monday/Tuesday follow-up call, Aniket explicitly refused: "No. I said I will contact you if there is anything to discuss."',
      whyItMatters: 'Important coaching scenario on reading prospect resistance and respecting conversational boundaries.',
      supportingCitations: [
        {
          citation: 'C10 Follow-up Refusal',
          quote: 'Would a follow-up call on Monday or Tuesday next week be okay, in case you have any questions? No. I said I will contact you if there is anything to discuss. Understood.',
          speaker: 'Meera / Mr. Aniket',
          significance: 'Prospect explicitly revoked permission for proactive outbound telephone follow-up.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Current manufacturing employer name.',
        'Whether Meadowbrick has a new finance replacement.'
      ],
      statedNextSteps: [
        {
          task: 'Dispatch high-level company brief via messaging app; DO NOT call on Monday/Tuesday.',
          owner: 'Meera (Call Rep)',
          isExplicitlyStated: true,
          deadline: '2026-08-21 EOD'
        },
        {
          task: 'Research new finance leadership at Meadowbrick to replace departed contact.',
          owner: 'SDR Team',
          isExplicitlyStated: false
        }
      ],
      coachingNotes: 'Coaching for Meera: When a prospect says "send an explanation... I will get back to you", pushing for a scheduled call often provokes irritation. Accept the messaging brief gracefully and use digital engagement tracking rather than pushing for a phone commitment.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['AP Automation', 'Vendor Management'],
        caution: 'No qualified opportunity; prospect is resistant.'
      }
    }
  },

  // --------------------------------------------------------------------------
  // MEETINGS WITH TRANSCRIPTS (M01, M02, M03, M04, M06, M07, M09, M10)
  // --------------------------------------------------------------------------
  M01: {
    recordRef: 'M01',
    sourceType: 'meeting',
    sourceId: 'cb5cecac-e68d-52b7-b10b-b0c748efc467',
    derivedAccount: 'Harborpath Advisory',
    suggestedRoutes: ['Partnerships & Channel', 'Deal Next Steps'],
    routeReason: 'Channel partner commercial onboarding; agreed to unique referral link and marketing collaboration.',
    urgencyLevel: 'High',
    analysisV1: {
      headline: 'Commercial Partner Agreement & Referral Architecture with Harborpath Advisory',
      whatHappened: 'Team member A presented partner commission structure, onboarding criteria, and account boundaries to Partner A at Harborpath Advisory. Harborpath advises clients opening remote business accounts. Partner A accepted the USD 260 activation fee plus spend bonuses ($195-$390), insisted on a unique referral link rather than manual email introductions for scalability, and suggested co-recording a podcast.',
      whyItMatters: 'Scalable channel partnership agreement. Solves client acquisition for SpendNest\'s US virtual account and card products.',
      supportingCitations: [
        {
          citation: 'M01 Turn 9 (Commission Tiers)',
          quote: 'The activation payment is USD 260 when a referred company gets its account approved by our compliance partners. The cards option also has an interchange revenue share and a bonus based on the customer\'s spending during the first 60 days. For example, USD 6,500–32,500 of spend earns a USD 195 bonus; the next bracket through USD 130,000 earns USD 390.',
          speaker: 'Team member A',
          significance: 'Stated partner commission schedule and spend thresholds.'
        },
        {
          citation: 'M01 Turn 20-21 (Link Architecture Requirement)',
          quote: 'It cannot depend on me manually writing every email. This needs to scale when people discover the offer through us. Then let us use the unique link.',
          speaker: 'Partner A / Team member A',
          significance: 'Partner refused email-based referral; demanded tracked link integration.'
        },
        {
          citation: 'M01 Turn 23 (Compliance Boundary)',
          quote: 'receiving funds here means bank transfers, not directly taking card payments from customers. A business can use a separate card-payment processor and settle into its account. It also needs a way to fund the account...',
          speaker: 'Team member A',
          significance: 'Crucial product boundary: SpendNest is not an acquiring merchant processor.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Expected monthly referral volume from Harborpath Advisory was not committed.',
        'Timeframe for signing the partner onboarding memorandum is unspecified.'
      ],
      statedNextSteps: [
        {
          task: 'Send partner onboarding memorandum and generate unique referral link for Harborpath.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        },
        {
          task: 'Introduce Partner A to SpendNest marketing team to evaluate joint podcast recording.',
          owner: 'Team member A',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'Excellent boundary management by Team member A regarding US operational evidence requirements (Turn 13) and non-merchant acquiring nature (Turn 23). Prevents downstream compliance drop-offs.',
      commercialSignals: {
        currenciesMentioned: ['USD 260', 'USD 195', 'USD 390', 'USD 6,500 - 32,500', 'USD 130,000', 'USD 38/month'],
        statedProducts: ['US Virtual Business Accounts', 'Corporate Wallets', 'SpendNest Cards'],
        caution: 'Figures are partner commission payouts and customer plan pricing; NOT direct SpendNest contract revenue.'
      }
    }
  },

  M02: {
    recordRef: 'M02',
    sourceType: 'meeting',
    sourceId: '1a21c409-c050-5787-90af-2667e057e1b6',
    derivedAccount: 'LedgerBridge (Vendor / Supplier Evaluation)',
    suggestedRoutes: ['Vendor Evaluation', 'Internal Operations'],
    routeReason: 'INTERNAL VENDOR SOURCING: SpendNest evaluating LedgerBridge for electronic invoicing compliance across SG, AU, and IN.',
    urgencyLevel: 'Medium',
    analysisV1: {
      headline: 'Vendor Evaluation: Electronic Invoicing Infrastructure via LedgerBridge',
      whatHappened: 'SpendNest Strategy (Team member A) and Product (Team member B) met with Supplier A from LedgerBridge. SpendNest is seeking an electronic invoicing provider to expand their accounts receivable module across Singapore, Australia, and India for Q4/early next year. Supplier A explained country license models vs per-customer usage, sandbox testing, and one-time setup fees (€2,600 - €6,500).',
      whyItMatters: 'CRITICAL MANAGER FINDING: Standard CRMs misclassify this as a customer sales pipeline deal. In reality, SpendNest is the BUYER evaluating an infrastructure vendor.',
      supportingCitations: [
        {
          citation: 'M02 Turn 1 (Buyer Relationship Confirmation)',
          quote: 'I work on strategy and partnerships at SpendNest. We serve businesses with cards and accounts payable, and we are developing accounts receivable. We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets.',
          speaker: 'Team member A',
          significance: 'Confirms SpendNest as buyer evaluating supplier capability.'
        },
        {
          citation: 'M02 Turn 30-31 (Commercial Structure & Setup Fee)',
          quote: 'And the commercial relationship is between SpendNest and LedgerBridge? We are providing this to our customers through our product, rather than asking them to buy from you separately. Correct. There is also a one-time setup charge. The basic setup begins at EUR 2,600; a more supported implementation starts at EUR 6,500...',
          speaker: 'Team member A / Supplier A',
          significance: 'Documents B2B vendor contract and implementation cost.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Whether Q4 launch deadline will hold or slip into next year (Turn 15: competing projects).',
        'Customer demand volume for electronic invoicing is unverified (Turn 5, 18).'
      ],
      statedNextSteps: [
        {
          task: 'Supplier A to send volume template for country and customer sizing.',
          owner: 'Supplier A (LedgerBridge)',
          isExplicitlyStated: true,
          deadline: '2026-08-22'
        },
        {
          task: 'SpendNest team to complete volume template and schedule commercial walkthrough.',
          owner: 'Team member A & B (SpendNest)',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'Important routing distinction: Ensure this record is routed to Vendor / Infrastructure, NEVER to Sales Pipeline or AE quotas.',
      commercialSignals: {
        currenciesMentioned: ['EUR 2,600', 'EUR 6,500'],
        statedProducts: ['Electronic Invoicing API', 'PDF Generation', 'Regional E-Invoicing Networks'],
        caution: 'Figures are vendor costs payable BY SpendNest, not incoming customer revenue!'
      }
    }
  },

  M03: {
    recordRef: 'M03',
    sourceType: 'meeting',
    sourceId: '398672e7-62dd-5afd-846d-0237d49792fb',
    derivedAccount: 'Asterloom Systems',
    suggestedRoutes: ['Sales Coaching', 'Deal Next Steps'],
    routeReason: 'Sales qualification call with significant pricing friction, credit vs prepaid misalignment, and CFO gatekeeper.',
    urgencyLevel: 'Critical',
    analysisV1: {
      headline: 'Asterloom Evaluation: Prepaid Misalignment, 50% Price Shock & CFO Approval Barrier',
      whatHappened: 'Team member A demoed domestic corporate cards and expense review to Customer A and B at Asterloom Systems (~65 employees). Two major friction points emerged: (1) Customer assumed cards were credit; discovered they are prepaid drawn from a shared wallet. (2) Pricing friction: Customer A was previously quoted ₹26,000/yr, but rep quoted ₹39,000 (bundling an unannounced ₹13,000 setup fee). Customers required written clarity before presenting to CFO.',
      whyItMatters: 'Deal at severe risk due to surprise pricing and unmet credit expectation. Requires immediate manager coaching and clean proposal restatement.',
      supportingCitations: [
        {
          citation: 'M03 Turn 6 (Credit vs Prepaid Shock)',
          quote: 'Wait, these are prepaid? I had thought about a corporate credit card. So we put money in before anyone spends, and there is no credit facility on these domestic cards?',
          speaker: 'Customer A',
          significance: 'Critical product misunderstanding that should have been clarified in discovery.'
        },
        {
          citation: 'M03 Turn 23-24 (Pricing Discrepancy & Defense)',
          quote: 'But you previously told me INR 26,000. Why has that become INR 39,000? I included the integration setup in that number. To separate it: INR 26,000 plus tax is the recurring annual subscription, and INR 13,000 is the one-time accounting integration setup.',
          speaker: 'Customer A / Team member A',
          significance: 'Created mistrust by presenting bundled total without transparent component breakdown.'
        },
        {
          citation: 'M03 Turn 28, 36 (CFO Gatekeeper & Call Shutdown)',
          quote: 'Our CFO approves the larger payments. We need to explain the proposal to them... Send the details first. We need time with the CFO and will tell you if another call is needed.',
          speaker: 'Customer B',
          significance: 'Customer refused further meetings until proposal is vetted internally.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Monthly spend of ₹10-13 lakh is an unverified verbal estimate (Turn 5).',
        'Vendor payment volume of ₹26-39 lakh/mo (Turn 34) is speculative.'
      ],
      statedNextSteps: [
        {
          task: 'Dispatch clear written proposal itemizing recurring ₹26,000 subscription vs one-time ₹13,000 setup fee.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-22'
        },
        {
          task: 'Wait for internal CFO evaluation; do not harass with aggressive follow-up booking.',
          owner: 'Team member A',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'HIGH-PRIORITY COACHING: Never spring an integration fee without itemization. When selling domestic prepaid cards, qualify credit card expectations in the first 2 minutes: "Are you looking for cash-flow float (credit) or spend controls with zero debt (prepaid)?"',
      commercialSignals: {
        currenciesMentioned: ['INR 26,000/yr', 'INR 13,000 setup', 'INR 39,000 total', 'INR 10 - 13 lakh spend', 'INR 26 - 39 lakh vendor spend'],
        statedProducts: ['Domestic Prepaid Cards', 'Expense Approval Review', 'Accounting Integration'],
        caution: 'Spend volume estimates are unverified; deal hinges on CFO approval of prepaid model.'
      }
    }
  },

  M04: {
    recordRef: 'M04',
    sourceType: 'meeting',
    sourceId: 'b0f79b3d-37ba-52f9-b2bc-58b159dd6d91',
    derivedAccount: 'Cedarwave Distribution',
    suggestedRoutes: ['Customer Retention', 'Sales Coaching'],
    routeReason: 'CRITICAL CHURN RISK: Legacy card programme sunsetting due to acceptance issues; customer demanding bank credit integration.',
    urgencyLevel: 'Critical',
    analysisV1: {
      headline: 'CRITICAL CHURN RISK: Card Sunset Migration Crisis & Credit Line Requirement',
      whatHappened: 'Team member A informed Cedarwave Distribution that their current physical/virtual card programme is shutting down due to acceptance problems and migrating to a new provider requiring employee re-KYC. Customer A resisted another prepaid product ("moving from prepaid to credit is the main issue for us"). Customer revealed an existing ₹1.3 crore bank credit line and demanded connecting bank cards to SpendNest for expense review and accounting sync. Rep could not confirm eligibility or balance display.',
      whyItMatters: 'Existing revenue at immediate risk of churn. If SpendNest cannot support the migration or connect bank credit cards, Cedarwave will migrate to their bank portal.',
      supportingCitations: [
        {
          citation: 'M04 Turn 2, 6 (Programme Sunset & Forced Re-KYC)',
          quote: 'We have seen acceptance problems with the existing programme and are proposing a move to a different provider and card network... The plan is to close the old programme in the coming weeks... Users need to complete identity checks again...',
          speaker: 'Team member A',
          significance: 'Forced migration creates severe customer operational friction and churn vulnerability.'
        },
        {
          citation: 'M04 Turn 11, 22 (Credit Demand & Existing Credit Line)',
          quote: 'moving from prepaid to credit is the main issue for us. At some stage we will have to consider another option for that... We already have a corporate credit line of about INR 1.3 crore.',
          speaker: 'Customer A / Customer B',
          significance: 'Customer already secured ₹1.3 crore credit from bank; reluctant to continue prepaid.'
        },
        {
          citation: 'M04 Turn 25-26 (Product Limitation: No Live Balance)',
          quote: 'Would it show our available credit limit as well as the transactions?... No, the proposed feed shows transaction details after settlement... Then what do we gain by adding SpendNest? We can already see transactions in the bank portal.',
          speaker: 'Customer B / Team member A',
          significance: 'Customer directly challenges SpendNest value proposition over native bank portal.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Whether Cedarwave\'s existing bank credit cards are technically eligible for the transaction-feed programme (Turn 23).',
        'Cedarwave\'s renewal or cancellation date on their current SpendNest subscription.'
      ],
      statedNextSteps: [
        {
          task: 'Confirm bank credit card eligibility and accounting sync feasibility with programme team.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        },
        {
          task: 'Schedule guided admin session to resolve department user reassignment bug (Turn 31).',
          owner: 'Team member A',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'Account Executive / CSM Coaching: Team member A did well to avoid overpromising live credit balances (Turn 25). However, rep needs manager support on value defense: SpendNest provides automated receipt chasers, multi-level policy approvals, and ERP reconciliation that bank portals lack.',
      commercialSignals: {
        currenciesMentioned: ['INR 1.3 crore credit line'],
        statedProducts: ['Corporate Cards (Legacy & Replacement)', 'Bank Credit Transaction Feed', 'Accounting Sync'],
        caution: 'INR 1.3 crore is customer\'s bank borrowing limit, NOT SpendNest contract revenue!'
      }
    }
  },

  M06: {
    recordRef: 'M06',
    sourceType: 'meeting',
    sourceId: '657b9e9d-9472-5b01-a127-a648ad7e8cf7',
    derivedAccount: 'Mapletrail Services',
    suggestedRoutes: ['Deal Next Steps', 'Sales Coaching'],
    routeReason: 'Enterprise discovery on accounts receivable & collections automation with branch finance leader.',
    urgencyLevel: 'Medium',
    analysisV1: {
      headline: 'Enterprise Discovery: Accounts Receivable Automation & Security Requirements',
      whatHappened: 'Team member A met Customer A (branch finance manager at Mapletrail Services, ~65 finance staff centrally). Mapletrail issues 260-520 invoices/mo across 65-78 customers with manual payment chasers and disputed invoices stalling for months. Rep pitched AI collections workflows, cash application reconciliation, and corporate cards. Customer validated the pain but raised strong data security questions and noted central finance controls software decisions.',
      whyItMatters: 'Strong potential enterprise opportunity for upcoming AR module, but champion is at branch level; requires multi-threading to central finance leadership.',
      supportingCitations: [
        {
          citation: 'M06 Turn 9-10 (Manual Collection Bottleneck)',
          quote: 'When something remains unpaid, the collections team comes back to the delivery manager... One expense-recovery invoice has been outstanding for months even though the same client pays the normal service invoices.',
          speaker: 'Customer A',
          significance: 'Concrete operational pain point SpendNest collections module can solve.'
        },
        {
          citation: 'M06 Turn 12-16 (Invoice Volume Sizing)',
          quote: 'Around 65–78 customers... 260–390 invoices a month... perhaps nearer 390–520 a month overall? Approximately. The value is the bigger point, and many are in foreign currency.',
          speaker: 'Customer A / Team member A',
          significance: 'Quantified invoice processing scale across enterprise customer base.'
        },
        {
          citation: 'M06 Turn 31 (Confidentiality Objection)',
          quote: 'Confidentiality is important. Payment information is sensitive. How is that protected, and is there a risk of somebody interfering with it?',
          speaker: 'Customer A',
          significance: 'Security compliance is a prerequisite gate before central finance review.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Central finance leadership appetite or current ERP migration plans.',
        'Total invoice revenue value was described qualitatively ("large total value") without exact numbers.'
      ],
      statedNextSteps: [
        {
          task: 'Send documentation on accounts receivable automation, cash application, and platform security certifications.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-22'
        }
      ],
      coachingNotes: 'Great discovery dialogue. Next step: Ask Customer A for a warm introduction to central finance leadership: "Could we co-present these security docs to your central finance director to see if Mapletrail qualifies for our AR pilot?"',
      commercialSignals: {
        currenciesMentioned: ['INR 1.3 lakh / 1.17 lakh cash application example'],
        statedProducts: ['Receivables Automation', 'Collections Chaser Workflows', 'Cash Application', 'SpendNest Cards'],
        caution: 'Discovery phase only. Central finance team approval is required for purchase.'
      }
    }
  },

  M07: {
    recordRef: 'M07',
    sourceType: 'meeting',
    sourceId: '4f304fff-fd40-5cfc-a366-0a134c445c2a',
    derivedAccount: 'Willowfield Trust',
    suggestedRoutes: ['Customer Support / Bugs', 'Internal Operations'],
    routeReason: 'CRITICAL PRODUCTION DEFECT REVIEW: Customer screen-share demonstrated 4 distinct application bugs.',
    urgencyLevel: 'Critical',
    // In Initial batch (v1), transcript was withheld!
    analysisV1: {
      headline: 'Awaiting Meeting Transcript (Withheld in Initial Batch)',
      whatHappened: 'Meeting metadata recorded on 2026-08-21T05:30:00Z with organizer team09@example.com. In initial delivery (batch initial-001, revision 1), the transcript was withheld (turns array is empty, has_transcript=true).',
      whyItMatters: 'System correctly identifies late arriving information and maintains review state without fabricating premature analysis.',
      supportingCitations: [
        {
          citation: 'Initial Metadata Contract',
          quote: 'has_transcript=true, turns=[]',
          significance: 'Source transcript pending delivery from upstream recording pipeline.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'No conversation text available in revision 1.',
        'Meeting outcome and agenda cannot be inferred from calendar title alone.'
      ],
      statedNextSteps: [
        {
          task: 'Await update batch delivery containing full transcript payload.',
          owner: 'System Import Pipeline',
          isExplicitlyStated: false
        }
      ]
    },
    // In Update batch (v2), 27 turns arrive with 4 specific bugs!
    analysisV2: {
      headline: '4 Critical Software Bugs Demonstrated: Save Failures, Upload Breaks & Modal Cache Pollution',
      whatHappened: 'Customer A shared their screen with Team member A to reproduce four distinct operational platform bugs: (1) Editing event-payment description does not persist after clicking Save changes. (2) Direct document upload fails on Recreate payment; workaround found via Bill Pay -> Invoice inbox -> Review. (3) Reimbursement payments stuck in "Processing" state cannot be selected. (4) "Mark as paid" modal pollutes previous payment amount (INR 18,200) onto next items.',
      whyItMatters: 'CUSTOMER ESCALATION & ENGINEERING HANDOVER: High-priority bugs impacting daily payment reconciliation and accounting accuracy. Immediate engineering escalation required.',
      supportingCitations: [
        {
          citation: 'M07 Turn 2-4 (Bug 1: Description Not Saving)',
          quote: 'The first one is editing the description... and clicking Save changes. Now look at the displayed description again. The field still shows the earlier wording. So the change is not appearing after you save...',
          speaker: 'Customer A / Team member A',
          significance: 'Silent data mutation failure on payment descriptions.'
        },
        {
          citation: 'M07 Turn 8-15 (Bug 2: Recreate Payment Upload Bug & Workaround)',
          quote: 'When I go through this route, I cannot upload a document... the workaround is to save the changes, return to the invoice inbox, open Review and upload the document there... The workaround does not mean the direct upload issue has been resolved.',
          speaker: 'Customer A / Team member A',
          significance: 'Upload broken on direct screen; viable workaround identified.'
        },
        {
          citation: 'M07 Turn 16-19 (Bug 3: Stuck Processing Reimbursements)',
          quote: 'The next issue is in reimbursements. I cannot select the first group of transactions... The payments appear to have been released but are stuck showing Processing. I have asked the team to look at these. I expect an update or resolution in an hour or two...',
          speaker: 'Customer A / Team member A',
          significance: 'Stuck state machine blocking reimbursement selection; 1-2 hr ETA promised.'
        },
        {
          citation: 'M07 Turn 21-25 (Bug 4: Mark As Paid Modal State Pollution)',
          quote: 'When I use Mark as paid, the first payment shows INR 18,200... The amount from the previous item appears in the next one. Each time I have to cancel, leave it and open Mark as paid again before it shows the right information.',
          speaker: 'Customer A / Team member A',
          significance: 'Modal form state retains stale values; risk of accounting mismatch.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Root engineering cause of save failure and modal cache retention is not identified.',
        'Whether stuck reimbursement payments actually completed at the bank level.'
      ],
      statedNextSteps: [
        {
          task: 'File 4 emergency engineering tickets with exact reproduction steps and screenshots.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-21 Immediate'
        },
        {
          task: 'Provide status update / resolution on stuck Processing reimbursements within 1-2 hours.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-21 07:30 UTC'
        }
      ],
      coachingNotes: 'Exemplary customer support handling by Team member A: verified reproduction on screen-share, provided an immediate workaround for uploads, gave a realistic 1-2 hour update window, and set clear expectations that workarounds do not replace real fixes.',
      commercialSignals: {
        currenciesMentioned: ['INR 18,200 (payment amount in buggy modal)'],
        statedProducts: ['Bill Pay', 'Recreate Payment', 'Reimbursements', 'Mark as Paid'],
        caution: 'Figures are transactional test payments, not pipeline revenue.'
      }
    }
  },

  M09: {
    recordRef: 'M09',
    sourceType: 'meeting',
    sourceId: '4b5b9192-f3fc-505a-8e77-4d2ffaa54594',
    derivedAccount: 'Brookmint Holdings / Northkite Equipment',
    suggestedRoutes: ['Customer Support / Bugs', 'Internal Operations'],
    routeReason: 'Onboarding access failure (expired reset token) and security/permissions architecture across multiple company entities.',
    urgencyLevel: 'High',
    analysisV1: {
      headline: 'Multi-Entity Access Failure: Expired Reset Token & Shared Mailbox Permission Vulnerability',
      whatHappened: 'Customer A met Team member A to configure two related company accounts: Northkite Equipment (low-volume trial) and Brookmint Holdings (main employee base). Two issues arose: (1) Freshly generated password reset link for Brookmint failed with "token has expired" immediately. (2) Security architecture risk: Customer considered using a shared accounts mailbox for admin rights, which would inadvertently give the AP clerk full administrator privileges without accountability.',
      whyItMatters: 'Onboarding bottleneck for primary client entity; critical security advice required regarding separation of duties and least-privilege access.',
      supportingCitations: [
        {
          citation: 'M09 Turn 11-17 (Shared Mailbox Security Conflict)',
          quote: 'But the accounts-payable officer can read that shared mailbox. Would that give that person the same administrator rights as me?... I do not want this to depend on trusting someone not to use access that is available. That does not solve the permission problem.',
          speaker: 'Customer A',
          significance: 'Customer correctly identified internal control failure with shared mailbox admin logins.'
        },
        {
          citation: 'M09 Turn 21-22 (Expired Token Defect)',
          quote: 'It says the token has expired. This is the fresh message we just received. I need to check that with the team. I hope to update you today, or by Monday at the latest.',
          speaker: 'Customer A / Team member A',
          significance: 'Authentication service defect preventing client onboarding.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'Root cause of immediate token expiration (clock drift vs token generation bug).',
        'Whether IT will approve separate individual work email accounts for each entity.'
      ],
      statedNextSteps: [
        {
          task: 'Investigate Brookmint Holdings expired password reset token with engineering; update customer today or Monday.',
          owner: 'Team member A',
          isExplicitlyStated: true,
          deadline: '2026-08-24'
        },
        {
          task: 'Customer A to consult IT regarding separate individual email identities for administrator access.',
          owner: 'Customer A',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'Team member A provided sound security counsel (Turn 18): never rely on trust when shared credentials compromise audit trails. Ensure role-based access control (RBAC) training is provided.',
      commercialSignals: {
        currenciesMentioned: [],
        statedProducts: ['Multi-Entity Workspaces', 'User Roles & Permissions', 'Transaction Sync'],
        caution: 'Existing onboarding account; no new deal revenue.'
      }
    }
  },

  M10: {
    recordRef: 'M10',
    sourceType: 'meeting',
    sourceId: '337f297d-9385-5b82-9e54-5019c1ed912c',
    derivedAccount: 'SpendNest Internal (Billing Training)',
    suggestedRoutes: ['Internal Operations'],
    routeReason: 'INTERNAL STAFF TRAINING: Back-office billing engine walkthrough, collection grace periods, and wallet freeze recovery.',
    urgencyLevel: 'Low',
    analysisV1: {
      headline: 'Internal Operations Training: Automated Billing Engine & Account Freeze Recovery',
      whatHappened: 'Team member A trained Team member B and C on SpendNest\'s proprietary back-office billing application. Walked through recurring subscription components, invoice generation at customer midnight, retry schedules (Day 1, 3, 7, and Day 10 account freeze on insufficient wallet funds), and manual operational recovery steps required after top-up to unfreeze cards and correct the billing cycle date.',
      whyItMatters: 'CRITICAL INTERNAL KNOWLEDGE: Explains upstream billing logic and why invoice date does not match cash collection date. Must be routed strictly to Operations / Internal Training.',
      supportingCitations: [
        {
          citation: 'M10 Turn 7-8 (Invoicing vs Collection Gap)',
          quote: 'The nominal due period is seven days, but we sometimes give the customer until the end of the month... an invoice dated in an earlier month might have been cleared later, so check the dates rather than assuming they match.',
          speaker: 'Team member A',
          significance: 'Core reconciliation knowledge: nominal invoice date differs from cash receipt.'
        },
        {
          citation: 'M10 Turn 15-18 (Retry Engine & Account Freeze Recovery)',
          quote: 'The system tries three times... On the seventh day, now with a warning that another failure will freeze the account... On the tenth day... payments and cards can be blocked... Simply topping up a frozen account does not complete the whole recovery flow... Operations also needs to adjust the next billing date manually.',
          speaker: 'Team member A',
          significance: 'Documents mandatory manual operational step to unfreeze client and fix billing cycle.'
        }
      ],
      whatEvidenceDoesNotEstablish: [
        'No external customer was present; entirely internal knowledge transfer.',
        'No opportunity or sales pipeline is involved.'
      ],
      statedNextSteps: [
        {
          task: 'Request back-office super-admin access for Team member B ahead of next training session.',
          owner: 'Team member A',
          isExplicitlyStated: true
        }
      ],
      coachingNotes: 'Important routing rule: Meetings with internal attendees and training titles must be automatically quarantined from sales manager quotas and prospect queues.',
      commercialSignals: {
        currenciesMentioned: ['INR 6,240', 'INR 6,110 (wallet deduction failure example)'],
        statedProducts: ['Back-Office Billing Engine', 'Automated Wallet Deduction', 'Account Freeze Module'],
        caution: 'Figures are internal illustrative test scenarios.'
      }
    }
  }
};
