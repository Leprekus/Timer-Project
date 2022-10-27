import './timer.css'
import { useState, useEffect } from 'react'

//import { useSelector, useDispatch } from 'react-redux'
import { useSelector, useDispatch  } from 'react-redux'
import { 
    selectTime,  
    increaseTime, 
    decreaseTime,
    startTimer,
    selectUpdate,
    changeUpdate
    } from './timerSlice'

export const Timer = () => {
    const dispatch = useDispatch()
    const time = useSelector(selectTime)
    const update = useSelector(selectUpdate)
    useEffect(() => {
        if(update) {
            dispatch(startTimer())
        }
    }, [update, dispatch])


    return (
    <div className='box'>
        
        <div className='buttonContainer'>
            <button onClick={() =>dispatch(increaseTime())} className='secondaryButton'>Increase</button>
            <button onClick={() =>dispatch(decreaseTime())} className='secondaryButton'>Decrease</button>
        </div>
        <h1 id='time'>{time}</h1>
        <button onClick={() => dispatch(changeUpdate())} className="primaryButton">
           { update ? 'PAUSE' : 'START' }
        </button>
    </div>
    )
}