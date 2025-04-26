"use client";

import { updateUserDocs, verifyDocument } from "@/action/user-action";
import Card from "@/components/Card";
import RightSidePannel from "@/components/RightSidePannel";
import StatusBadge from "@/components/StatusBadge";
import {
  DAHSBOARD_SUCCESS_STEPS,
  DocuemntType,
  DOCUMENTS_UPLOADS,
  UNIVERSITY_NAME,
} from "@/constatnts/content-const";
import { useAuth } from "@/contexts/AuthProvider";
import { useInterview } from "@/contexts/InterviewContextProvider";
import { buildFileLinkMap } from "@/utils/string-utils";
import clsx from "clsx";
import { CloudUpload } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

function Page() {
  const { interview, fetchInterviewData } = useInterview();
  const { userId, reloadUserData, user } = useAuth();
  const [uploadingStatusMap, setUploadingStatusMap] = React.useState<
    Record<DocuemntType, boolean>
  >({
    passport: false,
    "academic-transcript": false,
    "bank-statement": false,
    "english-proficiency": false,
  });

  const fileLinkMap = useMemo(() => {
    const view_size = 20;
    return buildFileLinkMap(user?.docs, view_size);
  }, [user]);

  useEffect(() => {
    fetchInterviewData && fetchInterviewData();
  }, [userId]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: DocuemntType
  ) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }
    const file = event.target.files[0];

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Please ensure your file size is under 10MB");
      event.target.value = "";
      return;
    }
    try {
      setUploadingStatusMap((prev) => ({ ...prev, [type]: true }));
      const formData = new FormData();
      formData.append("file", file);
      // uploading to s3
      const res = await fetch("/api/s3upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Error uploading file");
        return;
      }
      const upload_response = await res.json();
      /// update docs to database
      const update_response = await updateUserDocs(userId!, {
        url: upload_response.url,
        status: "uploaded",
        name: type,
      });

      if (update_response.success) {
        toast.success("File uploaded successfully!");
        reloadUserData();
      } else {
        toast.error("Failed to upload file, please try again");
        return;
      }

      // verify docs with agent

      const verificationResponse = await verifyDocument({
        userId: userId!,
        docName: type,
        docUrl: upload_response.url,
      });

      if (verificationResponse.success) {
        toast.success("Document verified successfully!");
      } else {
        toast.error("Failed to verify document, pleaes try again later");
      }

      await updateUserDocs(userId!, {
        url: upload_response.url,
        status: verificationResponse.success ? "verified" : "failed",
        name: type,
      });

      reloadUserData();
      
    } catch (error: any) {
      toast.error("Somthing went wrong, please try again");
      console.error(error);
    } finally {
      event.target.value = "";
      setUploadingStatusMap((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <Card
      background="#ffffff"
      width="100%"
      borderRadius="30px"
      className="flex"
    >
      {/* Left Container */}
      <div className="pt-5 px-[64px] w-[70%] overflow-y-auto element max-h-[96vh]">
        <div className="flex flex-col gap-4 my-3">
          <div className="flex justify-between w-full">
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-lg text-[#262A41] font-semibold">
                Your PRE-CAS Interview: Ready to Begin?
              </h4>
              <div>
                <div className="w-full flex justify-between">
                  {" "}
                  <h2 className="text-4xl text-[#262A41] font-extrabold">
                    {interview?.title}
                  </h2>
                  {interview?.status && (
                    <StatusBadge status={interview?.status} />
                  )}
                </div>
              </div>
            </div>
          </div>
          {interview?.expiryDate && (
            <span className="text-[#101010]/50">
              Interview Expiry date : {interview?.expiryDate}
            </span>
          )}
        </div>
        <div>
          {/* About */}
          <div className="flex flex-col gap-2 my-6">
            <h4 className="text-lg text-[#262A41]">
              About Your PRE-CAS Interview
            </h4>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-3 text-sm text-[#404852]/70">
              <p>
                The PRE-CAS interview is an important step in your journey to
                study at the {` ${UNIVERSITY_NAME}`}. It helps us understand if
                you&rsquo;re ready for studying abroad and makes sure you meet
                the requirements for your student visa.
              </p>
              <p>
                Don&rsquo;t worry—it&rsquo;s not meant to be stressful. This is
                your chance to show us why you`&apos;re excited about studying
                in the UK and why you&apos;re a great fit for the program.
                We&rsquo;re here to support you every step of the way!
              </p>
            </div>
          </div>
          {/* Verify Documents */}
          <div className="flex flex-col gap-2 my-6">
            <h4 className="text-lg text-[#262A41]">Verify your documents</h4>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="grid grid-cols-2 gap-4">
              {DOCUMENTS_UPLOADS.map(({ title, type }) => (
                <Card
                  key={type}
                  height="100px"
                  borderRadius="15px"
                  padding="15px"
                  className={clsx("flex flex-col justify-between border-2 ", {
                    "bg-[#ECFDF5] border-[#A7F3D0]":
                      fileLinkMap[type]?.status === "verified",
                    "bg-[#FEF2F2] border-[#FECACA]":
                      fileLinkMap[type]?.status === "failed",
                  })}
                >
                  <div className="flex justify-between items-center gap-7">
                    <span className="text-[#273240] text-[13px] font-medium">
                      {title}
                    </span>
                    <span className="text-[#273240] text-[11px]">PDF/DOC</span>
                  </div>
                  <span className="text-[#273240] text-[11px] underline flex justify-between">
                    <label
                      htmlFor={`file-upload-${type}`}
                      className="cursor-pointer text-[#273240] hover:text-[#000000] text-[11px] underline"
                    >
                      <span className="flex gap-2 items-center">
                        {" "}
                        <CloudUpload size="14" /> Upload
                      </span>
                      <input
                        id={`file-upload-${type}`}
                        type="file"
                        disabled={fileLinkMap[type]?.status === "verified"}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, type)}
                      />
                    </label>
                    <div>
                      {uploadingStatusMap[type] && "Uploading..."}
                      {!uploadingStatusMap[type] && fileLinkMap[type]?.url && (
                        <a
                          target="_blank"
                          href={fileLinkMap[type]?.url}
                          title={fileLinkMap[type]?.file_name}
                        >
                          {fileLinkMap[type]?.view_file_name}
                        </a>
                      )}
                    </div>
                  </span>
                </Card>
              ))}
            </div>
          </div>
          {/* Steps */}
          <div className="flex flex-col gap-4 ">
            <h5 className="text-lg text-[#262A41]">
              Your Path to Success: Follow These Steps
            </h5>
            <div className="border-[0.5px] border-[#DEDEDE]"></div>
            <div className="flex flex-col gap-4 w-full max-h-[220px]">
              {DAHSBOARD_SUCCESS_STEPS?.map((step) => (
                <InterviewReadySteps key={step.title} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Container */}
      <RightSidePannel />
    </Card>
  );
}

export default Page;

function InterviewReadySteps({ step }: any) {
  return (
    <div className="flex items-center gap-7" id={`step-${step.step}`}>
      <div
        className={
          "h-12 min-w-12 max-w-12 rounded-full place-content-center text-center text-[#ffffff] text-lg font-semibold border "
        }
        style={{
          backgroundColor: step.bgColor,
        }}
      >
        {step.step}
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[#273240] text-base font-medium">{step.title}</p>
        <span className="text-[#404852]/50 text-sm">{step.note}</span>
        <span className="text-[#404852]/50 text-sm">{step.description}</span>
      </div>
    </div>
  );
}
