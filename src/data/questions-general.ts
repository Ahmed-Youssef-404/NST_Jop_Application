import type { Question } from "@/types/form"

/** Section 3 — Basic Information */
export const basicInfoQuestions: Question[] = [
  {
    id: "full_name",
    number: 2,
    title: "Full Name",
    type: "short-text",
    required: true,
  },
  {
    id: "whatsapp_number",
    number: 3,
    title: "WhatsApp Number",
    type: "short-text",
    required: true,
  },
  {
    id: "email_address",
    number: 4,
    title: "Email Address",
    type: "short-text",
    required: true,
  },
  {
    id: "college_university",
    number: 5,
    title: "College / University",
    type: "short-text",
    required: true,
  },
  {
    id: "academic_year",
    number: 6,
    title: "Academic Year",
    type: "single-choice",
    required: true,
    options: [
      { value: "1st Year", label: "1st Year" },
      { value: "2nd Year", label: "2nd Year" },
      { value: "3rd Year", label: "3rd Year" },
      { value: "4th Year", label: "4th Year" },
      { value: "Graduate", label: "Graduate" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "current_location",
    number: 7,
    title: "Where are you currently based?",
    type: "short-text",
    required: true,
  },
]

/** Section 4 — General Questions */
export const generalQuestions: Question[] = [
  {
    id: "why_join_nst",
    number: 8,
    title: "Why do you want to join the NST Team?",
    type: "paragraph",
    required: true,
  },
  {
    id: "what_you_add",
    number: 9,
    title: "What do you think you can add to NST?",
    type: "paragraph",
    required: true,
  },
  {
    id: "responsibility_story",
    number: 10,
    title:
      "Tell us about a time when you took responsibility for something without being asked to.",
    description: "What was the situation, and what did you do?",
    type: "paragraph",
    required: true,
  },
  {
    id: "teamwork_story",
    number: 11,
    title: "Tell us about a time when you worked as part of a team.",
    description: "What was your role, and what did you contribute?",
    type: "paragraph",
    required: true,
  },
  {
    id: "weekly_commitment",
    number: 12,
    title: "How much time can you realistically commit to NST each week?",
    type: "single-choice",
    required: true,
    options: [
      { value: "Less than 2 hours", label: "Less than 2 hours" },
      { value: "2-4 hours", label: "2–4 hours" },
      { value: "4-6 hours", label: "4–6 hours" },
      { value: "6-10 hours", label: "6–10 hours" },
      { value: "10+ hours", label: "10+ hours" },
    ],
  },
  {
    id: "availability_changes",
    number: 13,
    title:
      "Are there any periods during which your availability may significantly decrease?",
    description: "If yes, please explain.",
    type: "paragraph",
    required: true,
  },
  {
    id: "unpaid_confirmation",
    number: 14,
    title:
      "NST Team roles are voluntary and unpaid. Are you comfortable committing to the role without financial compensation?",
    type: "single-choice",
    required: true,
    terminatesOnValue: "No",
    options: [
      {
        value: "Yes, I understand and I am comfortable with this.",
        label: "Yes, I understand and I am comfortable with this.",
      },
      { value: "No", label: "No" },
    ],
  },
  {
    id: "hoping_to_gain",
    number: 15,
    title: "What are you hoping to gain from joining NST?",
    type: "paragraph",
    required: true,
  },
]

/** Section 6 — Final Questions */
export const finalQuestions: Question[] = [
  {
    id: "anything_else_1",
    number: 25,
    title: "Is there anything else you would like us to know about you?",
    type: "paragraph",
    required: false,
  },
  {
    id: "heard_about_us",
    number: 26,
    title: "How did you hear about this opportunity?",
    type: "single-choice",
    required: true,
    options: [
      { value: "Instagram", label: "Instagram" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Friend", label: "Friend" },
      { value: "NST Member", label: "NST Member" },
      { value: "College", label: "College" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "anything_else_2",
    number: 27,
    title: "Is there anything else you would like to add?",
    type: "paragraph",
    required: false,
  },
]
