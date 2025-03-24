import React, { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar';

type DatePickerProps = {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
  borderColor?: string,
  backgroundColor?: string,
  textColor?: string,
  Icon?: React.ElementType,
  selectedDate: Date | null,
  currentMonthIndex: number,
  baseYear: number,
  onDateSelect: (date: Date) => void,
  onMonthChange: (monthIndex: number) => void,
  onYearChange: (year: number) => void,
};

const DatePicker: React.FC<DatePickerProps> = ({
  size = 'm',
  borderColor = '#DEE1E5',
  backgroundColor = '#FFFFFF',
  textColor = '#313642',
  Icon,
  selectedDate,
  currentMonthIndex,
  baseYear,
  onDateSelect,
  onMonthChange,
  onYearChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sizeClasses: Record<NonNullable<DatePickerProps['size']>, string> = {
    xs: 'px-2 py-1 text-xs h-7',
    s: 'px-3 py-1 text-sm h-8',
    m: 'px-3 py-1 text-base h-9',
    l: 'px-3 py-1 text-lg h-10',
    xl: 'px-3 py-2 text-lg h-11',
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDateSelected = selectedDate !== null;

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <Icon 
              size={size === 'xs' ? 16 : size === 's' ? 18 : size === 'm' ? 20 : size === 'l' ? 20 : 24} 
              color={isDateSelected ? textColor : '#8E94A0'}
              strokeWidth={1.5}
            />
          </div>
        )}
        <input
          type="text"
          readOnly
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          placeholder="Select date"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-64 border rounded cursor-pointer focus:outline-none focus:ring-1 placeholder:text-[#8E94A0] 
                     ${size === 'xs' ? 'pl-7' : size === 's' ? 'pl-8 pb-[5px]' : size === 'm' ? 'pl-9 pb-[6px]' :  size === 'l' ? 'pl-9' : 'pl-10'} ${sizeClasses[size]}`}
          style={{ borderColor, background: backgroundColor, color: textColor }}
        />
      </div>
      {isOpen && (
        <div 
          className="absolute left-0 p-4 w-fit mt-2 z-10 bg-white rounded shadow-sm border" 
          style={{ border: borderColor }}
        >
          <Calendar 
            baseYear={baseYear}
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
            currentMonthIndex={currentMonthIndex}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}  
            size="s"
          />
        </div> 
      )}
    </div>
  );
};

export default DatePicker;