import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  dayNames,
  monthNames,
  getDaysInMonth,
  areDatesEqual,
  getStartOfWeek,
  formatWeekRange,
  getYearForMonthIndex
} from '../utils/dateUtils';

type CalendarProps = {
  baseYear: number,
  onDateSelect: (date: Date) => void,
  selectedDate: Date | null,
  handlePrev: () => void,
  handleNext: () => void,
  currentMonthIndex: number,
  primaryColor: string,
  secondaryColor: string
};

const Calendar: React.FC<CalendarProps> = ({
  baseYear,
  onDateSelect,
  selectedDate,
  handlePrev,
  handleNext,
  currentMonthIndex,
  primaryColor = '#EB4C60',
  secondaryColor = '#FFFFFF',
}) => {
  
  const [daysInMonth, setDaysInMonth] = useState<number>(
    getDaysInMonth(currentMonthIndex, baseYear)
  );

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(currentMonthIndex, baseYear));
  }, [currentMonthIndex, baseYear]);

  let datesToRender: Date[] = [];

  return (
    <div className='xl:w-fit'>
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={handlePrev}
          className={`grid place-content-center w-6 h-6 bg-[#F2F3F4] rounded`}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} color='#313642' />
        </button>

        <p className="text-base text-[#313642]">
          {monthNames[currentMonthIndex]} {baseYear}
        </p>

        <button
          onClick={handleNext}
          className={`grid place-content-center w-6 h-6 bg-[#F2F3F4] rounded`}
          aria-label="Next month"
        >
          <ChevronRight size={16} color='#313642' />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {dayNames.map((dayName, index) => {
          const isWeekend = index === 5 || index === 6;
          return (
            <div key={index} className="w-full flex justify-center items-center">
              <p className={`font-semibold text-xs text-center ${isWeekend ? 'text-[#EB4C60]' : 'text-[#8E94A0]'}`}>
                {dayName.slice(0, 1)}
              </p>
            </div>
          );
        })}

        {(() => {
          const firstDayOfMonth = new Date(baseYear, currentMonthIndex, 1).getDay();
          const blanks = (firstDayOfMonth + 6) % 7;
          let prevMonthIndex = 0;
          let prevMonthYear = 0;
          let nextMonthIndex = 0;
          let nextMonthYear = 0;

          if (currentMonthIndex === 0) {
            prevMonthIndex = 11;
            prevMonthYear = baseYear - 1;
          } else {
            prevMonthIndex = currentMonthIndex - 1;
          }     

          if (currentMonthIndex === 11) {
            nextMonthIndex = 0;
            nextMonthYear = baseYear + 1;
          } else {
            nextMonthIndex = currentMonthIndex + 1;
          }
      
          const daysInPrevMonth = getDaysInMonth(prevMonthIndex, prevMonthYear);

          const prevMonthDays = Array.from({ length: blanks }, (_, idx) => {
            return new Date(prevMonthYear, prevMonthIndex, daysInPrevMonth - blanks + idx + 1);
          });

          const currentMonthDays = Array.from({ length: daysInMonth }, (_, dayIdx) => {
            return new Date(baseYear, currentMonthIndex, dayIdx + 1);
          });

          const totalDays = prevMonthDays.length + currentMonthDays.length;
          const weeks = Math.ceil(totalDays / 7);

          const remainingDays = weeks * 7 - totalDays;
          const nextMonthDays = Array.from({ length: remainingDays }, (_, idx) => {
            return new Date(nextMonthYear, nextMonthIndex, idx + 1);
          });

          datesToRender = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

          return datesToRender.map((currentDate, idx) => {
            const dayNumber = currentDate.getDate();
            const isSelected = areDatesEqual(currentDate, selectedDate);
            const isCurrentMonth = currentDate.getMonth() === currentMonthIndex && currentDate.getFullYear() === baseYear;
            const dayOfWeek = currentDate.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            return (
              <div key={idx} className="relative w-full flex flex-col justify-center items-center"
                   style={{ '--primary-color': primaryColor, '--secondary-color': secondaryColor } as React.CSSProperties}>
                <p
                  className={`flex items-center justify-center text-base focus:outline-none
                    ${isSelected && isCurrentMonth ? 'w-6 h-6 -my-0.5' : 'w-8 h-8 -my-1'}
                    ${isCurrentMonth ? 'cursor-pointer' : 'cursor-not-allowed'}
                    ${isSelected && isCurrentMonth
                      ? 'rounded-full bg-[color:var(--primary-color)] text-[color:var(--secondary-color)]'
                      : isCurrentMonth
                      ? 'bg-transparent]'
                      : 'text-[#BDC0C9] bg-transparent'}
                    ${isCurrentMonth && isWeekend ? 'text-[color:var(--primary-color)]' : ''}`}
                  onClick={() => isCurrentMonth && onDateSelect(currentDate)}
                  aria-disabled={!isCurrentMonth}
                  aria-label={`${isSelected ? 'Selected ' : ''}${dayNames[(currentDate.getDay() + 6) % 7]}, ${currentDate.getDate()} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                >
                  {dayNumber}
                </p>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
};

export default Calendar;
