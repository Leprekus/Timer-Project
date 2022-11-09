import './timer.css'
import { useEffect, useState } from 'react'

import { TimeSection } from '../../components/TimeSection'
import { useDispatch, useSelector } from 'react-redux'
import { selectBreakCounter, selectCurrentRenderedSection, selectTimeSection, stopTimer } from './timerSlice'

export const Timer = () => {
    const currentRenderedSection = useSelector(selectCurrentRenderedSection)
    const breakCounter = useSelector(selectBreakCounter)
    const [section, setSection] = useState(currentRenderedSection)
    useEffect(()=>{
        setSection(currentRenderedSection)
    },[currentRenderedSection])
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
            <button className='navItem' value='pomodoro' onClick={handleClick}>Pomodoro</button>
            <button className='navItem' value='shortBreak' onClick={handleClick}>Short Break</button>
            <button className='navItem' value='longBreak' onClick={handleClick}>Long Break</button>
        </nav>
        <h1>{section}</h1>
        <h1>{breakCounter}</h1>
        <TimeSection section={section}/>
    </div>

    )
}