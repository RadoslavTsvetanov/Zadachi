import dotenv from "dotenv";
import emailjs from "@emailjs/nodejs";
dotenv.config();

const { TEMPLATE_ID, SERVICE_ID, PUBLIC_KEY, PRIVATE_KEY } = process.env;

if (!TEMPLATE_ID) {
  throw new Error("Missing or incorrect TEMPLATE ID");
}
if (!SERVICE_ID) {
  throw new Error("Missing or incorrect SERVICE_ID");
}

if (!PUBLIC_KEY) {
  throw new Error("Missing or incorrect PUBLIC_KEY");
}

if (!PRIVATE_KEY) {
  throw new Error("Missing or incorrect PRIVATE_KEY");
}

export const sendVerificationEmail = async (link: string, email: string) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        message: `hi there here is a link for veifying your acc ${link}`,
        email: email,
      },
      {
        privateKey: PRIVATE_KEY,
        publicKey: PUBLIC_KEY,
      }
    );

    console.log("hihi");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
