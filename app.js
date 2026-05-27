const reviewPeriod = "May 2026";
const draftKey = "one-on-one-review-draft-v3";

const responseOptions = [
  "I acknowledge",
  "Data is incorrect",
  "Let's discuss this in detail",
  "I need more support for this",
];

const statusOptions = ["Not Started", "In Progress", "Completed", "Blocked"];

const historicalMonthlyReports = [
  { month: "January", completed: 5, pending: 0 },
  { month: "February", completed: 5, pending: 0 },
  { month: "March", completed: 5, pending: 0 },
  { month: "April", completed: 2, pending: 3 },
];

const historicalResponseBreakdown = {
  sarah: { acknowledged: 7, incorrect: 1, discuss: 2, support: 1, noResponse: 3 },
  michael: { acknowledged: 6, incorrect: 2, discuss: 1, support: 0, noResponse: 4 },
  emily: { acknowledged: 9, incorrect: 0, discuss: 3, support: 2, noResponse: 2 },
  david: { acknowledged: 7, incorrect: 1, discuss: 1, support: 1, noResponse: 5 },
  jessica: { acknowledged: 10, incorrect: 0, discuss: 2, support: 0, noResponse: 3 },
};

const responseTypeMeta = [
  { key: "acknowledged", label: "Acknowledged", tone: "green", response: "I acknowledge" },
  { key: "incorrect", label: "Data incorrect", tone: "red", response: "Data is incorrect" },
  { key: "discuss", label: "Discuss further", tone: "blue", response: "Let's discuss this in detail" },
  { key: "support", label: "Need support", tone: "purple", response: "I need more support for this" },
  { key: "noResponse", label: "No response", tone: "gray", response: "" },
];

const seedMembers = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    status: "completed",
    history: [
      {
        goal: "Improve ticket resolution time by 15%",
        kpi: "AHT",
        data: "8.2 min",
        status: "Completed",
        notes: "Resolution steps are cleaner and the new macro flow is being used consistently.",
        timeline: "End of April",
      },
      {
        goal: "Complete advanced customer service training",
        kpi: "Quality",
        data: "93%",
        status: "Completed",
        notes: "Certification completed. Continue applying objection-handling examples in live tickets.",
        timeline: "Mid-April",
      },
      {
        goal: "Reduce escalations by handling complex queries independently",
        kpi: "Accuracy",
        data: "96.5%",
        status: "In Progress",
        notes: "Good progress. Keep flagging edge cases early so we can build a clearer playbook.",
        timeline: "Ongoing",
      },
    ],
    currentGoals: [
      {
        goal: "Keep bill processing volume steady while maintaining accuracy",
        actionPlan: "Track daily bill volume and audit exceptions before handoff",
        timeline: "End of May",
        kpi: "Overall Bills",
        data: "1250",
        agentResponse: "I acknowledge",
        agentNote: "The volume target is clear.",
        agentRespondedAt: "May 12, 2026 9:10 AM",
      },
      {
        goal: "Hold accuracy above 96% on complex billing cases",
        actionPlan: "Review complex billing cases and document recurring edge cases",
        timeline: "End of May",
        kpi: "Accuracy",
        data: "96.5%",
        agentResponse: "",
        agentNote: "",
        agentRespondedAt: "",
      },
      {
        goal: "Reduce average handling time without rushing documentation",
        actionPlan: "Use approved macros and keep documentation concise",
        timeline: "Mid-May",
        kpi: "AHT",
        data: "8.2 min",
        agentResponse: "",
        agentNote: "",
        agentRespondedAt: "",
      },
      {
        goal: "Improve utilization through tighter shift handoffs",
        actionPlan: "Confirm shift handoff checklist at every transition",
        timeline: "End of May",
        kpi: "Utilization %",
        data: "87%",
        agentResponse: "",
        agentNote: "",
        agentRespondedAt: "",
      },
    ],
    lastUpdated: "May 10, 2026 5:30 AM",
  },
  {
    id: "michael",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    status: "in-progress",
    history: [
      {
        goal: "Maintain productivity above 90%",
        kpi: "Utilization %",
        data: "92%",
        status: "",
        notes: "",
        timeline: "End of April",
      },
      {
        goal: "Mentor 2 new team members",
        kpi: "Quality",
        data: "86%",
        status: "",
        notes: "",
        timeline: "Mid-May",
      },
    ],
    currentGoals: [
      { goal: "", timeline: "", kpi: "Overall Bills", data: "1380", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "Accuracy", data: "94.2%", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "AHT", data: "7.8 min", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "Utilization %", data: "92%", agentResponse: "", agentNote: "", agentRespondedAt: "" },
    ],
    lastUpdated: "May 8, 2026 5:30 AM",
  },
  {
    id: "emily",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    status: "pending",
    history: [
      {
        goal: "Improve AHT without reducing QA",
        kpi: "AHT",
        data: "8.4 min",
        status: "",
        notes: "",
        timeline: "End of April",
      },
    ],
    currentGoals: [
      { goal: "", timeline: "", kpi: "AHT", data: "8.1 min", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "Quality", data: "90%", agentResponse: "", agentNote: "", agentRespondedAt: "" },
    ],
    lastUpdated: "May 9, 2026 10:12 AM",
  },
  {
    id: "david",
    name: "David Thompson",
    email: "david.thompson@company.com",
    status: "pending",
    history: [
      {
        goal: "Complete cross-skill training plan",
        kpi: "Training",
        data: "60%",
        status: "",
        notes: "",
        timeline: "May 10",
      },
    ],
    currentGoals: [
      { goal: "", timeline: "", kpi: "CSAT", data: "88%", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "Escalations", data: "14", agentResponse: "", agentNote: "", agentRespondedAt: "" },
    ],
    lastUpdated: "May 6, 2026 9:45 AM",
  },
  {
    id: "jessica",
    name: "Jessica Williams",
    email: "jessica.williams@company.com",
    status: "pending",
    history: [
      {
        goal: "Stabilize weekend staffing coverage",
        kpi: "Schedule Adherence",
        data: "89%",
        status: "",
        notes: "",
        timeline: "End of April",
      },
    ],
    currentGoals: [
      { goal: "", timeline: "", kpi: "Adherence", data: "91%", agentResponse: "", agentNote: "", agentRespondedAt: "" },
      { goal: "", timeline: "", kpi: "Backlog", data: "32", agentResponse: "", agentNote: "", agentRespondedAt: "" },
    ],
    lastUpdated: "May 7, 2026 2:15 PM",
  },
];

const state = createInitialState();
let activeResponseTarget = null;
let completionTrendChart = null;
let agentResponseBreakdownChart = null;

const els = {
  navButtons: document.querySelectorAll(".nav-button"),
  dashboardTitle: document.querySelector("#dashboard-title"),
  dashboardSubtitle: document.querySelector("#dashboardSubtitle"),
  reviewPeriodControl: document.querySelector(".review-period-control"),
  supervisorOnly: document.querySelectorAll(".supervisor-only"),
  agentOnly: document.querySelectorAll(".agent-only"),
  reportsOnly: document.querySelectorAll(".reports-only"),
  supervisorView: document.querySelector("#supervisorView"),
  agentView: document.querySelector("#agentView"),
  reportsView: document.querySelector("#reportsView"),
  agentSelect: document.querySelector("#agentSelect"),
  reportMonthSelect: document.querySelector("#reportMonthSelect"),
  teamList: document.querySelector("#teamList"),
  reviewName: document.querySelector("#reviewName"),
  reviewSubtitle: document.querySelector("#reviewSubtitle"),
  reviewStatus: document.querySelector("#reviewStatus"),
  historyBody: document.querySelector("#historyBody"),
  currentGoalsBody: document.querySelector("#currentGoalsBody"),
  addGoalButton: document.querySelector("#addGoalButton"),
  saveDraftButton: document.querySelector("#saveDraftButton"),
  completeReviewButton: document.querySelector("#completeReviewButton"),
  lastUpdated: document.querySelector("#lastUpdated"),
  completedCount: document.querySelector("#completedCount"),
  pendingCount: document.querySelector("#pendingCount"),
  pendingMessage: document.querySelector("#pendingMessage"),
  agentAvatar: document.querySelector("#agentAvatar"),
  agentName: document.querySelector("#agentName"),
  agentEmail: document.querySelector("#agentEmail"),
  agentProfileStatus: document.querySelector("#agentProfileStatus"),
  agentReviewTitle: document.querySelector("#agentReviewTitle"),
  agentReviewSubtitle: document.querySelector("#agentReviewSubtitle"),
  agentReviewStatus: document.querySelector("#agentReviewStatus"),
  agentHistoryBody: document.querySelector("#agentHistoryBody"),
  agentCurrentGoalsBody: document.querySelector("#agentCurrentGoalsBody"),
  agentLastUpdated: document.querySelector("#agentLastUpdated"),
  responseModal: document.querySelector("#responseModal"),
  responseForm: document.querySelector("#responseForm"),
  responseGoalSummary: document.querySelector("#responseGoalSummary"),
  responseNote: document.querySelector("#responseNote"),
  submitResponse: document.querySelector("#submitResponse"),
  closeResponseModal: document.querySelector("#closeResponseModal"),
  cancelResponse: document.querySelector("#cancelResponse"),
  reportKpis: document.querySelector("#reportKpis"),
  completionChart: document.querySelector("#completionChart"),
  agentResponseChart: document.querySelector("#agentResponseChart"),
  monthlyReportBody: document.querySelector("#monthlyReportBody"),
  responseSummaryCards: document.querySelector("#responseSummaryCards"),
  agentBreakdownBody: document.querySelector("#agentBreakdownBody"),
  attentionList: document.querySelector("#attentionList"),
  toast: document.querySelector("#toast"),
};

function createInitialState() {
  const draft = loadDraft();
  if (draft) {
    return normalizeState(draft);
  }

  return normalizeState({
    activeView: "supervisor",
    selectedSupervisorMemberId: "michael",
    selectedAgentId: "sarah",
    selectedReportMonth: "all",
    members: structuredClone(seedMembers),
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
  const seedById = Object.fromEntries(seedMembers.map((member) => [member.id, member]));
  const rawMembers = Array.isArray(rawState.members) ? rawState.members : seedMembers;
  const memberById = Object.fromEntries(rawMembers.map((member) => [member.id, member]));

  const members = seedMembers.map((seedMember) => {
    const member = memberById[seedMember.id] ?? seedMember;
    return {
      ...structuredClone(seedById[seedMember.id]),
      ...member,
      history: normalizeHistory(member.history, seedMember.history),
      currentGoals: normalizeCurrentGoals(member.currentGoals, seedMember.currentGoals),
    };
  });

  const selectedSupervisorMemberId =
    rawState.selectedSupervisorMemberId ?? rawState.selectedMemberId ?? members[1]?.id ?? members[0].id;
  const selectedAgentId = rawState.selectedAgentId ?? "sarah";
  const selectedReportMonth = rawState.selectedReportMonth ?? "all";
  const activeView = ["supervisor", "agent", "reports"].includes(rawState.activeView) ? rawState.activeView : "supervisor";

  return {
    activeView,
    selectedSupervisorMemberId,
    selectedAgentId,
    selectedReportMonth,
    members,
  };
}

function normalizeHistory(history, fallbackHistory) {
  const items = Array.isArray(history) && history.length ? history : fallbackHistory;
  return items.map((item) => ({
    goal: item.goal ?? "",
    kpi: item.kpi ?? "",
    data: item.data ?? "",
    status: item.status ?? "",
    notes: item.notes ?? "",
    timeline: item.timeline ?? "",
  }));
}

function normalizeCurrentGoals(currentGoals, fallbackGoals) {
  const items = Array.isArray(currentGoals) && currentGoals.length ? currentGoals : fallbackGoals;
  return items.map((goal, index) => ({
    goal: goal.goal ?? "",
    actionPlan: goal.actionPlan ?? fallbackGoals?.[index]?.actionPlan ?? "",
    timeline: goal.timeline ?? "",
    kpi: normalizeEditableMetric(goal.kpi, "New KPI"),
    data: normalizeEditableMetric(goal.data, "Enter data"),
    agentResponse: goal.agentResponse ?? "",
    agentNote: goal.agentNote ?? "",
    agentRespondedAt: goal.agentRespondedAt ?? "",
  }));
}

function normalizeEditableMetric(value, legacyPlaceholder) {
  const text = value == null ? "" : String(value);
  return text === legacyPlaceholder ? "" : text;
}

function persistDraft() {
  localStorage.setItem(draftKey, JSON.stringify(state));
}

function selectedSupervisorMember() {
  return state.members.find((member) => member.id === state.selectedSupervisorMemberId) ?? state.members[0];
}

function selectedAgent() {
  return state.members.find((member) => member.id === state.selectedAgentId) ?? state.members[0];
}

function render() {
  renderShell();
  renderTeamList();
  renderAgentSelector();
  renderSupervisorReview();
  renderAgentReview();
  renderReports();
  renderSummary();
  autoSizeGoalFields();
  resetTableScroll();
}

function renderShell() {
  const isAgent = state.activeView === "agent";
  const isSupervisor = state.activeView === "supervisor";
  const isReports = state.activeView === "reports";

  els.dashboardTitle.textContent = isAgent ? "Agent Dashboard" : isSupervisor ? "Supervisor Dashboard" : "Reports Dashboard";
  els.dashboardSubtitle.textContent = "Senior Leadership Analytics - 2026";
  els.dashboardSubtitle.classList.toggle("hidden", !isReports);
  els.reviewPeriodControl.classList.toggle("hidden", isReports);
  els.supervisorView.classList.toggle("hidden", !isSupervisor);
  els.agentView.classList.toggle("hidden", !isAgent);
  els.reportsView.classList.toggle("hidden", !isReports);

  els.supervisorOnly.forEach((el) => el.classList.toggle("hidden", !isSupervisor));
  els.agentOnly.forEach((el) => el.classList.toggle("hidden", !isAgent));
  els.reportsOnly.forEach((el) => el.classList.toggle("hidden", !isReports));
  els.reportMonthSelect.value = state.selectedReportMonth ?? "all";

  els.navButtons.forEach((button) => {
    const isActive = button.dataset.view === state.activeView;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderTeamList() {
  els.teamList.innerHTML = "";

  state.members.forEach((member) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `team-card ${member.id === state.selectedSupervisorMemberId ? "active" : ""}`;
    button.innerHTML = `
      <span>
        <strong>${escapeHtml(member.name)}</strong>
        <span>${escapeHtml(member.email)}</span>
      </span>
      <span class="team-status ${member.status}" aria-label="${statusLabel(member.status)}">
        ${member.status === "completed" ? "✓" : "◷"}
      </span>
    `;
    button.addEventListener("click", () => {
      state.selectedSupervisorMemberId = member.id;
      persistDraft();
      render();
    });
    els.teamList.append(button);
  });
}

function renderAgentSelector() {
  const currentValue = els.agentSelect.value;
  els.agentSelect.innerHTML = state.members
    .map((member) => `<option value="${member.id}">${escapeHtml(member.name)}</option>`)
    .join("");
  els.agentSelect.value = state.selectedAgentId || currentValue || state.members[0].id;
}

function renderSupervisorReview() {
  const member = selectedSupervisorMember();

  els.reviewName.textContent = member.name;
  els.reviewSubtitle.textContent = `One-on-One Review - ${reviewPeriod}`;
  els.reviewStatus.textContent = statusLabel(member.status);
  els.reviewStatus.className = `status-pill ${member.status}`;
  els.lastUpdated.textContent = `Last updated: ${member.lastUpdated}`;

  renderSupervisorHistory(member);
  renderSupervisorCurrentGoals(member);
}

function renderSupervisorHistory(member) {
  els.historyBody.innerHTML = "";

  member.history.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          <span>${escapeHtml(item.goal)}</span>
        </div>
      </td>
      <td class="metric-cell">${escapeHtml(item.kpi)}</td>
      <td class="data-cell">${renderDataValue(item.kpi, item.data)}</td>
      <td>
        <select class="task-status" aria-label="Status for ${escapeHtml(item.goal)}">
          <option value="">Select status...</option>
          ${statusOptions
            .map((option) => `<option value="${option}" ${item.status === option ? "selected" : ""}>${option}</option>`)
            .join("")}
        </select>
      </td>
      <td>
        <textarea rows="2" aria-label="Progress notes for ${escapeHtml(item.goal)}" placeholder="Enter progress comments...">${escapeHtml(
          item.notes,
        )}</textarea>
      </td>
      <td>${escapeHtml(item.timeline)}</td>
    `;

    row.querySelector("select").addEventListener("change", (event) => {
      item.status = event.target.value;
      updateMemberReviewStatus(member);
      persistDraft();
      render();
    });

    row.querySelector("textarea").addEventListener("input", (event) => {
      item.notes = event.target.value;
      updateMemberReviewStatus(member);
      persistDraft();
      renderTeamList();
      renderAgentReview();
      renderSummary();
    });

    els.historyBody.append(row);
  });
}

function renderSupervisorCurrentGoals(member) {
  els.currentGoalsBody.innerHTML = "";

  member.currentGoals.forEach((goal, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          <textarea rows="1" class="goal-field" placeholder="Enter goal..." aria-label="Current month goal ${index + 1}">${escapeHtml(goal.goal)}</textarea>
        </div>
      </td>
      <td>
        <textarea rows="1" class="action-plan-field" placeholder="Action plan" aria-label="Action plan for current goal ${index + 1}">${escapeHtml(goal.actionPlan)}</textarea>
      </td>
      <td>
        <input class="timeline-field" value="${escapeHtml(goal.timeline)}" placeholder="Timeline" aria-label="Timeline for current goal ${index + 1}" />
      </td>
      <td class="metric-cell">
        <input class="kpi-field" value="${escapeHtml(goal.kpi)}" placeholder="KPI" aria-label="KPI for current goal ${index + 1}" />
      </td>
      <td class="data-cell">
        <input class="${dataFieldClass(goal.kpi, goal.data)}" value="${escapeHtml(goal.data)}" placeholder="Data" aria-label="Data for current goal ${index + 1}" />
      </td>
      <td>
        ${renderAgentResponseSummary(goal)}
      </td>
      <td class="action-col">
        <button class="icon-button" type="button" title="Remove goal" aria-label="Remove current goal ${index + 1}" ${
          member.currentGoals.length === 1 ? "disabled" : ""
        }><span aria-hidden="true">×</span></button>
      </td>
    `;

    const goalInput = row.querySelector(".goal-field");
    const actionPlanInput = row.querySelector(".action-plan-field");
    const timelineInput = row.querySelector(".timeline-field");
    const kpiInput = row.querySelector(".kpi-field");
    const dataInput = row.querySelector(".data-field");
    goalInput.addEventListener("input", (event) => {
      goal.goal = event.target.value;
      autoSizeField(event.target);
      updateMemberReviewStatus(member);
      persistDraft();
      renderTeamList();
      renderAgentReview();
      renderSummary();
    });

    actionPlanInput.addEventListener("input", (event) => {
      goal.actionPlan = event.target.value;
      autoSizeField(event.target);
      updateMemberReviewStatus(member);
      persistDraft();
      renderTeamList();
      renderAgentReview();
      renderSummary();
    });

    timelineInput.addEventListener("input", (event) => {
      goal.timeline = event.target.value;
      updateMemberReviewStatus(member);
      persistDraft();
      renderAgentReview();
    });

    kpiInput.addEventListener("input", (event) => {
      goal.kpi = event.target.value;
      applyDataInputTone(dataInput, goal.kpi, goal.data);
      updateMemberReviewStatus(member);
      persistDraft();
      renderTeamList();
      renderAgentReview();
      renderReports();
      renderSummary();
    });

    dataInput.addEventListener("input", (event) => {
      goal.data = event.target.value;
      applyDataInputTone(event.target, goal.kpi, goal.data);
      updateMemberReviewStatus(member);
      persistDraft();
      renderTeamList();
      renderAgentReview();
      renderReports();
      renderSummary();
    });

    row.querySelector("button").addEventListener("click", () => {
      member.currentGoals.splice(index, 1);
      updateMemberReviewStatus(member);
      persistDraft();
      render();
    });

    els.currentGoalsBody.append(row);
  });
}

function renderAgentReview() {
  const member = selectedAgent();

  els.agentAvatar.textContent = initials(member.name);
  els.agentName.textContent = member.name;
  els.agentEmail.textContent = member.email;
  els.agentProfileStatus.textContent = statusLabel(member.status);
  els.agentProfileStatus.className = `profile-stat ${member.status}`;
  els.agentReviewTitle.textContent = `One-on-One Review - ${reviewPeriod}`;
  els.agentReviewSubtitle.textContent = "Supervisor updates and agent responses stay in sync";
  els.agentReviewStatus.textContent = statusLabel(member.status);
  els.agentReviewStatus.className = `status-pill ${member.status}`;
  els.agentLastUpdated.textContent = `Last updated: ${member.lastUpdated}`;

  renderAgentHistory(member);
  renderAgentCurrentGoals(member);
}

function renderAgentHistory(member) {
  els.agentHistoryBody.innerHTML = "";

  member.history.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          <span>${escapeHtml(item.goal)}</span>
        </div>
      </td>
      <td class="metric-cell">${escapeHtml(item.kpi)}</td>
      <td class="data-cell">${renderDataValue(item.kpi, item.data)}</td>
      <td>${item.status ? `<span class="mini-pill">${escapeHtml(item.status)}</span>` : `<em>Not reviewed yet</em>`}</td>
      <td>${item.notes ? escapeHtml(item.notes) : `<em>No comments yet</em>`}</td>
      <td>${escapeHtml(item.timeline)}</td>
    `;
    els.agentHistoryBody.append(row);
  });
}

function renderAgentCurrentGoals(member) {
  els.agentCurrentGoalsBody.innerHTML = "";

  member.currentGoals.forEach((goal, index) => {
    const hasResponse = Boolean(goal.agentResponse);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div class="numbered-cell">
          <span class="row-number">${index + 1}.</span>
          <span class="${goal.goal ? "" : "placeholder-text"}">${escapeHtml(goal.goal || "Goal to be discussed")}</span>
        </div>
      </td>
      <td class="${goal.actionPlan ? "" : "placeholder-text"}">${escapeHtml(goal.actionPlan || "Not set")}</td>
      <td class="${goal.timeline ? "" : "placeholder-text"}">${escapeHtml(goal.timeline || "Not set")}</td>
      <td class="metric-cell ${goal.kpi ? "" : "placeholder-text"}">${escapeHtml(goal.kpi || "Not set")}</td>
      <td class="data-cell">${renderDataValue(goal.kpi, goal.data)}</td>
      <td>
        ${renderAgentResponseSummary(goal, "agent")}
      </td>
      <td>
        <button class="respond-button" type="button" aria-label="${hasResponse ? "Edit response" : "Respond"} for goal ${index + 1}">
          <span aria-hidden="true">◌</span>
          ${hasResponse ? "Edit" : "Respond"}
        </button>
      </td>
    `;

    row.querySelector("button").addEventListener("click", () => openResponseModal(member.id, index));
    els.agentCurrentGoalsBody.append(row);
  });
}

function renderSummary() {
  const completed = state.members.filter((member) => member.status === "completed").length;
  const pending = state.members.length - completed;

  els.completedCount.textContent = String(completed);
  els.pendingCount.textContent = String(pending);
  els.pendingMessage.textContent = `You have ${pending} one-on-one review${pending === 1 ? "" : "s"} pending for ${reviewPeriod}. Please complete them to maintain 100% coverage.`;
}

function renderReports() {
  if (!els.reportsView) return;

  const metrics = getReportMetrics();
  renderReportKpis(metrics);
  renderCompletionChart(metrics.months);
  renderMonthlyReport(metrics.months);
  renderResponseSummary(metrics.responseTotals);
  renderAgentBreakdownChart(metrics.agentBreakdown);
  renderAgentBreakdown(metrics.agentBreakdown);
  renderAttentionList(metrics.attentionItems);
}

function getReportMetrics() {
  const mayCompleted = state.members.filter((member) => member.status === "completed").length;
  const mayPending = state.members.length - mayCompleted;
  const mayMonth = { month: "May", completed: mayCompleted, pending: mayPending };
  const allMonths = [...historicalMonthlyReports, mayMonth].map((month) => ({
    ...month,
    total: month.completed + month.pending,
    rate: Math.round((month.completed / Math.max(month.completed + month.pending, 1)) * 100),
  }));

  const selectedMonth = state.selectedReportMonth ?? "all";
  const visibleMonths = selectedMonth === "all" ? allMonths : allMonths.filter((month) => month.month === selectedMonth);
  const useHistoricalResponses = selectedMonth === "all";
  const agentBreakdown = state.members.map((member) => {
    const base = useHistoricalResponses ? historicalResponseBreakdown[member.id] ?? emptyResponseCounts() : emptyResponseCounts();
    const live = selectedMonth === "all" || selectedMonth === "May" ? currentResponseCounts(member) : emptyResponseCounts();
    return {
      id: member.id,
      name: member.name,
      ...addResponseCounts(base, live),
    };
  });

  const responseTotals = agentBreakdown.reduce(
    (totals, row) => addResponseCounts(totals, row),
    emptyResponseCounts(),
  );

  const totalReviews = visibleMonths.reduce((sum, month) => sum + month.total, 0);
  const completedReviews = visibleMonths.reduce((sum, month) => sum + month.completed, 0);
  const pendingReviews = visibleMonths.reduce((sum, month) => sum + month.pending, 0);
  const completionRate = Math.round((completedReviews / Math.max(totalReviews, 1)) * 100);
  const agentResponses = responseTotals.acknowledged + responseTotals.incorrect + responseTotals.discuss + responseTotals.support;
  const needsAttention = responseTotals.incorrect + responseTotals.support + pendingReviews;

  return {
    selectedMonth,
    months: visibleMonths,
    allMonths,
    totalReviews,
    completedReviews,
    pendingReviews,
    completionRate,
    agentResponses,
    needsAttention,
    responseTotals,
    agentBreakdown,
    attentionItems: getAttentionItems(agentBreakdown, pendingReviews),
  };
}

function renderReportKpis(metrics) {
  const cards = [
    { label: "Total reviews", value: metrics.totalReviews, tone: "blue", detail: `${metrics.completedReviews} complete` },
    { label: "Completion rate", value: `${metrics.completionRate}%`, tone: "green", detail: `${metrics.pendingReviews} pending` },
    { label: "Agent responses", value: metrics.agentResponses, tone: "purple", detail: `${metrics.responseTotals.noResponse} open` },
    { label: "Needs attention", value: metrics.needsAttention, tone: "orange", detail: "Pending or flagged" },
  ];

  els.reportKpis.innerHTML = cards
    .map(
      (card) => `
        <article class="report-kpi-card ${card.tone}">
          <span class="kpi-icon" aria-hidden="true">${reportIcon(card.tone)}</span>
          <span>
            <small>${card.label}</small>
            <strong>${card.value}</strong>
            <em>${card.detail}</em>
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

  const maxValue = Math.max(5, ...months.flatMap((month) => [month.completed, month.pending]));
  const chartData = {
    labels: months.map((month) => month.month),
    datasets: [
      {
        label: "Completed",
        data: months.map((month) => month.completed),
        borderColor: "#4fbf66",
        backgroundColor: "rgba(79, 191, 102, 0.12)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#4fbf66",
        pointHoverBackgroundColor: "#4fbf66",
        pointHoverBorderColor: "#ffffff",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.35,
        fill: false,
      },
      {
        label: "Pending",
        data: months.map((month) => month.pending),
        borderColor: "#f0a22a",
        backgroundColor: "rgba(240, 162, 42, 0.12)",
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#f0a22a",
        pointHoverBackgroundColor: "#f0a22a",
        pointHoverBorderColor: "#ffffff",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.35,
        fill: false,
      },
    ],
  };

  if (completionTrendChart) {
    completionTrendChart.data = chartData;
    completionTrendChart.options.scales.y.suggestedMax = maxValue + 1;
    completionTrendChart.update();
    canvas.dataset.chartRendered = "true";
    return;
  }

  completionTrendChart = new Chart(canvas, {
    type: "line",
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
          display: false,
        },
        tooltip: {
          backgroundColor: "#030313",
          titleFont: { size: 14, weight: "700" },
          bodyFont: { size: 13, weight: "600" },
          padding: 12,
          displayColors: true,
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${context.parsed.y} review${context.parsed.y === 1 ? "" : "s"}`;
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
            font: { size: 13, weight: "700" },
          },
        },
        y: {
          beginAtZero: true,
          suggestedMax: maxValue + 1,
          ticks: {
            stepSize: 1,
            precision: 0,
            color: "#6e7482",
            font: { size: 12, weight: "700" },
          },
          grid: {
            color: "#d7dce5",
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
          <td>${escapeHtml(month.month)}</td>
          <td><span class="count-pill green">${month.completed}</span></td>
          <td><span class="count-pill amber">${month.pending}</span></td>
          <td>${month.total}</td>
          <td><strong>${month.rate}%</strong></td>
        </tr>
      `,
    )
    .join("");
}

function renderResponseSummary(totals) {
  els.responseSummaryCards.innerHTML = responseTypeMeta
    .map(
      (item) => `
        <article class="response-total-card ${item.tone}">
          <span>${item.label}</span>
          <strong>${totals[item.key]}</strong>
        </article>
      `,
    )
    .join("");
}

function renderAgentBreakdownChart(rows) {
  const canvas = els.agentResponseChart;
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

  const palette = {
    acknowledged: "#3fb85a",
    incorrect: "#e45a5a",
    discuss: "#4f7df3",
    support: "#8c55d9",
    noResponse: "#aab0bc",
  };
  const maxTotal = Math.max(5, ...rows.map(responseCountTotal));
  const chartData = {
    labels: rows.map((row) => row.name),
    datasets: responseTypeMeta.map((item) => ({
      label: item.label,
      data: rows.map((row) => row[item.key]),
      backgroundColor: palette[item.key],
      borderColor: "#ffffff",
      borderWidth: 2,
      borderRadius: 7,
      borderSkipped: false,
      barPercentage: 0.78,
      categoryPercentage: 0.72,
    })),
  };

  const chartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "y",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          color: "#5f6573",
          padding: 18,
          font: { size: 12, weight: "700" },
        },
      },
      tooltip: {
        backgroundColor: "#030313",
        titleFont: { size: 14, weight: "750" },
        bodyFont: { size: 13, weight: "650" },
        padding: 12,
        displayColors: true,
        callbacks: {
          label(context) {
            const value = context.parsed.x;
            return `${context.dataset.label}: ${value} response${value === 1 ? "" : "s"}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        suggestedMax: maxTotal + 1,
        ticks: {
          stepSize: 2,
          precision: 0,
          color: "#737987",
          font: { size: 12, weight: "700" },
        },
        grid: {
          color: "#e4e8ef",
          borderDash: [5, 5],
        },
        border: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#171925",
          font: { size: 13, weight: "800" },
        },
      },
    },
  };

  if (agentResponseBreakdownChart) {
    agentResponseBreakdownChart.data = chartData;
    agentResponseBreakdownChart.options.scales.x.suggestedMax = maxTotal + 1;
    agentResponseBreakdownChart.update();
    canvas.dataset.chartRendered = "true";
    return;
  }

  agentResponseBreakdownChart = new Chart(canvas, {
    type: "bar",
    data: chartData,
    options: chartOptions,
  });
  canvas.dataset.chartRendered = "true";
}

function renderAgentBreakdown(rows) {
  els.agentBreakdownBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.name)}</td>
          <td><span class="count-pill green">${row.acknowledged}</span></td>
          <td><span class="count-pill red">${row.incorrect}</span></td>
          <td><span class="count-pill blue">${row.discuss}</span></td>
          <td><span class="count-pill purple">${row.support}</span></td>
          <td><span class="count-pill gray">${row.noResponse}</span></td>
          <td><strong>${responseCountTotal(row)}</strong></td>
        </tr>
      `,
    )
    .join("");
}

function renderAttentionList(items) {
  if (!items.length) {
    els.attentionList.innerHTML = `<p class="empty-state">No urgent follow-ups for this range.</p>`;
    return;
  }

  els.attentionList.innerHTML = items
    .map(
      (item) => `
        <article class="attention-item ${item.tone}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.detail)}</span>
        </article>
      `,
    )
    .join("");
}

function currentResponseCounts(member) {
  return member.currentGoals.reduce((counts, goal) => {
    if (!goal.agentResponse) {
      counts.noResponse += 1;
    } else if (goal.agentResponse === "I acknowledge") {
      counts.acknowledged += 1;
    } else if (goal.agentResponse === "Data is incorrect") {
      counts.incorrect += 1;
    } else if (goal.agentResponse === "Let's discuss this in detail") {
      counts.discuss += 1;
    } else if (goal.agentResponse === "I need more support for this") {
      counts.support += 1;
    }
    return counts;
  }, emptyResponseCounts());
}

function getAttentionItems(rows, pendingReviews) {
  const items = [];
  if (pendingReviews) {
    items.push({
      tone: "amber",
      title: `${pendingReviews} reviews still pending`,
      detail: "Prioritize supervisor completion before month close.",
    });
  }

  rows.forEach((row) => {
    if (row.incorrect > 0) {
      items.push({
        tone: "red",
        title: `${row.name}: ${row.incorrect} data issue${row.incorrect === 1 ? "" : "s"}`,
        detail: "Validate KPI/source data before final review.",
      });
    }
    if (row.support > 0) {
      items.push({
        tone: "purple",
        title: `${row.name}: ${row.support} support request${row.support === 1 ? "" : "s"}`,
        detail: "Plan coaching or resource follow-up.",
      });
    }
  });

  return items.slice(0, 6);
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

function responseCountTotal(row) {
  return row.acknowledged + row.incorrect + row.discuss + row.support + row.noResponse;
}

function reportIcon(tone) {
  if (tone === "green") return "✓";
  if (tone === "purple") return "◌";
  if (tone === "orange") return "!";
  return "∑";
}

function renderDataValue(kpi, data) {
  const value = String(data ?? "").trim();
  if (!value) {
    return `<span class="placeholder-text">Not set</span>`;
  }

  const tone = performanceTone(kpi, value);
  return `<span class="data-value ${tone ? `data-value-${tone}` : ""}">${escapeHtml(value)}</span>`;
}

function dataFieldClass(kpi, data) {
  const tone = performanceTone(kpi, data);
  return `data-field${tone ? ` data-field-${tone}` : ""}`;
}

function applyDataInputTone(input, kpi, data) {
  input.className = dataFieldClass(kpi, data);
}

function performanceTone(kpi, data) {
  const value = parseMetricNumber(data);
  if (value == null) return "";

  const metric = String(kpi ?? "").toLowerCase();
  const isPercent = String(data ?? "").includes("%");

  if (metric.includes("aht") || metric.includes("handling time") || metric.includes("resolution time")) {
    if (value <= 8) return "green";
    if (value <= 8.5) return "amber";
    return "red";
  }

  if (metric.includes("escalation")) {
    if (value <= 10) return "green";
    if (value <= 18) return "amber";
    return "red";
  }

  if (metric.includes("backlog")) {
    if (value <= 20) return "green";
    if (value <= 35) return "amber";
    return "red";
  }

  if (metric.includes("bill") || metric.includes("volume") || metric.includes("productivity")) {
    if (value >= 1300) return "green";
    if (value >= 1200) return "amber";
    return "red";
  }

  if (metric.includes("accuracy")) {
    if (value >= 96) return "green";
    if (value >= 93) return "amber";
    return "red";
  }

  if (metric.includes("quality")) {
    if (value >= 94) return "green";
    if (value >= 90) return "amber";
    return "red";
  }

  if (metric.includes("utilization")) {
    if (value >= 90) return "green";
    if (value >= 85) return "amber";
    return "red";
  }

  if (metric.includes("csat")) {
    if (value >= 90) return "green";
    if (value >= 85) return "amber";
    return "red";
  }

  if (metric.includes("adherence") || metric.includes("schedule")) {
    if (value >= 92) return "green";
    if (value >= 88) return "amber";
    return "red";
  }

  if (metric.includes("training")) {
    if (value >= 80) return "green";
    if (value >= 60) return "amber";
    return "red";
  }

  if (isPercent) {
    if (value >= 95) return "green";
    if (value >= 85) return "amber";
    return "red";
  }

  if (value >= 1000) return "green";
  if (value >= 500) return "amber";
  return "red";
}

function parseMetricNumber(data) {
  const match = String(data ?? "").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function responseCountLabel(member) {
  const total = member.currentGoals.length;
  const responded = member.currentGoals.filter((goal) => goal.agentResponse).length;
  return `${responded} of ${total} agent response${total === 1 ? "" : "s"}`;
}

function supervisorUpdateCountLabel(member) {
  const total = member.history.filter((item) => item.status || item.notes).length;
  return `${total} supervisor update${total === 1 ? "" : "s"}`;
}

function renderAgentResponseSummary(goal, view = "supervisor") {
  if (!goal.agentResponse) {
    return `<span class="response-empty">${view === "agent" ? "No response yet" : "Waiting for agent"}</span>`;
  }

  return `
    <div class="response-summary">
      <span class="response-chip">${escapeHtml(goal.agentResponse)}</span>
      ${goal.agentNote ? `<small class="response-note-preview">${escapeHtml(goal.agentNote)}</small>` : ""}
      ${goal.agentRespondedAt ? `<small class="response-time">${escapeHtml(goal.agentRespondedAt)}</small>` : ""}
    </div>
  `;
}

function currentGoalSummary(goal) {
  const title = goal.goal.trim() || goal.kpi.trim() || "Current planning item";
  const details = [];
  if (goal.actionPlan.trim()) details.push(goal.actionPlan.trim());
  if (goal.kpi.trim()) details.push(goal.kpi.trim());
  if (goal.data.trim()) details.push(goal.data.trim());
  if (goal.timeline.trim()) details.push(`due ${goal.timeline.trim()}`);
  return details.length ? `${title} - ${details.join(", ")}` : title;
}

function addGoal() {
  const member = selectedSupervisorMember();
  member.currentGoals.push({
    goal: "",
    actionPlan: "",
    timeline: "",
    kpi: "",
    data: "",
    agentResponse: "",
    agentNote: "",
    agentRespondedAt: "",
  });
  updateMemberReviewStatus(member);
  persistDraft();
  render();

  const lastInput = els.currentGoalsBody.querySelector("tr:last-child .goal-field");
  lastInput?.focus();
}

function completeReview() {
  const member = selectedSupervisorMember();
  const missingHistory = member.history.some((item) => !item.status || !item.notes.trim());
  const missingCurrentGoal = member.currentGoals.some(
    (goal) =>
      !goal.goal.trim() || !goal.actionPlan.trim() || !goal.timeline.trim() || !goal.kpi.trim() || !goal.data.trim(),
  );

  if (missingHistory || missingCurrentGoal) {
    showToast("Complete past follow-up and all current planning goal, action plan, timeline, KPI, and data fields first.");
    return;
  }

  member.status = "completed";
  member.lastUpdated = formatTimestamp(new Date());
  persistDraft();
  render();
  showToast(`${member.name}'s ${reviewPeriod} review is complete.`);
}

function saveDraft() {
  const member = selectedSupervisorMember();
  member.lastUpdated = formatTimestamp(new Date());
  updateMemberReviewStatus(member);
  persistDraft();
  render();
  showToast("Draft saved.");
}

function switchView(view) {
  state.activeView = view;
  persistDraft();
  render();
}

function handleReportDownload(type) {
  const metrics = getReportMetrics();
  const rows =
    type === "monthly"
      ? [
          ["Month", "Completed", "Pending", "Total", "Rate"],
          ...metrics.months.map((month) => [month.month, month.completed, month.pending, month.total, `${month.rate}%`]),
        ]
      : [
          ["Agent", "Acknowledged", "Data Incorrect", "Discuss Further", "Need Support", "No Response", "Total"],
          ...metrics.agentBreakdown.map((row) => [
            row.name,
            row.acknowledged,
            row.incorrect,
            row.discuss,
            row.support,
            row.noResponse,
            responseCountTotal(row),
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

function csvCell(value) {
  const text = String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function openResponseModal(memberId, goalIndex) {
  const member = state.members.find((item) => item.id === memberId);
  const goal = member?.currentGoals[goalIndex];
  if (!member || !goal) return;

  activeResponseTarget = { memberId, goalIndex };
  els.responseGoalSummary.textContent = currentGoalSummary(goal);
  els.responseNote.value = goal.agentNote ?? "";

  els.responseForm.querySelectorAll('input[name="agentResponse"]').forEach((input) => {
    input.checked = input.value === goal.agentResponse;
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

  const member = state.members.find((item) => item.id === activeResponseTarget.memberId);
  const goal = member?.currentGoals[activeResponseTarget.goalIndex];
  if (!member || !goal) return;

  goal.agentResponse = selectedResponse;
  goal.agentNote = els.responseNote.value.trim();
  goal.agentRespondedAt = formatTimestamp(new Date());
  member.lastUpdated = goal.agentRespondedAt;

  if (member.status === "pending") {
    member.status = "in-progress";
  }

  persistDraft();
  closeResponseModal();
  render();
  showToast("Response shared with supervisor.");
}

function updateSubmitResponseState() {
  const hasSelection = Boolean(els.responseForm.querySelector('input[name="agentResponse"]:checked'));
  els.submitResponse.disabled = !hasSelection;
}

function updateMemberReviewStatus(member) {
  if (member.status === "completed") {
    return;
  }

  const hasHistoryProgress = member.history.some((item) => item.status || item.notes.trim());
  const hasCurrentGoals = member.currentGoals.some(
    (goal) =>
      goal.goal.trim() || goal.actionPlan.trim() || goal.timeline.trim() || goal.kpi.trim() || goal.data.trim(),
  );
  const hasAgentResponses = member.currentGoals.some((goal) => goal.agentResponse);
  member.status = hasHistoryProgress || hasCurrentGoals || hasAgentResponses ? "in-progress" : "pending";
}

function statusLabel(status) {
  if (status === "completed") return "Completed";
  if (status === "in-progress") return "In Progress";
  return "Pending";
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
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
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
    document.querySelectorAll(".goal-field, .action-plan-field").forEach(autoSizeField);
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

els.navButtons.forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

els.agentSelect.addEventListener("change", (event) => {
  state.selectedAgentId = event.target.value;
  persistDraft();
  renderAgentReview();
});

els.reportMonthSelect.addEventListener("change", (event) => {
  state.selectedReportMonth = event.target.value;
  persistDraft();
  renderReports();
});

document.querySelectorAll("[data-report-download]").forEach((button) => {
  button.addEventListener("click", () => handleReportDownload(button.dataset.reportDownload));
});

els.addGoalButton.addEventListener("click", addGoal);
els.saveDraftButton.addEventListener("click", saveDraft);
els.completeReviewButton.addEventListener("click", completeReview);
els.responseForm.addEventListener("submit", submitAgentResponse);
els.responseForm.addEventListener("change", updateSubmitResponseState);
els.closeResponseModal.addEventListener("click", closeResponseModal);
els.cancelResponse.addEventListener("click", closeResponseModal);
els.responseModal.addEventListener("click", (event) => {
  if (event.target === els.responseModal) {
    closeResponseModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.responseModal.classList.contains("hidden")) {
    closeResponseModal();
  }
});

render();
