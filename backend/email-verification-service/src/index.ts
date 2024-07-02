import { sendVerificationEmail } from "./email";
console.log("sendVerificationEmail");
try {
  sendVerificationEmail("https://api/auth/verify", "lo_ol@abv.bg");
} catch (err) {
  console.error("Error sending verification email:", err);
}
