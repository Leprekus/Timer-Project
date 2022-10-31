import './timer.css'
import { useState, useEffect } from 'react'

//import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch  } from 'react-redux'
import {   
    increaseTime, 
    decreaseTime,
    selectUpdate,
    changeUpdate,
    startTimer,
    stopTimer,
    selectMinutes,
    selectSeconds,
    resetTimer
    } from './timerSlice'
    import formatTime from '../../util/formatTime'

export const Timer = () => {
    const dispatch = useDispatch()
    const minutes = useSelector(selectMinutes)
    const seconds  = useSelector(selectSeconds)
    const update = useSelector(selectUpdate)
    const [date, setDate] = useState(Date.now())
    useEffect(() => {
        if(update) {
            dispatch(startTimer())
        }
        if(update === false){
            dispatch(stopTimer())
        }
    }, [update, dispatch])
    return (
    <div className='box'>
        
        <div className='buttonContainer'>
            <button onClick={() =>dispatch(increaseTime())} className='secondaryButton'>Increase</button>
            <button onClick={() =>dispatch(decreaseTime())} className='secondaryButton'>Decrease</button>
            <button onClick={() => dispatch(resetTimer())} className="secondaryButton">Reset</button>
        </div>
        <h1 id='time'>{`${minutes}:${seconds}`}</h1>
       
            <button onClick={() => dispatch(changeUpdate())} className="primaryButton">
               { update ? 'PAUSE' : 'START' }
            </button>

    </div>
    )
}