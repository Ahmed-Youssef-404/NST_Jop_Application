# NST Team Recruitment — Application Website

A multi-step application form for NST Team recruitment, built with React + TypeScript + Vite.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, Zustand, Zod, Framer Motion, React Router
- **Backend**: Vercel Serverless Functions (`/api`)
- **Storage**: Google Sheets (via Google Apps Script Web App)
- **Notifications**: Telegram Bot API

## Project Structure

```
src/
  types/form.ts              # Core types: Question, RoleDefinition, AnswersMap, etc.
  data/
    roles.ts                 # The 3 NST roles with descriptions
    questions-general.ts     # Basic info + general + final questions
    questions-operations.ts  # Section 5A questions
    questions-growth.ts      # Section 5B questions
    questions-mentorship.ts  # Section 5C questions
    questions.ts             # Central index — role→questions map, allQuestionIds
  store/form-store.ts         # Zustand store: phase, role, answers, step nav
  lib/
    validation.ts            # Dynamic Zod schema builder per question type
    build-steps.ts            # Builds ordered form steps (handles termination)
    build-payload.ts          # Flattens answers into submission payload
    api-client.ts              # Calls /api/submit-application
  components/
    ui/                       # shadcn/ui primitives
    form/                     # QuestionField, FormStepView, FormProgress
  pages/
    intro-page.tsx            # Section 1 — About NST
    roles-overview-page.tsx   # Section 2 — Role selection
    application-form-page.tsx # Sections 3–6 — the multi-step form
    terminated-page.tsx       # Shown if applicant answers "No" to unpaid question
    submitted-page.tsx        # Success screen

api/
  submit-application.ts       # Main handler: writes to Sheet, then notifies Telegram
  _lib/
    google-sheet.ts           # Posts to the Apps Script Web App
    telegram.ts                # Sends the Telegram summary message

google-apps-script/
  Code.gs                      # Paste into Apps Script editor bound to your Sheet
```

## How the conditional logic works

1. **Role selection** (`roles-overview-page.tsx`) sets `selectedRole` in the store.
2. **`build-steps.ts`** dynamically assembles the step list: Basic Info → General →
   (role-specific section, if a role is selected and not terminated) → Final.
3. **Termination**: question `unpaid_confirmation` (Q14) has `terminatesOnValue: "No"`.
   When the applicant selects "No", `application-form-page.tsx` detects this right after
   validating that step and switches the store's `phase` to `"terminated"`, which renders
   `TerminatedPage` and skips role-specific + final questions entirely.

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables (Vercel)

Copy `.env.example` and fill in:

- `GOOGLE_SCRIPT_URL` — your deployed Apps Script Web App URL
- `TELEGRAM_BOT_TOKEN` — your bot's token
- `TELEGRAM_CHAT_ID` — the chat/channel to notify

## Setting up Google Sheets

1. Create a new Google Sheet.
2. Extensions → Apps Script, paste in `google-apps-script/Code.gs`.
3. Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
4. Copy the Web App URL into `GOOGLE_SCRIPT_URL`.
5. **Important**: the column order in `Code.gs` (`QUESTION_ID_ORDER`) must always match
   `allQuestionIds` in `src/data/questions.ts`. If you add/remove/reorder questions, update
   both, then create a *new* Apps Script deployment.
6. In the Apps Script editor: Project Settings → Script Properties → add a property named
   `SHEET_READ_SECRET` with a long random value. This gates the `doGet` endpoint used by the
   admin dashboard to read applicants back out. Use the **same value** for `SHEET_READ_SECRET`
   in your Vercel environment variables (below).

## Admin Dashboard

[#admin-dashboard](#admin-dashboard)

A hidden route lets you log in and view all applicants, grouped by role, with every question
and answer laid out.

- **URL**: `/admin` (not linked anywhere in the UI — visit it directly)
- **Login**: email + password, checked against `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars
- **Session**: kept in memory only (React state) — refreshing the page logs you out and you
  log in again. Nothing is persisted to cookies or localStorage.
- **Data source**: same Google Sheet, read live via the Apps Script's `doGet`, gated by
  `SHEET_READ_SECRET`.

### Environment Variables for the admin dashboard

- `ADMIN_EMAIL` — the email required to log in
- `ADMIN_PASSWORD` — the password required to log in
- `ADMIN_SESSION_SECRET` — a long random string used to sign short-lived session tokens
  issued after login (separate from the sheet secret)
- `SHEET_READ_SECRET` — must match the Script Property of the same name set in Apps Script

## Deployment

Push to a GitHub repo and import into Vercel. It auto-detects the Vite framework and the
`/api` folder as serverless functions. Set the environment variables in the Vercel project
settings before the first real submission.