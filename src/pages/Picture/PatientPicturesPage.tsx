import React, { useState } from 'react';
import { useGetCall } from '../../api/apiService';
import { PictureApi } from '../../api/types/picture';

interface PictureListProps {
  patientId: number;
}

const PictureList: React.FC<PictureListProps> = ({ patientId }) => {
  const { data: pictures, isLoading, isError } = useGetCall<PictureApi[]>(
    `/api/get-pictures/${patientId}`, // Update with your actual backend URL and endpoint
    'pictures', // You might use a more specific key like "pictures:${patientId}"
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching pictures</p>;

  return (
    <div>
      <h2>Pictures for Patient ID: {patientId}</h2>
      {pictures && pictures.map((picture) => (
        <div key={picture.id}>
          <img
            src={`data:image/png;base64,${picture.picture_data_base64}`}
            alt={`Patient ${patientId} Picture`}
            style={{ maxWidth: '200px', maxHeight: '200px' }}
          />
        </div>
      ))}
    </div>
  );
};

const PatientPicturesPage: React.FC = () => {
  const [patientId, setPatientId] = useState<number>(0);

  const handlePatientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientId(Number(e.target.value.toString()));
  };

  return (
    <div>
      <h1>Patient Pictures Page</h1>
      <input
        type="number"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={handlePatientIdChange}
      />
      <PictureList patientId={patientId} />
    </div>
  );
};

export default PatientPicturesPage;
