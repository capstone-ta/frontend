import React, { useState } from 'react';

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsLoading(true);

    // Simulasi pengiriman file ke server
    try {
      // Ganti URL dengan URL sesungguhnya untuk mengirim file ke server
/*       const response = await fetch('https://example.com/upload', {
        method: 'POST',
        body: file,
      });

      const data = await response.json(); */
      setResult("High");
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-9/12 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            {}<span className="font-semibold">Klik untuk unggah</span> atau tarik file
          </p>
          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
      {result && (
        <p className="mt-4">
          Hasil analisis: {result === 'high' ? 'Berpotensi Tinggi' : 'Tidak Berpotensi'}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        disabled={!file || isLoading}
      >
        {isLoading ? 'Loading...' : 'Upload'}
      </button>
    </div>
  );
};

export default FileUploadComponent;
