export const initialParticipants = [
  {
    id: 1,
    userId: "user_2u1F7RFolSMguLpRStV5sdhmGsM",
    user: {
      name: "Abhinav Jain",
      image: "/image.jpg",
      id: 123,
    },
    sessionId: "b1cbb11b-cbad-4e8b-bd1b-8c8e87da6e94",
    publishedTracks: [1, 2],
    trackLookupPrefix: "f7469004d4328fa3",
    connectionQuality: 3,
    isSpeaking: false,
    isDominantSpeaker: false,
    audioLevel: 0,
    name: "Abhinav Jain",
    hasImage: true,
    image: "/image.jpg",
    roles: ["host"],
    joinedAt: {
      seconds: "0",
      nanos: 0,
    },
    isLocalParticipant: false,
    viewportVisibilityState: {
      videoTrack: "UNKNOWN",
      screenShareTrack: "UNKNOWN",
    },
    audioStream: {},
    videoDimension: {
      width: 344,
      height: 258,
    },
    videoStream: {},
  },
  {
    id: 2,
    userId: "guest-44cbf886-63af-4ace-af40-b3ddc55f1a43-guest_Rz9cuDfPSoo7YcL",
    sessionId: "8207f7ef-f1f5-4164-8489-0bc51354bd67",
    publishedTracks: [1, 2],
    isVideoOn: true,
    trackLookupPrefix: "0391c8da6f707480",
    connectionQuality: 3,
    isSpeaking: false,
    isDominantSpeaker: true,
    audioLevel: 0,
    name: "Candidate",
    image: "",
    roles: ["user"],
    joinedAt: {
      seconds: "1741457313",
      nanos: 754009659,
    },
    isLocalParticipant: true,
    viewportVisibilityState: {
      videoTrack: "UNKNOWN",
      screenShareTrack: "UNKNOWN",
    },
    videoStream: {},
    audioStream: {},
  },
];


export const START_MEETING_ID = "start_meeting_id";