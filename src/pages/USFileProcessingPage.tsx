import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const USFileProcessingPage: React.FC = () => {
    const [filesData, setFilesData] = useState<File[]>([]);
    const [processing, setProcessing] = useState(false);
    const [directoryName, setDirectoryName] = useState<string>("");

    const handleDirectorySelection = async () => {
        try {
            // @ts-ignore
            const directoryHandle = await window.showDirectoryPicker();
            const directoryPath = directoryHandle.name;
            setDirectoryName(directoryPath);

            const files: File[] = [];

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for await (const [name, handle] of directoryHandle.entries()) {
                if (handle.kind === 'file') {
                    const file = await handle.getFile();
                    if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) {
                        files.push(file);
                    }
                }
            }

            if (files.length === 0) {
                Swal.fire("No valid files!", "No spreadsheet files (.xlsx or .xls) found in the selected directory.", "warning");
                return;
            }

            setFilesData(files);

            Swal.fire("Directory Selected!", `Directory: ${directoryPath} with ${files.length} files`, "success");
        } catch (error) {
            console.error("Error selecting directory:", error);
            Swal.fire("Error!", "An error occurred while selecting the directory.", "error");
        }
    };

    const handleSubmit = async () => {
        try {
            setProcessing(true);

            const formData = new FormData();
            filesData.forEach((file) => {
                formData.append('files', file);
            });

            console.log("Processing files data:", filesData);

            const response = await axios.post("/api/v1/merge-us-files/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("Success!", response.data.message || "Files merged successfully!", "success");
        } catch (error) {
            Swal.fire("Error!", "An error occurred while processing the files: The server does not recognize the file type. Please ensure that Microsoft Office is installed and properly configured.", "error");
            console.error(error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">File Processing</h1>

            {/* Directory Selection */}
            <div className="mb-6">
                <button
                    className="bg-[#052963] text-white px-4 py-2 rounded"
                    onClick={handleDirectorySelection}
                >
                    Select Directory
                </button>
            </div>

            {/* Display Selected Directory and Files */}
            {directoryName && (
                <div className="mb-6">
                    <h2 className="text-xl font-medium mb-2">Selected Directory:</h2>
                    <p>{directoryName}</p>
                    <h3 className="text-lg font-medium mt-4">Files:</h3>
                    <ul>
                        {filesData.map((file, index) => (
                            <li key={index} className="text-gray-700">
                                {file.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit Button */}
            <div>
                <button
                    className="bg-[#02BBCA] text-white px-6 py-3 rounded disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={processing || filesData.length === 0}
                >
                    {processing ? "Processing..." : "Process Files"}
                </button>
            </div>
        </div>
    );
};

export default USFileProcessingPage;
