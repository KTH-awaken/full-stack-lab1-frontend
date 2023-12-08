import React, { useRef, useState, useEffect } from 'react';
import { BASE_URL, useGetCall, usePostCall } from '../../api/apiService';
import { PictureApi } from '../../api/types/picture';
import { AccountVm } from '../../api/types/user';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { X } from 'lucide-react';
import { Save } from 'lucide-react';
import { Type } from 'lucide-react';
import { useOAuth2 } from '../../context/oauth2-context';
// import { Undo } from 'lucide-react';

interface Props {
  imageUrl: string;
  onSave: () => void;
  onCancel: () => void;
  selectedPicture: PictureApi;
}

const DrawOnPicture = ({ imageUrl, onSave, onCancel, selectedPicture }: Props) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [PencilMode, setPencilMode] = useState(true);
  const [TextMode, setTextMode] = useState(false);
  const [color, setColor] = useState<string>('black');
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState<string>('black');
  const [textSize] = useState('36px');
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [isInputActive, setIsInputActive] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const { mutate: newPicture } = usePostCall<PictureApi>('http://localhost:8000/api/replace-picture', 'pictures')

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.font = `${textSize}px`;
    if (!image) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas!.width, canvas.height);
        setImage(img);
      };
    }
    if (PencilMode) {
      canvas.style.cursor = 'crosshair';
    } else if (TextMode) {
      canvas.style.cursor = 'cell'
    } else {
      canvas.style.cursor = 'auto';
    }

    const handleMouseMove = () => {
      if (!isDrawing) return;

      if (PencilMode) {
        context.lineWidth = 6;
        context.lineCap = "round";
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        context.lineTo(event.offsetX, event.offsetY);
        context.strokeStyle = color;
        context.stroke();
      }
    };

    const handleMouseDown = () => {
      if (PencilMode) {
        context.beginPath();
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        context.moveTo(event.offsetX, event.offsetY);
        setIsDrawing(true);
      }
    };

    const handleMouseUp = () => {
      if (PencilMode) {
        setIsDrawing(false);
      }
    };

    const handleMouseClick = () => {
      if (PencilMode) {
        setIsDrawing(false);
      }
      if (TextMode) {
        setTextInput("");
        console.log("mouse clicked TextMode true")
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setStartX(event.offsetX);
        //eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setStartY(event.offsetY);
        setIsInputActive(true);

        context.fillStyle = textColor;
        context.font = '40px Verdana';
        context.fillText(textInput, startX, startY);
      }
    };



    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleMouseClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleMouseClick);
    };
  }, [isDrawing, color, imageUrl, PencilMode, TextMode, image, startX, startY, textColor, textSize, textInput, isInputActive]);


  const handelColorPicked = (color: string) => {
    if (color === 'black') {
      setColor('#000000');
      setTextColor('#000000');
    } else if (color === 'blue') {
      setColor('#496FE7')
      setTextColor('#496FE7')
    } else if (color === 'red') {
      setColor('#FF0000');
      setTextColor('#FF0000');
    } else if (color === 'white') {
      setColor('#FFFFFF')
      setTextColor('#FFFFFF')
    }
    setSelectedButton(color);
  };


  const handelPencilButtonClicked = () => {
    if (PencilMode) {
      setSelectedButton('')
    } else {
      setSelectedButton('pencil')
    }
    setPencilMode(!PencilMode)
    setTextMode(false)
  };

  const handleTextButtonClicked = () => {
    if (TextMode) {
      setSelectedButton('')
    } else {
      setSelectedButton('text')
    }
    setPencilMode(false)
    setTextMode(!TextMode)

  };



  const handleSave = async () => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (canvas) {
      const idOfPictureToReplace = selectedPicture.id;

      try {
        const base64String = canvas.toDataURL("image/jpeg", 0.2).split(';base64,')[1];
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
  // const handleUndo = () => {
  // };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log("Enter clicked")
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      context.fillStyle = textColor;
      context.font = '40px Verdana';
      context.fillText(textInput, startX, startY);


      setIsInputActive(false);
      setStartX(0);
      setStartY(0);

      setTextMode(false);
    }
  };

  return (
    <div className='relative '>
      <canvas
        className='w-930 h-930 object-cover rounded-lg'
        ref={canvasRef}
        width="930"
        height="930"
      />
      {TextMode && isInputActive && (
        <input
          type="text"
          value={textInput}
          onChange={handleTextChange}
          onKeyDown={handleInputKeyDown}
          id="textInput"
          style={{
            position: 'absolute',
            top: startY || 0,
            left: startX || 0,
            color: textColor,
            fontSize: '40px',
            border: 'filled',
            outline: 'filled',
            background: 'transparent',
          }}
        />
      )}
      <div className='flex flex-col absolute bottom-52 gap-3 right-5 bg-background rounded-lg cursor-pointer p-3' >
        <button onClick={() => handelColorPicked('black')}><div className={`w-8 h-8 rounded-full bg-black border-[3px] ${selectedButton === 'black' ? ' border-[5px] border-black' : ''}`}>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('blue')}><div className={`w-8 h-8 rounded-full bg-blue-700 border-[3px] ${selectedButton === 'blue' ? 'border-[5px] border-blue-700' : ''}`}>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('red')}><div className={`w-8 h-8 rounded-full bg-red-600 border-[3px] ${selectedButton === 'red' ? 'border-[5px] border-red-600' : ''}`}>&nbsp;</div></button>
        <button onClick={() => handelColorPicked('white')}><div className={`w-8 h-8 rounded-full bg-white border-[3px] ${selectedButton === 'white' ? 'border-[5px] border-black' : 'border-slate-500'}`}>&nbsp;</div></button>

        <button onClick={() => handelPencilButtonClicked()}> <Pencil size={30} className={`${PencilMode ? 'text-primary' : 'text-slate-500'}`} /></button>
        <button onClick={() => handleTextButtonClicked()}> <Type size={30} className={`${TextMode ? 'text-primary' : 'text-slate-500'}`} /></button>
      </div>
      <div className='flex flex-col gap-2 absolute bottom-5 right-5' >
        {/* <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={() => handleUndo()}><Undo size={30} /></button> */}
        <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={onCancel}> <X size={30} /></button>
        <button className='p-3 bg-primary text-white rounded-lg cursor-pointer' onClick={() => handleSave()}><Save size={30} /></button>
      </div>
    </div>
  );
};


const Information = ({ nrOfPictures }: { nrOfPictures: number }) => {
  const params = useParams();
  const { userData } = useOAuth2();

  const { data: patient } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE + "/user/" + params.patientEmail + ".com", "patient", { Authorization: `Bearer ${userData?.access_token}` });
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Patient</h1>
      <div className="flex flex-col gap-2 pb-5">
        <p><strong className="text-foreground/50 font-medium">Firstname: </strong> {patient && patient.firstName}</p>
        <p><strong className="text-foreground/50 font-medium">Lastname: </strong> {patient && patient.lastName}</p>
        <p><strong className="text-foreground/50 font-medium">Email: </strong> {patient && patient.email}</p>
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
    `http://localhost:8000/api/get-pictures/${encodeURIComponent(email)}`,
    'pictures'
  );
  const [selectedPicture, setSelectedPicture] = useState<PictureApi>();
  const [editMode, setEditMode] = useState(false);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching pictures</p>;

  const nrOfPictures: number = pictures?.length || 0;


  const handleEditButtonClick = (picture: PictureApi) => {
    console.log(picture);
    setSelectedPicture(picture);
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handelCancel = () => {
    setEditMode(false)
  }

  return (
    <>
      <Information nrOfPictures={nrOfPictures} />
      {editMode && selectedPicture ? (
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
  const { userData } = useOAuth2()
  const { data: patient } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE + "/user/" + params.patientEmail + ".com", "patient", { Authorization: `Bearer ${userData?.access_token}` });
  return (
    <div>
      <PictureList email={patient?.email || ""} />
    </div>
  );
};

export default PatientPicturesPage;
