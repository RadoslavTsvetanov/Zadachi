import { S3 } from "./s3";
import { Readable } from "stream"; // Node.js core module for readable streams

// Example function to upload a T-shirt image file to S3
function uploadTshirt(content: string, identifier: string) {
  // Create a readable stream from the provided content
  const fileStream = Readable.from(content);

  // Assuming S3.UploadTshirt is a function that takes a file stream and uploads it
  S3.UploasdTshirt(fileStream, identifier)
    .then((response) => {
      console.log("Upload successful:", response);
    })
    .catch((error) => {
      console.error("Upload error:", error);
    });
}

// Example usage
const tshirtContent = "This is the content of the T-shirt image."; // Replace with your actual content
const identifier = "chuchu"; // Replace with your identifier or metadata
uploadTshirt(tshirtContent, identifier);
