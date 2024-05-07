import React, { useState } from 'react';
import { API_URL } from '../../constant';
import ToastSuccess from '../toast/success';
import ToastWarning from '../toast/warning';

const FileUploadComponent: React.FC<{ jwt: string }> = ({ jwt }) => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [measurementOption, setMeasurementOption] = useState<string>('CV');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [messageToastWarning, setMessageToastWarning] = useState("");
  const [messageToastSuccess, setMessageToastSuccess] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file || !name) return;

    setIsLoading(true);

    // Simulate sending file and data to server using multipart form data
    const formData = new FormData();

    formData.append('csv_file', file);
    formData.append('config_id', measurementOption === "CV"? '1' : '2');
    formData.append('name', name);
    formData.append('description', description);
   
    try {
      let response = await fetch(API_URL + 'measurements', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: formData,
      });

      setMessageToastSuccess("Berhasil mengunggah file, sedang menganalisis");

      let data = await response.json();

      let id = data.id;
      
      response = await fetch(API_URL + 'measurements/' + id + "/analyze", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({"id": id})
      });

      data = await response.json();
      setResult(data.result);

      setMessageToastSuccess("Berhasil menganalisis file");
      setTimeout(() => {
        setMessageToastSuccess("");
      }, 2000);
    } catch (error) {
      setMessageToastWarning("Gagal mengunggah file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="mb-4">
        <label className="flex items-center mr-4">
          <input
            type="radio"
            name="measurementOption"
            value="CV"
            checked={measurementOption === 'CV'}
            onChange={(e) => setMeasurementOption(e.target.value)}
          />
          <span className="ml-2">CV</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="measurementOption"
            value="DPV"
            checked={measurementOption === 'DPV'}
            onChange={(e) => setMeasurementOption(e.target.value)}
          />
          <span className="ml-2">DPV</span>
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Nama:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label htmlFor="description" className="block text-sm font-medium mt-4 mb-2">
          Deskripsi:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          rows={4}
        />
      </div>

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
          <p className="text-xs text-gray-500">CSV</p>
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
      {result != null && (
        <p className="mt-4">
          Hasil analisis: {result == "false" ? 'berpotensi RENDAH' : 'berpotensi TINGGI'}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        disabled={!file || isLoading}
      >
        {isLoading ? 'Loading...' : 'Upload'}
      </button>
      {messageToastWarning != "" && <ToastWarning message={messageToastWarning} />}
      {messageToastSuccess != "" && <ToastSuccess message={messageToastSuccess} />}
    </div>
  );
};

export default FileUploadComponent;
