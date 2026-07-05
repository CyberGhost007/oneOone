const draftKey = "one-on-one-review-v2-state-v3";
const STATE_VERSION = 2;

// NOTE on markup building: this app renders templates with innerHTML by design
// (no framework). Every dynamic value MUST be passed through escapeHtml()
// before interpolation — grep for escapeHtml before changing render helpers.

const responseOptions = [
  "I acknowledge",
  "Data is incorrect",
  "Let's discuss this in detail",
  "I need more support for this",
];

const responseTypeMeta = [
  { key: "acknowledged", label: "Acknowledged", tone: "green", response: "I acknowledge" },
  { key: "incorrect", label: "Data incorrect", tone: "red", response: "Data is incorrect" },
  { key: "discuss", label: "Discuss further", tone: "blue", response: "Let's discuss this in detail" },
  { key: "support", label: "Need support", tone: "purple", response: "I need more support for this" },
  { key: "noResponse", label: "No response", tone: "gray", response: "" },
];

const MONTHS = [
  { key: "2025-10", short: "Oct", name: "October", year: 2025 },
  { key: "2025-11", short: "Nov", name: "November", year: 2025 },
  { key: "2025-12", short: "Dec", name: "December", year: 2025 },
  { key: "2026-01", short: "Jan", name: "January", year: 2026 },
  { key: "2026-02", short: "Feb", name: "February", year: 2026 },
  { key: "2026-03", short: "Mar", name: "March", year: 2026 },
  { key: "2026-04", short: "Apr", name: "April", year: 2026 },
  { key: "2026-05", short: "May", name: "May", year: 2026 },
  { key: "2026-06", short: "Jun", name: "June", year: 2026 },
];

const MONTH_INDEX = Object.fromEntries(MONTHS.map((month, index) => [month.key, index]));

const QUARTERS = [
  { key: "2025-Q4", label: "Q4 2025 (Oct–Dec)", months: ["2025-10", "2025-11", "2025-12"] },
  { key: "2026-Q1", label: "Q1 2026 (Jan–Mar)", months: ["2026-01", "2026-02", "2026-03"] },
  { key: "2026-Q2", label: "Q2 2026 (Apr–Jun)", months: ["2026-04", "2026-05", "2026-06"] },
];

const REPORT_ICONS = {
  people: `<svg viewBox="0 0 24 24"><path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 20v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>`,
  check: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="m8.6 12.4 2.3 2.3 4.6-4.9" /></svg>`,
  trend: `<svg viewBox="0 0 24 24"><polyline points="3 16 9 10 13 14 21 6" /><polyline points="14 6 21 6 21 13" /></svg>`,
  chat: `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>`,
  alert: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>`,
  clock: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3 2" /></svg>`,
};

const LOWER_IS_BETTER_KPI = /aht|handling time|resolution time|escalation|backlog/i;

const seedMembers = [
  { id: "sarah", name: "Sarah Johnson", email: "sarah.johnson@company.com" },
  { id: "michael", name: "Michael Chen", email: "michael.chen@company.com" },
  { id: "emily", name: "Emily Rodriguez", email: "emily.rodriguez@company.com" },
  { id: "david", name: "David Thompson", email: "david.thompson@company.com" },
  { id: "jessica", name: "Jessica Williams", email: "jessica.williams@company.com" },
];

function task(focusArea, timeline, kpi, data, comment = "", agentResponse = "", agentNote = "", agentRespondedAt = "") {
  return { focusArea, timeline, kpi, data, comment, agentResponse, agentNote, agentRespondedAt };
}

const seedReviews = [
  // Michael Chen — matches the v2 design references.
  {
    id: "michael_2026-01",
    memberId: "michael",
    months: ["2026-01"],
    status: "closed",
    tasks: [
      task("Lift billing volume to 1340+", "End of Jan", "Overall Bills", { "2026-01": "1352" }, "Target met", "I acknowledge", "", "Jan 20, 2026 11:05 AM"),
      task("Hold accuracy above 93.5%", "Ongoing", "Accuracy", { "2026-01": "93.6%" }, "On target"),
      task("", "", "AHT", { "2026-01": "8.3 min" }, "Slightly above 8 min"),
      task("", "", "Utilization %", { "2026-01": "89%" }),
    ],
    feedback: [],
    acknowledgedAt: "January 22, 2026",
    lastUpdated: "Jan 19, 2026 5:30 AM",
  },
  {
    id: "michael_2026-02",
    memberId: "michael",
    months: ["2026-02"],
    status: "closed",
    tasks: [
      task("Keep billing momentum above 1350", "End of Feb", "Overall Bills", { "2026-02": "1364" }, "Met"),
      task("Push accuracy toward 94%", "Ongoing", "Accuracy", { "2026-02": "93.9%" }, "Trending up"),
      task("Bring AHT closer to 8 min", "End of Feb", "AHT", { "2026-02": "8.1 min" }),
      task("", "", "Utilization %", { "2026-02": "90%" }),
    ],
    feedback: [],
    acknowledgedAt: "February 20, 2026",
    lastUpdated: "Feb 18, 2026 5:30 AM",
  },
  {
    id: "michael_2026-03_2026-04",
    memberId: "michael",
    months: ["2026-03", "2026-04"],
    status: "closed",
    tasks: [
      task("Billing above 1360", "End of Mar", "Overall Bills", { "2026-03": "1372", "2026-04": "1360" }, "Exceeded"),
      task("Accuracy at 94%+", "Ongoing", "Accuracy", { "2026-03": "93.9%", "2026-04": "94.4%" }),
      task("AHT at 7.8 min", "End of Mar", "AHT", { "2026-03": "8.0 min", "2026-04": "7.8 min" }, "On target"),
      task("", "", "Utilization %", { "2026-03": "90%", "2026-04": "92%" }, "High utilization"),
    ],
    feedback: [],
    acknowledgedAt: "March 22, 2026",
    lastUpdated: "Mar 19, 2026 5:30 AM",
  },
  {
    id: "michael_2026-05",
    memberId: "michael",
    months: ["2026-05"],
    status: "awaiting",
    history: [
      {
        focusArea: "Billing above 1360",
        kpi: "Overall Bills",
        data: "1360",
        status: "Completed",
        comment: "Exceeded the target across March and April.",
        timeline: "End of Mar",
      },
      {
        focusArea: "Accuracy at 94%+",
        kpi: "Accuracy",
        data: "94.4%",
        status: "Completed",
        comment: "Hit 94.4% in April.",
        timeline: "Ongoing",
      },
      {
        focusArea: "AHT at 7.8 min",
        kpi: "AHT",
        data: "7.8 min",
        status: "In Progress",
        comment: "On target — keep it under 8.",
        timeline: "End of Mar",
      },
    ],
    tasks: [
      task("Sustain high billing throughput", "End of May", "Overall Bills", { "2026-05": "1380" }),
      task("Maintain accuracy", "Ongoing", "Accuracy", { "2026-05": "94.2%" }),
      task("Keep AHT at or below 8 min", "End of May", "AHT", { "2026-05": "7.8 min" }),
      task("", "", "Utilization %", { "2026-05": "92%" }),
    ],
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: "May 8, 2026 5:30 AM",
  },

  // Sarah Johnson
  {
    id: "sarah_2026-01",
    memberId: "sarah",
    months: ["2026-01"],
    status: "closed",
    tasks: [
      task("Stabilize daily billing volume", "End of Jan", "Overall Bills", { "2026-01": "1238" }, "Consistent"),
      task("Hold accuracy above 96%", "Ongoing", "Accuracy", { "2026-01": "96.1%" }, "On target", "I acknowledge", "", "Jan 19, 2026 3:40 PM"),
      task("", "", "AHT", { "2026-01": "8.4 min" }),
      task("", "", "Utilization %", { "2026-01": "85%" }),
    ],
    feedback: [],
    acknowledgedAt: "January 21, 2026",
    lastUpdated: "Jan 18, 2026 4:10 PM",
  },
  {
    id: "sarah_2026-02",
    memberId: "sarah",
    months: ["2026-02"],
    status: "closed",
    tasks: [
      task("Grow volume without accuracy dips", "End of Feb", "Overall Bills", { "2026-02": "1240" }),
      task("Document recurring edge cases", "Mid-Feb", "Accuracy", { "2026-02": "96.0%" }, "Playbook started"),
      task("", "", "AHT", { "2026-02": "8.3 min" }),
      task("", "", "Utilization %", { "2026-02": "86%" }),
    ],
    feedback: [],
    acknowledgedAt: "February 19, 2026",
    lastUpdated: "Feb 17, 2026 9:20 AM",
  },
  {
    id: "sarah_2026-03_2026-04",
    memberId: "sarah",
    months: ["2026-03", "2026-04"],
    status: "reopened",
    tasks: [
      task("Billing at 1250 by April", "End of Apr", "Overall Bills", { "2026-03": "1244", "2026-04": "1250" }, "Met"),
      task("Accuracy at 96.5%", "Ongoing", "Accuracy", { "2026-03": "96.2%", "2026-04": "96.5%" }, "Strong finish"),
      task("AHT toward 8.2 min", "End of Apr", "AHT", { "2026-03": "8.3 min", "2026-04": "8.2 min" }),
      task("", "", "Utilization %", { "2026-03": "86%", "2026-04": "87%" }),
    ],
    feedback: [
      {
        from: "supervisor",
        text: "Sarah closed the quarter strong. Accuracy is the benchmark for the team.",
        at: "Apr 21, 2026",
      },
    ],
    acknowledgedAt: "April 23, 2026",
    lastUpdated: "Apr 21, 2026 8:05 AM",
  },
  {
    id: "sarah_2026-05",
    memberId: "sarah",
    months: ["2026-05"],
    status: "awaiting-supervisor",
    history: [
      {
        focusArea: "Improve ticket resolution time by 15%",
        kpi: "AHT",
        data: "8.2 min",
        status: "In Progress",
        comment: "Good progress — AHT reduced from 9.1 to 8.2 min. Keep pushing.",
        timeline: "End of April",
      },
      {
        focusArea: "Complete advanced customer service training",
        kpi: "Quality",
        data: "93%",
        status: "Completed",
        comment: "Completed ahead of schedule. Well done.",
        timeline: "Mid-April",
      },
      {
        focusArea: "Reduce escalations by handling complex queries independently",
        kpi: "Accuracy",
        data: "96.5%",
        status: "In Progress",
        comment: "Escalation rate is down 8%. On track.",
        timeline: "Ongoing",
      },
    ],
    tasks: [
      task(
        "Maintain billing volume above 1200 per month",
        "End of May",
        "Overall Bills",
        { "2026-05": "1250" },
        "",
        "Let's discuss this in detail",
        "",
        "May 12, 5:30 AM",
      ),
      task("Keep accuracy above 96%", "Ongoing", "Accuracy", { "2026-05": "96.5%" }, "", "I acknowledge", "", "May 12, 5:30 AM"),
      task("Bring AHT below 8 min", "End of May", "AHT", { "2026-05": "8.2 min" }, "", "I need more support for this", "", "May 12, 5:30 AM"),
      task("", "", "Utilization %", { "2026-05": "87%" }),
    ],
    feedback: [
      {
        from: "supervisor",
        text: "May has been a mixed but generally positive month, Sarah. The system outage impacted billing volume — we've adjusted the target to reflect that. Quality and accuracy remain strong. The open discussion on the billing goal is appreciated; this is exactly the kind of proactive communication I want to encourage.",
        at: "May 13, 2026",
      },
      {
        from: "agent",
        text: "Thank you for being understanding about the outage impact. I want to make sure the targets we set are realistic so I can actually commit to them with confidence. I'd also like to discuss the AHT target — 8 min is aggressive and I want to make sure we have a plan to get there.",
        at: "May 14, 2026",
      },
    ],
    acknowledgedAt: "May 14, 2026",
    lastUpdated: "May 13, 2026 5:30 AM",
  },
  {
    id: "sarah_2026-06",
    memberId: "sarah",
    months: ["2026-06"],
    status: "awaiting",
    tasks: [
      task("Achieve billing volume of 1280+", "End of Jun", "Overall Bills", { "2026-06": "1265" }),
      task("Maintain accuracy above 95.5%", "Ongoing", "Accuracy", { "2026-06": "95.5%" }),
      task("Keep AHT at or below 8.2 min", "End of Jun", "AHT", { "2026-06": "8.3 min" }),
      task("", "", "Utilization %", { "2026-06": "88%" }),
    ],
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: "Jun 5, 2026 5:30 AM",
  },

  // Emily Rodriguez
  {
    id: "emily_2026-02",
    memberId: "emily",
    months: ["2026-02"],
    status: "closed",
    tasks: [
      task("Improve AHT without reducing QA", "End of Feb", "AHT", { "2026-02": "8.6 min" }, "Improving"),
      task("Lift quality score to 90%", "Ongoing", "Quality", { "2026-02": "89%" }),
    ],
    feedback: [],
    acknowledgedAt: "February 21, 2026",
    lastUpdated: "Feb 19, 2026 10:12 AM",
  },
  {
    id: "emily_2026-05",
    memberId: "emily",
    months: ["2026-05"],
    status: "in-progress",
    tasks: [
      task("", "", "AHT", { "2026-05": "8.1 min" }),
      task("", "", "Quality", { "2026-05": "90%" }),
    ],
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: "May 9, 2026 10:12 AM",
  },

  // David Thompson
  {
    id: "david_2026-01",
    memberId: "david",
    months: ["2026-01"],
    status: "closed",
    tasks: [
      task("Complete cross-skill training plan", "End of Jan", "Training", { "2026-01": "45%" }, "Behind plan"),
      task("Hold CSAT at 87%+", "Ongoing", "CSAT", { "2026-01": "87%" }),
      task("", "", "Escalations", { "2026-01": "16" }),
    ],
    feedback: [],
    acknowledgedAt: "January 23, 2026",
    lastUpdated: "Jan 20, 2026 9:45 AM",
  },
  {
    id: "david_2026-05",
    memberId: "david",
    months: ["2026-05"],
    status: "awaiting",
    tasks: [
      task("Bring escalations under 12", "End of May", "Escalations", { "2026-05": "14" }),
      task("", "", "CSAT", { "2026-05": "88%" }),
    ],
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: "May 6, 2026 9:45 AM",
  },

  // Jessica Williams
  {
    id: "jessica_2026-02",
    memberId: "jessica",
    months: ["2026-02"],
    status: "closed",
    tasks: [
      task("Stabilize weekend staffing coverage", "End of Feb", "Adherence", { "2026-02": "90%" }, "Improving"),
      task("", "", "Backlog", { "2026-02": "36" }),
    ],
    feedback: [],
    acknowledgedAt: "February 20, 2026",
    lastUpdated: "Feb 18, 2026 2:15 PM",
  },
  {
    id: "jessica_2026-05",
    memberId: "jessica",
    months: ["2026-05"],
    status: "awaiting",
    tasks: [
      task("Stabilize weekend coverage", "Mid-May", "Adherence", { "2026-05": "91%" }),
      task("", "", "Backlog", { "2026-05": "32" }),
    ],
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: "May 7, 2026 2:15 PM",
  },
];

let state = createInitialState();

// Transient UI state (not persisted).
const draftMonths = new Set();
const feedbackDrafts = new Map();
let feedbackComposerReviewId = null;
let activeResponseTarget = null;
let completionTrendChart = null;
let trendChart = null;

const els = {
  navButtons: document.querySelectorAll(".nav-button"),
  dashboardHead: document.querySelector("#dashboardHead"),
  dashboardTitle: document.querySelector("#dashboard-title"),
  dashboardSubtitle: document.querySelector("#dashboardSubtitle"),
  reportsOnly: document.querySelectorAll(".reports-only"),
  supervisorView: document.querySelector("#supervisorView"),
  agentView: document.querySelector("#agentView"),
  reportsView: document.querySelector("#reportsView"),
  memberChips: document.querySelector("#memberChips"),
  monthChips: document.querySelector("#monthChips"),
  selectedMonthsLine: document.querySelector("#selectedMonthsLine"),
  startReviewButton: document.querySelector("#startReviewButton"),
  periodList: document.querySelector("#periodList"),
  reviewDetailPanel: document.querySelector("#reviewDetailPanel"),
  agentSelect: document.querySelector("#agentSelect"),
  agentPeriodSelect: document.querySelector("#agentPeriodSelect"),
  agentToolbarStatus: document.querySelector("#agentToolbarStatus"),
  agentAvatar: document.querySelector("#agentAvatar"),
  agentName: document.querySelector("#agentName"),
  agentEmail: document.querySelector("#agentEmail"),
  agentReviewDetailPanel: document.querySelector("#agentReviewDetailPanel"),
  rangeModeButtons: document.querySelectorAll("[data-range-mode]"),
  reportMonthSelect: document.querySelector("#reportMonthSelect"),
  reportQuarterSelect: document.querySelector("#reportQuarterSelect"),
  reportFromSelect: document.querySelector("#reportFromSelect"),
  reportToSelect: document.querySelector("#reportToSelect"),
  customRangeWrap: document.querySelector("#customRangeWrap"),
  reportKpis: document.querySelector("#reportKpis"),
  completionChart: document.querySelector("#completionChart"),
  monthlyReportBody: document.querySelector("#monthlyReportBody"),
  responseSummaryCards: document.querySelector("#responseSummaryCards"),
  agentBreakdownBody: document.querySelector("#agentBreakdownBody"),
  responseModal: document.querySelector("#responseModal"),
  responseForm: document.querySelector("#responseForm"),
  responseGoalSummary: document.querySelector("#responseGoalSummary"),
  responseNote: document.querySelector("#responseNote"),
  submitResponse: document.querySelector("#submitResponse"),
  closeResponseModal: document.querySelector("#closeResponseModal"),
  cancelResponse: document.querySelector("#cancelResponse"),
  trendModal: document.querySelector("#trendModal"),
  trendModalTitle: document.querySelector("#trendModalTitle"),
  trendModalSubtitle: document.querySelector("#trendModalSubtitle"),
  trendStats: document.querySelector("#trendStats"),
  trendChartCanvas: document.querySelector("#trendChart"),
  closeTrendModal: document.querySelector("#closeTrendModal"),
  toast: document.querySelector("#toast"),
};

function createInitialState() {
  const draft = loadDraft();
  if (draft && draft.version === STATE_VERSION && Array.isArray(draft.members) && Array.isArray(draft.reviews)) {
    return normalizeState(draft);
  }

  return normalizeState({
    version: STATE_VERSION,
    activeView: "supervisor",
    selectedMemberId: null,
    selectedPeriodKey: null,
    selectedAgentId: "sarah",
    selectedAgentPeriodKey: null,
    reportRange: null,
    members: structuredClone(seedMembers),
    reviews: structuredClone(seedReviews),
  });
}

function loadDraft(key = draftKey) {
  try {
    const rawDraft = localStorage.getItem(key);
    return rawDraft ? JSON.parse(rawDraft) : null;
  } catch {
    return null;
  }
}

function normalizeState(rawState) {
  const members = seedMembers.map((seedMember) => {
    const stored = (rawState.members ?? []).find((member) => member.id === seedMember.id);
    return { ...seedMember, ...stored };
  });

  const reviews = (Array.isArray(rawState.reviews) ? rawState.reviews : structuredClone(seedReviews))
    .filter((review) => members.some((member) => member.id === review.memberId))
    .map((review) => ({
      id: review.id,
      memberId: review.memberId,
      months: (review.months ?? []).filter((key) => key in MONTH_INDEX),
      status: ["in-progress", "awaiting", "awaiting-supervisor", "reopened", "closed"].includes(review.status)
        ? review.status
        : "in-progress",
      history: (Array.isArray(review.history) ? review.history : []).map((item) => ({
        focusArea: item.focusArea ?? "",
        kpi: item.kpi ?? "",
        data: item.data ?? "",
        status: item.status ?? "",
        comment: item.comment ?? "",
        timeline: item.timeline ?? "",
      })),
      tasks: (review.tasks ?? []).map((item) => ({
        focusArea: item.focusArea ?? "",
        timeline: item.timeline ?? "",
        kpi: item.kpi ?? "",
        data: item.data && typeof item.data === "object" ? item.data : {},
        comment: item.comment ?? "",
        agentResponse: item.agentResponse ?? "",
        agentNote: item.agentNote ?? "",
        agentRespondedAt: item.agentRespondedAt ?? "",
      })),
      feedback: normalizeFeedback(review),
      acknowledgedAt: review.acknowledgedAt ?? "",
      lastUpdated: review.lastUpdated ?? "",
    }))
    .filter((review) => review.months.length > 0);

  const selectedMemberId = members.some((member) => member.id === rawState.selectedMemberId)
    ? rawState.selectedMemberId
    : null;
  const selectedAgentId = members.some((member) => member.id === rawState.selectedAgentId)
    ? rawState.selectedAgentId
    : members[0].id;

  return {
    version: STATE_VERSION,
    activeView: ["supervisor", "agent", "reports"].includes(rawState.activeView) ? rawState.activeView : "supervisor",
    selectedMemberId,
    selectedPeriodKey: rawState.selectedPeriodKey ?? null,
    selectedAgentId,
    selectedAgentPeriodKey: rawState.selectedAgentPeriodKey ?? null,
    reportRange: normalizeReportRange(rawState.reportRange),
    members,
    reviews,
  };
}

function normalizeReportRange(raw) {
  const months2026 = MONTHS.filter((month) => month.year === 2026);
  return {
    mode: ["monthly", "quarterly", "custom"].includes(raw?.mode) ? raw.mode : "monthly",
    month: raw?.month === "all" || raw?.month in MONTH_INDEX ? raw.month : "all",
    quarter: QUARTERS.some((quarter) => quarter.key === raw?.quarter) ? raw.quarter : "2026-Q2",
    from: raw?.from in MONTH_INDEX ? raw.from : months2026[0].key,
    to: raw?.to in MONTH_INDEX ? raw.to : months2026[months2026.length - 1].key,
  };
}

function normalizeFeedback(review) {
  // Accepts the current shape (feedback: [{from, text, at}]) and migrates the
  // legacy single-string overallFeedback into a first supervisor message.
  const items = Array.isArray(review.feedback)
    ? review.feedback
    : (review.overallFeedback ?? "").trim()
      ? [{ from: "supervisor", text: review.overallFeedback, at: "" }]
      : [];

  return items
    .filter((message) => String(message?.text ?? "").trim())
    .map((message) => ({
      from: message.from === "agent" ? "agent" : "supervisor",
      text: String(message.text).trim(),
      at: message.at ?? "",
    }));
}

function persistDraft() {
  localStorage.setItem(draftKey, JSON.stringify(state));
}

/* ---------- Period helpers ---------- */

function monthByKey(key) {
  return MONTHS[MONTH_INDEX[key]];
}

function sortMonthKeys(keys) {
  return [...keys].sort((a, b) => MONTH_INDEX[a] - MONTH_INDEX[b]);
}

function areConsecutive(keys) {
  if (!keys.length) return false;
  const sorted = sortMonthKeys(keys);
  const first = MONTH_INDEX[sorted[0]];
  const last = MONTH_INDEX[sorted[sorted.length - 1]];
  return last - first === sorted.length - 1;
}

function periodKeyOf(months) {
  return months.join("_");
}

function periodLabelFromMonths(months) {
  const first = monthByKey(months[0]);
  const last = monthByKey(months[months.length - 1]);
  if (first === last) return `${first.short} ${first.year}`;
  if (first.year === last.year) return `${first.short}-${last.short} ${first.year}`;
  return `${first.short} ${first.year} - ${last.short} ${last.year}`;
}

function reviewTitlePeriod(review) {
  const first = monthByKey(review.months[0]);
  return `${first.name} ${first.year}`;
}

function memberById(id) {
  return state.members.find((member) => member.id === id) ?? null;
}

function reviewsOf(memberId) {
  return state.reviews
    .filter((review) => review.memberId === memberId)
    .sort((a, b) => MONTH_INDEX[b.months[b.months.length - 1]] - MONTH_INDEX[a.months[a.months.length - 1]]);
}

function reviewFor(memberId, periodKey) {
  return state.reviews.find((review) => review.memberId === memberId && periodKeyOf(review.months) === periodKey) ?? null;
}

function reviewById(id) {
  return state.reviews.find((review) => review.id === id) ?? null;
}

function allPeriods() {
  const map = new Map();
  state.reviews.forEach((review) => {
    const key = periodKeyOf(review.months);
    if (!map.has(key)) {
      map.set(key, { key, months: review.months });
    }
  });
  return [...map.values()].sort((a, b) => {
    const endDiff = MONTH_INDEX[b.months[b.months.length - 1]] - MONTH_INDEX[a.months[a.months.length - 1]];
    return endDiff !== 0 ? endDiff : MONTH_INDEX[b.months[0]] - MONTH_INDEX[a.months[0]];
  });
}

function availableMonths() {
  const covered = new Set(state.reviews.flatMap((review) => review.months));
  return MONTHS.filter((month) => !covered.has(month.key));
}

function statusLabel(status, mode = "supervisor") {
  if (status === "closed") return "Closed";
  if (status === "awaiting") return mode === "agent" ? "Open" : "Awaiting Agent Response";
  if (status === "awaiting-supervisor") return "Awaiting Supervisor Response";
  if (status === "reopened") return "Reopened";
  return "In Progress";
}

function statusBadgeClass(status, mode) {
  return status === "awaiting" && mode === "agent" ? "open" : status;
}

function statusDotTone(status) {
  return status === "closed" ? "green" : "amber";
}

function responseToneMeta(response) {
  return responseTypeMeta.find((item) => item.response === response) ?? null;
}

function agentCanAct(review) {
  return review.status === "awaiting" || review.status === "reopened";
}

/* ---------- Rendering ---------- */

function render() {
  renderShell();
  renderSupervisorViewContent();
  renderAgentDashboard();
  renderReports();
  autoSizeGoalFields();
  resetTableScroll();
}

function renderShell() {
  const isAgent = state.activeView === "agent";
  const isSupervisor = state.activeView === "supervisor";
  const isReports = state.activeView === "reports";

  els.dashboardHead.classList.toggle("hidden", !isReports);
  els.dashboardTitle.textContent = "Reports Dashboard";
  els.dashboardSubtitle.textContent = "Senior Leadership Analytics — 2026";
  els.dashboardSubtitle.classList.toggle("hidden", !isReports);
  els.supervisorView.classList.toggle("hidden", !isSupervisor);
  els.agentView.classList.toggle("hidden", !isAgent);
  els.reportsView.classList.toggle("hidden", !isReports);

  els.reportsOnly.forEach((el) => el.classList.toggle("hidden", !isReports));

  els.navButtons.forEach((button) => {
    const isActive = button.dataset.view === state.activeView;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderSupervisorViewContent() {
  renderMemberChips();
  renderNewPeriodControls();
  renderPeriodList();
  renderReviewDetail(els.reviewDetailPanel, "supervisor");
}

function renderMemberChips() {
  els.memberChips.innerHTML = "";
  state.members.forEach((member) => {
    const button = document.createElement("button");
    button.type = "button";
    const isActive = member.id === state.selectedMemberId;
    button.className = `member-chip ${isActive ? "active" : ""}`;
    button.setAttribute("aria-pressed", String(isActive));
    button.textContent = member.name;
    button.addEventListener("click", () => {
      state.selectedMemberId = member.id;
      const latest = reviewsOf(member.id)[0];
      state.selectedPeriodKey = latest ? periodKeyOf(latest.months) : null;
      feedbackComposerReviewId = null;
      persistDraft();
      render();
    });
    els.memberChips.append(button);
  });
}

function renderNewPeriodControls() {
  const months = availableMonths();
  [...draftMonths].forEach((key) => {
    if (!months.some((month) => month.key === key)) draftMonths.delete(key);
  });

  els.monthChips.innerHTML = "";
  if (!months.length) {
    els.monthChips.innerHTML = `<p class="periods-hint">All months in range are covered.</p>`;
  }
  months.forEach((month) => {
    const button = document.createElement("button");
    button.type = "button";
    const isSelected = draftMonths.has(month.key);
    button.className = `month-chip ${isSelected ? "selected" : ""}`;
    button.setAttribute("aria-pressed", String(isSelected));
    button.textContent = `${month.short} ${month.year}`;
    button.addEventListener("click", () => {
      if (draftMonths.has(month.key)) {
        draftMonths.delete(month.key);
      } else {
        draftMonths.add(month.key);
      }
      renderNewPeriodControls();
    });
    els.monthChips.append(button);
  });

  const selection = sortMonthKeys([...draftMonths]);
  const consecutive = areConsecutive(selection);
  const hasSelection = selection.length > 0;

  els.selectedMonthsLine.classList.toggle("hidden", !hasSelection);
  els.selectedMonthsLine.classList.toggle("invalid", hasSelection && !consecutive);
  els.selectedMonthsLine.textContent = !hasSelection
    ? ""
    : consecutive
      ? `Selected: ${selection.map((key) => `${monthByKey(key).short} ${monthByKey(key).year}`).join(", ")}`
      : "Selected months must be consecutive.";

  const canStart = Boolean(state.selectedMemberId) && hasSelection && consecutive;
  els.startReviewButton.disabled = !canStart;
  els.startReviewButton.title = !state.selectedMemberId
    ? "Select a team member first"
    : !hasSelection
      ? "Select one or more consecutive months"
      : !consecutive
        ? "Selected months must be consecutive"
        : "";
}

function renderPeriodList() {
  const member = memberById(state.selectedMemberId);
  els.periodList.innerHTML = "";

  allPeriods().forEach((period) => {
    const review = member ? reviewFor(member.id, period.key) : null;
    const isActive = Boolean(member) && state.selectedPeriodKey === period.key;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `period-card ${isActive ? "active" : ""} ${member ? "" : "inactive"}`;

    let statusHtml = `<span class="period-card-status muted">Select a team member</span>`;
    if (member) {
      statusHtml = review
        ? `<span class="period-card-status"><i class="status-dot ${statusDotTone(review.status)}"></i>${statusLabel(review.status)}</span>`
        : `<span class="period-card-status muted">No review</span>`;
    }

    button.innerHTML = `
      <span class="period-card-title">${escapeHtml(periodLabelFromMonths(period.months))}</span>
      ${statusHtml}
    `;

    if (member) {
      button.addEventListener("click", () => {
        state.selectedPeriodKey = period.key;
        feedbackComposerReviewId = null;
        persistDraft();
        render();
      });
    } else {
      button.setAttribute("aria-disabled", "true");
    }

    els.periodList.append(button);
  });
}

/* ---------- Review detail (shared by supervisor + agent) ---------- */

function renderReviewDetail(container, mode) {
  if (mode === "supervisor") {
    const member = memberById(state.selectedMemberId);
    if (!member) {
      container.innerHTML = emptyStateHtml(
        calendarIcon(),
        "Select a Team Member",
        "Choose an agent from the top to get started",
      );
      return;
    }

    if (!state.selectedPeriodKey) {
      container.innerHTML = emptyStateHtml(
        calendarIcon(),
        "Select a Review Period",
        "Pick a period on the left to open the review",
      );
      return;
    }

    const review = reviewFor(member.id, state.selectedPeriodKey);
    if (!review) {
      const period = allPeriods().find((item) => item.key === state.selectedPeriodKey);
      const label = period ? periodLabelFromMonths(period.months) : "this period";
      container.innerHTML = emptyStateHtml(
        calendarIcon(),
        `No review for ${escapeHtml(label)}`,
        `${escapeHtml(member.name)} does not have a one-on-one review for this period yet.`,
        `<button class="primary-button" type="button" data-action="start-period">
          <span aria-hidden="true">+</span> Start ${escapeHtml(label)} review
        </button>`,
      );
      container.querySelector('[data-action="start-period"]')?.addEventListener("click", () => {
        if (period) startReview(period.months);
      });
      return;
    }

    renderReviewCard(container, review, mode);
    return;
  }

  // Agent mode
  const agent = memberById(state.selectedAgentId);
  const shared = reviewsOf(agent.id).filter((review) => review.status !== "in-progress");
  if (!shared.length) {
    container.innerHTML = emptyStateHtml(
      calendarIcon(),
      "No reviews shared yet",
      "Your supervisor has not shared a one-on-one review with you yet.",
    );
    return;
  }

  const review = shared.find((item) => periodKeyOf(item.months) === state.selectedAgentPeriodKey) ?? shared[0];
  state.selectedAgentPeriodKey = periodKeyOf(review.months);
  renderReviewCard(container, review, mode);
}

function renderReviewCard(container, review, mode) {
  const member = memberById(review.memberId);
  const isSupervisor = mode === "supervisor";
  const editable = isSupervisor && review.status === "in-progress";

  const controls = [];
  controls.push(
    `<span class="status-badge ${statusBadgeClass(review.status, mode)}">${statusLabel(review.status, mode)}</span>`,
  );
  if (isSupervisor) {
    controls.push(
      `<button class="icon-button detail-close" type="button" data-action="close-detail" aria-label="Close review"><span aria-hidden="true">×</span></button>`,
    );
    if (review.status === "awaiting") {
      controls.push(
        `<button class="pull-back-button" type="button" data-action="pull-back">
          <span aria-hidden="true">↺</span> Pull Back
        </button>`,
      );
    }
    if (review.status === "closed") {
      controls.push(
        `<button class="pull-back-button" type="button" data-action="reopen">
          <span aria-hidden="true">↺</span> Reopen
        </button>`,
      );
    }
  }

  const topline = isSupervisor
    ? `<div>
        <h2>${escapeHtml(member.name)}</h2>
        <p class="detail-subtitle">One-on-One Review — ${escapeHtml(reviewTitlePeriod(review))}</p>
      </div>`
    : `<div>
        <h2>One-on-One Review — ${escapeHtml(periodLabelFromMonths(review.months))}</h2>
      </div>`;

  const tasksLead = isSupervisor
    ? "Key tasks to be discussed in this 1-on-1 meeting."
    : "Key tasks for this month's 1-on-1 meeting.";

  const tableHead = isSupervisor
    ? `<tr>
        <th>Focus Area</th>
        <th>Timeline</th>
        <th>KPI / Additional Parameters</th>
        <th>Data</th>
        <th>Comment</th>
        <th>Agent Response</th>
        <th class="action-col"><span class="sr-only">Actions</span></th>
      </tr>`
    : `<tr>
        <th>Focus Area</th>
        <th>Timeline</th>
        <th>KPI</th>
        <th>Data</th>
        <th>Your Response</th>
      </tr>`;

  container.innerHTML = `
    <div class="detail-topline">
      ${topline}
      <div class="detail-controls">${controls.join("")}</div>
    </div>

    ${historySectionHtml(review, mode)}

    <p class="detail-lead">${tasksLead}</p>

    <div class="table-wrap">
      <table class="tasks-table ${isSupervisor ? "" : "agent-tasks"}">
        <thead>${tableHead}</thead>
        <tbody>
          ${review.tasks.map((item, index) => taskRowHtml(review, item, index, mode)).join("")}
        </tbody>
      </table>
      ${
        editable
          ? `<div class="table-footer">
              <button class="primary-button" type="button" data-action="add-task">
                <span aria-hidden="true">+</span> Add Task
              </button>
            </div>`
          : ""
      }
    </div>

    ${feedbackSectionHtml(review, mode)}
    ${acknowledgementHtml(review, mode)}
    ${finalAcknowledgmentHtml(review, mode)}

    <footer class="detail-footer">
      <p>Last updated: ${escapeHtml(review.lastUpdated)}</p>
      ${buildFooterRight(review, mode)}
    </footer>
  `;

  bindReviewCard(container, review, mode);
}

function historySectionHtml(review, mode) {
  if (mode !== "agent" || !review.history?.length) return "";

  return `
    <p class="section-kicker">Section 1</p>
    <p class="detail-lead">Review of key points discussed at the last 1-on-1 meeting.</p>
    <div class="table-wrap history-wrap">
      <table class="history-table">
        <thead>
          <tr>
            <th>Focus Area</th>
            <th>KPI</th>
            <th>Data</th>
            <th>Status</th>
            <th>Supervisor&#039;s Comment</th>
            <th>Timeline</th>
          </tr>
        </thead>
        <tbody>
          ${review.history
            .map(
              (item, index) => `
                <tr>
                  <td>
                    <div class="numbered-cell">
                      <span class="row-number">${index + 1}.</span>
                      <span>${escapeHtml(item.focusArea)}</span>
                    </div>
                  </td>
                  <td class="metric-cell">${escapeHtml(item.kpi)}</td>
                  <td class="data-cell"><span class="data-plain">${escapeHtml(item.data)}</span></td>
                  <td>${historyStatusChip(item.status)}</td>
                  <td>${escapeHtml(item.comment)}</td>
                  <td>${escapeHtml(item.timeline)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function historyStatusChip(status) {
  if (!status) return "";
  const normalized = status.toLowerCase();
  const tone = normalized === "completed" ? "green" : normalized === "blocked" ? "red" : normalized === "not started" ? "gray" : "amber";
  return `<span class="status-chip ${tone}">${escapeHtml(status)}</span>`;
}

function finalAcknowledgmentHtml(review, mode) {
  if (mode !== "agent" || !agentCanAct(review)) return "";

  const total = review.tasks.length;
  const responded = review.tasks.filter((item) => item.agentResponse).length;

  const items = review.tasks
    .map((item, index) => {
      const meta = responseToneMeta(item.agentResponse);
      const pill = item.agentResponse
        ? `<span class="ack-item-pill ${meta?.tone ?? "gray"}">${escapeHtml(meta?.label ?? item.agentResponse)}</span>`
        : `<span class="ack-item-pill pending">Pending</span>`;
      return `<div class="ack-item"><span>Item ${index + 1}: ${escapeHtml(item.kpi || item.focusArea || "Task")}</span>${pill}</div>`;
    })
    .join("");

  const warning =
    responded < total
      ? `<div class="ack-warning">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
          </span>
          <span>You have not responded to all items yet. You can still submit your acknowledgment, but it is recommended to respond to each item first.</span>
        </div>`
      : "";

  return `
    <section class="final-ack-section" aria-label="Final acknowledgment">
      <div class="final-ack-head">
        <h3>Final Acknowledgment</h3>
        <p>Review your responses, then submit your overall acknowledgment for this review.</p>
      </div>
      <div class="final-ack-body">
        <div class="ack-items">${items}</div>
        ${warning}
        <div class="ack-footer">
          <span>${responded} of ${total} item${total === 1 ? "" : "s"} responded</span>
          <button class="acknowledge-button" type="button" data-action="acknowledge">
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
            </span>
            I Acknowledge
          </button>
        </div>
      </div>
    </section>
  `;
}

function buildFooterRight(review, mode) {
  if (mode !== "supervisor") return "";

  if (review.status === "in-progress") {
    return `<div class="footer-actions">
      <button class="primary-button" type="button" data-action="send-to-agent">Send to Agent</button>
    </div>`;
  }
  if (review.status === "awaiting") {
    return `<span class="footer-status"><span aria-hidden="true">◷</span> Awaiting agent response</span>`;
  }
  if (review.status === "awaiting-supervisor" || review.status === "reopened") {
    return `<div class="footer-actions">
      <button class="primary-button" type="button" data-action="close-review">Close Review</button>
    </div>`;
  }
  return "";
}

function taskRowHtml(review, item, index, mode) {
  if (mode === "agent") {
    return agentTaskRowHtml(review, item, index);
  }

  const editable = mode === "supervisor" && review.status === "in-progress";
  const multiMonth = review.months.length > 1;

  const focusCell = editable
    ? `<textarea rows="1" class="goal-field" placeholder="Enter focus area..." aria-label="Focus area ${index + 1}">${escapeHtml(item.focusArea)}</textarea>`
    : item.focusArea
      ? `<span>${escapeHtml(item.focusArea)}</span>`
      : `<em class="kpi-goal-label">KPI goal</em>`;

  const timelineCell = editable
    ? `<input class="timeline-field" value="${escapeHtml(item.timeline)}" placeholder="Timeline" aria-label="Timeline for task ${index + 1}" />`
    : escapeHtml(item.timeline || "—");

  const kpiCell = editable
    ? `<input class="kpi-field" value="${escapeHtml(item.kpi)}" placeholder="KPI" aria-label="KPI for task ${index + 1}" />`
    : escapeHtml(item.kpi);

  let dataCell;
  if (editable) {
    dataCell = `<div class="data-month-stack">${review.months
      .map(
        (key) => `
          <label>
            ${multiMonth ? `<span>${escapeHtml(monthByKey(key).short)}</span>` : ""}
            <input class="data-field" data-month="${key}" value="${escapeHtml(item.data[key] ?? "")}" placeholder="Data" aria-label="${escapeHtml(monthByKey(key).short)} data for task ${index + 1}" />
          </label>
        `,
      )
      .join("")}</div>`;
  } else if (multiMonth) {
    dataCell = `<button class="trend-button" type="button" data-action="trend" data-task="${index}" aria-label="View ${escapeHtml(item.kpi || "KPI")} trend">
        <span aria-hidden="true">↗</span> Trend
      </button>`;
  } else {
    const value = item.data[review.months[0]] ?? "";
    dataCell = value ? `<span class="data-plain">${escapeHtml(value)}</span>` : `<span class="kpi-goal-label">—</span>`;
  }

  const commentCell = editable
    ? `<textarea rows="1" class="comment-field" placeholder="Add comment..." aria-label="Comment for task ${index + 1}">${escapeHtml(item.comment)}</textarea>`
    : escapeHtml(item.comment);

  const responseCell = agentResponseCellHtml(review, item, mode);

  const actionCell = editable
    ? `<button class="icon-button" type="button" title="Remove task" aria-label="Remove task ${index + 1}" data-action="remove-task" data-task="${index}" ${review.tasks.length === 1 ? "disabled" : ""}><span aria-hidden="true">×</span></button>`
    : "";

  return `
    <tr data-task-row="${index}">
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          ${focusCell}
        </div>
      </td>
      <td>${timelineCell}</td>
      <td class="metric-cell">${kpiCell}</td>
      <td class="data-cell">${dataCell}</td>
      <td>${commentCell}</td>
      <td>${responseCell}</td>
      <td class="action-col">${actionCell}</td>
    </tr>
  `;
}

function agentTaskRowHtml(review, item, index) {
  const multiMonth = review.months.length > 1;
  const canAct = agentCanAct(review);

  const focusCell = item.focusArea
    ? `<span>${escapeHtml(item.focusArea)}</span>`
    : `<em class="kpi-goal-label">KPI goal</em>`;

  const timelineCell = item.timeline ? escapeHtml(item.timeline) : `<em class="kpi-goal-label">Not set</em>`;

  const dataCell = multiMonth
    ? `<button class="trend-button" type="button" data-action="trend" data-task="${index}" aria-label="View ${escapeHtml(item.kpi || "KPI")} trend">
        <span aria-hidden="true">↗</span> Trend
      </button>`
    : `<span class="data-plain">${escapeHtml(item.data[review.months[0]] ?? "")}</span>`;

  let responseCell;
  if (item.agentResponse) {
    const tone = responseToneMeta(item.agentResponse)?.tone ?? "gray";
    const chip = `<span class="response-chip ${tone}">${escapeHtml(item.agentResponse)}</span>`;
    responseCell = `
      <div class="response-summary">
        ${
          canAct
            ? `<button class="response-chip-button" type="button" data-action="respond" data-task="${index}" title="Edit response">${chip}</button>`
            : chip
        }
        ${item.agentNote ? `<small class="response-note-preview">${escapeHtml(item.agentNote)}</small>` : ""}
        ${item.agentRespondedAt ? `<small class="response-time">${escapeHtml(item.agentRespondedAt)}</small>` : ""}
      </div>
    `;
  } else if (canAct) {
    responseCell = `
      <button class="respond-button" type="button" data-action="respond" data-task="${index}">
        <span class="respond-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" /></svg>
        </span>
        Respond
      </button>
    `;
  } else {
    responseCell = `<em class="kpi-goal-label">No response</em>`;
  }

  return `
    <tr data-task-row="${index}">
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          ${focusCell}
        </div>
      </td>
      <td>${timelineCell}</td>
      <td class="metric-cell">${escapeHtml(item.kpi)}</td>
      <td class="data-cell">${dataCell}</td>
      <td>${responseCell}</td>
    </tr>
  `;
}

function agentResponseCellHtml(review, item, mode) {
  if (item.agentResponse) {
    const tone = responseToneMeta(item.agentResponse)?.tone ?? "gray";
    return `
      <div class="response-summary">
        <span class="response-chip ${tone}">${escapeHtml(item.agentResponse)}</span>
        ${item.agentNote ? `<small class="response-note-preview">${escapeHtml(item.agentNote)}</small>` : ""}
        ${item.agentRespondedAt ? `<small class="response-time">${escapeHtml(item.agentRespondedAt)}</small>` : ""}
      </div>
    `;
  }

  if (review.status === "awaiting") {
    return `<span class="pending-pill">Pending</span>`;
  }

  return `<span class="kpi-goal-label">—</span>`;
}

function feedbackDraftKey(review, mode) {
  return `${mode}:${review.id}`;
}

function feedbackSectionHtml(review, mode) {
  const messages = review.feedback ?? [];
  const member = memberById(review.memberId);

  // Supervisor can write until the review closes; the agent can write while
  // the review is open (or reopened) for them. Closed reviews keep a frozen thread.
  const canWrite = mode === "supervisor" ? review.status !== "closed" : agentCanAct(review);
  const composerOpen = canWrite && (messages.length > 0 || feedbackComposerReviewId === review.id);

  const thread = messages.length
    ? `<div class="feedback-thread">${messages
        .map((message) => {
          const fromSupervisor = message.from === "supervisor";
          const mine = (mode === "supervisor") === fromSupervisor;
          const label = fromSupervisor ? "Supervisor" : member.name;
          const avatar = fromSupervisor ? "S" : initials(member.name);
          return `
            <div class="feedback-msg ${mine ? "mine" : "theirs"}">
              <span class="msg-avatar ${fromSupervisor ? "supervisor" : "agent"}" aria-hidden="true">${escapeHtml(avatar)}</span>
              <div class="msg-bubble">
                <p class="msg-meta">${escapeHtml(label)}${message.at ? ` · ${escapeHtml(message.at)}` : ""}</p>
                <p class="msg-text">${escapeHtml(message.text)}</p>
              </div>
            </div>
          `;
        })
        .join("")}</div>`
    : "";

  const draft = feedbackDrafts.get(feedbackDraftKey(review, mode)) ?? "";
  const composer = composerOpen
    ? `
      <div class="feedback-composer">
        <textarea class="composer-field" data-action="feedback-draft" rows="3"
          placeholder="${mode === "supervisor" ? "Write your overall assessment..." : "Write your reply..."}"
          aria-label="${mode === "supervisor" ? "Overall assessment message" : "Reply to supervisor"}">${escapeHtml(draft)}</textarea>
        <div class="composer-actions">
          <button class="primary-button send-button" type="button" data-action="feedback-send" ${draft.trim() ? "" : "disabled"}>
            <span class="send-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4z" /></svg>
            </span>
            Send
          </button>
          <button class="secondary-button" type="button" data-action="feedback-cancel">Cancel</button>
        </div>
      </div>
    `
    : "";

  let body;
  if (messages.length || composerOpen) {
    body = `${thread}${composer}`;
  } else if (canWrite) {
    const addLabel =
      mode === "supervisor"
        ? `<span aria-hidden="true">+</span> Add overall feedback / assessment`
        : `<span class="respond-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" /></svg>
          </span> Add your overall comment`;
    body = `
      <p class="feedback-empty">No overall feedback added yet.</p>
      <button class="add-feedback-button" type="button" data-action="add-feedback">
        ${addLabel}
      </button>
    `;
  } else {
    body = `<p class="feedback-empty">No overall feedback added yet.</p>`;
  }

  return `
    <section class="feedback-section" aria-label="Overall feedback / assessment">
      <div class="feedback-head">Overall Feedback / Assessment</div>
      <div class="feedback-body">${body}</div>
    </section>
  `;
}

function acknowledgementHtml(review, mode) {
  if (mode !== "supervisor") return "";
  if (!review.acknowledgedAt || !["closed", "awaiting-supervisor"].includes(review.status)) return "";
  return `
    <div class="ack-banner">
      <span class="ack-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" /><path d="m8.6 12.4 2.3 2.3 4.6-4.9" /></svg>
      </span>
      <span>Agent acknowledged this review on <strong>${escapeHtml(review.acknowledgedAt)}</strong></span>
    </div>
  `;
}

function bindReviewCard(container, review, mode) {
  const isSupervisor = mode === "supervisor";
  const editable = isSupervisor && review.status === "in-progress";

  container.querySelector('[data-action="close-detail"]')?.addEventListener("click", () => {
    state.selectedPeriodKey = null;
    feedbackComposerReviewId = null;
    persistDraft();
    render();
  });

  container.querySelector('[data-action="pull-back"]')?.addEventListener("click", () => {
    review.status = "in-progress";
    review.lastUpdated = formatTimestamp(new Date());
    persistDraft();
    render();
    showToast("Review pulled back — you can edit it again.");
  });

  container.querySelector('[data-action="send-to-agent"]')?.addEventListener("click", () => sendToAgent(review));
  container.querySelector('[data-action="close-review"]')?.addEventListener("click", () => closeReview(review));
  container.querySelector('[data-action="reopen"]')?.addEventListener("click", () => reopenReview(review));
  container.querySelector('[data-action="add-task"]')?.addEventListener("click", () => {
    review.tasks.push(task("", "", "", {}));
    review.lastUpdated = formatTimestamp(new Date());
    persistDraft();
    render();
    container.querySelector("tbody tr:last-child .goal-field")?.focus();
  });

  container.querySelector('[data-action="acknowledge"]')?.addEventListener("click", () => acknowledgeReview(review));

  container.querySelectorAll('[data-action="trend"]').forEach((button) => {
    button.addEventListener("click", () => openTrendModal(review, Number(button.dataset.task)));
  });

  container.querySelectorAll('[data-action="respond"]').forEach((button) => {
    button.addEventListener("click", () => openResponseModal(review.id, Number(button.dataset.task)));
  });

  container.querySelectorAll('[data-action="remove-task"]').forEach((button) => {
    button.addEventListener("click", () => {
      review.tasks.splice(Number(button.dataset.task), 1);
      review.lastUpdated = formatTimestamp(new Date());
      persistDraft();
      render();
    });
  });

  container.querySelector('[data-action="add-feedback"]')?.addEventListener("click", () => {
    feedbackComposerReviewId = review.id;
    render();
    container.querySelector('[data-action="feedback-draft"]')?.focus();
  });

  const composerField = container.querySelector('[data-action="feedback-draft"]');
  if (composerField) {
    const sendButton = container.querySelector('[data-action="feedback-send"]');

    composerField.addEventListener("input", (event) => {
      feedbackDrafts.set(feedbackDraftKey(review, mode), event.target.value);
      sendButton.disabled = !event.target.value.trim();
      autoSizeField(event.target);
    });

    sendButton.addEventListener("click", () => {
      const text = (feedbackDrafts.get(feedbackDraftKey(review, mode)) ?? "").trim();
      if (!text) return;
      review.feedback.push({
        from: mode === "supervisor" ? "supervisor" : "agent",
        text,
        at: formatShortDate(new Date()),
      });
      feedbackDrafts.delete(feedbackDraftKey(review, mode));
      review.lastUpdated = formatTimestamp(new Date());
      persistDraft();
      render();
      container.querySelector('[data-action="feedback-draft"]')?.focus();
      showToast(mode === "supervisor" ? "Assessment sent to agent." : "Reply sent to supervisor.");
    });

    container.querySelector('[data-action="feedback-cancel"]')?.addEventListener("click", () => {
      feedbackDrafts.delete(feedbackDraftKey(review, mode));
      if (!review.feedback.length) {
        feedbackComposerReviewId = null;
      }
      render();
    });
  }

  if (!editable) return;

  container.querySelectorAll("tr[data-task-row]").forEach((row) => {
    const index = Number(row.dataset.taskRow);
    const item = review.tasks[index];
    if (!item) return;

    row.querySelector(".goal-field")?.addEventListener("input", (event) => {
      item.focusArea = event.target.value;
      autoSizeField(event.target);
      persistDraft();
    });
    row.querySelector(".timeline-field")?.addEventListener("input", (event) => {
      item.timeline = event.target.value;
      persistDraft();
    });
    row.querySelector(".kpi-field")?.addEventListener("input", (event) => {
      item.kpi = event.target.value;
      persistDraft();
    });
    row.querySelectorAll(".data-field").forEach((input) => {
      input.addEventListener("input", (event) => {
        item.data[input.dataset.month] = event.target.value;
        persistDraft();
      });
    });
    row.querySelector(".comment-field")?.addEventListener("input", (event) => {
      item.comment = event.target.value;
      autoSizeField(event.target);
      persistDraft();
    });
  });
}

function emptyStateHtml(icon, title, subtitle, extra = "") {
  return `
    <div class="detail-empty">
      ${icon}
      <h3>${title}</h3>
      <p>${subtitle}</p>
      ${extra}
    </div>
  `;
}

function calendarIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  `;
}

/* ---------- Review actions ---------- */

function startReview(monthKeys) {
  const member = memberById(state.selectedMemberId);
  if (!member) {
    showToast("Select a team member first.");
    return;
  }

  const months = sortMonthKeys(monthKeys);
  if (!months.length || !areConsecutive(months)) {
    showToast("Select one or more consecutive months.");
    return;
  }

  if (reviewFor(member.id, periodKeyOf(months))) {
    showToast(`${member.name} already has a ${periodLabelFromMonths(months)} review.`);
    return;
  }

  const latest = reviewsOf(member.id)[0];
  const tasks = latest
    ? latest.tasks.map((item) => {
        const latestValue = item.data[latest.months[latest.months.length - 1]] ?? "";
        return task("", "", item.kpi, Object.fromEntries(months.map((key) => [key, latestValue])));
      })
    : [task("", "", "", {})];

  const review = {
    id: `${member.id}_${months.join("_")}`,
    memberId: member.id,
    months,
    status: "in-progress",
    history: [],
    tasks,
    feedback: [],
    acknowledgedAt: "",
    lastUpdated: formatTimestamp(new Date()),
  };

  state.reviews.push(review);
  draftMonths.clear();
  state.selectedPeriodKey = periodKeyOf(months);
  feedbackComposerReviewId = null;
  persistDraft();
  render();
  showToast(`Started ${periodLabelFromMonths(months)} review for ${member.name}.`);
}

function sendToAgent(review) {
  const missingKpi = review.tasks.some((item) => !item.kpi.trim());
  if (!review.tasks.length || missingKpi) {
    showToast("Every task needs a KPI before sending to the agent.");
    return;
  }

  const member = memberById(review.memberId);
  review.status = "awaiting";
  review.lastUpdated = formatTimestamp(new Date());
  persistDraft();
  render();
  showToast(`Review sent to ${member.name}.`);
}

function acknowledgeReview(review) {
  review.status = "awaiting-supervisor";
  review.acknowledgedAt = formatLongDate(new Date());
  review.lastUpdated = formatTimestamp(new Date());
  persistDraft();
  render();
  showToast("Acknowledgment submitted to your supervisor.");
}

function closeReview(review) {
  review.status = "closed";
  review.lastUpdated = formatTimestamp(new Date());
  persistDraft();
  render();
  showToast("Review closed.");
}

function reopenReview(review) {
  review.status = "reopened";
  review.lastUpdated = formatTimestamp(new Date());
  persistDraft();
  render();
  showToast("Review reopened for further discussion.");
}

/* ---------- Trend modal ---------- */

function openTrendModal(review, taskIndex) {
  const item = review.tasks[taskIndex];
  const member = memberById(review.memberId);
  if (!item || !member) return;

  const points = review.months.map((key) => ({
    month: monthByKey(key),
    raw: (item.data[key] ?? "").trim(),
    value: parseMetricNumber(item.data[key]),
  }));
  const numeric = points.filter((point) => point.value != null);
  const latest = numeric[numeric.length - 1] ?? null;
  const previous = numeric.length > 1 ? numeric[numeric.length - 2] : null;
  const average = numeric.length ? numeric.reduce((sum, point) => sum + point.value, 0) / numeric.length : null;
  const delta = latest && previous ? latest.value - previous.value : null;
  const lowerIsBetter = LOWER_IS_BETTER_KPI.test(item.kpi);
  const improving = delta == null || delta === 0 ? null : lowerIsBetter ? delta < 0 : delta > 0;

  els.trendModalTitle.textContent = `${item.kpi || "KPI"} Trend`;
  els.trendModalSubtitle.textContent = `${member.name} · historical achievement`;

  const deltaTone = improving == null ? "" : improving ? "positive" : "negative";
  const deltaTrendLabel = delta == null ? "" : delta === 0 ? "no change" : improving ? "↑ improving" : "↓ declining";

  els.trendStats.innerHTML = `
    <div class="trend-stat">
      <small>Latest</small>
      <strong>${latest ? formatMetricValue(latest.value) : "—"}</strong>
      <span>${latest ? escapeHtml(latest.month.short) : ""}</span>
    </div>
    <div class="trend-stat">
      <small>Average</small>
      <strong>${average != null ? formatMetricValue(average) : "—"}</strong>
      <span>all periods</span>
    </div>
    <div class="trend-stat ${deltaTone}">
      <small>vs prev month</small>
      <strong>${delta != null ? formatSignedMetricValue(delta) : "—"}</strong>
      <span>${deltaTrendLabel}</span>
    </div>
  `;

  // Unhide first: Chart.js needs a laid-out canvas to size itself correctly.
  els.trendModal.classList.remove("hidden");
  renderTrendChart(points, average);
  els.closeTrendModal.focus();
}

function closeTrendModal() {
  els.trendModal.classList.add("hidden");
  if (trendChart) {
    trendChart.destroy();
    trendChart = null;
  }
}

function renderTrendChart(points, average) {
  if (!window.Chart || !els.trendChartCanvas) return;
  if (trendChart) {
    trendChart.destroy();
    trendChart = null;
  }

  const labels = points.map((point) => point.month.short);
  const values = points.map((point) => point.value);

  const avgLabelPlugin = {
    id: "avgLabel",
    afterDatasetsDraw(chart, _args, opts) {
      if (opts.value == null) return;
      const { ctx, chartArea, scales } = chart;
      const y = scales.y.getPixelForValue(opts.value);
      ctx.save();
      ctx.fillStyle = "#9aa0ab";
      ctx.font = "600 12px Inter, ui-sans-serif, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("avg", chartArea.right - 2, y - 6);
      ctx.restore();
    },
  };

  trendChart = new Chart(els.trendChartCanvas, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Actual",
          data: values,
          borderColor: "#6d5ef0",
          backgroundColor: "rgba(109, 94, 240, 0.07)",
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#6d5ef0",
          pointBorderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          borderWidth: 2.5,
          fill: true,
          tension: 0,
          spanGaps: true,
        },
        {
          label: "Average",
          data: points.map(() => average),
          borderColor: "#c8cdd8",
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 0,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        avgLabel: { value: average },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#0d0f18",
          bodyColor: "#3c4250",
          borderColor: "#e3e6eb",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          titleFont: { size: 14, weight: "700" },
          bodyFont: { size: 13, weight: "500" },
          filter: (tooltipItem) => tooltipItem.datasetIndex === 0,
          callbacks: {
            title: (items) => items[0]?.label ?? "",
            label: (context) => {
              const point = points[context.dataIndex];
              return [`${formatMetricValue(context.parsed.y)}`, `Actual: ${point.raw || formatMetricValue(context.parsed.y)}`];
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#6e7482", font: { size: 13, weight: "600" } },
        },
        y: {
          grace: "25%",
          grid: { color: "#e0e4ec", borderDash: [5, 5] },
          border: { display: false },
          ticks: {
            maxTicksLimit: 5,
            color: "#6e7482",
            font: { size: 12, weight: "600" },
            callback: (value) => formatMetricValue(value),
          },
        },
      },
    },
    plugins: [avgLabelPlugin],
  });
}

/* ---------- Agent dashboard ---------- */

function renderAgentDashboard() {
  els.agentSelect.innerHTML = state.members
    .map((member) => `<option value="${member.id}">${escapeHtml(member.name)}</option>`)
    .join("");
  els.agentSelect.value = state.selectedAgentId || state.members[0].id;

  const agent = memberById(state.selectedAgentId);
  els.agentAvatar.textContent = initials(agent.name);
  els.agentName.textContent = agent.name;
  els.agentEmail.textContent = agent.email;

  const shared = reviewsOf(agent.id).filter((review) => review.status !== "in-progress");
  const activeReview = shared.find((item) => periodKeyOf(item.months) === state.selectedAgentPeriodKey) ?? shared[0];
  state.selectedAgentPeriodKey = activeReview ? periodKeyOf(activeReview.months) : null;

  els.agentPeriodSelect.classList.toggle("hidden", !shared.length);
  els.agentPeriodSelect.innerHTML = shared
    .map(
      (review) =>
        `<option value="${periodKeyOf(review.months)}">${escapeHtml(periodLabelFromMonths(review.months))} — ${statusLabel(review.status, "agent")}</option>`,
    )
    .join("");
  if (activeReview) {
    els.agentPeriodSelect.value = state.selectedAgentPeriodKey;
    els.agentToolbarStatus.className = `status-badge ${statusBadgeClass(activeReview.status, "agent")}`;
    els.agentToolbarStatus.textContent = statusLabel(activeReview.status, "agent");
  } else {
    els.agentToolbarStatus.className = "status-badge hidden";
  }

  renderReviewDetail(els.agentReviewDetailPanel, "agent");
}

/* ---------- Response modal ---------- */

function openResponseModal(reviewId, taskIndex) {
  const review = reviewById(reviewId);
  const item = review?.tasks[taskIndex];
  if (!review || !item) return;

  activeResponseTarget = { reviewId, taskIndex };
  els.responseGoalSummary.textContent = taskSummary(review, item);
  els.responseNote.value = item.agentNote ?? "";

  els.responseForm.querySelectorAll('input[name="agentResponse"]').forEach((input) => {
    input.checked = input.value === item.agentResponse;
  });
  updateSubmitResponseState();
  els.responseModal.classList.remove("hidden");

  const checkedInput = els.responseForm.querySelector('input[name="agentResponse"]:checked');
  (checkedInput ?? els.responseForm.querySelector('input[name="agentResponse"]'))?.focus();
}

function closeResponseModal() {
  activeResponseTarget = null;
  els.responseModal.classList.add("hidden");
  els.responseForm.reset();
  els.responseNote.value = "";
  updateSubmitResponseState();
}

function submitAgentResponse(event) {
  event.preventDefault();
  if (!activeResponseTarget) return;

  const selectedResponse = els.responseForm.querySelector('input[name="agentResponse"]:checked')?.value;
  if (!selectedResponse) return;

  const review = reviewById(activeResponseTarget.reviewId);
  const item = review?.tasks[activeResponseTarget.taskIndex];
  if (!review || !item) return;

  item.agentResponse = selectedResponse;
  item.agentNote = els.responseNote.value.trim();
  item.agentRespondedAt = formatResponseTime(new Date());
  review.lastUpdated = formatTimestamp(new Date());

  persistDraft();
  closeResponseModal();
  render();
  showToast("Response shared with supervisor.");
}

function updateSubmitResponseState() {
  const hasSelection = Boolean(els.responseForm.querySelector('input[name="agentResponse"]:checked'));
  els.submitResponse.disabled = !hasSelection;
}

function taskSummary(review, item) {
  const title = item.focusArea.trim() || item.kpi.trim() || "Review task";
  const details = [];
  if (item.kpi.trim()) details.push(item.kpi.trim());
  const latestValue = item.data[review.months[review.months.length - 1]];
  if (latestValue) details.push(latestValue);
  if (item.timeline.trim()) details.push(`due ${item.timeline.trim()}`);
  return details.length ? `${title} - ${details.join(", ")}` : title;
}

/* ---------- Reports ---------- */

function renderReports() {
  if (!els.reportsView) return;

  renderReportRangeControls();
  const metrics = getReportMetrics();
  renderReportKpis(metrics);
  renderCompletionChart(metrics.months);
  renderMonthlyReport(metrics.months);
  renderAgentBreakdown(metrics.agentBreakdown, metrics.responseTotals);
  renderResponseSummary(metrics.responseTotals);
}

function renderReportRangeControls() {
  const range = state.reportRange;

  els.rangeModeButtons.forEach((button) => {
    const isActive = button.dataset.rangeMode === range.mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  const covered = MONTHS.filter((month) => state.reviews.some((review) => review.months.includes(month.key)));

  els.reportMonthSelect.classList.toggle("hidden", range.mode !== "monthly");
  const monthOptions = [
    `<option value="all">All Months</option>`,
    ...covered
      .slice()
      .reverse()
      .map((month) => `<option value="${month.key}">${month.name} ${month.year}</option>`),
  ].join("");
  if (els.reportMonthSelect.innerHTML !== monthOptions) {
    els.reportMonthSelect.innerHTML = monthOptions;
  }
  els.reportMonthSelect.value = range.month;
  if (els.reportMonthSelect.value !== range.month) {
    range.month = "all";
    els.reportMonthSelect.value = "all";
  }

  els.reportQuarterSelect.classList.toggle("hidden", range.mode !== "quarterly");
  const quartersWithData = QUARTERS.filter((quarter) => quarter.months.some((key) => covered.some((m) => m.key === key)));
  const quarterList = quartersWithData.length ? quartersWithData : QUARTERS;
  const quarterOptions = quarterList.map((q) => `<option value="${q.key}">${q.label}</option>`).join("");
  if (els.reportQuarterSelect.innerHTML !== quarterOptions) {
    els.reportQuarterSelect.innerHTML = quarterOptions;
  }
  els.reportQuarterSelect.value = range.quarter;
  if (els.reportQuarterSelect.value !== range.quarter) {
    range.quarter = quarterList[quarterList.length - 1].key;
    els.reportQuarterSelect.value = range.quarter;
  }

  els.customRangeWrap.classList.toggle("hidden", range.mode !== "custom");
  const months2026 = MONTHS.filter((month) => month.year === 2026);
  const customOptions = months2026.map((month) => `<option value="${month.key}">${month.name}</option>`).join("");
  if (els.reportFromSelect.innerHTML !== customOptions) {
    els.reportFromSelect.innerHTML = customOptions;
    els.reportToSelect.innerHTML = customOptions;
  }
  els.reportFromSelect.value = range.from;
  els.reportToSelect.value = range.to;
}

function getRangeMonthKeys() {
  const range = state.reportRange;
  if (range.mode === "monthly") {
    return range.month === "all" ? MONTHS.map((month) => month.key) : [range.month];
  }
  if (range.mode === "quarterly") {
    return QUARTERS.find((quarter) => quarter.key === range.quarter)?.months ?? MONTHS.map((month) => month.key);
  }
  let from = MONTH_INDEX[range.from];
  let to = MONTH_INDEX[range.to];
  if (from > to) [from, to] = [to, from];
  return MONTHS.slice(from, to + 1).map((month) => month.key);
}

// Report status buckets, mapped from the review lifecycle:
// draft = In Progress or sent-but-untouched, submitted = agent responding,
// acknowledged = final ack awaiting supervisor close, inDiscussion = reopened.
function reviewStatusBucket(review) {
  if (review.status === "closed") return "closed";
  if (review.status === "awaiting-supervisor") return "acknowledged";
  if (review.status === "reopened") return "inDiscussion";
  if (review.status === "awaiting" && review.tasks.some((item) => item.agentResponse)) return "submitted";
  return "draft";
}

function hasFinalAck(review) {
  return Boolean(review.acknowledgedAt) && ["awaiting-supervisor", "closed"].includes(review.status);
}

function getReportMetrics() {
  const rangeKeys = new Set(getRangeMonthKeys());
  const filteredReviews = state.reviews.filter((review) => review.months.some((key) => rangeKeys.has(key)));

  const monthRows = MONTHS.filter(
    (month) => rangeKeys.has(month.key) && state.reviews.some((review) => review.months.includes(month.key)),
  ).map((month) => {
    const rows = state.reviews.filter((review) => review.months.includes(month.key));
    const buckets = { closed: 0, acknowledged: 0, inDiscussion: 0, submitted: 0, draft: 0 };
    rows.forEach((review) => {
      buckets[reviewStatusBucket(review)] += 1;
    });
    return {
      key: month.key,
      short: month.short,
      name: month.name,
      ...buckets,
      total: rows.length,
      rate: Math.round(((buckets.closed + buckets.acknowledged) / Math.max(rows.length, 1)) * 100),
    };
  });

  const totals = { closed: 0, acknowledged: 0, inDiscussion: 0, submitted: 0, draft: 0 };
  filteredReviews.forEach((review) => {
    totals[reviewStatusBucket(review)] += 1;
  });

  const agentBreakdown = state.members.map((member) => {
    const mine = filteredReviews.filter((review) => review.memberId === member.id);
    const counts = mine.reduce((acc, review) => addResponseCounts(acc, reviewResponseCounts(review)), emptyResponseCounts());
    return { id: member.id, name: member.name, ...counts, finalAck: mine.filter(hasFinalAck).length };
  });

  const responseTotals = agentBreakdown.reduce(
    (acc, row) => ({ ...addResponseCounts(acc, row), finalAck: acc.finalAck + row.finalAck }),
    { ...emptyResponseCounts(), finalAck: 0 },
  );

  const totalReviews = filteredReviews.length;
  const completionRate = Math.round((totals.closed / Math.max(totalReviews, 1)) * 100);
  const goalResponses =
    responseTotals.acknowledged + responseTotals.incorrect + responseTotals.discuss + responseTotals.support;
  const finalAcknowledged = filteredReviews.filter(hasFinalAck).length;

  return {
    months: monthRows,
    totals,
    totalReviews,
    completionRate,
    goalResponses,
    finalAcknowledged,
    agentBreakdown,
    responseTotals,
  };
}

function reviewResponseCounts(review) {
  return review.tasks.reduce((counts, item) => {
    if (!item.agentResponse) {
      counts.noResponse += 1;
    } else if (item.agentResponse === "I acknowledge") {
      counts.acknowledged += 1;
    } else if (item.agentResponse === "Data is incorrect") {
      counts.incorrect += 1;
    } else if (item.agentResponse === "Let's discuss this in detail") {
      counts.discuss += 1;
    } else if (item.agentResponse === "I need more support for this") {
      counts.support += 1;
    }
    return counts;
  }, emptyResponseCounts());
}

function renderReportKpis(metrics) {
  const cards = [
    { label: "Total Reviews", value: metrics.totalReviews, tone: "blue", icon: REPORT_ICONS.people },
    {
      label: "Completion Rate",
      value: `${metrics.completionRate}%`,
      tone: "green",
      icon: REPORT_ICONS.check,
      sub: `<span class="kpi-sub">
          <em class="sub-green">${metrics.totals.closed} closed</em>
          <em class="sub-blue">${metrics.totals.inDiscussion} in discussion</em>
          <em class="sub-orange">${metrics.totals.submitted} submitted</em>
        </span>`,
    },
    { label: "Final Acknowledged", value: metrics.finalAcknowledged, tone: "indigo", icon: REPORT_ICONS.trend },
    { label: "Goal Responses", value: metrics.goalResponses, tone: "purple", icon: REPORT_ICONS.chat },
  ];

  els.reportKpis.innerHTML = cards
    .map(
      (card) => `
        <article class="report-kpi-card ${card.tone}">
          <span class="kpi-icon" aria-hidden="true">${card.icon}</span>
          <span>
            <small>${card.label}</small>
            <strong>${card.value}</strong>
            ${card.sub ?? ""}
          </span>
        </article>
      `,
    )
    .join("");
}

function renderCompletionChart(months) {
  const canvas = els.completionChart;
  if (!window.Chart || !canvas) {
    canvas?.parentElement?.classList.add("chart-missing");
    if (canvas) {
      canvas.dataset.chartRendered = "false";
      canvas.dataset.chartEngine = "missing";
    }
    return;
  }
  canvas.parentElement?.classList.remove("chart-missing");
  canvas.dataset.chartEngine = "chartjs";
  canvas.dataset.chartVersion = Chart.version ?? "";

  const series = [
    { label: "Closed / Acknowledged", data: months.map((m) => m.closed + m.acknowledged), color: "#2eb567", text: "#1f7a41" },
    { label: "In Discussion", data: months.map((m) => m.inDiscussion), color: "#3d7bfd", text: "#2855bf" },
    { label: "Submitted", data: months.map((m) => m.submitted), color: "#f09f2a", text: "#b96504" },
    { label: "Draft / Pending", data: months.map((m) => m.draft), color: "#d3d7e2", text: "#8a90a0" },
  ];

  const maxValue = Math.max(4, ...series.flatMap((item) => item.data));
  const chartData = {
    labels: months.map((month) => month.short),
    datasets: series.map((item) => ({
      label: item.label,
      data: item.data,
      backgroundColor: item.color,
      borderRadius: 5,
      borderSkipped: false,
      maxBarThickness: 26,
      categoryPercentage: 0.55,
      barPercentage: 0.9,
    })),
  };

  if (completionTrendChart) {
    completionTrendChart.data = chartData;
    completionTrendChart.options.scales.y.suggestedMax = maxValue + 1;
    completionTrendChart.update();
    canvas.dataset.chartRendered = "true";
    return;
  }

  completionTrendChart = new Chart(canvas, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            boxHeight: 12,
            padding: 18,
            color: "#5f6573",
            font: { size: 13, weight: "600" },
          },
        },
        tooltip: {
          backgroundColor: "#ffffff",
          borderColor: "#e3e6eb",
          borderWidth: 1,
          titleColor: "#0d0f18",
          padding: 14,
          displayColors: false,
          titleFont: { size: 14, weight: "700" },
          bodyFont: { size: 13, weight: "600" },
          bodySpacing: 7,
          callbacks: {
            label(context) {
              return `${context.dataset.label} : ${context.parsed.y}`;
            },
            labelTextColor(context) {
              return series[context.datasetIndex].text;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#6e7482",
            font: { size: 13, weight: "600" },
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: maxValue + 1,
          ticks: {
            stepSize: 2,
            precision: 0,
            color: "#6e7482",
            font: { size: 12, weight: "600" },
          },
          grid: {
            color: "#e0e4ec",
            borderDash: [5, 5],
          },
          border: {
            display: false,
          },
        },
      },
    },
  });
  canvas.dataset.chartRendered = "true";
}

function renderMonthlyReport(months) {
  els.monthlyReportBody.innerHTML = months
    .map(
      (month) => `
        <tr>
          <td>${escapeHtml(month.name)}</td>
          <td><span class="count-pill green">${month.closed}</span></td>
          <td><span class="count-pill indigo">${month.acknowledged}</span></td>
          <td><span class="count-pill blue">${month.inDiscussion}</span></td>
          <td><span class="count-pill amber">${month.submitted}</span></td>
          <td><span class="count-pill gray">${month.draft}</span></td>
          <td><strong>${month.rate}%</strong></td>
        </tr>
      `,
    )
    .join("");
}

function renderResponseSummary(totals) {
  const cards = [
    { tone: "green", label: "Acknowledged", value: totals.acknowledged, icon: REPORT_ICONS.check },
    { tone: "red", label: "Data Incorrect", value: totals.incorrect, icon: REPORT_ICONS.alert },
    { tone: "blue", label: "Discuss Further", value: totals.discuss, icon: REPORT_ICONS.chat },
    { tone: "purple", label: "Need Support", value: totals.support, icon: REPORT_ICONS.people },
    { tone: "gray", label: "No Response", value: totals.noResponse, icon: REPORT_ICONS.clock },
    { tone: "indigo", label: "Final Ack.", value: totals.finalAck, icon: REPORT_ICONS.trend },
  ];

  els.responseSummaryCards.innerHTML = cards
    .map(
      (card) => `
        <article class="response-stat-card ${card.tone}">
          <span class="response-stat-icon" aria-hidden="true">${card.icon}</span>
          <span>${card.label}</span>
          <strong>${card.value}</strong>
        </article>
      `,
    )
    .join("");
}

function renderAgentBreakdown(rows, totals) {
  const bodyRows = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.name)}</td>
          <td><span class="count-pill green">${row.acknowledged}</span></td>
          <td><span class="count-pill red">${row.incorrect}</span></td>
          <td><span class="count-pill blue">${row.discuss}</span></td>
          <td><span class="count-pill purple">${row.support}</span></td>
          <td><span class="count-pill gray">${row.noResponse}</span></td>
          <td>${row.finalAck ? `<span class="final-ack-pill">✓ ${row.finalAck}</span>` : `<span class="kpi-goal-label">—</span>`}</td>
        </tr>
      `,
    )
    .join("");

  const totalRow = `
    <tr class="report-total-row">
      <td>Total</td>
      <td>${totals.acknowledged}</td>
      <td>${totals.incorrect}</td>
      <td>${totals.discuss}</td>
      <td>${totals.support}</td>
      <td>${totals.noResponse}</td>
      <td>${totals.finalAck}</td>
    </tr>
  `;

  els.agentBreakdownBody.innerHTML = bodyRows + totalRow;
}

function emptyResponseCounts() {
  return { acknowledged: 0, incorrect: 0, discuss: 0, support: 0, noResponse: 0 };
}

function addResponseCounts(a, b) {
  return {
    acknowledged: (a.acknowledged ?? 0) + (b.acknowledged ?? 0),
    incorrect: (a.incorrect ?? 0) + (b.incorrect ?? 0),
    discuss: (a.discuss ?? 0) + (b.discuss ?? 0),
    support: (a.support ?? 0) + (b.support ?? 0),
    noResponse: (a.noResponse ?? 0) + (b.noResponse ?? 0),
  };
}

function handleReportDownload(type) {
  const metrics = getReportMetrics();
  const rows =
    type === "monthly"
      ? [
          ["Month", "Closed", "Acknowledged", "In Discussion", "Submitted", "Draft", "Rate"],
          ...metrics.months.map((month) => [
            month.name,
            month.closed,
            month.acknowledged,
            month.inDiscussion,
            month.submitted,
            month.draft,
            `${month.rate}%`,
          ]),
        ]
      : [
          ["Agent", "Acknowledged", "Data Incorrect", "Discuss Further", "Need Support", "No Response", "Final Ack"],
          ...metrics.agentBreakdown.map((row) => [
            row.name,
            row.acknowledged,
            row.incorrect,
            row.discuss,
            row.support,
            row.noResponse,
            row.finalAck,
          ]),
        ];

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = type === "monthly" ? "monthly-completion-report.csv" : "agent-response-data.csv";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("CSV report downloaded.");
}

/* ---------- Utilities ---------- */

function parseMetricNumber(data) {
  const match = String(data ?? "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function formatMetricValue(value) {
  if (value == null || Number.isNaN(value)) return "—";
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function formatSignedMetricValue(value) {
  const formatted = formatMetricValue(Math.abs(value));
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatTimestamp(date) {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  return `${month} ${date.getDate()}, ${date.getFullYear()} ${time}`;
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

function formatShortDate(date) {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  return `${month} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatResponseTime(date) {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(date);
  return `${month} ${date.getDate()}, ${time}`;
}

function csvCell(value) {
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    els.toast.classList.remove("visible");
  }, 2600);
}

function resetTableScroll() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".table-wrap").forEach((tableWrap) => {
      tableWrap.scrollLeft = 0;
    });
  });
}

function autoSizeGoalFields() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".goal-field, .comment-field, .composer-field").forEach(autoSizeField);
  });
}

function autoSizeField(field) {
  field.style.height = "auto";
  if (!field.value.trim()) {
    field.style.height = "";
    return;
  }
  field.style.height = `${field.scrollHeight}px`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function switchView(view) {
  state.activeView = view;
  persistDraft();
  render();
}

/* ---------- Event wiring ---------- */

els.navButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

els.startReviewButton.addEventListener("click", () => startReview([...draftMonths]));

els.agentSelect.addEventListener("change", (event) => {
  state.selectedAgentId = event.target.value;
  state.selectedAgentPeriodKey = null;
  persistDraft();
  render();
});

els.agentPeriodSelect.addEventListener("change", (event) => {
  state.selectedAgentPeriodKey = event.target.value;
  persistDraft();
  render();
});

els.rangeModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.reportRange.mode = button.dataset.rangeMode;
    persistDraft();
    renderReports();
  });
});

els.reportMonthSelect.addEventListener("change", (event) => {
  state.reportRange.month = event.target.value;
  persistDraft();
  renderReports();
});

els.reportQuarterSelect.addEventListener("change", (event) => {
  state.reportRange.quarter = event.target.value;
  persistDraft();
  renderReports();
});

els.reportFromSelect.addEventListener("change", (event) => {
  state.reportRange.from = event.target.value;
  persistDraft();
  renderReports();
});

els.reportToSelect.addEventListener("change", (event) => {
  state.reportRange.to = event.target.value;
  persistDraft();
  renderReports();
});

document.querySelectorAll("[data-report-download]").forEach((button) => {
  button.addEventListener("click", () => handleReportDownload(button.dataset.reportDownload));
});

els.responseForm.addEventListener("submit", submitAgentResponse);
els.responseForm.addEventListener("change", updateSubmitResponseState);
els.closeResponseModal.addEventListener("click", closeResponseModal);
els.cancelResponse.addEventListener("click", closeResponseModal);
els.responseModal.addEventListener("click", (event) => {
  if (event.target === els.responseModal) {
    closeResponseModal();
  }
});

els.closeTrendModal.addEventListener("click", closeTrendModal);
els.trendModal.addEventListener("click", (event) => {
  if (event.target === els.trendModal) {
    closeTrendModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!els.responseModal.classList.contains("hidden")) {
    closeResponseModal();
  }
  if (!els.trendModal.classList.contains("hidden")) {
    closeTrendModal();
  }
});

// Cross-window live sync: the storage event fires in every OTHER open tab or
// window whenever one of them persists state. Merge the shared data (members,
// reviews) but keep this window's own view and selections, so a Supervisor
// window and an Agent window can sit side by side and update in real time.
let storageSyncTimeout = null;
window.addEventListener("storage", (event) => {
  if (event.key !== draftKey || !event.newValue) return;

  window.clearTimeout(storageSyncTimeout);
  const newValue = event.newValue;
  storageSyncTimeout = window.setTimeout(() => {
    let incoming;
    try {
      incoming = JSON.parse(newValue);
    } catch {
      return;
    }
    if (incoming?.version !== STATE_VERSION) return;

    const composerHadFocus = document.activeElement?.dataset?.action === "feedback-draft";
    state = normalizeState({
      ...incoming,
      activeView: state.activeView,
      selectedMemberId: state.selectedMemberId,
      selectedPeriodKey: state.selectedPeriodKey,
      selectedAgentId: state.selectedAgentId,
      selectedAgentPeriodKey: state.selectedAgentPeriodKey,
      reportRange: state.reportRange,
    });
    render();
    if (composerHadFocus) {
      document.querySelector('.view-section:not(.hidden) [data-action="feedback-draft"]')?.focus();
    }
  }, 120);
});

render();
