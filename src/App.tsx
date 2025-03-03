import { useState } from 'react';
import './App.css'
import NumberInput from './components/NumberInput';
import PieChart from "./components/PieChart"
import Stepper from './components/Stepper';
import { Check, Pen } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import Checkbox from './components/Checkbox';
import Button from './components/Button';

function App() {
  const steps = ['Basic Information', 'Questions', 'Access To Test', 'Settings', 'Summary', 'Basic Information1', 'Access To Test2', 'Settings3'];
  const [value, setValue] = useState(5);
  const [checked, setChecked] = useState(true);

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
      
    </main>
  )
}

export default App
