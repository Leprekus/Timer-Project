import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { selectCount } from '../counter/counterSlice'

const initialState = {
    minutes: '25',
    seconds: '00',
    time: {
        pomodoro: {
            minutes: '25',
            seconds: '00',
            update: false
        },
        shortBreak: {
            minutes: '5',
            seconds: '00',
            update: false
        },
        longBreak: {
            minutes: '15',
            seconds: '00',
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
        increaseTime(state, { payload }) {
            const { section } = payload

            let minutes = parseInt(state.time[section].minutes)
            minutes += 25
            state.time[section].minutes = minutes.toString()

        },
        decreaseTime(state, { payload }){
            const { section } = payload
            let minutes = parseInt(state.time[section].minutes)
            const check = minutes - 25 >= 0 ? minutes -= 25: 0
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
        resetSeconds(state, { payload }) {
            const { section } = payload
            state.time[section].seconds = '60'
        },
        resetTimer(state, { payload }) {
            const { section } = payload
            if(section === 'pomodoro') {
                state.time[section].minutes = '25'
                state.time[section].seconds = '00'
                state.update = false
            }

            if(section === 'shortBreak') {
                state.time[section].minutes = '5'
                state.time[section].seconds = '00'
                state.update = false

            }

            if(section === 'longBreak') {
                state.time[section].minutes = '15'
                state.time[section].seconds = '00'
                state.update = false

            }

        },
        changePopupTrigger(state) {
            state.popupTrigger = !state.popupTrigger
        }
    },

})

export const { increaseTime, decreaseTime, changeUpdate, updateMinutes, updateSeconds, resetSeconds, resetTimer,
                changePopupTrigger} = timerSlice.actions
export const selectTimeSection = state => state.timer.time
export const selectSeconds = state => state.timer.seconds

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
       if(minutes <= 0 && seconds <= 0) return dispatch(stopTimer({ section }))
       //reduces minutes and reset seconds to 59
       if(seconds <= 0){
        dispatch(updateMinutes({ section, timeUnit:'minutes' }))
        dispatch(resetSeconds({ section, timeUnit:'seconds' }))
       }
       //subtracts seconds
       dispatch(updateSeconds({ section, timeUnit:'seconds'}))

   },1000)

 };
 export const stopTimer = (payload) => (dispatch, getState) => {
    const { section } = payload
    dispatch(changeUpdate({ section }))
    clearInterval(intervalId)
 };

export default timerSlice.reducer