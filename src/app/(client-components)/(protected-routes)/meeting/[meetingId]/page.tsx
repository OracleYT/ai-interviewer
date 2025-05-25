"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import {
//   CallingState,
//   CallParticipantResponse,
//   ErrorFromResponse,
//   GetCallResponse,
//   useCall,
//   useCallStateHooks,
//   useConnectedUser,
// } from "@stream-io/video-react-sdk";
// import { useChatContext } from "stream-chat-react";
// import { useUser } from "@clerk/nextjs";

import { AppContext, MEETING_ID_REGEX } from "@/contexts/AppProvider";
// import { GUEST_ID, tokenProvider } from "@/contexts/MeetProvider";
import Button from "@/components/Button";
import CallParticipants from "@/components/CallParticipants";
import Header from "@/components/Header";
import MeetingPreview from "@/components/MeetingPreview";
import Spinner from "@/components/Spinner";
// import TextField from "@/components/TextField";
// import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import { ParticipantsContext } from "@/contexts/ParticipantsProvider";
import {
  ProctorState,
  useAutoProctor,
} from "@/contexts/ProcterContextProvider";
import { useAuth } from "@/contexts/AuthProvider";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
// import { useInterview } from "@/contexts/InterviewContextProvider";
import { START_MEETING_ID } from "./constants";
import ModalPopup from "@/components/ModalPopup";
import { IMPORANT_INSTRUCTIONS } from "@/constatnts/interview-const";
// import { SettingsOut } from "svix";

const Lobby = () => {
  const params = useParams<{ meetingId: string }>();
  const meetingId = params.meetingId;
  const { user } = useAuth();
  const validMeetingId = MEETING_ID_REGEX.test(meetingId);
  const { newMeeting, setNewMeeting } = useContext(AppContext);
  // const [meetingData, setMeetingData] = useState<any>();

  // const { client: chatClient } = useChatContext();
  // const { isSignedIn } = useUser();
  const router = useRouter();
  // const connectedUser = useConnectedUser();
  // const call = useCall();
  // const { useCallCallingState } = useCallStateHooks();
  // const callingState = useCallCallingState();
  // const [guestName, setGuestName] = useState("");
  // const [errorFetchingMeeting, setErrorFetchingMeeting] = useState(false);
  const [joining, setJoining] = useState(false);
  // const [participants, setParticipants] = useState<CallParticipantResponse[]>([
  //   ai_interviwer,
  // ]);
  // const isGuest = !isSignedIn;
  // const { isCameraOn, startCamera, stopCamera } =
  //   useContext(BrowserMediaContext);
  const { participants, meetingData, loading } =
    useContext(ParticipantsContext);
  const { procterState, initAutoProctor } = useAutoProctor();
  const { useMicrophoneState, useCameraState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const [modelContent, setModalContent] = useState<ReactNode | null>(null);

  // useEffect(() => {
  //   if (isCameraOn) {
  //     startCamera();
  //   } else {
  //     stopCamera();
  //   }
  // }, []);

  useEffect(() => {
    setNewMeeting(newMeeting);

    return () => {
      setNewMeeting(false);
    };
  }, [newMeeting, setNewMeeting]);

  const heading = useMemo(() => {
    if (loading) return "Getting ready...";
    return "Ready to join?";
  }, [loading]);

  const hasBrowserPermission = useMemo(() => {
    if (hasMicPermission && hasCameraPermission) return true;
    return false;
  }, [hasMicPermission, hasCameraPermission]);

  const participantsUI = useMemo(() => {
    switch (true) {
      case loading:
        return "You'll be able to join in just a moment";
      case joining:
        return "You'll join the call in just a moment";
      // case participants.length === 0:
      //   return "No one else is here";
      // case participants.length > 0:
      default:
        return <CallParticipants participants={[participants[0]]} />;
      // return null;
    }
  }, [loading, joining]);
  // const { setStartRedirect } = useInterview();

  // const updateGuestName = async () => {
  //   try {
  //     // await fetch("/api/user", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     //   body: JSON.stringify({
  //     //     user: { id: connectedUser?.id, name: guestName },
  //     //   }),
  //     // });
  //     // await chatClient.disconnectUser();
  //     // await chatClient.connectUser(
  //     //   {
  //     //     id: GUEST_ID,
  //     //     type: "guest",
  //     //     name: guestName,
  //     //   },
  //     //   tokenProvider
  //     // );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (procterState === ProctorState.PROCTING_STARTED) {
      localStorage.setItem(START_MEETING_ID, meetingId);
      router.push(`/meeting/${meetingId}/meeting`);
    }
  }, [procterState]);

  const joinCall = async () => {
    if (!hasBrowserPermission) return;

    setJoining(true);
    initAutoProctor(meetingId, {
      name: user?.name || null,
      email: user?.email || null,
    });
  };

  function JoinCallModal() {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <ModalPopup
        open={true}
        title="⚠️ Important Instructions"
        ctaText="Join call"
        ctaAction={() => {
          if (isChecked) joinCall();
        }}
        onClose={() => setModalContent(null)}
        ctaDisabled={!isChecked}
      >
        <div className="text-center p-4">
          <ol className="text-left space-y-4 px-6 mb-6">
            {IMPORANT_INSTRUCTIONS.map((instruction, index) => (
              <li key={index} className="text-sm text-gray-700 list-decimal">
                {instruction}
              </li>
            ))}
          </ol>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I have read and agree to the instructions above.
          </label>
        </div>
      </ModalPopup>
    );
  }

  const onJoinClick = async () => {
    setModalContent(<JoinCallModal />);
  };

  if (!validMeetingId)
    return (
      <div>
        <Header />
        <div className="w-full h-full flex flex-col items-center justify-center mt-[6.75rem]">
          <h1 className="text-4xl leading-[2.75rem] font-normal text-dark-gray tracking-normal mb-12">
            Invalid video call name.
          </h1>
          <Button size="sm" onClick={() => router.push("/")}>
            Return to home screen
          </Button>
        </div>
      </div>
    );

  return (
    <div>
      {modelContent}
      <Header navItems={false} user={meetingData?.user} />
      <main className="lg:h-[calc(100svh-80px)] p-4 mt-3 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
        <MeetingPreview />
        <div className="flex flex-col items-center lg:justify-center gap-4 grow-0 shrink-0 basis-112 h-135 mr-2 lg:mb-13">
          <h2 className="text-black text-3xl text-center truncate">
            {meetingData?.title}
          </h2>
          <h2 className="text-black text-2xl text-center truncate">
            {heading}
          </h2>
          {/* {isGuest && !loading && (
            <TextField
              label="Name"
              name="name"
              placeholder="Your name"
              value={guestName}
              onChange={(e) => {
                localStorage.setItem("guest_name", e.target.value);
                setGuestName(e.target.value);
              }}
            />
          )} */}
          <span className="text-meet-black font-medium text-center text-sm cursor-default">
            {participantsUI}
          </span>
          <div
            title={
              !hasBrowserPermission
                ? "Please allow camera and microphone access"
                : "Click here to join you Interview"
            }
            className="flex flex-col items-center justify-center gap-2 mt-4"
          >
            {!joining && !loading && (
              <Button
                className="w-60 text-sm"
                onClick={onJoinClick}
                rounding="lg"
                disabled={!hasBrowserPermission}
                // variant="secondry"
              >
                Join now
              </Button>
            )}
            {(joining || loading) && (
              <div className="h-14 pb-2.5">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lobby;
