import {
  AlarmClock,
  Camera,
  CameraIcon,
  Globe,
  Shield,
  StickyNote,
} from "lucide-react";

export const IMPORANT_INSTRUCTIONS = [
  "You will get questions related to all domain and evaluated.",
  "You will be asked questions based on your profile and documents.",
  "You will be asked regarding your personal details, professional details, passports, financial related documents, random question to check English, understanding of questions, about university, country, why particular thing.",
  "You should be able to not move much as we will take your 30 pictures where you break the rules.",
  "We will warn you thrice and then when you misconduct or not been professional according to rules then we will drop the interview.",
];

export const THINGS_NOT_TO_DO = [
  {
    icon: CameraIcon,
    text: "Don't cheat and look here and there.",
  },
  {
    icon: StickyNote,
    text: "Don't use any material to study answer.",
  },
  {
    icon: AlarmClock,
    text: "Don't close until instructed.",
  },
  {
    icon: Globe,
    text: "Don't open different websites as we will catch you.",
  },
];

export const THINGS_TO_DO = [
  {
    icon: Shield,
    text: "Be truthful to your answers.",
  },
  {
    icon: AlarmClock,
    text: "Be precise and speak exactly in limited words.",
  },
  {
    icon: Camera,
    text: "Focus only towards camera and answer the words clearly.",
  },
  {
    icon: StickyNote,
    text: "Be honest and motivated with correct answers.",
  },
];
