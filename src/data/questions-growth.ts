import type { Question } from "@/types/form"

/** Section 5B — Marketing & Communications Team */
export const growthQuestions: Question[] = [
  {
    id: "growth_recruit_ideas",
    number: 16,
    title:
      "NST wants to recruit 50 strong freshmen with a very limited budget. Give us three ideas you would consider, and briefly explain how you would execute one of them.",
    type: "paragraph",
    required: true,
  },
  {
    id: "growth_improve_visibility",
    number: 17,
    title:
      "If you joined the Marketing & Communications Team tomorrow, what is one thing you would try to improve about NST's visibility or growth, and why?",
    type: "paragraph",
    required: true,
  },
  {
    id: "growth_idea_to_reality",
    number: 18,
    title:
      "Tell us about an idea you had before that you actually turned into something real. What did you do?",
    type: "paragraph",
    required: true,
  },
  {
    id: "growth_interest_areas",
    number: 19,
    title: "Which areas are you most interested in?",
    type: "multi-choice",
    required: true,
    options: [
      { value: "Social Media", label: "Social Media" },
      { value: "Graphic Design", label: "Graphic Design" },
      { value: "Marketing Strategies", label: "Marketing Strategies" },
      { value: "Events & Campaigns", label: "Events & Campaigns" },
      { value: "Growth Strategies", label: "Growth Strategies" },
      { value: "Content Creation", label: "Content Creation" },
      { value: "Public Relations (PR)", label: "Public Relations (PR)" },
      { value: "Partnerships", label: "Partnerships" },
      { value: "Community Outreach", label: "Community Outreach" },
      { value: "Student Engagement", label: "Student Engagement" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    id: "growth_bad_campaign",
    number: 20,
    title:
      "Imagine you planned a campaign and the results were much worse than expected. What would you do next?",
    type: "paragraph",
    required: true,
  },
]
