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
    selectTimeSection,
    selectSeconds,
    resetTimer,
    changePopupTrigger
    } from './timerSlice'
    import gearIcon from '../../images/gear-icon.png'
import { TimeSection } from '../../components/TimeSection'

export const Timer = () => {
    const dispatch = useDispatch()
    const timeSection = useSelector(selectTimeSection)
    const section = 'pomodoro'
    const minutes = timeSection.pomodoro.minutes
    const seconds  = timeSection.pomodoro.seconds
    const update = useSelector(selectUpdate)
    useEffect(() => {
        if(update) {

            dispatch(startTimer({ section }))
        }
        if(update === false){
            dispatch(stopTimer())
        }
    }, [update, dispatch])
    return (
    <div className='box'>
        <button onClick={() => dispatch(changePopupTrigger())} className='secondaryButton'><img src={gearIcon} alt='gear icon'/></button>
        <div className='buttonContainer'>
            <button onClick={() =>dispatch(increaseTime({ section }))} className='secondaryButton'>Increase</button>
            <button onClick={() =>dispatch(decreaseTime({ section }))} className='secondaryButton'>Decrease</button>
            <button onClick={() => dispatch(resetTimer({ section }))} className="secondaryButton">Reset</button>
        </div>
        <h1 id='time'>{`${minutes}:${seconds}`}</h1>
       
            <button onClick={() => dispatch(changeUpdate())} className="primaryButton">
               { update ? 'PAUSE' : 'START' }
            </button>
            <TimeSection/>
    </div>
    )
}