import { useState } from 'react';
import './App.css'
import NumberInput from './components/NumberInput';
import PieChart from "./components/PieChart"
import Stepper from './components/Stepper';
import { Check } from 'lucide-react';

function App() {
  const steps = ['Basic Information', 'Questions', 'Access To Test', 'Settings', 'Summary', 'Basic Information1', 'Access To Test2', 'Settings3'];
  const [value, setValue] = useState(5);

  return (
    <main className='flex flex-col w-full h-full p-8 gap-8'>
      <PieChart
        percentage={75}
        background="#e5e7eb"
        foreground="#3b82f6"
        size={120}
        strokeWidth={10}
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
        maxValue={999}
      />
    </main>
  )
}

export default App
