import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void;
  multiple?: boolean;
  accept?: string;
}
 
const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  multiple = false,
  accept = '.xlsx,.xls',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
        multiple={multiple}
        accept={accept}
      />
      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600">
        Click to {multiple ? 'select files' : 'select a file'}
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Supports Excel files (.xlsx, .xls)
      </p>
    </div>
  );
};

export default FileUploader;