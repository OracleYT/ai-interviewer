import {
  AlarmClock,
  Camera,
  CameraIcon,
  Globe,
  Shield,
  StickyNote,
} from "lucide-react";

export const IMPORANT_INSTRUCTIONS = [
  "You will be asked questions about different topics and your answers will be checked.",
  "The questions will be based on your profile and documents.",
  "You may be asked about your personal details, education, job experience, passport, financial documents, and other papers. You may also be asked simple questions to check your English and understand your course,university, country, and your reasons for choosing them.",
  "Please try not to move too much. We will take up to 30 pictures during the interview. If you move too much or break any rules, it will be noted.",
  "If you do something wrong or act unprofessionally, we will warn you up to three times. If it continues, your interview will be cancelled.",
];

export const THINGS_NOT_TO_DO = [
  {
    icon: CameraIcon,
    text: "Do not attempt to cheat or look around during the interview.",
  },
  {
    icon: StickyNote,
    text: "Do not refer to any notes or study materials while answering.",
  },
  {
    icon: AlarmClock,
    text: "Do not close the interview window unless instructed to do so.",
  },
  {
    icon: Globe,
    text: "Do not open any other websites or tabs during the interview, as this will be detected.",
  },
];

export const THINGS_TO_DO = [
  {
    icon: Shield,
    text: "Provide honest and accurate answers.",
  },
  {
    icon: AlarmClock,
    text: "Be clear and concise in your responses.",
  },
  {
    icon: Camera,
    text: "Maintain eye contact with the camera and speak clearly.",
  },
  {
    icon: StickyNote,
    text: "Stay confident and answer with sincerity and motivation.",
  },
];
