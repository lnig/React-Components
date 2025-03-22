export const dayNames: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getDaysInMonth = (monthNumber: number, year: number): number => {
    return new Date(year, monthNumber + 1, 0).getDate();
  };

export const getYearForMonthIndex = (monthIndex: number, baseYear: number): number => {
  return monthIndex <= 3 ? baseYear : baseYear + 1;
};

export const convertTimeToHours = (time: string): number => {
  const [timeString, modifier] = time.split(' ');
  let [hours, minutes] = timeString.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours + minutes / 60;
};

export const getCurrentTimePosition = (): number => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (hours - 7) * 66 + (minutes / 60) * 66;
};

export const areDatesEqual = (date1: Date | null, date2: Date | null): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = (day + 6) % 7;
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - diff);
  return startOfWeek;
};

export const getEndOfWeek = (startOfWeek: Date): Date => {
  const end = new Date(startOfWeek);
  end.setDate(end.getDate() + 6);
  return end;
};

export const formatWeekRange = (startOfWeek: Date): string => {
  const endOfWeek = getEndOfWeek(startOfWeek);
  if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
    return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]}, ${startOfWeek.getFullYear()}`;
  } else {
    return `${startOfWeek.getDate()} ${monthNames[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${monthNames[endOfWeek.getMonth()]}, ${startOfWeek.getFullYear()}`;
  }
};