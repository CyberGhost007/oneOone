# One-on-One Review System

Static prototype of a monthly one-on-one review workflow between a supervisor and their agents, with a reports dashboard. Plain HTML/CSS/JS — no framework, no backend — with a bundled copy of Chart.js for trend charts. All state lives in the browser's localStorage.

## Live demo

- v2 (current): https://cyberghost007.github.io/oneOone/v2/
- v1 (original design): https://cyberghost007.github.io/oneOone/

## Run locally

Open `index.html` directly, or serve the folder with any static server, e.g. `npx serve .`

## Views

- **Supervisor** — pick a team member, start a review for a period (1–3 consecutive months), fill in focus areas (KPI, timeline, data, comment), and send the review to the agent. While it is with the agent it can be pulled back; reopened reviews return here for edits and re-sending.
- **Agent** — see the reviews shared with you, respond to each item, chat in the feedback thread, and submit the review.
- **Reports** — team-wide summaries of review statuses and agent response types, filterable by period.

## Review lifecycle

| Internal status | Supervisor sees | Agent sees | Meaning |
| --- | --- | --- | --- |
| `in-progress` | Draft | (hidden) | Supervisor is editing; not yet shared |
| `awaiting` | Awaiting Agent Response | Open | With the agent for item responses and submit |
| `reopened` | Reopened | Reopened | Back with the supervisor — editable, then re-sent to the agent |
| `closed` | Closed | Closed | Acknowledged and closed; supervisor can reopen |

While a review is **Open**, the agent can:

- Respond to every item with one of **I acknowledge**, **Data is incorrect**, **Need to discuss this further**, or **I need more support for this**, plus an optional note. Responses stay editable until submit, and picking "Need to discuss this further" does **not** lock the other items.
- Review the **Summary** section at the bottom, which lists each item's response and states what submitting will do.
- Click **Submit** (allowed with pending items, after a warning):
  - if any item is marked "Need to discuss this further", the review routes back to the supervisor (**Reopened**);
  - otherwise the review is acknowledged and **Closed**, stamped with the acknowledgment date shown to the supervisor.

**Feedback thread:** the supervisor can write until the review closes; the agent can write while it is Open or Reopened. Closed reviews keep a frozen, read-only thread.

## Demo data & persistence

The app seeds demo team members and reviews on first load. All changes persist to localStorage (key `one-on-one-review-v2-state-v3`). The **Refresh** button in the header resets the demo data to its seed state.

## Releasing

GitHub Pages serves the `gh-pages` branch: v1 at the site root, v2 under `v2/`.

To release v2:

1. Commit changes on `release/v2`. If `app.js` or `styles.css` changed, bump its cache-buster in `index.html` (`app.js?v=v2-N`, `styles.css?v=v2-N`) so returning visitors fetch the new file.
2. Copy `index.html`, `app.js`, `styles.css`, the `chart.*.js` bundles, and `README.md` into `v2/` on the `gh-pages` branch.
3. Commit as `Update /v2 site to release/v2 <sha>` and push. Pages rebuilds in under a minute; already-open browsers may serve cached pages for up to 10 minutes.
