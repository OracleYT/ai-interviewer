export const PROCTORING_OPTIONS = {
  trackingOptions: {
    audio: false,
    numHumans: false,
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
  userDetails: {
    name: null,
    email: null,
  },
};

export const AP_VOILATION_WARNINGS = {
  "5001": {
    title: "No one looking at the camera",
    voilation: true,
  },
  "5002": {
    title: "More than 1 Person in Video",
    voilation: true,
  },
  "5003": {
    title: "Random Photo Taken",
    voilation: false,
  },
  "5004": {
    title: "Audio Above Background Levels",
    voilation: true,
  },
  "5005": {
    title: "Switched tab or screen",
    voilation: true,
  }, 
  "5006": {
    title: "Switched tab or screen",
    voilation: false,
  },
  "5007": {
    title: "Multiple Monitors Detected",
    voilation: true,
  },
  "5008": {
    title: "Multiple Monitors Suspected (Not a Violation)",
    voilation: false,
  },
  "5009": {
    title: "Exited full screen mode",
    voilation: true,
  },
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
    message: "Your browser is not supported for this test. ",
    action: "Please use Google Chrome or Mozilla Firefox.",
  },
  "4018": {
    message: "There was an issue loading necessary files.",
    action: "Check your internet connection and reload the page.",
  },
};
