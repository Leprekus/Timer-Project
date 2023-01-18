import './timer.css'
import { useMemo, useState, useRef } from 'react'

import { TimeSection } from '../../components/TimeSection'
import { useDispatch, useSelector } from 'react-redux'
import { selectBreakCounter, selectCurrentRenderedSection, selectTimeSection, stopTimer } from './timerSlice'

export const Timer = () => {
    const navButtonRef = useRef(null)
    const currentRenderedSection = useSelector(selectCurrentRenderedSection)
    const breakCounter = useSelector(selectBreakCounter)
    const [section, setSection] = useState(currentRenderedSection)
    useMemo(()=>{
        setSection(currentRenderedSection)
    },[currentRenderedSection])
    const sections = useSelector(selectTimeSection)
    const sectionIsUpdating = sections[section].update
    const dispatch = useDispatch()
    const handleClick = ({ target }) => {
        navButtonRef.current.className = 'navItem active'
        //before rendering new section pause current timer
        if(sectionIsUpdating) dispatch(stopTimer({ section }))
        setSection(target.value)     
        
    }
    return (
    <div>
        <nav>
            <button ref={navButtonRef} className='navItem' value='pomodoro' onClick={handleClick}>Pomodoro</button>
            <button ref={navButtonRef} className='navItem' value='shortBreak' onClick={handleClick}>Short Break</button>
            <button ref={navButtonRef} className='navItem' value='longBreak' onClick={handleClick}>Long Break</button>
        </nav>
        <TimeSection section={section}/>
    </div>

    )
}