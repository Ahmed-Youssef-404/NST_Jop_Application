import type { Question } from "@/types/form"

/** Section 5A — Operations & Strategy Partner */
export const operationsQuestions: Question[] = [
  {
    id: "ops_overdue_priorities",
    number: 16,
    title:
      "You are following up with several team members. Two tasks are overdue, one person is not responding, and a new urgent issue appears. What would you do first, and why?",
    type: "paragraph",
    required: true,
  },
  {
    id: "ops_organizing_story",
    number: 17,
    title:
      "Tell us about a situation where you had to organize people, tasks, or a project. What exactly was your responsibility?",
    type: "paragraph",
    required: true,
  },
  {
    id: "ops_missed_deadlines",
    number: 18,
    title:
      "Imagine that a team member repeatedly misses deadlines. How would you handle the situation?",
    type: "paragraph",
    required: true,
  },
  {
    id: "ops_disagree_founder",
    number: 19,
    title:
      "If you strongly disagree with a decision made by the Founder, what would you do?",
    type: "paragraph",
    required: true,
  },
  {
    id: "ops_effective_with_founder",
    number: 20,
    title:
      "What do you think makes someone effective when working closely with a Founder?",
    type: "paragraph",
    required: true,
  },
]
