import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { selectCount } from '../counter/counterSlice'

const initialState = {
    currentRenderedSection: 'pomodoro',
    customTime: {},
    time: {
        pomodoro: {
            customMinutes: undefined,
            minutes: '00',
            seconds: '01',
            update: false
        },
        shortBreak: {
            customMinutes: undefined,
            minutes: '00',
            seconds: '01',
            update: false
        },
        longBreak: {
            customMinutes: undefined,
            minutes: '00',
            seconds: '01',
            update: false
        }
    },
    popupTrigger: false,
    // 4 short breaks + 1 long break 
    breakCounter: 0,
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCustomTime(state, { payload }) {
            const { section, customMinutes } = payload
            if(customMinutes){
                state.time[section].customMinutes = customMinutes
            }
        },
        increaseTime(state, { payload }) {
            const { section, customMinutes } = payload
            let minutes = parseInt(state.time[section].minutes)
            if(customMinutes){
                minutes = customMinutes
            }
            else {
                minutes += 25
            }
            state.time[section].minutes = minutes.toString()

        },
        decreaseTime(state, { payload }){
            const { section } = payload
            let minutes = parseInt(state.time[section].minutes)
            const check = minutes - 25 > 0 ? minutes -= 25: minutes
            state.time[section].minutes = check.toString()
        },
        changeUpdate(state, { payload }) {
            const { section } = payload
            const update = state.time[section].update
            state.time[section].update = !update
        },
        updateMinutes(state, { payload }) {
            const { section } = payload
            let minutes = parseInt(state.time[section].minutes)
            minutes -= 1
            if(minutes <= 9) {
                minutes = `0${minutes}`
            }
            state.time[section].minutes = minutes.toString()
        },
        updateSeconds(state, { payload }) {
            const { section } = payload
            let seconds = parseInt(state.time[section].seconds)
            seconds -= 1
            if(seconds <= 9) {
                seconds = `0${seconds}`
            }
            state.time[section].seconds = seconds.toString()
        },
        updateCurrentRenderedSection(state, { payload }) {
            state.currentRenderedSection = payload
            
        },
        updateBreakCounter(state, { payload }){
            console.log(payload)
            if(payload) {
                const reset = 0
                state.breakCounter = reset
            } else {
                const increment = state.breakCounter + 1
                state.breakCounter = increment
            }
        },
        resetSeconds(state, { payload }) {
            const { section } = payload
            state.time[section].seconds = '60'
        },
        resetTimer(state, { payload }) {
            const { section } = payload
            let customMinutes = state.time[section].customMinutes
            if(section === 'pomodoro') {
                state.time[section].minutes = customMinutes ? customMinutes : '25'
                state.time[section].seconds = '00'
                state.update = false
            }

            if(section === 'shortBreak') {
                state.time[section].minutes = customMinutes ? customMinutes : '5'
                state.time[section].seconds = '00'
                state.update = false

            }

            if(section === 'longBreak') {
                state.time[section].minutes = customMinutes ? customMinutes : '15'
                state.time[section].seconds = '00'
                state.update = false

            }

        },
        changePopupTrigger(state) {
            state.popupTrigger = !state.popupTrigger
        }
    },

})

export const { increaseTime, decreaseTime, changeUpdate, updateMinutes,
               updateSeconds, resetSeconds, resetTimer, changePopupTrigger,
               updateCurrentRenderedSection, updateBreakCounter, setCustomTime
            } = timerSlice.actions
export const selectTimeSection = state => state.timer.time
export const selectSeconds = state => state.timer.seconds
export const selectCurrentRenderedSection = state => state.timer.currentRenderedSection
export const selectBreakCounter = state => state.timer.breakCounter

export const selectPopupTrigger = state => state.timer.popupTrigger

let intervalId;

export const startTimer = (payload) => (dispatch, getState) => {
    const { section } = payload
    //set update to true
    dispatch(changeUpdate({ section }))
    intervalId = setInterval(() => {
        const timeSection = selectTimeSection(getState())
        const minutes = timeSection[section].minutes;
        const seconds = timeSection[section].seconds;
       //stop when it reaches 00:00
       if(minutes <= 0 && seconds <= 0) return dispatch(handleBreak(section))
       //reduces minutes and reset seconds to 59
       if(seconds <= 0){
        dispatch(updateMinutes({ section, timeUnit:'minutes' }))
        dispatch(resetSeconds({ section, timeUnit:'seconds' }))
       }
       //subtracts seconds
       dispatch(updateSeconds({ section, timeUnit:'seconds'}))

   },1000)

 };

 export const handleBreak = (section) => (dispatch, getState) => {
    const breakCounter = selectBreakCounter(getState())
    console.log(breakCounter)
    //stop timer
    dispatch(stopTimer({ section }))
    //render next section
    if(breakCounter < 4) {
        if(section === 'pomodoro') return (
                dispatch(updateCurrentRenderedSection('shortBreak')),
                dispatch(startTimer({ section: 'shortBreak' })),
                dispatch(resetTimer({ section:'pomodoro' }))
            )
        
        if(section === 'shortBreak') return (
            dispatch(updateCurrentRenderedSection('pomodoro')),
            dispatch(startTimer({ section: 'pomodoro' })),
            dispatch(updateBreakCounter())
        )

    }
    //if long break, render pomodoro 
    if(breakCounter === 6) return (
        dispatch(stopTimer({section: 'longBreak'})),
        dispatch(updateCurrentRenderedSection('pomodoro')),
        dispatch(updateBreakCounter(0))
    )
    //if 4 short breaks then long break
    return (
            dispatch(updateCurrentRenderedSection('longBreak')),
            dispatch(startTimer({ section: 'longBreak' })),
            dispatch(updateBreakCounter())
    )
    //else short break 
}
 export const stopTimer = (payload) => (dispatch, getState) => {
    const { section } = payload
    dispatch(changeUpdate({ section }))
    clearInterval(intervalId)
 };

 export const handleFormSubmission = (payload) => (dispatch, getState) => {
    payload.map(sectionObject => {
        const { section, customMinutes } = sectionObject
        return (
            dispatch(increaseTime({ section, customMinutes })),
            dispatch(setCustomTime({ section, customMinutes }))
            )
    })
    dispatch(changePopupTrigger())
 };

export default timerSlice.reducer