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
    resetTimer,
    changePopupTrigger
    } from './timerSlice'
    import gearIcon from '../../images/gear-icon.png'

export const Timer = () => {
    const dispatch = useDispatch()
    const minutes = useSelector(selectMinutes)
    const seconds  = useSelector(selectSeconds)
    const update = useSelector(selectUpdate)
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
        <button onClick={() => dispatch(changePopupTrigger())} className='secondaryButton'><img src={gearIcon} alt='gear icon'/></button>
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