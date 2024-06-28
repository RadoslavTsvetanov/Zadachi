import { useState } from "react";

export default function UploadPage({ api }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", text);

    try {
      const response = api.get();
      console.log("jiji", response);
      if (response.ok) {
        console.log("Upload successful");
        // Handle success as needed
      } else {
        console.error("Upload failed");
        // Handle failure as needed
      }
    } catch (error) {
      console.error("Error uploading:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file" className="block font-medium text-gray-700">
            Upload JPEG file:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="text" className="block font-medium text-gray-700">
            Text:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
