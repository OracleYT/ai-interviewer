import axios from "axios";

const sendInterviewDataUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://hook.eu2.make.com/wne7tp8cyxek9olv5325vvxgtbalm0su";

export const sendInterviewDataToBackend = async (data: any) => {
  try {
    console.log("sendInterviewDataToBackend", data);
    await axios.post(sendInterviewDataUrl, data);
  } catch (e: any) {
    console.error(e.message);
    console.error("response:\n\n", e.response);
  }
};
