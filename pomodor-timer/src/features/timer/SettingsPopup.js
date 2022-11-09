import { useDispatch, useSelector } from "react-redux"
import { changePopupTrigger, selectTimeSection, selectPopupTrigger, handleFormSubmission } from "./timerSlice"
import './settingsPopup.css'
import './timer.css'
import { useRef, useState } from "react"

export const SettingsPopup = () => {
     const trigger = useSelector(selectPopupTrigger)
     const dispatch = useDispatch()

    const pomodoroRef = useRef()
    const shortBreakRef = useRef()
    const longBreakRef = useRef()
    const section = useSelector(selectTimeSection)
    const [isDisabled, setIsDisabled] = useState(true)

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const refArray = [pomodoroRef.current, shortBreakRef.current, longBreakRef.current]
        const sectionsArray = refArray.filter(section => section.value > 0).map(section => ({
            section: section.name,
            customMinutes: section.value,
        }))
        dispatch(handleFormSubmission(sectionsArray))
    }

    const handleChange = ({ target }) => {
        console.log(target.value)
        if(target.value <= 0) {
            target.value = null  
            return setIsDisabled(true)
        }
        return setIsDisabled(false)
        
    }

    return trigger ? (
        <div className="popup">
            <form onSubmit={handleSubmit} className="popupInner">
                <div className="container">
                    <h3>Time (minutes)</h3>
                    <div className="inputContainer">
                        <input onChange={handleChange} name='pomodoro' ref={pomodoroRef} type='number' placeholder="Pomodoro" />
                        <input onChange={handleChange} name='shortBreak' ref={shortBreakRef} type='number' placeholder="Short Break" />
                        <input onChange={handleChange} name='longBreak' ref={longBreakRef} type='number' placeholder="Long Break"/>
                    </div>
                    <hr/>
                </div>
                <div className="container" style={{width: '35%'}}>
                    <button onClick={ () =>dispatch(changePopupTrigger())} className='secondaryButton'>Close</button>
                    <button disabled={isDisabled} style={{width: '4rem', backgroundColor: isDisabled ? '#e9e9e9' : ''}} className="secondaryButton">OK</button>
                </div>
            </form>
        </div>
    ) : ''
}