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

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
