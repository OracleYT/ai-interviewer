export const PROCTORING_OPTIONS = {
  trackingOptions: {
    audio: true,
    numHumans: true,
    tabSwitch: true,
    photosAtRandom: true,
    detectMultipleScreens: true,
    forceFullScreen: false,
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

export const AP_BROWSER_ERRORS: Record<
  string,
  { message: string; action: string }
> = {
  "4001": {
    message: "Your browser is not supported.",
    action: "Please use Google Chrome, Mozilla Firefox, or Microsoft Edge.",
  },
  "4002": {
    message: "Camera access is blocked.",
    action: "Go to your browser settings and allow camera access.",
  },
  "4003": {
    message: "Microphone access is blocked.",
    action: "Go to your browser settings and allow microphone access.",
  },
  "4004": {
    message: "Camera and microphone access was denied.",
    action:
      "Reload the page and allow access when prompted. Make sure you're using a secure (HTTPS) website.",
  },
  "4005": {
    message: "There is an issue with your device or browser settings.",
    action: "Check your device permissions or try using a different browser.",
  },
  "4006": {
    message: "Both camera and microphone access are blocked.",
    action:
      "Go to browser settings and allow access to both camera and microphone.",
  },
  "4007": {
    message: "Microphone is not working.",
    action:
      "Make sure your microphone is connected and working. Try using a different microphone if needed.",
  },
  "4008": {
    message: "Camera is not working.",
    action:
      "Make sure your camera is connected and working. Try using a different camera if needed.",
  },
  "4009": {
    message: "No microphone detected.",
    action: "Check if your device has a microphone or connect an external one.",
  },
  "4010": {
    message: "No camera detected.",
    action: "Check if your device has a camera or connect an external one.",
  },
  "4011": {
    message: "Screen sharing was blocked.",
    action: "Reload the page and allow screen sharing when prompted.",
  },
  "4012": {
    message: "There was a problem with screen sharing.",
    action: "Try restarting your computer and sharing your screen again.",
  },
  "4013": {
    message: "No screen available for sharing.",
    action: "Make sure you have an active screen to share.",
  },
  "4014": {
    message: "You must share your entire screen to continue.",
    action:
      "Reload the page and select the option to share your entire screen.",
  },
  "4015": {
    message: "Multiple monitors detected.",
    action:
      "Disconnect extra monitors or devices like Chromecast before continuing.",
  },
  "4016": {
    message: "Your browser is outdated.",
    action: "Update Safari to the latest version, or use Google Chrome.",
  },
  "4017": {
    message: "Your browser is not supported for this test.",
    action: "Please use Google Chrome or Mozilla Firefox.",
  },
  "4018": {
    message: "There was an issue loading necessary files.",
    action: "Check your internet connection and reload the page.",
  },
};
