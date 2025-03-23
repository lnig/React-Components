import React, { useState, useRef, useEffect } from 'react';
import { dayNames, monthNames, getDaysInMonth, areDatesEqual } from '../utils/dateUtils';
import Calendar from './Calendar';

type DatePickerProps = {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
  borderColor?: string,
  backgroundColor?: string,
  textColor?: string,
  Icon?: React.ElementType,
};

const DatePicker: React.FC<DatePickerProps> = ({
  size = 'm',
  borderColor = '#DEE1E5',
  backgroundColor = '#FFFFFF',
  textColor = '#313642',
  Icon,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [baseYear, setBaseYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const sizeClasses: Record<NonNullable<DatePickerProps['size']>, string> = {
    xs: 'px-2 py-1 text-xs h-7',
    s: 'px-3 py-1 text-sm h-8',
    m: 'px-3 py-1 text-base h-9',
    l: 'px-3 py-1 text-lg h-10',
    xl: 'px-3 py-2 text-lg h-11',
  };

  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonthIndex(monthIndex);
  };

  const handleYearChange = (year: number) => {
    setBaseYear(year);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
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

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            <Icon 
              size={size === 'xs' || size === 's' ? 16 : size === 'm' || size === 'l' ? 20 : 24} 
              color={textColor}/>
          </div>
        )}
        <input
          type="text"
          readOnly
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          placeholder="Select date"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-64 border rounded cursor-pointer focus:outline-none focus:ring-1 
                     ${size === 'xs' || size === 's' ? 'pl-7' : size === 'm' || size === 'l' ? 'pl-8' : 'pl-9'} ${sizeClasses[size]}`}
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
            currentMonthIndex={currentMonthIndex}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
            size="s"
          />
        </div> 
      )}
    </div>
  );
};

export default DatePicker;