import './timer.css'
import { useState } from 'react'

import { TimeSection } from '../../components/TimeSection'
import { useDispatch, useSelector } from 'react-redux'
import { selectTimeSection, stopTimer } from './timerSlice'

export const Timer = () => {
    const [section, setSection] = useState('pomodoro')
    const sections = useSelector(selectTimeSection)
    const sectionIsUpdating = sections[section].update
    const dispatch = useDispatch()
    const handleClick = ({ target }) => {
        //before rendering new section pause current timer
        if(sectionIsUpdating) dispatch(stopTimer({ section }))
        setSection(target.value)     
    }
    return (
    <div>
        <nav>
            <button value='pomodoro' onClick={handleClick}>Pomodoro</button>
            <button value='shortBreak' onClick={handleClick}>Short Break</button>
            <button value='longBreak' onClick={handleClick}>Long Break</button>
        </nav>
        <TimeSection section={section}/>
    </div>

    )
}