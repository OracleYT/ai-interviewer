"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  completeOnboarding,
  updateUserDetails,
  updateUserDocs,
} from "@/action/user-action";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthProvider";
import { User, Book, University, Upload } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { buildFileLinkMap } from "@/utils/string-utils";
import { throttle } from "lodash";
import { UNIVERSITY_NAME } from "@/constatnts/content-const";

type DocuemntType = "cv/resume" | "offer-letter";

export default function Login() {
  const { userId, user, reloadUserData } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    course: string;
    university: string;
  }>();
  const router = useRouter();
  const [uploadingStatusMap, setUploadingStatusMap] = React.useState<
    Record<DocuemntType, boolean>
  >({
    "cv/resume": false,
    "offer-letter": false,
  });

  const [uploaded, setUploaded] = React.useState<Record<any, boolean>>({
    cv: false,
    ol: false,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const fileLinkMap = useMemo(() => {
    const view_size = 20;
    return buildFileLinkMap(user?.docs, view_size);
  }, [user]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    if (user) {
      setUploaded({
        cv: Boolean(user?.docs?.find((doc: any) => doc.name === "cv/resume")),
        ol: Boolean(
          user?.docs?.find((doc: any) => doc.name === "offer-letter")
        ),
      });
    }
    // reloadUserData();
    if (!formData) {
      setFormData({
        name: user?.name || "",
        course: user?.course || "",
        university: user?.university || "",
      });
    }
  }, [userId, user]);

  const onChangeHandler = useCallback(
    (name: "name" | "course" | "university") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setFormData((prev) => ({ ...(prev || {}), [name]: e.target.value }));
      },
    [setFormData]
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: DocuemntType
  ) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];
    try {
      setUploadingStatusMap((prev) => ({ ...prev, [type]: true }));
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/s3upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Error uploading file:");
        return;
      }
      const upload_response = await res.json();

      const update_response = await updateUserDocs(userId!, {
        url: upload_response.url,
        name: type,
      });

      if (update_response.success) {
        toast.success("File uploaded successfully!");
        reloadUserData();
      } else {
        toast.error("Error uploading file");
      }
    } catch (error) {
      toast.error("Error uploading file");
    } finally {
      setUploadingStatusMap((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleContinueClick = async () => {
    if (!formData?.name) {
      toast.error("Name is required");
      return;
    }

    if (!uploaded.cv) {
      toast.error("CV/Resume is required");
      return;
    }
    if (!uploaded.ol) {
      toast.error("Offer Letter is required");
      return;
    }
    setIsUpdating(true);

    const res = await updateUserDetails(userId!, {
      name: formData.name,
      course: formData.course,
      university: formData.university,
    });

    if (res.success) {
      toast.success("Details updated successfully");
      await reloadUserData();
      await completeOnboarding(userId!);
      router.push("/");
    } else {
      toast.error("Error updating details");
    }
    setIsUpdating(false);
  };

  return (
    <Card
      background="#000000"
      height="100vh"
      width="100vw"
      padding="30px"
      className="flex justify-between items-center "
    >
      <div className="w-[40%] flex flex-col mx-auto">
        <h1 className="text-[#ffffff] text-6xl font-bold ">
          {UNIVERSITY_NAME} <br /> CAS Interview
        </h1>
        <p className="text-[20px] font-semibold text-[#ffffff]/50">
          Join your dream university with us
        </p>
      </div>
      <Card
        background="#ffffff"
        height="90vh"
        width="50%"
        borderRadius="30px"
        className="flex flex-col justify-center items-center gap-2 relative"
      >
        <div className="flex flex-col items-center gap-2 py-4   ">
          <h3 className="text-4xl text-[#262A41] font-semibold">
            Tell us about your self
          </h3>
          <p className="text-xs text-[#101010]/50">
            Please fill up all the details mentioned below.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 w-[400px]">
          {/* Name */}
          <div className="relative flex items-center w-full ">
            <span className="absolute ml-3">
              <User color="#444444" />
            </span>
            <input
              type="text"
              placeholder="Name *"
              value={formData?.name}
              disabled={Boolean(user?.name)}
              onChange={onChangeHandler("name")}
              required
              className="border py-2 px-12 w-full border-[#EEEEEE] rounded-lg bg-transparent text-black focus:outline-slate-400"
            />
          </div>
          {/* Couese */}
          <div className="relative flex items-center w-full">
            <span className="absolute ml-3">
              <Book color="#444444" />
            </span>{" "}
            <input
              type="text"
              placeholder="Course"
              value={formData?.course}
              onChange={onChangeHandler("course")}
              required
              className="border py-2 px-12 w-full border-[#EEEEEE] rounded-lg bg-transparent text-black focus:outline-slate-400"
            />
          </div>
          {/* University */}
          <div className="relative flex items-center w-full">
            <span className="absolute ml-3">
              <University color="#444444" />
            </span>{" "}
            <input
              type="text"
              placeholder="University"
              value={formData?.university}
              onChange={onChangeHandler("university")}
              required
              className="border w-full py-2 px-12  border-[#EEEEEE] rounded-lg bg-transparent text-black  focus:outline-slate-400"
            />
          </div>
          <div className="flex gap-4 h-20 text-[#333333]/60 font-bold w-full">
            {/* CV/Resume */}
            <div
              className={clsx(
                "border-2  rounded-lg h-full px-2 w-full text-[12px] items-center flex gap-2 flex-col text-center justify-center",
                {
                  "bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]": uploaded.cv,
                  "bg-gray-200 border-[#333333]": !uploaded.cv,
                }
              )}
            >
              <label
                htmlFor={`file-upload-cv-resume`}
                className={clsx(
                  "cursor-pointer hover:text-[#000000] flex items-center underline"
                )}
              >
                <span className="flex gap-1 items-center">
                  <Upload size="14" /> CV/Resume *
                </span>

                <input
                  id={`file-upload-cv-resume`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "cv/resume")}
                />
              </label>
              {uploadingStatusMap["cv/resume"] ? (
                <span>{"Uploading..."}</span>
              ) : (
                <a
                  className="text-[10px]"
                  href={fileLinkMap["cv/resume"]?.url}
                  title={fileLinkMap["cv/resume"]?.file_name}
                  target="_blank"
                >
                  {fileLinkMap["cv/resume"]?.view_file_name}
                </a>
              )}
            </div>
            {/* Offer Letter */}
            <div
              className={clsx(
                "border-2  rounded-lg h-full px-2 w-full text-[12px] items-center flex gap-2 flex-col text-center justify-center",
                {
                  "bg-[#ECFDF5] border-[#A7F3D0] text-[#047857]": uploaded.ol,
                  "bg-gray-200 border-[#333333]":
                    uploadingStatusMap["offer-letter"],
                }
              )}
            >
              <label
                htmlFor={`file-upload-offer-letter`}
                className={clsx(
                  "cursor-pointer hover:text-[#000000] flex items-center underline"
                )}
              >
                <span className="flex gap-1 items-center">
                  <Upload size="14" /> Upload Offer Letter*
                </span>

                <input
                  id={`file-upload-offer-letter`}
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "offer-letter")}
                />
              </label>
              {uploadingStatusMap["offer-letter"] ? (
                <span>{"Uploading..."}</span>
              ) : (
                <a
                  className="text-[10px]"
                  href={fileLinkMap["offer-letter"]?.url}
                  title={fileLinkMap["offer-letter"]?.file_name}
                  target="_blank"
                >
                  {fileLinkMap["offer-letter"]?.view_file_name}
                </a>
              )}
            </div>
          </div>
          <Button
            type="submit"
            variant="secondry"
            className="w-full"
            disabled={
              !Boolean(uploaded.cv && uploaded.ol && formData?.name) &&
              isUpdating
            }
            onClick={throttle(handleContinueClick, 10_000)}
          >
            {isUpdating ? "Updating..." : "Continue"}
          </Button>
        </div>

        <span className="absolute bottom-4 text-[8px]">
          All rights reserved. Powered by Gateway International
        </span>
      </Card>
    </Card>
  );
}
