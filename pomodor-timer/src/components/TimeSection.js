import '../features/timer/timer.css'
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
    } from '../features/timer/timerSlice'
    import gearIcon from '../images/gear-icon.png'

export const TimeSection = ( { section, } ) => {
    const dispatch = useDispatch()
    const timeSection = useSelector(selectTimeSection)
    const minutes = timeSection[section].minutes
    const seconds  = timeSection[section].seconds
    const update = timeSection[section].update

    return (
    <div className='box'>
        <button onClick={() => dispatch(changePopupTrigger())} className='secondaryButton'><img src={gearIcon} alt='gear icon'/></button>
        <div className='buttonContainer'>
            <button onClick={() =>dispatch(increaseTime({ section }))} className='secondaryButton'>Increase</button>
            <button onClick={() =>dispatch(decreaseTime({ section }))} className='secondaryButton'>Decrease</button>
            <button onClick={() => dispatch(resetTimer({ section }))} className="secondaryButton">Reset</button>
        </div>
        <h1 id='time'>{`${minutes}:${seconds}`}</h1>
       
            <button onClick={update ? () => dispatch(stopTimer({ section })) : () => dispatch(startTimer({ section }))} className="primaryButton">
               { update ? 'PAUSE' : 'START' }
            </button>

    </div>
    )
}