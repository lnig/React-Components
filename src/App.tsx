import { useState } from 'react';
import './App.css'
import NumberInput from './components/NumberInput';
import PieChart from "./components/PieChart"
import Stepper from './components/Stepper';
import { Check, Pen } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import Checkbox from './components/Checkbox';
import Button from './components/Button';
import Calendar from './components/Calendar';

function App() {
  const steps = ['Basic Information', 'Questions', 'Access To Test', 'Settings', 'Summary', 'Basic Information1', 'Access To Test2', 'Settings3'];
  const [value, setValue] = useState(5);
  const [checked, setChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrev = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }
  

  return (
    <main className='flex flex-col w-full h-full p-8 gap-8'>
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
        minValue={0}
        maxValue={99}
      />

      <ProgressBar
        value={40}
        size={8}
      />

      <Checkbox 
        checked={checked}
        size={24}
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
        onDateSelect={setSelectedDate}
        selectedDate={selectedDate}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      
    </main>
  )
}

export default App
