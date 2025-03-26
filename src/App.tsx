import { useState } from 'react';
import './App.css'
import NumberInput from './components/NumberInput';
import PieChart from "./components/PieChart"
import Stepper from './components/Stepper';
import { AtSign, Calendar1, Check, Clock, Key, KeyRound, Lock, Pen } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import Calendar from './components/Calendar';
import Avatar from './components/Avatar';
import DatePicker from './components/DatePicker';
import Input from './components/Input';
import TimePicker from './components/TimePicker';

function App() {
  const steps = ['Basic Information', 'Questions', 'Access To Test', 'Settings', 'Summary', 'Basic Information1', 'Access To Test2', 'Settings3'];
  const [value, setValue] = useState(5);
  const [checked, setChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDateDP, setSelectedDateDP] = useState(new Date());
  const [currentMonthDP, setCurrentMonthDP] = useState(new Date().getMonth());
  const [currentYearDP, setCurrentYearDP] = useState(new Date().getFullYear());
  const [string, setString] = useState('');
  const [stringPass, setStringPass] = useState('');
  const [time, setTime] = useState(new Date());


  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth(monthIndex);
  }

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMonthChangeDP = (monthIndex: number) => {
    setCurrentMonthDP(monthIndex);
  }

  const handleYearChangeDP = (year: number) => {
    setCurrentYearDP(year);
  }

  const handleDateSelectDP = (date: Date) => {
    setSelectedDateDP(date);
  };

  const handleTimeChange = (time: Date) => {
    setTime(time);
  }

  return (
    <main className='flex flex-col w-full h-[200vh] p-8 gap-8'>
      <PieChart
        percentage={75}
        size={120}
        strokeWidth={8}
        inside
      />

      <Stepper 
        steps={steps}
        currentStep={6}
        Icon={Check}
      />

      <NumberInput 
        value={value}
        onChange={setValue}
        minValue={-100}
        maxValue={99}
      />

      <ProgressBar
        value={40}
        size={8}
        messageBubble
      />

      <Checkbox 
        checked={checked}
        size={20}
        onChange={setChecked}
      /> 

      <Button 
        text='Click Me'
        size='m'
        type='primary'
        Icon={Pen}
        onClick={() => alert('Button Clicked')}
      />

      <Calendar
        baseYear={currentYear}
        currentMonthIndex={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        size='s'
      />

      <div className='flex -space-x-4'>
        <Avatar
          linkTo='https://avatars.githubusercontent.com/u/29613995?v=4'
          src='https://avatars.githubusercontent.com/u/29613995?v=4'
          alt='avatar'
          size={32}
        />
        <Avatar
          linkTo='https://avatars.githubusercontent.com/u/29613995?v=4'
          src='https://avatars.githubusercontent.com/u/29613995?v=4'
          alt='avatar'
          size={32}
        />
         <Avatar
          size={16}
          staticAvatar
          plusNumber={4}
        />
      </div>

      <DatePicker
        size='l'
        Icon={Calendar1}
        selectedDate={selectedDateDP}
        onDateSelect={handleDateSelectDP}
        onMonthChange={handleMonthChangeDP}
        onYearChange={handleYearChangeDP}
        baseYear={currentYearDP}
        currentMonthIndex={currentMonthDP}
        placeholder='Pick a date'
      />

      <Input 
        type='text'
        value={string}
        onValueChange={setString}
        size="l"
        width="w-64"
        Icon={AtSign}
        placeholder='Enter your email'
      />

      <Input 
        type='password'
        value={stringPass}
        onValueChange={setStringPass}
        size="l"
        width="w-64"
        Icon={KeyRound}
        placeholder='Enter your password'
      />

      <TimePicker
        size='m'
        placeholder='Pick a time'
        Icon={Clock}
        value={time}
        onValueChange={handleTimeChange}
      />  
      
      <input type="color"/> 
      <input type="password"/>
      <input type="radio"/>
      <input type="range"/>
      <input type="tel"/>

    </main>
  )
}

export default App
