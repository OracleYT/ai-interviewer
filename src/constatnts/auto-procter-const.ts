export const PROCTORING_OPTIONS = {
  trackingOptions: {
    audio: false,
    numHumans: true,
    tabSwitch: true,
    photosAtRandom: true,
    detectMultipleScreens: true,
    forceFullScreen: true,
    auxiliaryDevice: false,
    recordSession: false,
    captureSwitchedTab: true,
  },
  testContainerId: "test-container",
  showHowToVideo: false,
};

export const AP_VOILATION_WARNINGS = {
  "5001": {
    title: "No one looking at the camera",
    messages: [
      "Please return to the camera to continue the interview.",
      "I can't see you. Let's get back on track.",
      "You're still not visible. Please come back.",
      "You're off-screen. Return to proceed.",
      "Final reminder—return to the camera or the interview will end.",
    ],
    voilation: true,
  },
  "5002": {
    title: "More than 1 Person in Video",
    messages: [
      "Only you should be in the frame. Please continue solo.",
      "Still seeing another person. Please ensure you're alone.",
      "Reminder: The interview is for you only.",
      "Someone else is visible. Please fix this.",
      "Final reminder: Only you should be visible, or we’ll end the interview.",
    ],
    voilation: true,
  },
  "5003": {
    title: "Random Photo Taken",
    messages: [
      "A photo was taken. Stay focused on the interview.",
      "Photo detected—let’s focus on the interview.",
      "Avoid taking photos during the interview.",
      "Photo activity detected again. Please avoid it.",
      "Final reminder: No more photos, or the interview will end.",
    ],
  },
  "5004": {
    title: "Audio Above Background Levels",
    messages: [
      "Too much background noise. Please reduce it.",
      "Still hearing noise. Try to minimize it.",
      "Noise is still high. Keep it quiet.",
      "Please lower background noise to continue.",
      "Final reminder: Reduce noise or the interview will end.",
    ],
  },
  "5005": {
    title: "Document Page Hidden or Focus Lost",
    messages: [
      "You switched away from the interview page. Return now.",
      "You've navigated away. Please come back.",
      "Frequent switching detected. Stay on the page.",
      "You're off the interview page again. Return now.",
      "Final reminder: Stay on the interview page or we’ll stop the session.",
    ],
    voilation: true,
  },
  "5006": {
    title: "Document Page Became Visible or Focus Was Gained",
    messages: [
      "Welcome back! Stay focused on the interview.",
      "You're back on the page. Let’s continue.",
      "Stay on the page to keep things smooth.",
      "Frequent switching detected. Stay on the page.",
      "Final reminder: Stay focused or the session will end.",
    ],
    voilation: true,
  },
  "5007": {
    title: "Multiple Monitors Detected",
    messages: [
      "Multiple screens detected. Use only one.",
      "Still seeing multiple screens. Stick to one.",
      "You’re using more than one screen. Use only one.",
      "Multiple monitors detected again. Switch to one.",
      "Final reminder: Use only one monitor or the session may end.",
    ],
    voilation: true,
  },
  "5008": {
    title: "Multiple Monitors Suspected (Not a Violation)",
    messages: [
      "Multiple monitors might be in use. Just a heads-up!",
      "Possible multiple monitors detected. Try using just one.",
      "Check that you're only using one screen.",
      "Still detecting multiple monitors. Ensure you're using one.",
      "Please confirm you're using a single monitor.",
    ],
    voilation: false,
  },
  finalStatement:
    "The interview is ending due to repeated issues. Contact our representative for assistance. We hope to see you again prepared for another attempt.",
};
