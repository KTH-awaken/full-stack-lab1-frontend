import React, { useState, useRef } from 'react';

interface TimePickerProps {
    onValueChange: (value: { hour: number, min: number }) => void,
    className?:string
}

const TimePicker = ({ onValueChange,className }: TimePickerProps) => {
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const minuteInputRef = useRef<HTMLInputElement>(null);

    const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newHour = e.target.value;
        if (newHour.length <= 2 && /^\d*$/.test(newHour) && parseInt(newHour) < 24) {
            setHour(newHour);
            if (newHour.length === 2) {
                minuteInputRef.current?.focus();
            }
        }
    };

    const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinute = e.target.value;
        if (newMinute.length <= 2 && /^\d*$/.test(newMinute) && parseInt(newMinute) < 60) {
            setMinute(newMinute);
        }
    };

    return (
        <div className={className}>
            <input
                className='focus:outline-none placeholder:text-sm w-6 bg-background'
                type="text"
                value={hour}
                onChange={(e) => { handleHourChange(e); onValueChange({ hour: parseInt(e.target.value), min: parseInt(minute, 10) }) }}
                maxLength={2}
                placeholder="HH"
            />
            <span className='text-foreground/50'>: </span>
            <input
                className='focus:outline-none placeholder:text-sm w-6 bg-background'
                type="text"
                value={minute}
                onChange={(e) => { handleMinuteChange(e); onValueChange({ hour: parseInt(hour, 10), min: parseInt(e.target.value) }) }}
                maxLength={2}
                ref={minuteInputRef}
                placeholder="MM"
            />
        </div>
    );
};

export default TimePicker;
