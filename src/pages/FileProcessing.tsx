import React, { useState } from 'react'
import { FileSpreadsheet, Save } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import { readExcelFile, mergeWorkbooks, saveWorkbook } from '../utils/ExcelUtils';
import type { WorkBook } from 'xlsx';
import Swal from 'sweetalert2';

const FileProcessing = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFilesSelected = (fileList: FileList) => {
    setFiles(Array.from(fileList));
    setError('');
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      Swal.fire("No files selected!", "Please select at least one Excel file.", "warning");
      return;
    }

    try {
      setMerging(true);
      setError('');

      // Read all workbooks
      const workbooks: WorkBook[] = await Promise.all(
        files.map((file) => readExcelFile(file))
      );

      // Merge workbooks
      const mergedWorkbook = mergeWorkbooks(workbooks);

      // Prompt for file name
      const { value: fileName } = await Swal.fire({
        title: 'Enter the name for the merged file:',
        input: 'text',
        confirmButtonText: 'Save',
        showCancelButton: true,
      });
      if (!fileName) {
        Swal.fire("No file name entered!", "Please enter a file name for the merged file.", "warning");
        return;
      }

      // Save the merged workbook
      saveWorkbook(mergedWorkbook, fileName);
    } catch (err) {
      Swal.fire(err instanceof Error ? err.message : 'An error occurred while merging files', "error");
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <FileSpreadsheet className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Excel File Merger</h1>
        <p className="text-gray-600">
          Select multiple Excel files to merge them.
        </p>
      </div>

      <FileUploader onFilesSelected={handleFilesSelected} multiple />

      {files.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Selected Files:</h2>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="bg-white rounded-lg p-3 shadow-sm flex items-center"
              >
                <FileSpreadsheet className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-gray-600">{file.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handleMerge}
        disabled={merging || files.length === 0}
        className={`mt-6 w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white ${
          merging || files.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-[#052963] hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
      >
        <Save className="w-5 h-5 mr-2" />
        {merging ? 'Merging...' : 'Merge Files'}
      </button>
    </div>
  </div>
);
}

export default FileProcessing