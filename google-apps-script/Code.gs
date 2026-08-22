/**
 * NST Application Form — Google Apps Script Web App
 * ---------------------------------------------------
 * HOW TO USE:
 * 1. Create a new Google Sheet (this will hold all submissions).
 * 2. In the Sheet, go to Extensions → Apps Script.
 * 3. Delete any starter code and paste this entire file in.
 * 4. Click "Deploy" → "New deployment".
 *    - Type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Copy the resulting Web App URL and set it as GOOGLE_SCRIPT_URL
 *    in your Vercel project's environment variables.
 * 6. Re-deploy (as a *new* deployment, not just saving) any time you
 *    edit this script, otherwise the live URL keeps serving old code.
 *
 * SHEET STRUCTURE:
 * Row 1 is the header row (auto-created on first submission if the
 * sheet is empty). Column A = Submitted At, Column B = Role, then
 * one column per question id, in the exact order defined below —
 * this order must always match `allQuestionIds` in the frontend's
 * src/data/questions.ts file.
 */

// Keep this in sync with src/data/questions.ts -> allQuestionIds
const QUESTION_ID_ORDER = [
  "full_name",
  "whatsapp_number",
  "email_address",
  "college_university",
  "academic_year",
  "current_location",
  "why_join_nst",
  "what_you_add",
  "responsibility_story",
  "teamwork_story",
  "weekly_commitment",
  "availability_changes",
  "unpaid_confirmation",
  "hoping_to_gain",
  "ops_overdue_priorities",
  "ops_organizing_story",
  "ops_missed_deadlines",
  "ops_disagree_founder",
  "ops_effective_with_founder",
  "growth_recruit_ideas",
  "growth_improve_visibility",
  "growth_idea_to_reality",
  "growth_interest_areas",
  "growth_bad_campaign",
  "mentor_student_quit",
  "mentor_asks_for_solution",
  "mentor_helped_someone_learn",
  "mentor_good_mentor_trait",
  "mentor_weak_interview_answer",
  "mentor_problem_solving_rating",
  "mentor_comfortable_topics",
  "mentor_explain_to_beginner",
  "mentor_incorrect_but_confident",
  "anything_else_1",
  "heard_about_us",
  "anything_else_2",
];

const HEADER_ROW = ["Submitted At", "Role", ...QUESTION_ID_ORDER];

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    ensureHeaderRow(sheet);

    const answers = payload.answers || {};
    const row = [
      payload.submittedAt || new Date().toISOString(),
      payload.role || "",
      ...QUESTION_ID_ORDER.map((id) => answers[id] || ""),
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER_ROW);
    sheet.getRange(1, 1, 1, HEADER_ROW.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

/**
 * doGet — used by the admin dashboard to read all submitted rows back out.
 * Protected by a shared secret passed as a query param (?secret=...), which
 * must match the SHEET_READ_SECRET script property. This is NOT meant to be
 * strong auth on its own — the admin login on the Vercel side is the real
 * gate; this secret just stops randoms from hitting the public Web App URL
 * directly and dumping the sheet.
 *
 * Set the secret once via: Project Settings -> Script Properties
 * -> add "SHEET_READ_SECRET". Use the SAME value as SHEET_READ_SECRET in
 * your Vercel environment variables.
 */
function doGet(e) {
  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty(
      "SHEET_READ_SECRET"
    );
    const providedSecret = (e.parameter && e.parameter.secret) || "";

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return jsonResponse({ success: false, error: "Unauthorized" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow < 2) {
      return jsonResponse({ success: true, rows: [] });
    }

    const values = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

    const rows = values.map((row) => {
      const record = {
        submittedAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0] || ""),
        role: String(row[1] || ""),
        answers: {},
      };
      QUESTION_ID_ORDER.forEach((id, idx) => {
        const cell = row[2 + idx];
        record.answers[id] = cell === undefined || cell === null ? "" : String(cell);
      });
      return record;
    });

    return jsonResponse({ success: true, rows: rows });
  } catch (err) {
    return jsonResponse({ success: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}