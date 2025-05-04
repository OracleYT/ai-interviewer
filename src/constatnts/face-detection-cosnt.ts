export const MESSAGE_MAP: Record<
  "attention" | "you-moved-away" | "more-people" | "eye-contact",
  any
> = {
  attention: {
    message:
      "user is looking here and there and seems distracted, tell them to focus and look straight (try to add human touch as well some different content based on the current conversation, reply should look like real.(if it's second or third time then you can warn them as it might affect their results)",
    title: "Attention Broken",
  },
  "you-moved-away": {
    message:
      "user moved away from the camera and not visible, tell them to please come back to the camera (if it's the second or third time then you can warn them as it might affect their results)",
    title: "useer moved away",
  },
  "more-people": {
    title: "more people",
    message:
      "user has someone else in the camera, tell them I'm noticing someone else in the frame—this interview is just for you. Please continue alone. (if it's second or third time then you can warn them as it might affect their results)",
  },
  "eye-contact": {
    title: "eye contact",
    message:
      "user is looking here and there and seems distracted, tell them You're looking around quite a bit. Let's stay focused here.",
  },
};