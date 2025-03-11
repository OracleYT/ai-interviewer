import { useContext, useMemo } from "react";

import clsx from "clsx";

import useAnimateVideoLayout from "../hooks/useAnimateVideoLayout";
import { ParticipantItem } from "./ParticipantItem";
import { ParticipantsContext } from "@/contexts/ParticipantsProvider";

const GridLayout = () => {
  const { participants: pList } = useContext(ParticipantsContext);
  const participants = useMemo(() => {
    return pList.map((p: any) => {
      if (p.roles?.includes("user")) {
        return {
          ...p,
          name: localStorage.getItem("guest_name") || "Guest",
        };
      }
      return p;
    });
  }, [pList]);

  const { ref } = useAnimateVideoLayout(false);

  return (
    <div
      ref={ref}
      className={clsx(
        "w-full relative overflow-hidden",
        "str-video__paginated-grid-layout h-full"
      )}
    >
      <div
        className={clsx("str-video__paginated-grid-layout__group h-full", {
          "str-video__paginated-grid-layout--two-four": true,
        })}
      >
        <div className="flex justify-between gap-4 w-full p-10 py-42">
          {participants.map((p: any) => (
            <ParticipantItem participant={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridLayout;
