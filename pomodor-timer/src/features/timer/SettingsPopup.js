import { useDispatch, useSelector } from "react-redux"
import { changePopupTrigger, selectMinutes, selectPopupTrigger } from "./timerSlice"
import './settingsPopup.css'
import './timer.css'
import { useReducer, useRef, useState } from "react"

export const SettingsPopup = () => {
    const trigger = useSelector(selectPopupTrigger)
    const dispatch = useDispatch()

    const pomodoro = useSelector(selectMinutes)
    const shortBreak = useRef()
    const longBreak = useRef()
    const [isDisabled, setIsDisabled] = useState(false)

    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(changePopupTrigger())
    }

    const handleChange = ({ target }) => {
        console.log(target.value)
        console.log(isDisabled)
        if(target.value <= 0) target.value = 0
        if(target.value <= 0) setIsDisabled(true)
        if(target.value > 0) setIsDisabled(false)
        if(
            pomodoro.current.value > 0 &&
            shortBreak.current.value > 0 &&
            longBreak.current.value  > 0
        ) setIsDisabled(false)
      
    }

    return trigger ? (
        <div className="popup">
            <form onSubmit={handleSubmit} className="popupInner">
                <div className="container">
                    <h3>Time (minutes)</h3>
                    <div className="inputContainer">
                        <input onChange={handleChange} type='number' placeholder="Pomodoro" value={pomodoro}></input>
                        <input onChange={handleChange} type='number' placeholder="Short Break" ></input>
                        <input onChange={handleChange} type='number' placeholder="Long Break"></input>
                    </div>
                    <hr/>
                </div>
                <button disabled={isDisabled} style={{width: '4rem', marginLeft: '90%', background: isDisabled ? 'red': ''}} className="secondaryButton">OK</button>
            </form>
        </div>
    ) : ''
}