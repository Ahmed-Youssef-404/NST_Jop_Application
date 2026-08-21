import type { Question } from "@/types/form"

/** Section 5C — Mentorship & Assessment Team */
export const mentorshipQuestions: Question[] = [
  {
    id: "mentor_student_quit",
    number: 16,
    title: 'A student has stopped solving tasks and tells you:',
    description:
      '"I\'m not good enough for this, and I want to quit." How would you handle the situation?',
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_asks_for_solution",
    number: 17,
    title:
      "A student keeps asking you for the solution instead of trying to solve the problem themselves. What would you do?",
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_helped_someone_learn",
    number: 18,
    title:
      "Tell us about a time when you helped someone learn or improve at something. What did you do?",
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_good_mentor_trait",
    number: 19,
    title: "What do you think makes someone a good mentor?",
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_weak_interview_answer",
    number: 20,
    title:
      "During an interview, a student gives a short answer that seems weak. What would you do before deciding that the student is not suitable?",
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_problem_solving_rating",
    number: 21,
    title: "How would you rate your current problem-solving skills?",
    type: "scale",
    required: true,
    min: 1,
    max: 5,
    minLabel: "Beginner",
    maxLabel: "Very Strong",
  },
  {
    id: "mentor_comfortable_topics",
    number: 22,
    title: "Which problem-solving topics are you currently comfortable with?",
    type: "multi-choice",
    required: true,
    options: [
      { value: "Programming Fundamentals", label: "Programming Fundamentals" },
      { value: "Loops", label: "Loops" },
      { value: "Nested Loops", label: "Nested Loops" },
      { value: "Arrays", label: "Arrays" },
      { value: "Strings", label: "Strings" },
      { value: "Basic Algorithms", label: "Basic Algorithms" },
      { value: "Time Complexity", label: "Time Complexity" },
      { value: "Problem Analysis", label: "Problem Analysis" },
      { value: "Greedy Techniques", label: "Greedy Techniques" },
      { value: "Prefix Sum", label: "Prefix Sum" },
      { value: "Frequency / Hashing", label: "Frequency / Hashing" },
      { value: "Binary Search", label: "Binary Search" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "mentor_explain_to_beginner",
    number: 23,
    title:
      "Briefly describe a programming or problem-solving topic that you are confident you could explain to a complete beginner.",
    type: "paragraph",
    required: true,
  },
  {
    id: "mentor_incorrect_but_confident",
    number: 24,
    title:
      "A student gives you an approach that you believe is incorrect, but they are confident that it will work. How would you respond?",
    type: "paragraph",
    required: true,
  },
]
