import { useDispatch } from "react-redux";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { uploadZip } from "../features/locations/locationsSlice";
import toast, { Toaster } from "react-hot-toast";

export default function Upload() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a ZIP file");
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading("Uploading and processing ZIP...");

    try {
      const res = await dispatch(uploadZip(file));

      // Remove loading toast
      toast.dismiss(loadingToastId);

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("ZIP uploaded and processed successfully!");
        setFile(null);
      } else {
        toast.error("Failed to process ZIP file");
      }
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error("An error occurred during upload");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#312e81] text-white">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Sidebar on desktop, collapsible on mobile */}
      <div className="lg:block hidden">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 sm:p-6 w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-center">
          Upload Locations (ZIP)
        </h1>

        <form
          onSubmit={submit}
          className="bg-white/10 border border-white/20 backdrop-blur-lg p-4 sm:p-6 rounded-2xl w-full max-w-xl mx-auto shadow-lg"
        >
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mb-4 w-full text-sm file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white
                       hover:file:opacity-90"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition cursor-pointer"
          >
            Upload
          </button>
          <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed">
            ZIP must contain exactly one .txt file with rows:{" "}
            <code className="bg-black/30 px-1 py-0.5 rounded">
              Name, Latitude, Longitude
            </code>
          </p>
        </form>
      </div>
    </div>
  );
}
