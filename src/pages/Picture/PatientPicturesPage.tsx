import React from 'react';
import { useGetCall } from '../../api/apiService';
import { PictureApi } from '../../api/types/picture';
import { PatientApi } from '../../api/types/user';
import { useParams } from 'react-router-dom';



const Information = () => {
  const params = useParams();
  const { data: patient } = useGetCall<PatientApi>("http://localhost:8080","/patients/"+params.patientId);
  return (
      <>
          <h1 className="text-2xl font-bold mb-4">Patient</h1>
          <div className="flex flex-col gap-2 pb-5">
              <p><strong className="text-foreground/50 font-medium">Firstname: </strong> {patient&&patient.account.firstName}</p>
              <p><strong className="text-foreground/50 font-medium">Lastname: </strong> {patient&&patient.account.lastName}</p>
              <p><strong className="text-foreground/50 font-medium">Email: </strong> {patient&&patient.account.email}</p>
              <p><strong className="text-foreground/50 font-medium">Pictures: </strong> 5</p>
              {/* <p><strong className="text-foreground/50 font-medium">Conditions: </strong> {patient&&patient.accountVm.} </p>
              <p><strong className="text-foreground/50 font-medium">Encounters: </strong> {patient&&patient.encounters.length}</p> */}
          </div>
      </>
  )
}


interface PictureListProps {
  email: string;
}

const PictureList: React.FC<PictureListProps> = ({ email }) => {
  const { data: pictures, isLoading, isError } = useGetCall<PictureApi[]>(
    'http://localhost:8000',
    `/api/pictures`, // Update with your actual backend URL and endpoint
    'pictures', // You might use a more specific key like "pictures:${email}"
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error fetching pictures</p>;

  return (
    <>
    <Information></Information>
    <div
        className='overflow-x-scroll custom-scrollbar'>
        <div className='flex space-x-4 '>
          {pictures && pictures.map((picture) => (
            <div key={picture.id} className='flex-shrink-0 pb-2'>
              <img
                src={`data:image/png;base64,${picture.picture_data_base64}`}
                alt={`Email ${email} Picture`}
                className='w-930 h-930 object-cover rounded-lg'
                style={{ objectFit: 'cover',width: '930px',height: '930px'}}
                />
            </div>
          ))}
        </div>
      </div>
        </>
  );
};

const PatientPicturesPage: React.FC = () => {
  const params = useParams();
  const { data: patient } = useGetCall<PatientApi>("http://localhost:8080","/patients/"+params.patientId);
  return (
    <div>
      <PictureList email={patient?.account.email||""} />
    </div>
  );
};

export default PatientPicturesPage;
