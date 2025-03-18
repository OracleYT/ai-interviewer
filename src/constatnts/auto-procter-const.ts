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
    testContainerId: 'test-container',
    showHowToVideo: false,
  };
  
  export const AP_VOILATION_WARNINGS = {
    '5001': {
      title: 'No one looking at the camera',
      messages: [
        "It looks like you've stepped away from the camera. Please return to continue.",
        "I can't see you on camera. Let's get back so we can continue.",
        "You're still not visible on camera. Please come back so we can keep going.",
        "I'm not seeing you on screen. Let's get you back in view to proceed.",
        "This is the final reminder—please return to the camera, or we'll need to end the session.",
      ],
      voilation: true,
    },
    '5002': {
      title: 'More than 1 Person in Video',
      messages: [
        "It seems like someone else is in the frame. This challenge is just for you—let's keep it solo.",
        "Still seeing more than one person on camera. Please make sure you're alone.",
        "Just a reminder: only you should be on the screen. Let's fix that.",
        "I'm still seeing someone else in view. Please make sure you're the only one in the video.",
        "Final reminder: please ensure it's just you, or we'll need to end the session.",
      ],
      voilation: true,
    },
    '5003': {
      title: 'Random Photo Taken',
      messages: [
        "I noticed a photo being taken. Let's stay focused on the challenge.",
        'Another photo detected—please keep the focus on your challenge.',
        "It seems like photos are being taken again. Let's keep distractions to a minimum.",
        "There's still some photo activity happening. Please avoid it to keep going.",
        "Last reminder: no more photos, or we'll have to end the session.",
      ],
    },
    '5004': {
      title: 'Audio Above Background Levels',
      messages: [
        "I'm picking up some background noise. Let's keep it quiet for a smooth session.",
        'Still hearing some noise in the background. Try to reduce it if possible.',
        "There's still quite a bit of noise. Keeping it quiet helps us stay on track.",
        "The background noise is still high—let's keep it down to continue.",
        "This is the last reminder to keep the background quiet, or we'll have to end the session.",
      ],
    },
    '5005': {
      title: 'Document Page Hidden or Focus Lost',
      messages: [
        "Looks like you switched away from the challenge page. Let's get back on track.",
        "You've navigated away again. Please return to the challenge page.",
        "It seems like you're switching pages often. Let's stay on the challenge page.",
        "You're still moving off the challenge page. Please stay on it to keep going.",
        "Last reminder: please keep the focus on the challenge page, or we'll have to stop the session.",
      ],
      voilation: true,
    },
    '5006': {
      title: 'Document Page Became Visible or Focus Was Gained',
      messages: [
        "Welcome back! Let's stay focused on the challenge now.",
        "I see you're back on the page. Let's keep it that way and continue.",
        "You're back on track. Please stay on the page to keep things smooth.",
        "Looks like you're switching back and forth. Let's stay on the challenge page.",
        "This is your last reminder: stay focused on the challenge page, or we'll need to end the session.",
      ],
      voilation: true,
    },
    '5007': {
      title: 'Multiple Monitors Detected',
      messages: [
        "I'm noticing multiple screens being used. Let's stick to one monitor for fairness.",
        'Still seeing multiple screens. Please use only one to keep things straightforward.',
        "It looks like you're using more than one screen again. Let's stick to just one.",
        "I'm picking up on multiple monitors again. Please switch to a single screen.",
        'Final reminder: please use just one monitor, or the session may have to end.',
      ],
      voilation: true,
    },
    '5008': {
      title: 'Multiple Monitors Suspected (Not a Violation)',
      messages: [
        'It seems like there might be more than one monitor in use. Just a heads-up!',
        "I suspect there's more than one monitor. Let's try to stick to just one.",
        "It looks like multiple screens could be in use. Please check that you're only using one.",
        'Still seeing signs of multiple monitors. Make sure to use one for clarity.',
        "Just to note: please confirm you're using one monitor to keep things fair.",
      ],
      voilation: false,
    },
    finalStatement:
      "Unfortunately, I need to end the challenge as this issue has continued. Please reach out to our representative for assistance and feedback. Today didn't work out, but we hope you'll return ready to give it another try.",
  };
  