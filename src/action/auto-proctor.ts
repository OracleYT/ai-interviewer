"use server";

import CryptoJS from "crypto-js";

function computeHash(client_secret: string, test_attempt_id: string) {
  const secretWordArray = CryptoJS.enc.Utf8.parse(client_secret);
  const messageWordArray = CryptoJS.enc.Utf8.parse(test_attempt_id);
  const hash = CryptoJS.HmacSHA256(messageWordArray, secretWordArray);
  const base64HashedString = CryptoJS.enc.Base64.stringify(hash);
  return base64HashedString;
}

export async function fetchAutoProctorHashedTestAttemptId(
  testAttemptId: string
) {
  try {
    const clientSecret = process.env.NEXT_AUTO_PROCTOR_CLIENT_SECRET || "";
    return computeHash(clientSecret, testAttemptId) || null;
  } catch (err: any) {
    console.log(`Error: ${err?.message}`);
    return null;
  }
} 
