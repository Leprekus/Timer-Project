import React, {useState} from 'react';

import './App.css';
import { NewTaskForm } from './components/NewTaskForm';
import { Tasks } from './features/task/Tasks';
import { Timer } from'./features/timer/Timer'

function App() {
  const [background, setBackground] = useState(`url(${process.env.BG_IMG})`)


  return (
    <main>
      <Timer/>
      <Tasks/>
    </main>
  );
}

export default App;
