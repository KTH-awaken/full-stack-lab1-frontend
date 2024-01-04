//Todo remove old page replaced by addpicture dialog
import React, { useState, ChangeEvent } from 'react';
import { BASE_URL, usePostCall } from '../../api/apiService';
import { PictureApi } from '../../api/types/picture';

const UploadPicture: React.FC = () => {
  const { mutate: uploadPicture } = usePostCall<PictureApi>(
    BASE_URL.PICTURE_SERVICE+ '/api/upload-picture',
    'pictures',
  );
  const [file, setFile] = useState<File | null>(null);
  const [patientId, setPatientId] = useState<number>(0);
  const [doctorId, setDoctorId] = useState<number>(0);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64.'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (file && patientId && doctorId) {
      try {
        const base64String = await fileToBase64(file);

        const formData = new FormData();
        formData.append('picture_data_base64', base64String);
        formData.append('patient_id', String(patientId));
        formData.append('doctor_id', String(doctorId));

        console.log('upload clicked');
        uploadPicture(formData);
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
  };

  return (
    <>
      <div>Hello from Upload picture</div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input
        type="number"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(Number(e.target.value.toString()))}
      />
      <input
        type="number"
        placeholder="Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(Number(e.target.value.toString()))}
      />
      <button onClick={handleUpload}>Upload Picture</button>
    </>
  );
};

export default UploadPicture;


