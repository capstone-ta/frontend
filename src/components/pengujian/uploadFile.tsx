import React, { useState } from 'react';
import ToastSuccess from '../toast/success';
import ToastWarning from '../toast/warning';
import { PengujianPostPengukuranAPI, PengujianPostAnalisisAPI } from '../../api/pengujian';


const FileUploadComponent: React.FC<{ jwt: string }> = ({ jwt }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [measurementOption, setMeasurementOption] = useState<string>('CV');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [messageToastWarning, setMessageToastWarning] = useState("");
  const [messageToastSuccess, setMessageToastSuccess] = useState("");

  const handleFileChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    event.target.value = ''
    if (uploadedFile) {
      setFile1(uploadedFile);
    }
  };

  const handleFileChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    console.log(uploadedFile)
    event.target.value = ''
    if (uploadedFile) {
      setFile2(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file1 || !name) return;

    setIsLoading(true);

    // Simulate sending file and data to server using multipart form data
    const formData = new FormData();

    formData.append('csv_file_1', file1);
    if (file2) {
      formData.append('csv_file_2', file2);
    }
    formData.append('config_id', measurementOption === "CV"? '1' : '2');
    formData.append('name', name);
    formData.append('description', description);
   
    try {
      let response = await PengujianPostPengukuranAPI(jwt, formData);

      if (response != null) {
        setMessageToastSuccess("Berhasil mengunggah file, sedang menganalisis");

        let id = response.id;
        
        response = await PengujianPostAnalisisAPI(jwt, id);
        if (response == null) {
          setMessageToastSuccess("");
          setMessageToastWarning("Gagal menganalisis file");
        } else {
          setMessageToastSuccess("Berhasil menganalisis file");
          setResult(response.result);
        }
      } else {
        setMessageToastWarning("Gagal mengunggah file");
      }
    } catch (error) {
      setMessageToastWarning("Gagal mengunggah file");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setMessageToastSuccess("");
        setMessageToastWarning("");
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex flex-row mb-4">
        <label className="flex items-center mr-2">
          <input
            type="radio"
            name="measurementOption"
            value="CV"
            checked={measurementOption === 'CV'}
            onChange={(e) => setMeasurementOption(e.target.value)}
          />
          <span className="ml-2">CV</span>
        </label>
        <label className="flex items-center mr-2">
          <input
            type="radio"
            name="measurementOption"
            value="DPV"
            checked={measurementOption === 'DPV'}
            onChange={(e) => setMeasurementOption(e.target.value)}
          />
          <span className="ml-2">DPV</span>
        </label>
        <label htmlFor="name" className="text-sm flex items-center mr-2">
          Nama:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mr-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label htmlFor="description" className="text-sm font-medium flex items-center mr-2">
          Deskripsi:
        </label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className={measurementOption === "DPV" ? 'flex flex-row w-4/5' : 'flex justify-center w-full'}>
        <label
          htmlFor="dropzone-file1"
          className={"flex flex-col justify-center items-center text-center align-center w-9/12 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100" + (measurementOption === "DPV" ? ' mr-5' : '')}
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
            {file1 && <p className="mt-2 text-sm text-gray-500">{file1.name}</p>}
          </div>
          <input
            id="dropzone-file1"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange1}
            disabled={isLoading}
          />
        </label>
        {measurementOption === 'DPV' && 
        <label
          htmlFor="dropzone-file2"
          className="flex flex-col justify-center items-center text-center w-9/12 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
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
            {file2 && <p className="mt-2 text-sm text-gray-500">{file2.name}</p>}
          </div>
          <input
            id="dropzone-file2"
            type="file"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange2}
            disabled={isLoading}
          />
        </label>
        }
      </div>
      
      {result != null && (
        <p className="mt-4">
          Hasil analisis: {result == "false" ? 'berpotensi RENDAH' : 'berpotensi TINGGI'}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
        disabled={!file1 || isLoading}
      >
        {isLoading ? 'Loading...' : 'Upload'}
      </button>
      
      {messageToastWarning != "" && <ToastWarning message={messageToastWarning} />}
      {messageToastSuccess != "" && <ToastSuccess message={messageToastSuccess} />}
    </div>
  );
};

export default FileUploadComponent;

/* import React, { useState } from 'react';
import ToastSuccess from '../toast/success';
import ToastWarning from '../toast/warning';
import { PengujianPostAnalisisAPI, PengujianPostPengukuranAPI } from '../../api/pengujian';

const FileUploadComponent: React.FC<{ jwt: string }> = ({ jwt }) => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [measurementOption, setMeasurementOption] = useState<string>('CV');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [messageToastWarning, setMessageToastWarning] = useState("");
  const [messageToastSuccess, setMessageToastSuccess] = useState("");
  console.log(isLoading)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = async () => {
    console.log("MAKKK")
    if (!file || !name) return;

    setIsLoading(true);

    // Simulate sending file and data to server using multipart form data
    const formData = new FormData();

    formData.append('csv_file', file);
    formData.append('config_id', measurementOption === "CV"? '1' : '2');
    formData.append('name', name);
    formData.append('description', description);
   
    try {
      let data = await PengujianPostPengukuranAPI(jwt, formData);
      setMessageToastSuccess("Berhasil mengunggah file, sedang menganalisis");
      let id = data.id;
      
      data = await PengujianPostAnalisisAPI(jwt, id);
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
          disabled={true}
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
 */