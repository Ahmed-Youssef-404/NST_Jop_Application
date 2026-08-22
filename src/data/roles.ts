import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  GraduationCap,
} from "lucide-react"

import type { RoleDefinition } from "@/types/form"

export const roles: RoleDefinition[] = [
  {
    id: "operations",
    icon: BriefcaseBusiness,
    title: "Operations & Strategy Partner",
    shortDescription:
      "Work closely with the Founder to coordinate operations and turn ideas into action.",
    fullDescription:
      "Works closely with the Founder to coordinate operations, follow up with teams, solve problems, track execution, and help turn ideas and decisions into action.",
    responsibilities: [
      "Coordinate operations across teams",
      "Follow up on tasks and deadlines",
      "Solve problems as they arise",
      "Track execution of decisions",
      "Turn ideas into actionable plans",
    ],
  },
  {
    id: "growth",
    icon: ChartNoAxesCombined,
    // title: "Growth & Outreach Team",
    title: "Marketing & Communications",
    shortDescription:
      "Drive NST's growth through campaigns, content, partnerships, and events.",
    fullDescription:
      "Works on NST's growth, campaigns, social media, content, PR, partnerships, events, and new opportunities to increase NST's reach and impact.",
    responsibilities: [
      "Manage social media and content",
      "Marketing Strategy",
      "Graphic Design",
      "Brand Identity",
      "Build partnerships and PR opportunities",
      "Organize Events and Campaigns",
      "Explore new growth opportunities",
    ],
  },
  {
    id: "mentorship",
    icon: GraduationCap,
    title: "Mentorship & Assessment Team",
    shortDescription:
      "Support students through their training journey and help assess applicants.",
    fullDescription:
      "Supports students throughout their training journey, monitors their progress, helps them overcome problems, and participates in interviewing and assessing applicants before the training starts.",
    responsibilities: [
      "Mentor students during their training",
      "Monitor student progress",
      "Help students overcome problems",
      "Interview and assess applicants",
      "Understand each student's needs and level",
    ],
  },
]

export const getRoleById = (
  id: string
): RoleDefinition | undefined => roles.find((r) => r.id === id)