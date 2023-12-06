import React, { useRef, useState, useEffect } from 'react';
import { useGetCall, usePostCall } from '../../api/apiService';
import { PictureApi } from '../../api/types/picture';
import { PatientApi } from '../../api/types/user';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { X } from 'lucide-react';
import { Save } from 'lucide-react';
import { Type } from 'lucide-react';
import { Undo } from 'lucide-react';

interface Props {
  imageUrl: string;
  onSave: () => void;
  onCancel: () => void;
  selectedPicture: PictureApi;
}

const DrawOnPicture = ({ imageUrl, onSave, onCancel, selectedPicture}:Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [PencilMode, setPencilMode] = useState(false);
  const [TextMode, setTextMode] = useState(false);
  const [color, setColor] = useState('black');
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const {mutate:newPicture} = usePostCall<PictureApi>(
    'http://localhost:8000',
    '/api/replace-picture',
    'pictures'
  )

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas)return;
    
    const context = canvas.getContext('2d');
    if(!context) return;
    
    if (!image) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas!.width, canvas.height);
        setImage(img);
      };
    }
    if(PencilMode){
      canvas.style.cursor = 'crosshair';
      
    } else {
      canvas.style.cursor = 'auto';
    }

    const handleMouseMove = () => {
      if (!isDrawing) return;
      
      if (PencilMode) {
        context.lineWidth =6;
        context.lineCap = "round";
         //eslint-disable-next-line @typescript-eslint/ban-ts-comment
         //@ts-ignore
        context.lineTo(event.offsetX, event.offsetY);
        context.strokeStyle = color;
        context.stroke();
      }
    };

    const handleMouseDown = () => {
      context.beginPath();
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      context.moveTo(event.offsetX, event.offsetY);
      setIsDrawing(true);
    };
    
    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDrawing, color, imageUrl,PencilMode,image]);

  
  const handelColorPicked = (color: string) => {
    if (color === 'black') {
      setColor('#000000');
    }  else if(color==='blue') {
      setColor('#496FE7')
    }else if (color === 'red') {
      setColor('#FF0000');
    }  else if(color==='white') {
      setColor('#FFFFFF')
    }
  };


  const handelPencilButtonClicked = () => {
    setPencilMode(!PencilMode)
  };

  const handleTextButtonClicked = () => {
    setPencilMode(false)
    setTextMode(!TextMode)
    console.log("text mode " +TextMode)
  };


  const handleSave = async () => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (canvas) {
      const idOfPictureToReplace = selectedPicture.id;

      try {
        const base64String = canvas.toDataURL("image/jpeg",0.2).split(';base64,')[1];

  
        const formData = new FormData();
        formData.append("id", idOfPictureToReplace.toString());
        formData.append("picture_data_base64", base64String);
        formData.append("patientEmail", selectedPicture.patientEmail);
        formData.append("doctorEmail", selectedPicture.doctorEmail);
        formData.append("date", selectedPicture.date.toString()); 
  
        newPicture(formData);
        console.log(newPicture)
        console.log(formData.toString())

        window.location.reload();
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
  
      onSave();
    }
  };
  const handleUndo = () => {
  };

  return (
    <div className='relative '>
      <canvas
      className='w-930 h-930 object-cover rounded-lg'
        ref={canvasRef}
        width="930"
        height="930"
      />
       <div className='flex flex-col absolute bottom-52 gap-3 right-5 p-3 bg-background text-primary rounded-lg cursor-pointer' >
        <button onClick={() => handelColorPicked('black')}><div className='w-8 h-8 rounded-full border-[3px] bg-black'>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('blue')}><div className='w-8 h-8 rounded-full bg-primary'>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('red')}><div className='w-8 h-8 rounded-full bg-[#FF0000]'>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('white')}><div className='w-8 h-8 rounded-full bg-white border-[3px] border-slate-700'>&nbsp;</div></button>
        <button onClick={() => handelPencilButtonClicked()}><Pencil size={30} /></button>
        <button onClick={() => handleTextButtonClicked()}><Type size={30} /></button>
       </div>

      <div className='flex flex-col gap-2 absolute bottom-5 right-5' >
      <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={() => handleUndo()}><Undo size={30} /></button>
      <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={onCancel}> <X size={30} /></button>
      <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={() =>handleSave()}><Save size={30} /></button>
      </div>
    </div>
  );
};


const Information = ({nrOfPictures}: {nrOfPictures: number}) => {
  const params = useParams();
  const { data: patient } = useGetCall<PatientApi>("http://localhost:8080","/patients/"+params.patientId);
  return (
      <>
          <h1 className="text-2xl font-bold mb-4">Patient</h1>
          <div className="flex flex-col gap-2 pb-5">
              <p><strong className="text-foreground/50 font-medium">Firstname: </strong> {patient&&patient.account.firstName}</p>
              <p><strong className="text-foreground/50 font-medium">Lastname: </strong> {patient&&patient.account.lastName}</p>
              <p><strong className="text-foreground/50 font-medium">Email: </strong> {patient&&patient.account.email}</p>
              <p><strong className="text-foreground/50 font-medium">Pictures: </strong>{nrOfPictures}</p>
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
    `/api/get-pictures/${encodeURIComponent(email)}`,
    'pictures', 
    );
    const [selectedPicture, setSelectedPicture] = useState<PictureApi>();
    const [editMode, setEditMode] = useState(false);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching pictures</p>;

  const nrOfPictures: number = pictures?.length || 0;


  const handleEditButtonClick = (picture:PictureApi) => {
    console.log(picture);
    setSelectedPicture(picture);
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handelCancel = () =>{
    setEditMode(false)
  }

  return (
    <>
      <Information nrOfPictures={nrOfPictures} />
      {editMode &&selectedPicture? (
        <DrawOnPicture
          imageUrl={`data:image/png;base64,${selectedPicture.picture_data_base64}`}
          onSave={handleSave}
          onCancel={handelCancel}
          selectedPicture={selectedPicture}
        />
      ) : (
        <div className='overflow-x-scroll custom-scrollbar '>
          <div className='flex space-x-4 '>
            {pictures &&
              pictures.map((picture) => (
                <div key={picture.id} className='relative flex-shrink-0 pb-2'>
                  <img
                    src={`data:image/png;base64,${picture.picture_data_base64}`}
                    alt={`Email ${email} Picture`}
                    className='w-930 h-930 object-cover rounded-lg'
                    style={{ objectFit: 'cover', width: '930px', height: '930px' }}
                  />
                  <button
                    className='absolute bottom-5 right-5 p-3 bg-primary text-white rounded-lg cursor-pointer'
                    onClick={() => handleEditButtonClick(picture)}
                  >
                    <Pencil size={30} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
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
