"use client";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  // CallingState,
  // hasScreenShare,
  // isPinned,
  // RecordCallButton,
  StreamTheme,
  // useCall,
  // useCallStateHooks,
  // useConnectedUser,
  // useConnectedUser,
} from "@stream-io/video-react-sdk";
// import { Channel } from "stream-chat";
// import { DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";

import CallControlButton from "@/components/CallControlButton";
// import CallInfoButton from "@/components/CallInfoButton";
import CallEndFilled from "@/components/icons/CallEndFilled";
// import Chat from "@/components/icons/Chat";
// import ChatFilled from "@/components/icons/ChatFilled";
// import ChatPopup from "@/components/ChatPopup";
// import ClosedCaptions from "@/components/icons/ClosedCaptions";
import GridLayout from "@/components/GridLayout";
// import Group from "@/components/icons/Group";
// import Info from "@/components/icons/Info";
// import Mood from "@/components/icons/Mood";
// import PresentToAll from "@/components/icons/PresentToAll";
// import MeetingPopup from "@/components/MeetingPopup";
// import MoreVert from "@/components/icons/MoreVert";
// import RecordingsPopup from "@/components/RecordingsPopup";
// import SpeakerLayout from "@/components/SpeakerLayout";
import ToggleAudioButton from "@/components/ToggleAudioButton";
import ToggleVideoButton from "@/components/ToggleVideoButton";
import useTime from "@/hooks/useTime";
import useVapi from "@/hooks/useVapi";
// import { BrowserMediaContext } from "@/contexts/BrowserMediaProvider";
import { ParticipantsContext } from "@/contexts/ParticipantsProvider";
import { useAutoProctor } from "@/contexts/ProcterContextProvider";
import { START_MEETING_ID } from "../constants";
// import usePersistantRouter from "@/hooks/usePersistantRouter";
import { useLoadingBar } from "react-top-loading-bar";
import ModalPopup from "@/components/ModalPopup";
import { THINGS_NOT_TO_DO, THINGS_TO_DO } from "@/constatnts/interview-const";
import { CircleCheckBig, CircleX } from "lucide-react";

const Meeting = () => {
  const params = useParams<{ meetingId: string }>();
  // const { redirectState } = usePersistantRouter();
  const meetingId = params.meetingId;
  const { start, complete, getProgress, increase, decrease } = useLoadingBar({
    color: "blue",
    height: 2,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  // const router = useRouter();
  // const call = useCall();
  // const user = useConnectedUser();
  const { currentTime } = useTime();
  // const { client: chatClient } = useChatContext();
  // const { useCallCallingState, useParticipants, useScreenShareState } =
  //   useCallStateHooks();

  // const participants = useParticipants();
  // const { screenShare } = useScreenShareState();
  // const callingState = useCallCallingState();
  const { meetingData } = useContext(ParticipantsContext);
  // const [chatChannel, setChatChannel] =
  // useState<Channel<DefaultStreamChatGenerics>>();
  // const [isChatOpen, setIsChatOpen] = useState(false);
  // const [isRecordingListOpen, setIsRecordingListOpen] = useState(false);
  // const [participantInSpotlight, _] = participants;
  // const [prevParticipantsCount, setPrevParticipantsCount] = useState(0);
  // const [volumeLevel, setVolumeLevel] = useState(0);
  // const { isCameraOn, startCamera, stopCamera } =
  //   useContext(BrowserMediaContext);
  const { startVapiSession, stopVapiSession, vapiInstance, callStatus } =
    useVapi(meetingId);
  const { setModalConfig } = useAutoProctor();
  const [modelContent, setModalContent] = useState<ReactNode | null>(null);

  // const isCreator = call?.state.createdBy?.id === user?.id;
  // const isCreator = true;
  // const isUnkownOrIdle =
  //   callingState === CallingState.UNKNOWN || callingState === CallingState.IDLE;

  // useEffect(() => {
  //   startCamera();
  //   return () => {
  //     stopCamera();
  //   };
  // }, []);
  const router = useRouter();

  useEffect(() => {
    if (callStatus === "started") {
      start("static", 1);
      decrease(35);
    }
    if (callStatus === "ended") {
      complete();
    }
    const id = setInterval(() => {
      const progress = getProgress();
      if (callStatus === "started" && progress <= 90) {
        increase(1);
      }
    }, 20_000);
    return () => {
      clearTimeout(id);
    };
  }, [callStatus, start, complete, decrease]);

  useEffect(() => {
    const isMeetingStartPresets =
      localStorage.getItem(START_MEETING_ID) === meetingId;
    if (!isMeetingStartPresets) {
      router.push(`/meeting/${meetingId}`);
      return;
    }
    sessionStorage.removeItem(START_MEETING_ID);
    onInterviewStart();
  }, []);

  // useEffect(() => {
  //   if (participants.length > prevParticipantsCount) {
  //     setPrevParticipantsCount(participants.length);
  //   }
  // }, [participants.length, prevParticipantsCount]);

  const leaveCall = async () => {
    setModalConfig &&
      setModalConfig({
        showModel: true,
        title: "End Interview ?",
        content: "Are you sure you want to end the call ?",
        ctaText: "End Interview",
        ctaAction: () => {
          stopVapiSession();
        },
        onClose: () => {
          setModalConfig({ showModel: false, title: "", content: "" });
        },
      });
  };

  const startCall = async () => {
    if (!vapiInstance) {
      startVapiSession(meetingData.interviewer?.assistantID);
      audioRef.current?.play();
    }
  };

  function StartCallModal() {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <ModalPopup
        ctaText="Start call"
        ctaAction={() => {
          if (isChecked) startCall();
        }}
        onClose={() => setModalContent(null)}
        ctaDisabled={!isChecked}
      >
        <div className="text-center p-4">
          <h1 className=" text-lg mb-2 flex flex-start items-center gap-2">
            <CircleCheckBig className="text-green-600" />
            Things To Do
          </h1>
          <ol className="text-left space-y-4 px-6 mb-6 border-b-[.5px] border-gray-100/40 py-4">
            {THINGS_TO_DO.map((instruction, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-700 "
              >
                {instruction.icon && (
                  <span className="inline-block mr-2">
                    {<instruction.icon className="text-green-600" />}
                  </span>
                )}
                <span className="text-green-800">{instruction.text}</span>
              </li>
            ))}
          </ol>
          <h1 className="text-lg mb-2 flex flex-start items-center gap-2">
            <CircleX className="text-red-600" />
            Thing Not To Do
          </h1>
          <ol className="text-left space-y-4 px-6 mb-6 border-b-[.5px] border-gray-100/40 py-4">
            {THINGS_NOT_TO_DO.map((instruction, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-red-600 "
              >
                {instruction.icon && (
                  <span className="inline-block mr-2">
                    {<instruction.icon className="text-red-600" />}
                  </span>
                )}
                <span className="text-red-800">{instruction.text}</span>
              </li>
            ))}
          </ol>
          <label className="flex items-center gap-2 text-sm text-gray-700 px-6">
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

  const onInterviewStart = async () => {
    setModalContent(<StartCallModal />);
  };

  // const toggleScreenShare = async () => {
  //   try {
  //     // await screenShare.toggle();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const toggleChatPopup = () => {
  //   setIsChatOpen((prev) => !prev);
  // };

  // const toggleRecordingsList = () => {
  //   setIsRecordingListOpen((prev) => !prev);
  // };

  // if (isUnkownOrIdle) return null;

  return (
    <StreamTheme className="root-theme">
      {modelContent}
      <div className="relative w-svw h-svh bg-meet-black overflow-hidden">
        {/* {isSpeakerLayout && <SpeakerLayout />} */}
        {/* { !isSpeakerLayout &&   } */}
        <GridLayout />
        <div className="absolute left-0 bottom-0 right-0 w-full h-20 bg-meet-black text-white text-center flex items-center justify-between">
          {/* Meeting ID */}
          <div className="hidden sm:flex grow shrink basis-1/4 items-center text-start justify-start ml-3 truncate max-w-full">
            <div className="flex items-center overflow-hidden mx-3 h-20 gap-3 select-none">
              <span className="font-medium">{currentTime}</span>
              <span>{"|"}</span>
              <span className="font-medium truncate">
                {meetingData?.title || meetingId}
              </span>
            </div>
          </div>
          {/* Meeting Controls */}
          <div className="relative flex grow shrink basis-1/4 items-center justify-center px-1.5 gap-3 ml-0">
            <ToggleAudioButton />
            <ToggleVideoButton />
            {/* <CallControlButton
              icon={<ClosedCaptions />}
              title={"Turn on captions"}
            /> */}
            {/* <CallControlButton
              icon={<Mood />}
              title={"Send a reaction"}
              className="hidden sm:inline-flex"
            /> */}
            {/* <CallControlButton
              onClick={toggleScreenShare}
              icon={<PresentToAll />}
              title={"Present now"}
            /> */}
            {/* <RecordCallButton />
            <div className="hidden sm:block relative">
              <CallControlButton
                onClick={toggleRecordingsList}
                icon={<MoreVert />}
                title={"View recording list"}
              />
              <RecordingsPopup
                isOpen={isRecordingListOpen}
                onClose={() => setIsRecordingListOpen(false)}
              />
            </div> */}
            <CallControlButton
              onClick={leaveCall}
              icon={<CallEndFilled />}
              title={"Leave call"}
              className="leave-call-button"
            />
          </div>
          {/* Meeting Info */}
          <div className="hidden sm:flex grow shrink basis-1/4 items-center justify-end mr-3">
            {/* <CallInfoButton icon={<Info />} title="Meeting details" />
            <CallInfoButton icon={<Group />} title="People" />
            <CallInfoButton
              onClick={toggleChatPopup}
              icon={
                isChatOpen ? <ChatFilled color="var(--icon-blue)" /> : <Chat />
              }
              title="Chat with everyone"
            /> */}
          </div>
        </div>
        {/* <ChatPopup
          channel={chatChannel!}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        /> */}
        {/* {isCreator && <MeetingPopup />} */}
        <audio
          ref={audioRef}
          src="https://www.gstatic.com/meet/sounds/join_call_6a6a67d6bcc7a4e373ed40fdeff3930a.ogg"
        />
      </div>
    </StreamTheme>
  );
};

export default Meeting;
