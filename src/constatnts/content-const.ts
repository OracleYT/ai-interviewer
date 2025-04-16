export const ABOUT_LIST = [
  {
    description:
      "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore",
  },
  {
    description:
      " magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ",
  },
  {
    description:
      "ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi",
  },
  {
    description: "nim.eiusmod",
  },
  {
    description:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut l",
  },
  {
    description: "abore et dolore.",
  },
];

export const DASHBOARD_SIDE_NAV_ITEMS = [
  {
    href: "/",
    text: "Dashboard",
  },
  {
    href: "/learn",
    text: "Learn",
  },
  {
    href: "/interview",
    text: "Interview",
  },
  // {
  //   href: "/setting",
  //   text: "Setting",
  // },
];


export const INTERVIEW_ABOUT_MAP = [
  {
    description:
      "eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore",
  },
  {
    description:
      " magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ",
  },
  {
    description:
      "ad minim.eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad mi",
  },
  {
    description: "nim.eiusmod",
  },
  {
    description:
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.eiusmod tempor incididunt ut l",
  },
  {
    description: "abore et dolore.",
  },
];


export const DAHSBOARD_SUCCESS_STEPS = [
  {
    step: "1",
    title: "Verify your Documents",
    note: "Ensure everything is in order.",
    description:
      "Review and submit all required documents to get started. This step is crucial for a smooth process, so double-check your details and verify your documents.",
    bgColor: "#32A7E2",
  },
  {
    step: "2",
    title: "Prepare for Round 1",
    note: "Ready to shine?",
    description:
      "Head to the Learn Section to access essential preparation materials. Get familiar with what’s coming up in your interview and prepare with confidence.",
    bgColor: "#B548C6",
  },
  {
    step: "3",
    title: "Complete Your Online CAS Round 1",
    note: "Show us your enthusiasm!",
    description:
      "When you're ready, start your first round of the CAS interview. Answer with confidence and authenticity. This is your opportunity to excel and demonstrate your exceptional suitability.",
    bgColor: "#FF8700",
  },
  {
    step: "4",
    title: "Repeat for Round 2",
    note: "Keep going strong!",
    description:
      "After completing Round 1, continue the process with Round 2. Stay confident, be genuine, and maintain your focus. This is the final step to confirm your readiness for studying abroad!",
    bgColor: "#DC3434",
  },
];


export type DocuemntType =
  | "passport"
  | "academic-transcript"
  | "bank-statement"
  | "english-proficiency";

export const DOCUMENTS_UPLOADS: {
  title: string;
  type: DocuemntType;
  required?: boolean;
}[] = [
  {
    title: "Passport*",
    type: "passport",
    required: true,
  },
  {
    title: "Academic Transcript",
    type: "academic-transcript",
  },
  {
    title: "Bank Statement",
    type: "bank-statement",
    required: false,
  },
  {
    title: "English Proficiency Result",
    type: "english-proficiency",
  },
];


export const  INTERVIEW_INSTRUCTIONS = [
  {
    tip: "Keep your passport with you during the interview.",
  },
  {
    tip: "First impressions matter, so dress appropriately as you would for an in-person interview.",
  },
  {
    tip: "Maintain eye contact with the camera throughout the interview.",
  },
  {
    tip: "Ensure your network connectivity is strong to avoid disruptions.",
  },
  {
    tip: "Check your video and audio before starting to avoid any glitches.",
  },
  {
    tip: "Ensure you are in a quiet, private space—no one should be around you during the interview.",
  },
  {
    tip: "Do not cheat or refer to any materials during the interview.",
  },
  {
    tip: "Be mindful of your background and surroundings to avoid distractions.",
  },
];

export const UNIVERSITY_NAME = `Coventry University`